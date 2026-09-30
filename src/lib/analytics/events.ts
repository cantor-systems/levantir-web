import type { LeadAnalyticsEventMap } from "./types";

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
 * Dispatcher for lead analytics events.
 * Safe to call in SSR (no-op).
 * If window.gtag exists, it dispatches the event.
 * Constructs exactly the payload allowed by the event map to prevent PII leakage.
 */
export function trackLeadEvent<E extends keyof LeadAnalyticsEventMap>(
  eventName: E,
  params: LeadAnalyticsEventMap[E]
): void {
  if (typeof window === "undefined") {
    return;
  }

  // Build the safe base payload explicitly. No uncontrolled spread.
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

  // Dispatch if gtag is available
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, safeParams);
  }
}
