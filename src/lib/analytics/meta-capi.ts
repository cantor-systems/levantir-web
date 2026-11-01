/**
 * Meta Conversions API (CAPI) Client Conversion & Identifier Dispatcher
 *
 * Manages first-party Meta CAPI technical identifiers (`_fbp` and `_fbc`) and
 * dispatches first-party `Lead` and `Contact` conversion events to the
 * internal Route Handler (`/api/analytics/meta`) exclusively when marketing
 * consent is actively granted.
 *
 * Privacy & Reliability Guarantees:
 *   - Does NOT load or use `fbevents.js` or any browser Pixel script.
 *   - Strictly gated by runtime marketing consent (`isMarketingConsentGranted()`).
 *   - `_fbp` is generated only after explicit marketing consent using Web Crypto
 *     CSPRNG (`crypto.getRandomValues`) and reused across navigations (90-day Max-Age).
 *   - `_fbc` is generated only when a valid `fbclid` parameter is present in the
 *     current URL after marketing consent is granted; never invents click IDs and
 *     never overwrites an existing valid `_fbc` with an empty or invalid value.
 *   - Upon consent revocation, expires `_fbp`, `_fbc`, and `levantir_marketing_consent`
 *     created by this integration without touching cookies of other systems.
 *   - Never sends PII, form field values, phone numbers, email addresses, or free text.
 *   - Never dispatches `Lead` for simulated (Preview dry-run), failed, or bot submissions.
 *   - Only dispatches `Contact` for genuinely configured contact channels
 *     ("whatsapp" | "phone" | "email") upon explicit user interaction.
 *   - Uses non-blocking requests (`keepalive: true`) and swallows all errors so
 *     form submissions, phone calls, mailto links, and external navigation are
 *     never blocked or disrupted.
 */

import { isMarketingConsentGranted } from "./consent";
import { sanitizeSourcePath } from "./events";
import type { LeadVertical } from "@/lib/leads/config";
import type { LeadFormId } from "@/lib/leads/types";

export type MetaCapiEventName = "PageView" | "Lead" | "Contact";

export type MetaContactChannel = "whatsapp" | "phone" | "email";

export const ALLOWED_META_CONTACT_CHANNELS: ReadonlySet<MetaContactChannel> =
  new Set<MetaContactChannel>(["whatsapp", "phone", "email"]);

export const CONSENT_COOKIE_NAME = "levantir_marketing_consent";
export const FBP_COOKIE_NAME = "_fbp";
export const FBC_COOKIE_NAME = "_fbc";
export const META_COOKIE_MAX_AGE_SECONDS = 90 * 24 * 60 * 60; // 7,776,000s (90 days)

export const FBP_COOKIE_REGEX = /^fb\.\d+\.\d+\.\d+$/;
export const FBC_COOKIE_REGEX = /^fb\.\d+\.\d+\.[A-Za-z0-9_-]{8,500}$/;
export const FBCLID_VALUE_REGEX = /^[A-Za-z0-9_-]{8,500}$/;

const PLACEHOLDER_DIGITS_REGEX = /^0+$|^(\d)\1{5,}$|0{6,}$|^1234567/;
const EMAIL_ADDRESS_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PLACEHOLDER_EMAIL_REGEX = /@(example\.com|test\.com|placeholder\.com|domain\.com)$/i;

const CLIENT_DEDUP_WINDOW_MS = 1_500;
const recentClientDispatches = new Map<string, number>();
const ownedMetaCookies = new Set<typeof FBP_COOKIE_NAME | typeof FBC_COOKIE_NAME>();

export interface MetaCookieIdentifiers {
  fbp?: string;
  fbc?: string;
}

export function resetMetaCapiClientDedupForTests(): void {
  recentClientDispatches.clear();
  ownedMetaCookies.clear();
}

/**
 * Generates a cryptographically secure 10-digit random integer string
 * (`1000000000`–`9999999999`) for the `_fbp` identifier suffix.
 */
function generateSecureRandomFbpSuffix(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.getRandomValues === "function"
  ) {
    const buf = new Uint32Array(2);
    crypto.getRandomValues(buf);
    const high = buf[0] & 0x001fffff; // 21 bits
    const low = buf[1]; // 32 bits
    const combined = high * 0x100000000 + low; // 53-bit safe integer
    const num = 1_000_000_000 + (combined % 9_000_000_000);
    return String(num);
  }
  return String(Math.floor(1_000_000_000 + Math.random() * 9_000_000_000));
}

