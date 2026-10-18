import type { LeadAnalyticsEventMap } from "./types";
import { isMarketingConsentGranted } from "./consent";

/**
 * Normalizes a pathname to accept only local pathnames,
 * dropping query parameters and hashes.
 */
export function sanitizeSourcePath(rawPath: string): string {
  if (!rawPath || !rawPath.startsWith("/") || rawPath.startsWith("//")) {
    return "/";
  }

  // Eliminar query string desde el primer "?"
  let clean = rawPath.split("?")[0];

  // Eliminar hash desde el primer "#"
  clean = clean.split("#")[0];

  // Si después de limpiar el resultado está vacío
  if (!clean || !clean.startsWith("/")) {
    return "/";
  }

  return clean;
}

/**
 * Namespaced marketing event names for Google Tag Manager (dataLayer).
 * Uses the exclusive `mkt_` prefix to guarantee complete isolation and prevent
 * collisions with standard/internal GA4 events or automated tags.
 *
 * Mapping:
 *   - lead_form_view       -> mkt_lead_form_view
 *   - lead_form_start      -> mkt_lead_form_start
 *   - lead_submit          -> mkt_lead_submit
 *   - lead_submit_success  -> mkt_lead_submit_success
 *   - lead_submit_error    -> mkt_lead_submit_error
 *   - lead_product_interest-> mkt_lead_product_interest
 */
export const GTM_MARKETING_EVENT_MAP: Record<keyof LeadAnalyticsEventMap, string> = {
  lead_form_view: "mkt_lead_form_view",
  lead_form_start: "mkt_lead_form_start",
  lead_submit: "mkt_lead_submit",
  lead_submit_success: "mkt_lead_submit_success",
  lead_submit_error: "mkt_lead_submit_error",
  lead_product_interest: "mkt_lead_product_interest",
};

/**
 * Dispatcher for lead analytics and marketing events.
 * Safe to call in SSR (no-op).
 *
 * Separation & Privacy:
 *   1. GA4: Dispatched directly via window.gtag("event", eventName, safeParams)
 *      Preserves existing GA4 event names without modification.
 *   2. GTM / Marketing: Dispatched to window.dataLayer.push({ event: gtmEvent, ... })
 *      Uses distinct namespaced event names (mkt_*) to avoid collision with GA4.
 *      STRICTLY gated by runtime check of marketing consent (isMarketingConsentGranted).
 *      If marketing consent is unknown, denied or was revoked, dataLayer push is omitted.
 *   3. Constructs exactly the allowed safe payload to guarantee zero PII leakage.
 */
export function trackLeadEvent<E extends keyof LeadAnalyticsEventMap>(
  eventName: E,
  params: LeadAnalyticsEventMap[E]
): void {
  if (typeof window === "undefined") {
    return;
  }

  // Build the safe base payload explicitly. No uncontrolled spread. No PII.
  const safeParams: Record<string, unknown> = {
    vertical: params.vertical,
    form_id: params.form_id,
    source_path: sanitizeSourcePath(params.source_path),
  };

  if (params.topic !== undefined) {
    safeParams.topic = params.topic;
  }

  // Add specific params depending on the event type
  if ("product" in params) {
    safeParams.product = params.product;
  }

  if ("error_type" in params) {
    safeParams.error_type = params.error_type;
  }

  // 1. Dispatch directly to GA4 if gtag is available (unaltered functional behavior)
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, safeParams);
  }

  // 2. Dispatch to GTM dataLayer ONLY if marketing consent is actively granted at runtime
  // Uses exclusive namespaced events (mkt_*) to isolate GTM marketing tags from GA4 events.
  if (isMarketingConsentGranted()) {
    const gtmEvent = GTM_MARKETING_EVENT_MAP[eventName] || `mkt_${eventName}`;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: gtmEvent,
      marketing_consent: "granted",
      ...safeParams,
    });
  }
}
