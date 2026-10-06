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

export function MicrosoftClarity() {
  const { consent, hydrated } = useConsent();
  const prevConsentRef = useRef<string>("unknown");

  useEffect(() => {
    if (!hydrated) return;

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
  }, [consent, hydrated]);

  // Do not insert script until consent is granted.
  if (!hydrated || consent !== "granted") {
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
