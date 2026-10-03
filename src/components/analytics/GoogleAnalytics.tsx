"use client";

/**
 * GoogleAnalytics
 *
 * Loads and initializes Google Analytics 4 ONLY when:
 *   hydrated === true AND consent === "granted"
 *
 * Uses Basic Consent — no Consent Mode advanced, no cookieless pings.
 * No PII, no API secrets, no Measurement Protocol.
 *
 * Measurement ID is read from NEXT_PUBLIC_GA_MEASUREMENT_ID.
 * If the variable is absent, empty, or does not start with "G-",
 * GA4 is silently skipped.
 *
 * Type strategy:
 *   - window.gtag is already typed in types.ts for the "event" command only.
 *   - GA4 initialisation calls the shim via a local cast to avoid conflicting
 *     with that existing signature.
 *   - window.dataLayer is declared in this module's global augmentation.
 */

import React, { useEffect, useRef } from "react";
import Script from "next/script";
import { useConsent } from "./ConsentProvider";

// ---------------------------------------------------------------------------
// Global type augmentation — dataLayer only; gtag already declared in types.ts
// ---------------------------------------------------------------------------

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
  }
}

// ---------------------------------------------------------------------------
// Measurement ID — evaluated once at module load
// ---------------------------------------------------------------------------

function getValidMeasurementId(): string | null {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!id || !id.startsWith("G-")) return null;
  return id;
}

const MEASUREMENT_ID = getValidMeasurementId();

// ---------------------------------------------------------------------------
// GA4 helpers — never called until consent is granted
// ---------------------------------------------------------------------------

/**
 * Ensures window.gtag shim exists and fires the standard GA4 config sequence.
 * We use a local cast for the "js"/"config" calls because the existing global
 * type in types.ts only covers the "event" command used by trackLeadEvent.
 */
function initGa(measurementId: string): void {
  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag !== "function") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  }

  // Call via cast — these command variants are intentionally not in the
  // narrower window.gtag type used by trackLeadEvent.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const g = (window as any).gtag as (...a: any[]) => void;
  g("js", new Date());
  g("config", measurementId);
}

/** Blocks new GA4 hits for the given measurement ID (granted → denied). */
function disableGa(measurementId: string): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any)[`ga-disable-${measurementId}`] = true;
}

/** Unblocks GA4 hits for the given measurement ID (denied → granted). */
function enableGa(measurementId: string): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any)[`ga-disable-${measurementId}`] = false;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function GoogleAnalytics() {
  const { consent, hydrated, setAnalyticsReady } = useConsent();

  // Guards — using refs avoids setState-in-effect issues.
  const initializedRef = useRef(false);
  const prevConsentRef = useRef<string>("unknown");

  useEffect(() => {
    if (!hydrated || !MEASUREMENT_ID) return;

    const prev = prevConsentRef.current;
    const current = consent;
    prevConsentRef.current = current;

    if (current === "granted") {
      // Re-enable hits in case a previous deny disabled them.
      enableGa(MEASUREMENT_ID);

      // Initialise gtag exactly once per session.
      if (!initializedRef.current) {
        initializedRef.current = true;
        initGa(MEASUREMENT_ID);
      }
      
      setAnalyticsReady(true);
    } else if (current === "denied") {
      if (prev === "granted") {
        // granted → denied mid-session: block future hits immediately.
        disableGa(MEASUREMENT_ID);
      }
      setAnalyticsReady(false);
    }
    // consent === "unknown": no action.
  }, [hydrated, consent, setAnalyticsReady]);

  // Derive rendering purely from context state — no additional React state.
  // The <Script> tag is rendered whenever consent is "granted" and hydrated.
  // Next.js Script deduplicates scripts by src, so double-insertion is safe,
  // but we prevent it anyway by only rendering when conditions are met.
  // If the user revokes consent, the script is no longer rendered on future
  // navigations; the ga-disable flag handles the current session.
  if (!hydrated || consent !== "granted" || !MEASUREMENT_ID) {
    return null;
  }

  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
      strategy="afterInteractive"
    />
  );
}