function readDocumentCookies(): Record<string, string> {
  const result: Record<string, string> = {};
  if (typeof document === "undefined" || typeof document.cookie !== "string") {
    return result;
  }
  for (const part of document.cookie.split(";")) {
    const eqIdx = part.indexOf("=");
    if (eqIdx <= 0) continue;
    const key = part.slice(0, eqIdx).trim();
    const val = part.slice(eqIdx + 1).trim();
    if (key) {
      result[key] = val;
    }
  }
  return result;
}

/**
 * Extracts and validates the `fbclid` query parameter from a URL search string.
 * Rejects missing, empty, duplicate, malformed, or out-of-bounds values.
 */
export function extractValidFbclidFromSearch(
  search: string | null | undefined
): string | null {
  if (!search || typeof search !== "string") {
    return null;
  }
  try {
    const normalized = search.startsWith("?") ? search : `?${search}`;
    const params = new URLSearchParams(normalized);
    const allValues = params.getAll("fbclid");
    if (allValues.length !== 1) {
      return null;
    }
    const candidate = allValues[0]?.trim() || "";
    if (!FBCLID_VALUE_REGEX.test(candidate)) {
      return null;
    }
    return candidate;
  } catch {
    return null;
  }
}

/**
 * Shared first-party cookie manager for Meta CAPI (`levantir_marketing_consent`,
 * `_fbp`, and `_fbc`).
 *
 * - Before marketing consent (`granted === false` or `!isMarketingConsentGranted()`):
 *   Never creates any identifier. If marketing consent was previously active in
 *   this integration and is now revoked, expires `levantir_marketing_consent`,
 *   `_fbp`, and `_fbc` without touching cookies belonging to other systems.
 * - After marketing consent (`granted === true` and `isMarketingConsentGranted()`):
 *   Synchronizes `levantir_marketing_consent=granted`, reuses an existing valid
 *   `_fbp` or creates a new one once, and creates/updates `_fbc` exclusively when
 *   a valid `fbclid` is present in the current URL (preserving any existing valid
 *   `_fbc` if the current URL has no valid `fbclid`).
 */
export function syncMetaMarketingCookies(
  granted: boolean = isMarketingConsentGranted()
): MetaCookieIdentifiers {
  if (typeof document === "undefined") {
    return {};
  }

  try {
    const activeConsent = Boolean(granted && isMarketingConsentGranted());
    const cookies = readDocumentCookies();

    if (!activeConsent) {
      const wasActiveInIntegration =
        ownedMetaCookies.size > 0 || cookies[CONSENT_COOKIE_NAME] === "granted";

      if (cookies[CONSENT_COOKIE_NAME] || wasActiveInIntegration) {
        document.cookie = `${CONSENT_COOKIE_NAME}=denied; Path=/; Max-Age=0; SameSite=Strict`;
      }

      if (
        (ownedMetaCookies.has(FBP_COOKIE_NAME) || wasActiveInIntegration) &&
        cookies[FBP_COOKIE_NAME]
      ) {
        document.cookie = `${FBP_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax; Secure`;
      }

      if (
        (ownedMetaCookies.has(FBC_COOKIE_NAME) || wasActiveInIntegration) &&
        cookies[FBC_COOKIE_NAME]
      ) {
        document.cookie = `${FBC_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax; Secure`;
      }

      ownedMetaCookies.clear();
      return {};
    }

    // Marketing consent is explicitly granted
    document.cookie = `${CONSENT_COOKIE_NAME}=granted; Path=/; SameSite=Strict`;

    const now = Date.now();
    const identifiers: MetaCookieIdentifiers = {};

    // 1. _fbp: reuse existing valid cookie or generate a new one once
    const existingFbp = cookies[FBP_COOKIE_NAME];
    if (
      existingFbp &&
      existingFbp.length <= 128 &&
      FBP_COOKIE_REGEX.test(existingFbp)
    ) {
      identifiers.fbp = existingFbp;
      ownedMetaCookies.add(FBP_COOKIE_NAME);
    } else {
      const fbpValue = `fb.1.${now}.${generateSecureRandomFbpSuffix()}`;
      document.cookie = `${FBP_COOKIE_NAME}=${fbpValue}; Path=/; Max-Age=${META_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax; Secure`;
      identifiers.fbp = fbpValue;
      ownedMetaCookies.add(FBP_COOKIE_NAME);
    }

    // 2. _fbc: create/update ONLY when a valid fbclid is present in current URL;
    //    otherwise preserve any existing valid _fbc without inventing one.
    const currentSearch =
      typeof window !== "undefined" && window.location
        ? window.location.search
        : "";
    const validFbclid = extractValidFbclidFromSearch(currentSearch);
    const existingFbc = cookies[FBC_COOKIE_NAME];
    const hasValidExistingFbc = Boolean(
      existingFbc &&
        existingFbc.length <= 550 &&
        FBC_COOKIE_REGEX.test(existingFbc)
    );

    if (validFbclid) {
      if (hasValidExistingFbc && existingFbc!.endsWith(`.${validFbclid}`)) {
        identifiers.fbc = existingFbc;
        ownedMetaCookies.add(FBC_COOKIE_NAME);
      } else {
        const fbcValue = `fb.1.${now}.${validFbclid}`;
        document.cookie = `${FBC_COOKIE_NAME}=${fbcValue}; Path=/; Max-Age=${META_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax; Secure`;
        identifiers.fbc = fbcValue;
        ownedMetaCookies.add(FBC_COOKIE_NAME);
      }
    } else if (hasValidExistingFbc) {
      identifiers.fbc = existingFbc;
      ownedMetaCookies.add(FBC_COOKIE_NAME);
    }

    return identifiers;
  } catch {
    return {};
  }
}

