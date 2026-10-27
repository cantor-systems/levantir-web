"use client";

/**
 * MetaPixel
 *
 * Direct client-side integration for Meta Pixel (Facebook Pixel).
 * Replaces the dependency on GTM for Meta Pixel tracking.
 *
 * Privacy & Security rules:
 *   - Only loads and executes when:
 *       hydrated === true AND marketingConsent === "granted"
 *   - Automatic history tracking (pushState / replaceState) is disabled:
 *       fbq.disablePushState = true
 *     This avoids duplicate PageView events on Next.js App Router client transitions.
 *   - Route changes are tracked explicitly via usePathname(), ensuring
 *     exactly one PageView per unique route.
 *   - PageView emission is deduplicated through lastTrackedPathRef so that
 *     the inline script and route change effect never fire simultaneously.
 *   - Initialized exactly once per page session (fbq.init is guarded by if(f.fbq)return).
 *   - No PII (names, emails, phones, form inputs) or sensitive parameters
 *     are passed to fbq('init') or fbq('track').
 *   - Mid-session revocation (granted -> denied):
 *       Calls fbq('consent', 'revoke') and prevents any further event tracking.
 *   - Independent from GA4 and Microsoft Clarity.
 */

import React, { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { type ConsentStatus } from "@/lib/analytics/consent";
import { useConsent } from "./ConsentProvider";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq?: (...args: any[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _fbq?: any;
  }
}

const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || "1783451359594330";

export function MetaPixel() {
  const { marketingConsent, hydrated } = useConsent();
  const pathname = usePathname();

  // Track the last path where PageView was sent to prevent duplicate events
  const lastTrackedPathRef = useRef<string | null>(null);
  const prevConsentRef = useRef<ConsentStatus>("unknown");

  useEffect(() => {
    if (!hydrated) return;

    const currentConsent = marketingConsent;
    const prevConsent = prevConsentRef.current;
    prevConsentRef.current = currentConsent;

    // 1. Handle mid-session revocation (granted -> denied)
    if (prevConsent === "granted" && currentConsent === "denied") {
      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("consent", "revoke");
      }
      lastTrackedPathRef.current = null;
      return;
    }

    // 2. Handle re-grant if previously revoked in same session (denied -> granted)
    if (prevConsent === "denied" && currentConsent === "granted") {
      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("consent", "grant");
      }
    }

    // 3. Track PageView when marketing consent is granted and path has changed
    if (currentConsent === "granted" && pathname) {
      if (lastTrackedPathRef.current !== pathname) {
        if (typeof window !== "undefined" && typeof window.fbq === "function") {
          lastTrackedPathRef.current = pathname;
          window.fbq("track", "PageView");
        }
      }
    }
  }, [marketingConsent, hydrated, pathname]);

  // Strict Basic Consent gate: do not inject script into DOM unless granted
  if (!hydrated || marketingConsent !== "granted" || !META_PIXEL_ID) {
    return null;
  }

  return (
    <Script
      id="meta-pixel-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];n.disablePushState=true;
t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s);
n('init', '${META_PIXEL_ID}');
})(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');`,
      }}
      onLoad={() => {
        // Ensure initial PageView fires if useEffect ran before script was ready
        if (
          pathname &&
          lastTrackedPathRef.current !== pathname &&
          typeof window !== "undefined" &&
          typeof window.fbq === "function"
        ) {
          lastTrackedPathRef.current = pathname;
          window.fbq("track", "PageView");
        }
      }}
    />
  );
}
