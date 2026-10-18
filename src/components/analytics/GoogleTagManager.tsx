"use client";

/**
 * GoogleTagManager
 *
 * Client-side integration for Google Tag Manager (GTM).
 *
 * Security and privacy rules:
 *   - Container ID is read EXCLUSIVELY from NEXT_PUBLIC_GTM_ID (no hardcoded fallback).
 *   - Only runs when NEXT_PUBLIC_GTM_ENABLED === "true".
 *     (Note: Changing NEXT_PUBLIC_GTM_ENABLED requires a rebuild and deployment in Next.js).
 *   - Only renders and loads when:
 *       hydrated === true AND marketingConsent === "granted" AND GTM_ID is valid.
 *   - When marketing consent is revoked mid-session (granted -> denied):
 *       - Dispatches "consent_revoked_marketing" event to window.dataLayer.
 *       - Dispatches "consent", "revoke" to window.fbq if Meta Pixel is present.
 */

import React, { useEffect, useRef } from "react";
import Script from "next/script";
import { type ConsentStatus } from "@/lib/analytics/consent";
import { useConsent } from "./ConsentProvider";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq?: (...args: any[]) => void;
  }
}

/**
 * Validates and extracts GTM container ID from environment.
 * Strict validation: must start with GTM- and contain valid alphanumeric characters.
 * No hardcoded default ID.
 */
function getValidGtmId(): string | null {
  if (process.env.NEXT_PUBLIC_GTM_ENABLED !== "true") {
    return null;
  }

  const id = process.env.NEXT_PUBLIC_GTM_ID;
  if (!id || !/^GTM-[A-Z0-9]+$/.test(id)) {
    return null;
  }

  return id;
}

export function GoogleTagManager() {
  const gtmId = getValidGtmId();
  const { marketingConsent, hydrated } = useConsent();
  const prevConsentRef = useRef<ConsentStatus>("unknown");

  useEffect(() => {
    if (!hydrated) return;

    const current = marketingConsent;
    const prev = prevConsentRef.current;
    if (current === prev) return;
    prevConsentRef.current = current;

    // Handle mid-session revocation (granted -> denied)
    if (current === "denied" && prev === "granted") {
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "consent_revoked_marketing",
          marketing_consent: "denied",
        });

        // Revoke Meta Pixel consent if present
        if (typeof window.fbq === "function") {
          window.fbq("consent", "revoke");
        }
      }
    }
  }, [marketingConsent, hydrated]);

  // Strict Basic Consent gate: do not inject script into DOM unless granted
  if (!hydrated || marketingConsent !== "granted" || !gtmId) {
    return null;
  }

  return (
    <Script
      id="google-tag-manager"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
      }}
    />
  );
}