export function createMetaEventId(prefix: "pv" | "lead" | "contact"): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
}

/**
 * Inspects an anchor `href` and resolves the controlled `MetaContactChannel`
 * ("whatsapp" | "phone" | "email") ONLY when the destination is genuinely
 * configured (non-empty and non-placeholder).
 *
 * Never returns phone numbers, email addresses, or free text.
 */
export function resolveContactChannelFromHref(
  rawHref: string | null | undefined
): MetaContactChannel | null {
  if (!rawHref || typeof rawHref !== "string") {
    return null;
  }

  const trimmed = rawHref.trim();
  if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("/")) {
    return null;
  }

  const lower = trimmed.toLowerCase();

  // 1. Telephone link (tel:)
  if (lower.startsWith("tel:")) {
    const rawTarget = trimmed.slice(4).split("?")[0]?.trim() || "";
    const digits = rawTarget.replace(/[^0-9]/g, "");
    if (digits.length < 7 || PLACEHOLDER_DIGITS_REGEX.test(digits)) {
      return null;
    }
    return "phone";
  }

  // 2. Email link (mailto:)
  if (lower.startsWith("mailto:")) {
    const rawAddress = trimmed.slice(7).split("?")[0]?.trim() || "";
    if (
      !rawAddress ||
      !EMAIL_ADDRESS_REGEX.test(rawAddress) ||
      PLACEHOLDER_EMAIL_REGEX.test(rawAddress)
    ) {
      return null;
    }
    return "email";
  }

  // 3. WhatsApp link (https://wa.me/<digits> or https://api.whatsapp.com/send?phone=<digits>)
  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.toLowerCase();
    if (host === "wa.me" || host === "www.wa.me") {
      const pathDigits = parsed.pathname
        .replace(/^\/+/, "")
        .replace(/[^0-9]/g, "");
      if (pathDigits.length < 10 || PLACEHOLDER_DIGITS_REGEX.test(pathDigits)) {
        return null;
      }
      return "whatsapp";
    }
    if (host === "api.whatsapp.com" || host === "web.whatsapp.com") {
      const phoneParam = (parsed.searchParams.get("phone") || "").replace(
        /[^0-9]/g,
        ""
      );
      if (phoneParam.length < 10 || PLACEHOLDER_DIGITS_REGEX.test(phoneParam)) {
        return null;
      }
      return "whatsapp";
    }
  } catch {
    return null;
  }

  return null;
}

function resolveCurrentCleanPath(explicitPath?: string): string {
  if (explicitPath && typeof explicitPath === "string") {
    const clean = sanitizeSourcePath(explicitPath);
    return clean.length > 1 && clean.endsWith("/") ? clean.slice(0, -1) : clean;
  }
  if (typeof window !== "undefined" && window.location?.pathname) {
    const clean = sanitizeSourcePath(window.location.pathname);
    return clean.length > 1 && clean.endsWith("/") ? clean.slice(0, -1) : clean;
  }
  return "/";
}

