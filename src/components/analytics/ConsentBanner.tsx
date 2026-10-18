"use client";

/**
 * ConsentBanner
 *
 * Privacy consent banner supporting:
 *   - "Aceptar todo" (Analytics + Marketing granted)
 *   - "Rechazar opcionales" (Analytics + Marketing denied)
 *   - "Personalizar" (Granular category toggles)
 *   - Reopening & revocation via Footer link ("Preferencias de privacidad")
 *
 * Accessible, no PII, strictly client-side.
 */

import React, { useState } from "react";
import { useConsent } from "./ConsentProvider";

interface ConsentCustomizerProps {
  initialAnalytics: boolean;
  initialMarketing: boolean;
  canClose: boolean;
  onClose: () => void;
  onSave: (custom: { analytics: boolean; marketing: boolean }) => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
}

function ConsentCustomizer({
  initialAnalytics,
  initialMarketing,
  canClose,
  onClose,
  onSave,
  onAcceptAll,
  onRejectAll,
}: ConsentCustomizerProps) {
  const [analyticsChecked, setAnalyticsChecked] = useState(initialAnalytics);
  const [marketingChecked, setMarketingChecked] = useState(initialMarketing);

  return (
    <div className="consent-customizer">
      <div className="consent-customizer__header">
        <div>
          <p className="consent-banner__title">Preferencias de privacidad</p>
          <p className="consent-banner__body">
            Gestiona las categorías de cookies y tecnologías de medición.
            Las necesarias para el funcionamiento del sitio no pueden
            desactivarse.
          </p>
        </div>
        {canClose && (
          <button
            type="button"
            onClick={onClose}
            className="consent-customizer__close"
            aria-label="Cerrar preferencias"
          >
            ✕
          </button>
        )}
      </div>

      <div className="consent-customizer__categories">
        {/* Category 1: Essential */}
        <div className="consent-category">
          <div className="consent-category__info">
            <span className="consent-category__name">Esenciales y de seguridad</span>
            <span className="consent-category__desc">
              Requeridas para la navegación y funcionamiento básico del sitio.
            </span>
          </div>
          <span className="consent-category__badge">Siempre activas</span>
        </div>

        {/* Category 2: Analytics */}
        <label className="consent-category consent-category--interactive">
          <div className="consent-category__info">
            <span className="consent-category__name">Analítica y medición</span>
            <span className="consent-category__desc">
              Nos ayuda a entender cómo interactúan los usuarios con el sitio
              (Google Analytics 4, Microsoft Clarity).
            </span>
          </div>
          <input
            type="checkbox"
            checked={analyticsChecked}
            onChange={(e) => setAnalyticsChecked(e.target.checked)}
            className="consent-category__checkbox"
          />
        </label>

        {/* Category 3: Marketing */}
        <label className="consent-category consent-category--interactive">
          <div className="consent-category__info">
            <span className="consent-category__name">Marketing y publicidad</span>
            <span className="consent-category__desc">
              Permite evaluar el rendimiento de campañas comerciales en plataformas
              de terceros (Google Tag Manager, Meta Pixel).
            </span>
          </div>
          <input
            type="checkbox"
            checked={marketingChecked}
            onChange={(e) => setMarketingChecked(e.target.checked)}
            className="consent-category__checkbox"
          />
        </label>
      </div>

      <div className="consent-customizer__actions">
        <button
          type="button"
          onClick={onRejectAll}
          className="consent-banner__btn consent-banner__btn--reject"
        >
          Rechazar todo
        </button>
        <button
          type="button"
          onClick={() =>
            onSave({
              analytics: analyticsChecked,
              marketing: marketingChecked,
            })
          }
          className="consent-banner__btn consent-banner__btn--outline"
        >
          Guardar preferencias
        </button>
        <button
          type="button"
          onClick={onAcceptAll}
          className="consent-banner__btn consent-banner__btn--accept"
        >
          Aceptar todo
        </button>
      </div>
    </div>
  );
}

