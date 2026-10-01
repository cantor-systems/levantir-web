/**
 * Analytics consent helper.
 * Manages the user's analytics consent preference in localStorage.
 * No React, no GA4, no gtag, no PII.
 */

// The three possible states. "unknown" means no decision has been stored yet
// (or we haven't hydrated yet on the client).
export type AnalyticsConsent = "unknown" | "granted" | "denied";

/** Versioned storage key. Bump the version if the schema changes. */
export const CONSENT_STORAGE_KEY = "levantir_analytics_consent_v1";

/** Values that are valid to persist in localStorage. */
const VALID_PERSISTED_VALUES = new Set<AnalyticsConsent>(["granted", "denied"]);

/**
 * Reads the stored consent value from localStorage.
 * Returns "unknown" if localStorage is unavailable, the key is missing,
 * or the stored value is not a recognised consent string.
 * Never throws.
 */
export function readConsentFromStorage(): AnalyticsConsent {
  try {
    if (typeof window === "undefined") return "unknown";
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (raw === "granted" || raw === "denied") return raw;
    return "unknown";
  } catch {
    // localStorage may be blocked (private browsing, permissions policy, etc.)
    return "unknown";
  }
}

/**
 * Persists the consent value to localStorage.
 * Only "granted" and "denied" are valid to persist; "unknown" is never stored.
 * Never throws.
 */
export function writeConsentToStorage(value: AnalyticsConsent): void {
  try {
    if (typeof window === "undefined") return;
    if (!VALID_PERSISTED_VALUES.has(value)) return;
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // localStorage may be blocked — silently ignore.
  }
}
