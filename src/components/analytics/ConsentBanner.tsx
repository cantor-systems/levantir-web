"use client";

/**
 * ConsentBanner
 *
 * Displays a privacy consent banner when the user has not yet made a decision,
 * or when the user explicitly reopens "Preferencias de privacidad" from the Footer.
 *
 * Visibility rules:
 *   - Only renders after client hydration (to avoid SSR mismatch).
 *   - Shown when: consent === "unknown" AND hydrated === true.
 *   - Also shown when: preferencesOpen === true (regardless of consent state).
 *   - Hidden when: hydrated === false, or both conditions above are false.
 *
 * No GA4, no gtag, no cookies, no PII collected.
 */

import React from "react";
import { useConsent } from "./ConsentProvider";

export function ConsentBanner() {
  const { consent, hydrated, preferencesOpen, acceptAnalytics, rejectAnalytics } =
    useConsent();

  // Do not render on the server or before hydration is complete
  if (!hydrated) return null;

  // Show when: no decision yet, OR user explicitly reopened preferences
  const shouldShow = consent === "unknown" || preferencesOpen;
  if (!shouldShow) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Preferencias de privacidad"
      className="consent-banner"
    >
      <div className="consent-banner__inner">
        {/* Text content */}
        <div className="consent-banner__content">
          <p className="consent-banner__title">Tu privacidad importa</p>
          <p className="consent-banner__body">
            Utilizamos herramientas de analítica para entender cómo se utiliza
            este sitio y mejorar su experiencia. Puedes aceptar o rechazar la
            medición analítica.
          </p>
        </div>

        {/* Action buttons */}
        <div className="consent-banner__actions">
          <button
            type="button"
            onClick={rejectAnalytics}
            className="consent-banner__btn consent-banner__btn--reject"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={acceptAnalytics}
            className="consent-banner__btn consent-banner__btn--accept"
          >
            Aceptar analítica
          </button>
        </div>
      </div>

      {/* Inline styles — scoped to the banner, no external CSS file needed */}
      <style>{`
        .consent-banner {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 9000;
          background: #0B2D58;
          border-top: 1px solid rgba(212, 167, 55, 0.35);
          box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.18);
          padding: 1rem 1.25rem;
        }

        .consent-banner__inner {
          max-width: 72rem;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: flex-start;
        }

        @media (min-width: 768px) {
          .consent-banner__inner {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 2rem;
          }

          .consent-banner {
            padding: 1.25rem 2rem;
          }
        }

        .consent-banner__content {
          flex: 1;
          min-width: 0;
        }

        .consent-banner__title {
          font-size: 0.875rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 0.3rem 0;
          letter-spacing: 0.01em;
        }

        .consent-banner__body {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
          line-height: 1.55;
          max-width: 64ch;
        }

        .consent-banner__actions {
          display: flex;
          flex-shrink: 0;
          gap: 0.75rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .consent-banner__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.55rem 1.25rem;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border-radius: 2px;
          cursor: pointer;
          transition: background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease;
          white-space: nowrap;
        }

        .consent-banner__btn:focus-visible {
          outline: 2px solid #D4A737;
          outline-offset: 2px;
        }

        .consent-banner__btn--reject {
          background: transparent;
          color: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .consent-banner__btn--reject:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.55);
          color: #ffffff;
        }

        .consent-banner__btn--accept {
          background: #D4A737;
          color: #0B2D58;
          border: 1px solid #D4A737;
        }

        .consent-banner__btn--accept:hover {
          background: #C4962B;
          border-color: #C4962B;
        }
      `}</style>
    </div>
  );
}
