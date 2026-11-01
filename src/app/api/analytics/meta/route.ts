import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { GUIAS_BASE_PATH, guiasDeSeguros } from "@/content/guias-de-seguros";
import { VERTICALS } from "@/lib/leads/config";

/**
 * Meta Conversions API (CAPI) Route Handler
 *
 * Receives first-party `PageView`, `Lead`, and `Contact` notifications from
 * the client when marketing consent is granted, validates origin, consent,
 * path allowlist, event-specific schema, bot/rate limits, and forwards a
 * single deduplicated event to Meta Graph API with an explicit
 * server-constructed `event_source_url`.
 *
 * Security & Privacy:
 *   - Access token is read exclusively from server env `META_CAPI_ACCESS_TOKEN`.
 *   - Never accepts external URLs from the client; builds `event_source_url`
 *     strictly from a trusted LEVANTIR origin + allowlisted internal pathname.
 *   - Never processes or forwards PII (no emails, phones, names, or form data).
 */

const DEFAULT_PIXEL_ID = "1783451359594330";
const GRAPH_API_VERSION = "v26.0";
const MAX_BODY_BYTES = 2048;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 30;
const EVENT_ID_TTL_MS = 10 * 60_000;
const PATH_BURST_TTL_MS = 2_000;

const STATIC_LEVANTIR_PATHS = [
  "/",
  "/aeronaves",
  "/autos",
  "/autos/seguro-de-auto",
  "/aviso-de-privacidad",
  "/contacto",
  GUIAS_BASE_PATH,
  "/mercancias",
  "/nosotros",
  "/personas",
  "/personas/gastos-medicos-mayores",
  "/personas/retiro",
  "/personas/seguro-de-vida",
  "/pymes",
  "/pymes/hombre-clave",
  "/pymes/responsabilidad-civil",
  "/pymes/seguro-empresarial",
  "/sectores-especializados",
  "/terminos-y-condiciones",
] as const;

const VALID_LEVANTIR_PATHS: ReadonlySet<string> = new Set<string>([
  ...STATIC_LEVANTIR_PATHS,
  ...guiasDeSeguros.map((guia) => `${GUIAS_BASE_PATH}/${guia.slug}`),
]);

type AllowedMetaEventName = "PageView" | "Lead" | "Contact";

const ALLOWED_EVENT_NAMES: ReadonlySet<AllowedMetaEventName> =
  new Set<AllowedMetaEventName>(["PageView", "Lead", "Contact"]);

const ALLOWED_CONTACT_CHANNELS: ReadonlySet<string> = new Set<string>([
  "whatsapp",
  "phone",
  "email",
]);

const ALLOWED_LEAD_VERTICALS: ReadonlySet<string> = new Set<string>(
  VERTICALS
);

const ALLOWED_LEAD_FORM_IDS: ReadonlySet<string> = new Set<string>([
  "auto-advisory",
  "personal-advisory",
  "pymes-advisory",
  "mercancias-advisory",
  "aviation-advisory",
  "specialized-advisory",
  "contact-form",
  "advisory-modal",
]);

const ALLOWED_BODY_KEYS: ReadonlySet<string> = new Set([
  "eventName",
  "path",
  "eventId",
  "consent",
  "channel",
  "vertical",
  "formId",
]);

const EVENT_ID_REGEX = /^[a-zA-Z0-9_-]{8,128}$/;
const BOT_USER_AGENT_REGEX =
  /bot|crawler|spider|headless|scrapy|curl|wget|python-requests|httpclient|axios|postman|insomnia/i;
const FBP_REGEX = /^fb\.\d+\.\d+\.\d+$/;
const FBC_REGEX = /^fb\.\d+\.\d+\.[A-Za-z0-9_-]{8,500}$/;
const IPV4_REGEX = /^(?:\d{1,3}\.){3}\d{1,3}$/;
const IPV6_REGEX = /^[0-9a-fA-F:]+$/;
const VERCEL_PREVIEW_HOST_REGEX =
  /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*\.vercel\.app$/i;

// Best-effort in-memory stores scoped to a single warm Serverless isolate.
// In Vercel Serverless, these do NOT provide global state across concurrent
// instances or cold starts.
const rateLimitStore = new Map<string, number[]>();
const recentEventIds = new Map<string, number>();
const recentPathBursts = new Map<string, number>();

