"use client";

/**
 * ConsentProvider
 *
 * Global client-side provider for analytics consent state.
 * Manages the AnalyticsConsent lifecycle without loading GA4.
 *
 * Hydration strategy:
 *   - On the server (and before client mount), state is "unknown".
 *   - After mount, localStorage is read exactly once.
 *   - If a stored value exists ("granted" or "denied"), it is applied.
 *   - If no stored value, state stays "unknown" → banner is shown.
 *   - The `hydrated` flag gates banner rendering to avoid SSR mismatch.
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
  type AnalyticsConsent,
  readConsentFromStorage,
  writeConsentToStorage,
} from "@/lib/analytics/consent";

// ---------------------------------------------------------------------------
// Context shape
// ---------------------------------------------------------------------------

interface ConsentContextValue {
  /** Current consent state. "unknown" until hydrated. */
  consent: AnalyticsConsent;
  /** True once the client has read localStorage and resolved the initial state. */
  hydrated: boolean;
  /** Whether the banner is explicitly open (e.g. user clicked "Preferencias"). */
  preferencesOpen: boolean;
  acceptAnalytics: () => void;
  rejectAnalytics: () => void;
  openPreferences: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

// ---------------------------------------------------------------------------
// Hook for consumers
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
  const [consent, setConsent] = useState<AnalyticsConsent>("unknown");
  const [hydrated, setHydrated] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  // Guard to prevent double-read in React Strict Mode
  const hydrationDoneRef = useRef(false);

  // Read localStorage exactly once after mount
  useEffect(() => {
    if (hydrationDoneRef.current) return;
    hydrationDoneRef.current = true;

    const stored = readConsentFromStorage();
    setConsent(stored);
    setHydrated(true);
  }, []);

  const acceptAnalytics = useCallback(() => {
    writeConsentToStorage("granted");
    setConsent("granted");
    setPreferencesOpen(false);
  }, []);

  const rejectAnalytics = useCallback(() => {
    writeConsentToStorage("denied");
    setConsent("denied");
    setPreferencesOpen(false);
  }, []);

  const openPreferences = useCallback(() => {
    setPreferencesOpen(true);
  }, []);

  return (
    <ConsentContext.Provider
      value={{
        consent,
        hydrated,
        preferencesOpen,
        acceptAnalytics,
        rejectAnalytics,
        openPreferences,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}