function isDuplicateClientDispatch(dedupKey: string): boolean {
  const now = Date.now();
  for (const [key, ts] of recentClientDispatches.entries()) {
    if (now - ts > CLIENT_DEDUP_WINDOW_MS) {
      recentClientDispatches.delete(key);
    }
  }
  const previous = recentClientDispatches.get(dedupKey);
  if (previous !== undefined && now - previous < CLIENT_DEDUP_WINDOW_MS) {
    return true;
  }
  recentClientDispatches.set(dedupKey, now);
  return false;
}

export interface TrackMetaLeadOptions {
  path?: string;
  vertical?: LeadVertical;
  formId?: LeadFormId;
  simulated?: boolean;
  eventId?: string;
}

/**
 * Dispatches a `Lead` conversion event to `/api/analytics/meta`.
 * Must only be invoked after `/api/leads` confirms `ok: true` for a real
 * human submission. Never dispatches when `simulated === true` or when
 * marketing consent is not granted.
 */
export function trackMetaLead(options: TrackMetaLeadOptions = {}): boolean {
  try {
    if (typeof window === "undefined") {
      return false;
    }

    // Never fire Lead for simulated (Preview dry-run) submissions
    if (options.simulated === true) {
      return false;
    }

    // Strictly verify active marketing consent at runtime
    if (!isMarketingConsentGranted()) {
      syncMetaMarketingCookies(false);
      return false;
    }

    const path = resolveCurrentCleanPath(options.path);
    const dedupKey = `Lead:${options.formId || "default"}:${path}`;
    if (isDuplicateClientDispatch(dedupKey)) {
      return false;
    }

    syncMetaMarketingCookies(true);
    const eventId = options.eventId || createMetaEventId("lead");

    const payload: Record<string, string> = {
      eventName: "Lead",
      path,
      eventId,
      consent: "granted",
    };

    if (options.vertical) {
      payload.vertical = options.vertical;
    }
    if (options.formId) {
      payload.formId = options.formId;
    }

    void fetch("/api/analytics/meta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Levantir-Consent": "granted",
      },
      credentials: "same-origin",
      keepalive: true,
      body: JSON.stringify(payload),
    }).catch(() => {
      // Never disrupt form completion flow
    });

    return true;
  } catch {
    return false;
  }
}

export interface TrackMetaContactOptions {
  path?: string;
  href?: string;
  eventId?: string;
}

/**
 * Dispatches a `Contact` conversion event to `/api/analytics/meta` for an
 * explicit user click on a configured contact channel ("whatsapp" | "phone" | "email").
 * Uses `keepalive: true` so external navigation (`wa.me`, `tel:`, `mailto:`) is
 * never blocked and in-flight requests are not dropped on page handoff.
 */
export function trackMetaContact(
  channel: MetaContactChannel,
  optionsOrPath: TrackMetaContactOptions | string = {}
): boolean {
  try {
    if (typeof window === "undefined") {
      return false;
    }

    if (!ALLOWED_META_CONTACT_CHANNELS.has(channel)) {
      return false;
    }

    const options: TrackMetaContactOptions =
      typeof optionsOrPath === "string" ? { path: optionsOrPath } : optionsOrPath;

    // If an href is provided, verify it belongs to a genuinely configured channel
    if (options.href !== undefined) {
      const resolvedChannel = resolveContactChannelFromHref(options.href);
      if (resolvedChannel !== channel) {
        return false;
      }
    }

    // Strictly verify active marketing consent at runtime
    if (!isMarketingConsentGranted()) {
      syncMetaMarketingCookies(false);
      return false;
    }

    const path = resolveCurrentCleanPath(options.path);
    const dedupKey = `Contact:${channel}:${path}`;
    if (isDuplicateClientDispatch(dedupKey)) {
      return false;
    }

    syncMetaMarketingCookies(true);
    const eventId = options.eventId || createMetaEventId("contact");

    void fetch("/api/analytics/meta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Levantir-Consent": "granted",
      },
      credentials: "same-origin",
      keepalive: true,
      body: JSON.stringify({
        eventName: "Contact",
        channel,
        path,
        eventId,
        consent: "granted",
      }),
    }).catch(() => {
      // Never disrupt external link navigation
    });

    return true;
  } catch {
    return false;
  }
}

/**
 * Convenience helper for anchor `onClick` handlers: inspects `href` and
 * dispatches `Contact` only if `href` is a configured WhatsApp, phone, or email link.
 */
export function trackMetaContactFromHref(
  href: string | null | undefined,
  path?: string
): boolean {
  const channel = resolveContactChannelFromHref(href);
  if (!channel || !href) {
    return false;
  }
  return trackMetaContact(channel, { path, href });
}