function getAllowedOrigins(): ReadonlySet<string> {
  const origins = new Set<string>([
    siteConfig.url,
    "https://www.levantir.com",
  ]);

  if (process.env.VERCEL_ENV === "preview") {
    const previewHosts = [
      process.env.VERCEL_URL,
      process.env.VERCEL_BRANCH_URL,
    ];
    for (const rawHost of previewHosts) {
      const host = rawHost?.trim().toLowerCase();
      if (
        host &&
        host.length <= 253 &&
        VERCEL_PREVIEW_HOST_REGEX.test(host)
      ) {
        origins.add(`https://${host}`);
      }
    }
  }

  if (process.env.NODE_ENV !== "production") {
    origins.add("http://localhost:3005");
    origins.add("http://127.0.0.1:3005");
    origins.add("http://localhost:3000");
    origins.add("http://127.0.0.1:3000");
  }

  return origins;
}

function resolveTrustedOrigin(request: Request): string | null {
  const secFetchSite = request.headers.get("sec-fetch-site");
  if (
    secFetchSite &&
    secFetchSite !== "same-origin" &&
    secFetchSite !== "none"
  ) {
    return null;
  }

  const allowedOrigins = getAllowedOrigins();
  const originHeader = request.headers.get("origin")?.trim();

  if (originHeader) {
    return allowedOrigins.has(originHeader) ? originHeader : null;
  }

  const refererHeader = request.headers.get("referer")?.trim();
  if (refererHeader) {
    try {
      const refererOrigin = new URL(refererHeader).origin;
      return allowedOrigins.has(refererOrigin) ? refererOrigin : null;
    } catch {
      return null;
    }
  }

  return null;
}

function parseCookieHeader(cookieHeader: string | null): Record<string, string> {
  const result: Record<string, string> = {};
  if (!cookieHeader) return result;

  const pairs = cookieHeader.split(";");
  for (const pair of pairs) {
    const eqIdx = pair.indexOf("=");
    if (eqIdx === -1) continue;
    const key = pair.slice(0, eqIdx).trim();
    const val = pair.slice(eqIdx + 1).trim();
    if (key) {
      result[key] = val;
    }
  }
  return result;
}

function verifyServerConsent(
  request: Request,
  bodyConsent: unknown
): boolean {
  if (bodyConsent !== "granted") {
    return false;
  }

  const cookies = parseCookieHeader(request.headers.get("cookie"));
  const cookieConsent = cookies["levantir_marketing_consent"];
  const headerConsent = request.headers.get("x-levantir-consent")?.trim();

  // X-Levantir-Consent alone is NEVER accepted as valid proof of consent.
  // The first-party cookie `levantir_marketing_consent=granted` is required.
  if (cookieConsent !== "granted") {
    return false;
  }

  // If the consent header is present, it must also match "granted".
  if (headerConsent !== undefined && headerConsent !== "granted") {
    return false;
  }

  return true;
}

function extractClientIp(request: Request): string | null {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp && (IPV4_REGEX.test(firstIp) || IPV6_REGEX.test(firstIp))) {
      return firstIp;
    }
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp && (IPV4_REGEX.test(realIp) || IPV6_REGEX.test(realIp))) {
    return realIp;
  }

  return null;
}

function isRateLimited(clientKey: string, now: number): boolean {
  const timestamps = rateLimitStore.get(clientKey) || [];
  const active = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (active.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(clientKey, active);
    return true;
  }

  active.push(now);
  rateLimitStore.set(clientKey, active);
  return false;
}

function pruneDeduplicationStores(now: number): void {
  for (const [id, ts] of recentEventIds.entries()) {
    if (now - ts > EVENT_ID_TTL_MS) {
      recentEventIds.delete(id);
    }
  }
  for (const [key, ts] of recentPathBursts.entries()) {
    if (now - ts > PATH_BURST_TTL_MS) {
      recentPathBursts.delete(key);
    }
  }
}

