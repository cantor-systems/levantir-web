/**
 * Analytics and Marketing consent helper (v2).
 * Manages user privacy preferences in localStorage.
 * No React, no GA4, no GTM, no PII.
 */

export type ConsentStatus = "unknown" | "granted" | "denied";

/** Legacy alias for backward compatibility. */
export type AnalyticsConsent = ConsentStatus;

export interface ConsentPreferences {
  analytics: ConsentStatus;
  marketing: ConsentStatus;
}

/** Storage keys */
export const CONSENT_STORAGE_KEY_V1 = "levantir_analytics_consent_v1";
export const CONSENT_STORAGE_KEY_V2 = "levantir_consent_v2";

/** Legacy alias for backward compatibility. */
export const CONSENT_STORAGE_KEY = CONSENT_STORAGE_KEY_V1;

/**
 * Reads stored consent preferences from localStorage.
 * Handles migration from v1 to v2:
 *   - If v2 exists, uses its values.
 *   - If only v1 exists:
 *       - v1 === "granted" -> analytics: "granted", marketing: "unknown" (never auto-grants marketing!)
 *       - v1 === "denied"  -> analytics: "denied", marketing: "denied"
 *   - If neither exists -> analytics: "unknown", marketing: "unknown"
 * Never throws.
 */
export function readConsentFromStorage(): ConsentPreferences {
  try {
    if (typeof window === "undefined") {
      return { analytics: "unknown", marketing: "unknown" };
    }

    // 1. Try reading v2
    const rawV2 = window.localStorage.getItem(CONSENT_STORAGE_KEY_V2);
    if (rawV2) {
      try {
        const parsed = JSON.parse(rawV2);
        const analytics: ConsentStatus =
          parsed.analytics === "granted" || parsed.analytics === "denied"
            ? parsed.analytics
            : "unknown";
        const marketing: ConsentStatus =
          parsed.marketing === "granted" || parsed.marketing === "denied"
            ? parsed.marketing
            : "unknown";
        return { analytics, marketing };
      } catch {
        // malformed v2 JSON, fallback to v1 migration
      }
    }

    // 2. Migration from v1
    const rawV1 = window.localStorage.getItem(CONSENT_STORAGE_KEY_V1);
    if (rawV1 === "granted") {
      return { analytics: "granted", marketing: "unknown" };
    }
    if (rawV1 === "denied") {
      return { analytics: "denied", marketing: "denied" };
    }

    return { analytics: "unknown", marketing: "unknown" };
  } catch {
    return { analytics: "unknown", marketing: "unknown" };
  }
}

/**
 * Persists consent preferences to localStorage (v2 and v1 backward compatibility).
 * Never throws.
 */
export function writeConsentToStorage(
  value: ConsentStatus | ConsentPreferences
): void {
  try {
    if (typeof window === "undefined") return;

    if (typeof value === "string") {
      if (value === "unknown") return;
      const current = readConsentFromStorage();
      const prefs: ConsentPreferences = {
        analytics: value,
        marketing: current.marketing, // NEVER grant or alter marketing from an analytics-only call
      };
      window.localStorage.setItem(CONSENT_STORAGE_KEY_V2, JSON.stringify(prefs));
      window.localStorage.setItem(CONSENT_STORAGE_KEY_V1, value);
    } else {
      window.localStorage.setItem(CONSENT_STORAGE_KEY_V2, JSON.stringify(value));
      window.localStorage.setItem(CONSENT_STORAGE_KEY_V1, value.analytics);
    }
  } catch {
    // localStorage may be blocked — silently ignore
  }
}

/**
 * Checks in runtime whether marketing consent is currently granted.
 * Safe to call at any moment in client execution.
 */
export function isMarketingConsentGranted(): boolean {
  return readConsentFromStorage().marketing === "granted";
}

/**
 * Checks in runtime whether analytics consent is currently granted.
 */
export function isAnalyticsConsentGranted(): boolean {
  return readConsentFromStorage().analytics === "granted";
}
