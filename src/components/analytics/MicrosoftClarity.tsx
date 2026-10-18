"use client";

import Script from "next/script";
import { useConsent } from "./ConsentProvider";
import { useEffect, useRef } from "react";

const CLARITY_ID = "yt5opr05h6";

declare global {
  interface Window {
    clarity?: {
      (...args: unknown[]): void;
      q?: unknown[];
    };
  }
}

export interface MicrosoftClarityProps {
  isPreview?: boolean;
}

export function MicrosoftClarity({ isPreview = false }: MicrosoftClarityProps) {
  const isBlocked = isPreview;
  const { consent, hydrated } = useConsent();
  const prevConsentRef = useRef<string>("unknown");

  useEffect(() => {
    if (!hydrated || isBlocked) return;

    const current = consent;
    const prev = prevConsentRef.current;

    if (current === prev) return;
    prevConsentRef.current = current;

    if (current === "granted") {
      if (prev === "denied") {
        // Reactivate tracking and permissions after revocation
        window.clarity?.("consentv2", {
          analytics_Storage: "granted",
          ad_Storage: "denied",
        });
        window.clarity?.("start");
      }
    } else if (current === "denied") {
      if (typeof window.clarity === "function") {
        // Deny permissions and stop tracking engine immediately
        window.clarity("consentv2", {
          analytics_Storage: "denied",
          ad_Storage: "denied",
        });
        window.clarity("stop");
      }
    }
  }, [consent, hydrated, isBlocked]);

  // Do not insert script until consent is granted, and never in preview.
  if (!hydrated || consent !== "granted" || isBlocked) {
    return null;
  }

  return (
    <Script
      id="microsoft-clarity-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.clarity = window.clarity || function(){(window.clarity.q=window.clarity.q||[]).push(arguments)};
          window.clarity("consentv2", {
            analytics_Storage: "granted",
            ad_Storage: "denied"
          });
          (function(c,l,a,r,i,t,y){
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_ID}");
        `,
      }}
    />
  );
}