function normalizeAndValidatePath(rawPath: unknown): string | null {
  if (typeof rawPath !== "string") return null;
  const trimmed = rawPath.trim();

  if (
    trimmed.length === 0 ||
    trimmed.length > 200 ||
    !trimmed.startsWith("/") ||
    trimmed.startsWith("//") ||
    trimmed.includes("?") ||
    trimmed.includes("#") ||
    trimmed.includes("..") ||
    trimmed.includes("://") ||
    trimmed.includes("\\")
  ) {
    return null;
  }

  const normalized =
    trimmed.length > 1 && trimmed.endsWith("/")
      ? trimmed.slice(0, -1)
      : trimmed;

  if (!VALID_LEVANTIR_PATHS.has(normalized)) {
    return null;
  }

  return normalized;
}

function methodNotAllowed() {
  return NextResponse.json(
    { ok: false, error: "METHOD_NOT_ALLOWED" },
    { status: 405, headers: { Allow: "POST" } }
  );
}

export async function GET() {
  return methodNotAllowed();
}

export async function PUT() {
  return methodNotAllowed();
}

export async function DELETE() {
  return methodNotAllowed();
}

export async function PATCH() {
  return methodNotAllowed();
}

export async function POST(request: Request) {
  try {
    // 1. Validate Content-Type
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        { ok: false, error: "UNSUPPORTED_MEDIA_TYPE" },
        { status: 415 }
      );
    }

    // 2. Validate Origin (same-origin LEVANTIR only)
    const trustedOrigin = resolveTrustedOrigin(request);
    if (!trustedOrigin) {
      return NextResponse.json(
        { ok: false, error: "INVALID_ORIGIN" },
        { status: 403 }
      );
    }

    // 3. Automated request / bot protection
    const userAgent = request.headers.get("user-agent")?.trim() || "";
    if (
      userAgent.length < 10 ||
      userAgent.length > 512 ||
      BOT_USER_AGENT_REGEX.test(userAgent)
    ) {
      return NextResponse.json(
        { ok: false, error: "AUTOMATED_REQUEST" },
        { status: 403 }
      );
    }

    // 4. Rate limit per client IP
    const now = Date.now();
    const clientIp = extractClientIp(request);
    const rateLimitKey = clientIp || "local";
    if (isRateLimited(rateLimitKey, now)) {
      return NextResponse.json(
        { ok: false, error: "RATE_LIMITED" },
        { status: 429 }
      );
    }

    // 5. Validate payload size and JSON structure
    const contentLengthHeader = request.headers.get("content-length");
    if (contentLengthHeader) {
      const contentLength = Number(contentLengthHeader);
      if (!Number.isFinite(contentLength) || contentLength > MAX_BODY_BYTES) {
        return NextResponse.json(
          { ok: false, error: "PAYLOAD_TOO_LARGE" },
          { status: 413 }
        );
      }
    }

    let rawText: string;
    try {
      rawText = await request.text();
    } catch {
      return NextResponse.json(
        { ok: false, error: "INVALID_REQUEST" },
        { status: 400 }
      );
    }

    if (rawText.length === 0 || rawText.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        {
          ok: false,
          error:
            rawText.length > MAX_BODY_BYTES
              ? "PAYLOAD_TOO_LARGE"
              : "INVALID_REQUEST",
        },
        { status: rawText.length > MAX_BODY_BYTES ? 413 : 400 }
      );
    }

    let parsedBody: unknown;
    try {
      parsedBody = JSON.parse(rawText);
    } catch {
      return NextResponse.json(
        { ok: false, error: "INVALID_REQUEST" },
        { status: 400 }
      );
    }

    if (
      typeof parsedBody !== "object" ||
      parsedBody === null ||
      Array.isArray(parsedBody)
    ) {
      return NextResponse.json(
        { ok: false, error: "INVALID_REQUEST" },
        { status: 400 }
      );
    }

    const bodyRecord = parsedBody as Record<string, unknown>;
    const bodyKeys = Object.keys(bodyRecord);
    if (
      bodyKeys.length === 0 ||
      bodyKeys.some((key) => !ALLOWED_BODY_KEYS.has(key))
    ) {
      return NextResponse.json(
        { ok: false, error: "INVALID_REQUEST" },
        { status: 400 }
      );
    }

    // 6. Verify marketing consent on the server
    if (!verifyServerConsent(request, bodyRecord.consent)) {
      return NextResponse.json(
        { ok: false, error: "CONSENT_REQUIRED" },
        { status: 403 }
      );
    }

    // 7. Validate eventName allowlist ("PageView" | "Lead" | "Contact")
    let resolvedEventName: AllowedMetaEventName = "PageView";
    if (bodyRecord.eventName !== undefined) {
      if (
        typeof bodyRecord.eventName !== "string" ||
        !ALLOWED_EVENT_NAMES.has(bodyRecord.eventName as AllowedMetaEventName)
      ) {
        return NextResponse.json(
          { ok: false, error: "INVALID_EVENT_NAME" },
          { status: 400 }
        );
      }
      resolvedEventName = bodyRecord.eventName as AllowedMetaEventName;
    }

    // 8. Validate event-specific controlled fields (zero PII, zero free text)
    let validatedChannel: string | undefined;
    let validatedVertical: string | undefined;
    let validatedFormId: string | undefined;

    if (resolvedEventName === "PageView") {
      if (
        bodyRecord.channel !== undefined ||
        bodyRecord.vertical !== undefined ||
        bodyRecord.formId !== undefined
      ) {
        return NextResponse.json(
          { ok: false, error: "INVALID_REQUEST" },
          { status: 400 }
        );
      }
    } else if (resolvedEventName === "Lead") {
      if (bodyRecord.channel !== undefined) {
        return NextResponse.json(
          { ok: false, error: "INVALID_REQUEST" },
          { status: 400 }
        );
      }
      if (bodyRecord.vertical !== undefined) {
        if (
          typeof bodyRecord.vertical !== "string" ||
          !ALLOWED_LEAD_VERTICALS.has(bodyRecord.vertical)
        ) {
          return NextResponse.json(
            { ok: false, error: "INVALID_REQUEST" },
            { status: 400 }
          );
        }
        validatedVertical = bodyRecord.vertical;
      }
      if (bodyRecord.formId !== undefined) {
        if (
          typeof bodyRecord.formId !== "string" ||
          !ALLOWED_LEAD_FORM_IDS.has(bodyRecord.formId)
        ) {
          return NextResponse.json(
            { ok: false, error: "INVALID_REQUEST" },
            { status: 400 }
          );
        }
        validatedFormId = bodyRecord.formId;
      }
    } else if (resolvedEventName === "Contact") {
      if (
        bodyRecord.vertical !== undefined ||
        bodyRecord.formId !== undefined
      ) {
        return NextResponse.json(
          { ok: false, error: "INVALID_REQUEST" },
          { status: 400 }
        );
      }
      if (
        typeof bodyRecord.channel !== "string" ||
        !ALLOWED_CONTACT_CHANNELS.has(bodyRecord.channel)
      ) {
        return NextResponse.json(
          { ok: false, error: "INVALID_CONTACT_CHANNEL" },
          { status: 400 }
        );
      }
      validatedChannel = bodyRecord.channel;
    }

    // 9. Validate LEVANTIR route allowlist (never accept external URLs)
    const validatedPath = normalizeAndValidatePath(bodyRecord.path);
    if (!validatedPath) {
      return NextResponse.json(
        { ok: false, error: "INVALID_PATH" },
        { status: 400 }
      );
    }

    // 10. Validate unique eventId
    const eventId =
      typeof bodyRecord.eventId === "string" ? bodyRecord.eventId.trim() : "";
    if (!EVENT_ID_REGEX.test(eventId)) {
      return NextResponse.json(
        { ok: false, error: "INVALID_EVENT_ID" },
        { status: 400 }
      );
    }

    // Build canonical event_source_url strictly on the server
    const canonicalBase =
      trustedOrigin === "https://www.levantir.com"
        ? siteConfig.url
        : trustedOrigin;
    const eventSourceUrl = `${canonicalBase}${validatedPath}`;

    // 11. Deduplication check (by event_id and by event-scoped IP+path burst)
    //     Scoped by eventName (and channel for Contact) so a nearby PageView
    //     never suppresses a legitimate Lead or Contact on the same route,
    //     and vice versa.
    pruneDeduplicationStores(now);
    const burstScope =
      resolvedEventName === "Contact"
        ? `Contact:${validatedChannel}`
        : resolvedEventName;
    const burstKey = `${rateLimitKey}:${burstScope}:${validatedPath}`;
    if (recentEventIds.has(eventId) || recentPathBursts.has(burstKey)) {
      return NextResponse.json(
        {
          ok: true,
          deduplicated: true,
          event_name: resolvedEventName,
          event_id: eventId,
          event_source_url: eventSourceUrl,
        },
        { status: 200 }
      );
    }

    // 12. Read server-only Meta CAPI credentials
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN?.trim();
    const pixelId = process.env.META_PIXEL_ID?.trim() || DEFAULT_PIXEL_ID;
    const testEventCode =
      process.env.VERCEL_ENV !== "production"
        ? process.env.META_CAPI_TEST_EVENT_CODE?.trim()
        : undefined;

    if (!accessToken) {
      return NextResponse.json(
        {
          ok: false,
          error: "MISSING_CAPI_TOKEN",
          event_id: eventId,
          event_source_url: eventSourceUrl,
        },
        { status: 503 }
      );
    }

    // 13. Build minimal technical user_data (zero PII)
    const cookies = parseCookieHeader(request.headers.get("cookie"));
    const userData: Record<string, string> = {
      client_user_agent: userAgent,
    };

    if (clientIp) {
      userData.client_ip_address = clientIp;
    }
    if (
      cookies._fbp &&
      cookies._fbp.length <= 128 &&
      FBP_REGEX.test(cookies._fbp)
    ) {
      userData.fbp = cookies._fbp;
    }
    if (
      cookies._fbc &&
      cookies._fbc.length <= 550 &&
      FBC_REGEX.test(cookies._fbc)
    ) {
      userData.fbc = cookies._fbc;
    }

    let customData: Record<string, string> | undefined;
    if (resolvedEventName === "Contact" && validatedChannel) {
      customData = {
        contact_channel: validatedChannel,
      };
    } else if (resolvedEventName === "Lead") {
      if (validatedVertical || validatedFormId) {
        customData = {
          ...(validatedVertical ? { content_category: validatedVertical } : {}),
          ...(validatedFormId ? { content_name: validatedFormId } : {}),
        };
      }
    }

    const capiPayload: Record<string, unknown> = {
      data: [
        {
          event_name: resolvedEventName,
          event_time: Math.floor(now / 1000),
          event_id: eventId,
          action_source: "website",
          event_source_url: eventSourceUrl,
          user_data: userData,
          ...(customData ? { custom_data: customData } : {}),
        },
      ],
      ...(testEventCode ? { test_event_code: testEventCode } : {}),
      access_token: accessToken,
    };

    const graphEndpoint = `https://graph.facebook.com/${GRAPH_API_VERSION}/${encodeURIComponent(
      pixelId
    )}/events`;

    const metaResponse = await fetch(graphEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(capiPayload),
    });

    if (!metaResponse.ok) {
      const errorJson = (await metaResponse.json().catch(() => null)) as {
        error?: {
          code?: unknown;
          error_subcode?: unknown;
          subcode?: unknown;
          type?: unknown;
          fbtrace_id?: unknown;
        };
      } | null;

      const metaError = errorJson?.error;
      const code =
        typeof metaError?.code === "number" || typeof metaError?.code === "string"
          ? metaError.code
          : null;
      const subcode =
        typeof metaError?.error_subcode === "number" ||
        typeof metaError?.error_subcode === "string"
          ? metaError.error_subcode
          : typeof metaError?.subcode === "number" ||
            typeof metaError?.subcode === "string"
          ? metaError.subcode
          : null;
      const type =
        typeof metaError?.type === "string" ? metaError.type : null;
      const fbtraceId =
        typeof metaError?.fbtrace_id === "string" ? metaError.fbtrace_id : null;

      console.error("[Meta CAPI] Upstream Graph API rejection:", {
        status: metaResponse.status,
        code,
        subcode,
        type,
        fbtrace_id: fbtraceId,
      });

      return NextResponse.json(
        { ok: false, error: "UPSTREAM_META_ERROR" },
        { status: 502 }
      );
    }

    const metaResult = (await metaResponse.json().catch(() => ({}))) as {
      events_received?: number;
    };

    // Record deduplication markers after confirmed acceptance
    recentEventIds.set(eventId, now);
    recentPathBursts.set(burstKey, now);

    return NextResponse.json(
      {
        ok: true,
        events_received: metaResult.events_received ?? 1,
        event_id: eventId,
        event_source_url: eventSourceUrl,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

