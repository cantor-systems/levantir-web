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
export const CANONICAL_PRODUCTION_COOKIE_DOMAIN = "levantir.com";
export const META_COOKIE_MAX_AGE_SECONDS = 90 * 24 * 60 * 60; // 7,776,000s (90 days)
export const MAX_FBP_COOKIE_LENGTH = 128;
export const MAX_FBC_COOKIE_LENGTH = 550;

export const FBP_COOKIE_REGEX = /^fb\.\d+\.\d+\.\d+$/;
export const FBC_COOKIE_REGEX = /^fb\.\d+\.\d+\.[A-Za-z0-9_-]{8,500}$/;
export const FBCLID_VALUE_REGEX = /^[A-Za-z0-9_-]{8,500}$/;

const PLACEHOLDER_DIGITS_REGEX = /^0+$|^(\d)\1{5,}$|0{6,}$|^1234567/;
const EMAIL_ADDRESS_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PLACEHOLDER_EMAIL_REGEX = /@(example\.com|test\.com|placeholder\.com|domain\.com)$/i;

const CLIENT_DEDUP_WINDOW_MS = 1_500;
const recentClientDispatches = new Map<string, number>();
const ownedMetaCookies = new Set<typeof FBP_COOKIE_NAME | typeof FBC_COOKIE_NAME>();
const normalizedMetaCookiesInSession = new Set<
  typeof FBP_COOKIE_NAME | typeof FBC_COOKIE_NAME
>();

export interface MetaCookieIdentifiers {
  fbp?: string;
  fbc?: string;
}

export function resetMetaCapiClientDedupForTests(): void {
  recentClientDispatches.clear();
  ownedMetaCookies.clear();
  normalizedMetaCookiesInSession.clear();
}

/**
 * Resolves the canonical cookie `Domain` attribute for a given hostname.
 *
 * - On `levantir.com` and any subdomain `*.levantir.com` (e.g. `www.levantir.com`),
 *   returns `"levantir.com"` so `_fbp` and `_fbc` share a single canonical domain scope.
 * - On Vercel Preview (`*.vercel.app`), `localhost`, `127.0.0.1`, or unknown hosts,
 *   returns `null` so cookies remain strictly host-only without a `Domain` attribute.
 */
export function resolveCanonicalCookieDomain(
  explicitHostname?: string | null
): string | null {
  const rawHost =
    explicitHostname !== undefined && explicitHostname !== null
      ? explicitHostname
      : typeof window !== "undefined" && window.location?.hostname
      ? window.location.hostname
      : "";

  const host = rawHost.trim().toLowerCase().replace(/\.$/, "");
  if (!host) {
    return null;
  }

  if (
    host === CANONICAL_PRODUCTION_COOKIE_DOMAIN ||
    host.endsWith(`.${CANONICAL_PRODUCTION_COOKIE_DOMAIN}`)
  ) {
    return CANONICAL_PRODUCTION_COOKIE_DOMAIN;
  }

  return null;
}

/**
 * Extracts the millisecond creation timestamp (`parts[2]`) from a validated
 * Meta cookie (`fb.<version>.<creationTimeMs>.<suffix>`).
 */
function extractMetaCookieCreationTime(validCookieValue: string): number {
  const parts = validCookieValue.split(".");
  const rawTs = parts[2] ? Number(parts[2]) : NaN;
  if (Number.isSafeInteger(rawTs) && rawTs > 0) {
    return rawTs;
  }
  return Number.MAX_SAFE_INTEGER;
}

/**
 * Deterministic, order-independent selector for `_fbp` and `_fbc` cookie values.
 *
 * Policy:
 *   1. Filters out empty, overlong, or regex-invalid values so an invalid duplicate
 *      cookie never overwrites a valid one.
 *   2. Deduplicates identical valid strings.
 *   3. When multiple distinct valid values exist (e.g. host-only `levantir.com` and
 *      domain-scoped `.levantir.com`), selects the identifier with the earliest valid
 *      creation timestamp (`fb.1.<timestamp>.*`) to preserve original attribution,
 *      breaking ties by deterministic ASCII code-point order.
 *   4. Never relies on `document.cookie` or HTTP `Cookie` header serialization order.
 */
