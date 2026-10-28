"use client";

/**
 * MetaPixel (Meta Conversions API Client Dispatcher)
 *
 * Minimal client component that observes route changes via `usePathname()`
 * and dispatches first-party `PageView` events to `/api/analytics/meta`
 * (Meta Conversions API) exclusively when `marketingConsent === "granted"`.
 *
 * Privacy & Architecture rules:
 *   - Eliminates dependence on `fbevents.js` SPA history tracking.
 *   - Single source of truth for `PageView` events (CAPI only; no browser
 *     Pixel `PageView` or custom `LEVANTIR_PageVisit` duplicates).
 *   - AbortController cancels pending in-flight HTTP requests upon consent
 *     revocation, route replacement, or component unmount.
 *   - Synchronizes a first-party `levantir_marketing_consent` cookie so the
 *     server Route Handler can independently verify marketing consent.
 *   - Deduplicates consecutive visits to the same route via `lastTrackedPathRef`
 *     and generates a unique `eventId` per visit.
 *   - Sends only `{ path, eventId, consent }` — zero PII, zero tokens on client.
 *   - Independent from GA4, GTM, and Microsoft Clarity.
 */

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { isMarketingConsentGranted } from "@/lib/analytics/consent";
import { useConsent } from "./ConsentProvider";

const CONSENT_COOKIE_NAME = "levantir_marketing_consent";

function syncMarketingConsentCookie(granted: boolean): void {
  if (typeof document === "undefined") return;
  if (granted) {
    document.cookie = `${CONSENT_COOKIE_NAME}=granted; Path=/; SameSite=Strict`;
  } else {
    document.cookie = `${CONSENT_COOKIE_NAME}=denied; Path=/; Max-Age=0; SameSite=Strict`;
  }
}

function createEventId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return `pv_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
}

export function MetaPixel() {
  const { marketingConsent, hydrated } = useConsent();
  const pathname = usePathname();
  const lastTrackedPathRef = useRef<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!hydrated) return;

    if (marketingConsent !== "granted" || !isMarketingConsentGranted()) {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      syncMarketingConsentCookie(false);
      lastTrackedPathRef.current = null;
      return;
    }

    syncMarketingConsentCookie(true);

    if (!pathname || lastTrackedPathRef.current === pathname) {
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    lastTrackedPathRef.current = pathname;
    const eventId = createEventId();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    void fetch("/api/analytics/meta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Levantir-Consent": "granted",
      },
      credentials: "same-origin",
      signal: controller.signal,
      body: JSON.stringify({
        path: pathname,
        eventId,
        consent: "granted",
      }),
    })
      .catch((err: unknown) => {
        // Silently ignore aborts and network errors so user navigation is never disrupted
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
      })
      .finally(() => {
        if (abortControllerRef.current === controller) {
          abortControllerRef.current = null;
        }
      });

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, [marketingConsent, hydrated, pathname]);

  return null;
}