export function ConsentBanner() {
  const {
    preferences,
    hydrated,
    preferencesOpen,
    acceptAll,
    rejectAll,
    updatePreferences,
    closePreferences,
  } = useConsent();

  const [isCustomizing, setIsCustomizing] = useState(false);

  if (!hydrated) return null;

  // Show if: no decision yet on either category, OR user explicitly opened preferences
  const isUnknown =
    preferences.analytics === "unknown" || preferences.marketing === "unknown";
  const shouldShow = isUnknown || preferencesOpen || isCustomizing;

  if (!shouldShow) return null;

  const showModal = preferencesOpen || isCustomizing;

  const handleSaveCustom = (custom: { analytics: boolean; marketing: boolean }) => {
    updatePreferences(custom);
    setIsCustomizing(false);
  };

  const handleRejectAll = () => {
    rejectAll();
    setIsCustomizing(false);
  };

  const handleAcceptAll = () => {
    acceptAll();
    setIsCustomizing(false);
  };

  const handleClose = () => {
    setIsCustomizing(false);
    closePreferences();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Preferencias de privacidad"
      className="consent-banner"
    >
      <div className="consent-banner__inner">
        {!showModal ? (
          /* Simple Banner View */
          <>
            <div className="consent-banner__content">
              <p className="consent-banner__title">Tu privacidad importa</p>
              <p className="consent-banner__body">
                Utilizamos herramientas de analítica para entender cómo se
                utiliza este sitio y tecnologías de marketing para evaluar el
                desempeño de nuestras campañas. Puedes aceptar todas las
                cookies, rechazar las opcionales o personalizar tus
                preferencias.
              </p>
            </div>

            <div className="consent-banner__actions">
              <button
                type="button"
                onClick={handleRejectAll}
                className="consent-banner__btn consent-banner__btn--reject"
              >
                Rechazar opcionales
              </button>
              <button
                type="button"
                onClick={() => setIsCustomizing(true)}
                className="consent-banner__btn consent-banner__btn--outline"
              >
                Personalizar
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="consent-banner__btn consent-banner__btn--accept"
              >
                Aceptar todo
              </button>
            </div>
          </>
        ) : (
          /* Detailed Customizer View */
          <ConsentCustomizer
            initialAnalytics={preferences.analytics === "granted"}
            initialMarketing={preferences.marketing === "granted"}
            canClose={!isUnknown}
            onClose={handleClose}
            onSave={handleSaveCustom}
            onAcceptAll={handleAcceptAll}
            onRejectAll={handleRejectAll}
          />
        )}
      </div>

      <style>{`
        .consent-banner {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 9000;
          background: #0B2D58;
          border-top: 1px solid rgba(212, 167, 55, 0.35);
          box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.28);
          padding: 1.25rem 1.25rem;
          color: #ffffff;
        }

        .consent-banner__inner {
          max-width: 72rem;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        @media (min-width: 860px) {
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
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 0.35rem 0;
          letter-spacing: 0.01em;
        }

        .consent-banner__body {
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.85);
          margin: 0;
          line-height: 1.55;
          max-width: 68ch;
        }

        .consent-banner__actions {
          display: flex;
          flex-shrink: 0;
          gap: 0.65rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .consent-banner__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.55rem 1.15rem;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.18s ease;
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
          border-color: rgba(255, 255, 255, 0.6);
          color: #ffffff;
        }

        .consent-banner__btn--outline {
          background: transparent;
          color: #D4A737;
          border: 1px solid #D4A737;
        }

        .consent-banner__btn--outline:hover {
          background: rgba(212, 167, 55, 0.12);
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

        /* Customizer Styles */
        .consent-customizer {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .consent-customizer__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
        }

        .consent-customizer__close {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.1rem;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          line-height: 1;
        }

        .consent-customizer__close:hover {
          color: #ffffff;
        }

        .consent-customizer__categories {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin: 0.25rem 0;
        }

        .consent-category {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }

        .consent-category--interactive {
          cursor: pointer;
        }

        .consent-category--interactive:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(212, 167, 55, 0.3);
        }

        .consent-category__info {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .consent-category__name {
          font-size: 0.85rem;
          font-weight: 600;
          color: #ffffff;
        }

        .consent-category__desc {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.4;
        }

        .consent-category__badge {
          font-size: 0.7rem;
          color: #D4A737;
          background: rgba(212, 167, 55, 0.15);
          padding: 0.2rem 0.5rem;
          border-radius: 2px;
          white-space: nowrap;
        }

        .consent-category__checkbox {
          width: 1.15rem;
          height: 1.15rem;
          accent-color: #D4A737;
          cursor: pointer;
          flex-shrink: 0;
        }

        .consent-customizer__actions {
          display: flex;
          gap: 0.65rem;
          flex-wrap: wrap;
          justify-content: flex-end;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
}