export function selectCanonicalMetaCookieValue(
  candidates: readonly string[] | undefined,
  regex: RegExp,
  maxLength: number
): string | null {
  if (!candidates || candidates.length === 0) {
    return null;
  }

  const uniqueValid: string[] = [];
  const seen = new Set<string>();

  for (const raw of candidates) {
    if (typeof raw !== "string") continue;
    const trimmed = raw.trim();
    if (
      trimmed.length === 0 ||
      trimmed.length > maxLength ||
      !regex.test(trimmed)
    ) {
      continue;
    }
    if (!seen.has(trimmed)) {
      seen.add(trimmed);
      uniqueValid.push(trimmed);
    }
  }

  if (uniqueValid.length === 0) {
    return null;
  }
  if (uniqueValid.length === 1) {
    return uniqueValid[0]!;
  }

  uniqueValid.sort((a, b) => {
    const tsA = extractMetaCookieCreationTime(a);
    const tsB = extractMetaCookieCreationTime(b);
    if (tsA !== tsB) {
      return tsA - tsB;
    }
    return a < b ? -1 : a > b ? 1 : 0;
  });

  return uniqueValid[0]!;
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

/**
 * Reads all cookies from `document.cookie`, preserving multiple values for the
 * same cookie name when both host-only and domain-scoped variants coexist.
 */
function readAllDocumentCookies(): Map<string, string[]> {
  const result = new Map<string, string[]>();
  if (typeof document === "undefined" || typeof document.cookie !== "string") {
    return result;
  }
  for (const part of document.cookie.split(";")) {
    const eqIdx = part.indexOf("=");
    if (eqIdx <= 0) continue;
    const key = part.slice(0, eqIdx).trim();
    const val = part.slice(eqIdx + 1).trim();
    if (!key) continue;
    const existing = result.get(key);
    if (existing) {
      existing.push(val);
    } else {
      result.set(key, [val]);
    }
  }
  return result;
}

function formatMetaCookieString(
  name: string,
  value: string,
  canonicalDomain: string | null,
  maxAgeSeconds: number
): string {
  const domainSegment = canonicalDomain ? `; Domain=${canonicalDomain}` : "";
  return `${name}=${value}${domainSegment}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax; Secure`;
}

function expireMetaCookieAllScopes(
  name: string,
  canonicalDomain: string | null
): void {
  // Always expire the host-only variant first
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax; Secure`;
  if (canonicalDomain) {
    document.cookie = `${name}=; Domain=${canonicalDomain}; Path=/; Max-Age=0; SameSite=Lax; Secure`;
    document.cookie = `${name}=; Domain=.${canonicalDomain}; Path=/; Max-Age=0; SameSite=Lax; Secure`;
  }
}

function writeNormalizedMetaCookie(
  name: typeof FBP_COOKIE_NAME | typeof FBC_COOKIE_NAME,
  value: string,
  canonicalDomain: string | null,
  hadExistingCookies: boolean
): void {
  if (canonicalDomain && hadExistingCookies) {
    // Expire any host-only variant before writing the domain-scoped cookie
    // so normalization collapses duplicates into a single cookie.
    document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax; Secure`;
  }
  document.cookie = formatMetaCookieString(
    name,
    value,
    canonicalDomain,
    META_COOKIE_MAX_AGE_SECONDS
  );
  ownedMetaCookies.add(name);
  normalizedMetaCookiesInSession.add(name);
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
    const allCookies = readAllDocumentCookies();
    const canonicalDomain = resolveCanonicalCookieDomain();
    const consentValues = allCookies.get(CONSENT_COOKIE_NAME) ?? [];
    const fbpCandidates = allCookies.get(FBP_COOKIE_NAME) ?? [];
    const fbcCandidates = allCookies.get(FBC_COOKIE_NAME) ?? [];

    if (!activeConsent) {
      const wasActiveInIntegration =
        ownedMetaCookies.size > 0 || consentValues.includes("granted");

      if (consentValues.length > 0 || wasActiveInIntegration) {
        document.cookie = `${CONSENT_COOKIE_NAME}=denied; Path=/; Max-Age=0; SameSite=Strict`;
        if (canonicalDomain) {
          document.cookie = `${CONSENT_COOKIE_NAME}=denied; Domain=${canonicalDomain}; Path=/; Max-Age=0; SameSite=Strict`;
          document.cookie = `${CONSENT_COOKIE_NAME}=denied; Domain=.${canonicalDomain}; Path=/; Max-Age=0; SameSite=Strict`;
        }
      }

      if (ownedMetaCookies.has(FBP_COOKIE_NAME) || fbpCandidates.length > 0) {
        expireMetaCookieAllScopes(FBP_COOKIE_NAME, canonicalDomain);
      }

      if (ownedMetaCookies.has(FBC_COOKIE_NAME) || fbcCandidates.length > 0) {
        expireMetaCookieAllScopes(FBC_COOKIE_NAME, canonicalDomain);
      }

      ownedMetaCookies.clear();
      normalizedMetaCookiesInSession.clear();
      return {};
    }

    // Marketing consent is explicitly granted
    document.cookie = `${CONSENT_COOKIE_NAME}=granted; Path=/; SameSite=Strict`;

    const now = Date.now();
    const identifiers: MetaCookieIdentifiers = {};

    // 1. _fbp: deterministically select existing valid cookie (even if duplicates exist),
    //    or generate a new one once; normalize to canonical domain scope on levantir.com.
    const selectedFbp = selectCanonicalMetaCookieValue(
      fbpCandidates,
      FBP_COOKIE_REGEX,
      MAX_FBP_COOKIE_LENGTH
    );

    if (selectedFbp) {
      const needsFbpNormalization =
        fbpCandidates.length > 1 ||
        (canonicalDomain !== null &&
          !normalizedMetaCookiesInSession.has(FBP_COOKIE_NAME));

      if (needsFbpNormalization) {
        writeNormalizedMetaCookie(
          FBP_COOKIE_NAME,
          selectedFbp,
          canonicalDomain,
          fbpCandidates.length > 0
        );
      } else {
        ownedMetaCookies.add(FBP_COOKIE_NAME);
        normalizedMetaCookiesInSession.add(FBP_COOKIE_NAME);
      }
      identifiers.fbp = selectedFbp;
    } else {
      const fbpValue = `fb.1.${now}.${generateSecureRandomFbpSuffix()}`;
      writeNormalizedMetaCookie(
        FBP_COOKIE_NAME,
        fbpValue,
        canonicalDomain,
        fbpCandidates.length > 0
      );
      identifiers.fbp = fbpValue;
    }

    // 2. _fbc: create/update ONLY when a valid fbclid is present in current URL;
    //    otherwise preserve and normalize any existing valid _fbc without inventing one.
    const currentSearch =
      typeof window !== "undefined" && window.location
        ? window.location.search
        : "";
    const validFbclid = extractValidFbclidFromSearch(currentSearch);
    const selectedFbc = selectCanonicalMetaCookieValue(
      fbcCandidates,
      FBC_COOKIE_REGEX,
      MAX_FBC_COOKIE_LENGTH
    );

    if (validFbclid) {
      if (selectedFbc && selectedFbc.endsWith(`.${validFbclid}`)) {
        const needsFbcNormalization =
          fbcCandidates.length > 1 ||
          (canonicalDomain !== null &&
            !normalizedMetaCookiesInSession.has(FBC_COOKIE_NAME));

        if (needsFbcNormalization) {
          writeNormalizedMetaCookie(
            FBC_COOKIE_NAME,
            selectedFbc,
            canonicalDomain,
            fbcCandidates.length > 0
          );
        } else {
          ownedMetaCookies.add(FBC_COOKIE_NAME);
          normalizedMetaCookiesInSession.add(FBC_COOKIE_NAME);
        }
        identifiers.fbc = selectedFbc;
      } else {
        const fbcValue = `fb.1.${now}.${validFbclid}`;
        writeNormalizedMetaCookie(
          FBC_COOKIE_NAME,
          fbcValue,
          canonicalDomain,
          fbcCandidates.length > 0
        );
        identifiers.fbc = fbcValue;
      }
    } else if (selectedFbc) {
      const needsFbcNormalization =
        fbcCandidates.length > 1 ||
        (canonicalDomain !== null &&
          !normalizedMetaCookiesInSession.has(FBC_COOKIE_NAME));

      if (needsFbcNormalization) {
        writeNormalizedMetaCookie(
          FBC_COOKIE_NAME,
          selectedFbc,
          canonicalDomain,
          fbcCandidates.length > 0
        );
      } else {
        ownedMetaCookies.add(FBC_COOKIE_NAME);
        normalizedMetaCookiesInSession.add(FBC_COOKIE_NAME);
      }
      identifiers.fbc = selectedFbc;
    } else if (fbcCandidates.length > 0) {
      // Only invalid/malformed _fbc values exist and no valid fbclid is present:
      // expire invalid cookies without inventing a replacement.
      expireMetaCookieAllScopes(FBC_COOKIE_NAME, canonicalDomain);
    }

    // 3. Explicitly verify the post-normalization cookie state in the browser
    const verifiedCookies = readAllDocumentCookies();
    const verifiedFbp = selectCanonicalMetaCookieValue(
      verifiedCookies.get(FBP_COOKIE_NAME),
      FBP_COOKIE_REGEX,
      MAX_FBP_COOKIE_LENGTH
    );
    if (verifiedFbp) {
      identifiers.fbp = verifiedFbp;
    }
    const verifiedFbc = selectCanonicalMetaCookieValue(
      verifiedCookies.get(FBC_COOKIE_NAME),
      FBC_COOKIE_REGEX,
      MAX_FBC_COOKIE_LENGTH
    );
    if (verifiedFbc) {
      identifiers.fbc = verifiedFbc;
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
