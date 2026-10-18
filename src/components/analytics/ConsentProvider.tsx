"use client";

/**
 * ConsentProvider
 *
 * Global client-side provider for analytics and marketing consent state (v2).
 * Supports granular preferences, cross-tab synchronization, and v1 migration.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  type ConsentPreferences,
  type ConsentStatus,
  CONSENT_STORAGE_KEY_V1,
  CONSENT_STORAGE_KEY_V2,
  readConsentFromStorage,
  writeConsentToStorage,
} from "@/lib/analytics/consent";

// ---------------------------------------------------------------------------
// Context shape
// ---------------------------------------------------------------------------

interface ConsentContextValue {
  /** Analytics consent status ("granted" | "denied" | "unknown"). Used by GA4 and Clarity. */
  consent: ConsentStatus;
  /** Explicit analytics consent status. */
  analyticsConsent: ConsentStatus;
  /** Explicit marketing consent status ("granted" | "denied" | "unknown"). Used by GTM / Meta Pixel. */
  marketingConsent: ConsentStatus;
  /** Full preferences object. */
  preferences: ConsentPreferences;
  /** True once client has hydrated and read localStorage. */
  hydrated: boolean;
  /** Whether the preferences modal is explicitly open. */
  preferencesOpen: boolean;
  /** Accept all categories (analytics + marketing). */
  acceptAll: () => void;
  /** Reject all optional categories (analytics + marketing). */
  rejectAll: () => void;
  /** Save granular preferences. */
  updatePreferences: (custom: { analytics: boolean; marketing: boolean }) => void;
  /** Legacy helpers for backward compatibility. */
  acceptAnalytics: () => void;
  rejectAnalytics: () => void;
  openPreferences: () => void;
  closePreferences: () => void;
  /** True when GA4 is initialized. */
  analyticsReady: boolean;
  setAnalyticsReady: (ready: boolean) => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within <ConsentProvider>.");
  }
  return ctx;
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface ConsentProviderProps {
  children: React.ReactNode;
}

export function ConsentProvider({ children }: ConsentProviderProps) {
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    analytics: "unknown",
    marketing: "unknown",
  });
  const [hydrated, setHydrated] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [analyticsReady, setAnalyticsReady] = useState(false);

  // Guard to prevent double-read in React Strict Mode
  const hydrationDoneRef = useRef(false);

  // Read localStorage exactly once after client mount
  useEffect(() => {
    if (hydrationDoneRef.current) return;
    hydrationDoneRef.current = true;

    const stored = readConsentFromStorage();
    setPreferences(stored);
    setHydrated(true);
  }, []);

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (
        event.key === CONSENT_STORAGE_KEY_V2 ||
        event.key === CONSENT_STORAGE_KEY_V1
      ) {
        const stored = readConsentFromStorage();
        setPreferences(stored);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const acceptAll = useCallback(() => {
    const newPrefs = { analytics: "granted" as const, marketing: "granted" as const };
    writeConsentToStorage(newPrefs);
    setPreferences(newPrefs);
    setPreferencesOpen(false);
  }, []);

  const rejectAll = useCallback(() => {
    const newPrefs = { analytics: "denied" as const, marketing: "denied" as const };
    writeConsentToStorage(newPrefs);
    setPreferences(newPrefs);
    setPreferencesOpen(false);
  }, []);

  const updatePreferences = useCallback(
    (custom: { analytics: boolean; marketing: boolean }) => {
      const newPrefs: ConsentPreferences = {
        analytics: custom.analytics ? "granted" : "denied",
        marketing: custom.marketing ? "granted" : "denied",
      };
      writeConsentToStorage(newPrefs);
      setPreferences(newPrefs);
      setPreferencesOpen(false);
    },
    []
  );

  const acceptAnalytics = useCallback(() => {
    setPreferences((prev) => {
      const newPrefs: ConsentPreferences = {
        analytics: "granted",
        marketing: prev.marketing,
      };
      writeConsentToStorage(newPrefs);
      return newPrefs;
    });
    setPreferencesOpen(false);
  }, []);

  const rejectAnalytics = useCallback(() => {
    setPreferences((prev) => {
      const newPrefs: ConsentPreferences = {
        analytics: "denied",
        marketing: prev.marketing,
      };
      writeConsentToStorage(newPrefs);
      return newPrefs;
    });
    setPreferencesOpen(false);
  }, []);

  const openPreferences = useCallback(() => {
    setPreferencesOpen(true);
  }, []);

  const closePreferences = useCallback(() => {
    setPreferencesOpen(false);
  }, []);

  return (
    <ConsentContext.Provider
      value={{
        consent: preferences.analytics,
        analyticsConsent: preferences.analytics,
        marketingConsent: preferences.marketing,
        preferences,
        hydrated,
        preferencesOpen,
        acceptAll,
        rejectAll,
        updatePreferences,
        acceptAnalytics,
        rejectAnalytics,
        openPreferences,
        closePreferences,
        analyticsReady,
        setAnalyticsReady,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}
