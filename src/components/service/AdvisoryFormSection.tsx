"use client";

import React, { useState, ReactNode, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { Container } from "../layout/Container";
import { Section } from "../layout/Section";
import { useConsent } from "@/components/analytics/ConsentProvider";
import { trackLeadEvent } from "@/lib/analytics/events";
import type { LeadAnalyticsErrorType } from "@/lib/analytics/types";
import { PRODUCTS_BY_VERTICAL, type LeadVertical, type ProductId } from "@/lib/leads/config";
import { isValidProductId } from "@/lib/leads/context";
import type { LeadFormId } from "@/lib/leads/types";

export interface ProductOption {
  id: string;
  label: string;
}

export interface BenefitItem {
  title: string;
  description: string;
}

export interface AdvisoryFormConfig {
  sectionId: string;
  productsBlockId: string;
  checkboxGroupName: string;
  idPrefix: string;
  heading: ReactNode;
  subheading: string;
  benefits: [BenefitItem, BenefitItem, BenefitItem];
  products: ProductOption[];
  otherProductPlaceholder: string;
  confirmationHeading: string;
  confirmationBody: string;
  messagePlaceholder: string;
  messageLabel?: string;
}

export interface AdvisoryFormSubmitData {
  name: string;
  email: string;
  phone: string;
  message: string;
  selectedProducts: string[];
  website: string;
  /** Free-text detail when the user selected "Otro producto". */
  otherProduct?: string;
}

/**
 * Optional lead analytics config. When omitted, the form is analytics-inert.
 * Only controlled values — never user input.
 */
export interface AdvisoryFormAnalyticsConfig {
  vertical: LeadVertical;
  formId: LeadFormId;
}

export interface AdvisoryFormSectionProps {
  config: AdvisoryFormConfig;
  contextFields: (idPrefix: string, onRegisterReset: (fn: () => void) => void) => ReactNode;
  /**
   * May resolve with the controlled ProductIds that were submitted
   * (used only for lead_product_interest analytics after success).
   */
  onSubmitAsync?: (data: AdvisoryFormSubmitData) => Promise<void | string[]>;
  analytics?: AdvisoryFormAnalyticsConfig;
}

export function AdvisoryFormSection({ config, contextFields, onSubmitAsync, analytics }: AdvisoryFormSectionProps) {
  const {
    sectionId,
    productsBlockId,
    checkboxGroupName,
    idPrefix,
    heading,
    subheading,
    benefits,
    products,
    otherProductPlaceholder,
    confirmationHeading,
    confirmationBody,
    messagePlaceholder,
    messageLabel = "MENSAJE O CONTEXTO",
  } = config;

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [otherProductText, setOtherProductText] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showProductValidationWarning, setShowProductValidationWarning] = useState(false);

  const [contextResetFn, setContextResetFn] = useState<(() => void) | null>(null);
  const registerContextReset = useCallback((fn: () => void) => {
    setContextResetFn(() => fn);
  }, []);

  const formSectionRef = useRef<HTMLDivElement>(null);
  const hasScrolledRef = useRef(false);

  // ── Lead analytics (inert unless `analytics` prop is supplied) ─────────────
  const pathname = usePathname();
  const { consent, hydrated, analyticsReady } = useConsent();
  const analyticsEligible = hydrated && consent === "granted" && analyticsReady;

  // Ref mirror so async handlers read the latest eligibility, not a stale closure.
  const eligibleRef = useRef(false);
  useEffect(() => {
    eligibleRef.current = analyticsEligible;
  }, [analyticsEligible]);

  const viewFiredRef = useRef(false);
  const startFiredRef = useRef(false);

  // Safe emitter: only controlled params, never throws into the lead flow.
  const emitLeadEvent = (
    run: (base: { vertical: LeadVertical; form_id: LeadFormId; source_path: string }) => void
  ) => {
    if (!analytics || !eligibleRef.current) return;
    try {
      run({
        vertical: analytics.vertical,
        form_id: analytics.formId,
        source_path: pathname || "/",
      });
    } catch {
      // Analytics must never break the lead UI.
    }
  };

  // lead_form_view — real exposure of the form card, once per mount.
  useEffect(() => {
    if (!analytics || !analyticsEligible) return;
    if (viewFiredRef.current) return;
    if (typeof IntersectionObserver === "undefined") return;
    const el = formSectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (viewFiredRef.current) {
          observer.disconnect();
          return;
        }
        if (!entries.some((entry) => entry.isIntersecting)) return;
        if (!eligibleRef.current) return;

        viewFiredRef.current = true;
        observer.disconnect();
        emitLeadEvent((base) => trackLeadEvent("lead_form_view", base));
      },
      { threshold: 0.25 }
    );
    observer.observe(el);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analytics, analyticsEligible, pathname]);

  // lead_form_start — bubbling form-level change; honeypot excluded.
  const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    if (!analytics || startFiredRef.current) return;
    const targetName = (e.target as { name?: unknown }).name;
    if (targetName === "website") return;
    if (!eligibleRef.current) return; // do not consume the guard pre-consent

    startFiredRef.current = true;
    emitLeadEvent((base) => trackLeadEvent("lead_form_start", base));
  };

  // Only controlled ProductIds belonging to the configured vertical.
  const toValidProductIds = (ids: string[]): string[] => {
    if (!analytics || analytics.vertical === "general") return [];
    const allowed = new Set<string>(
      (PRODUCTS_BY_VERTICAL[analytics.vertical] as ReadonlyArray<{ readonly id: string }>).map(
        (p) => p.id
      )
    );
    return Array.from(new Set(ids)).filter((id) => isValidProductId(id) && allowed.has(id));
  };

  useEffect(() => {
    if (onSubmitAsync && isSubmitted) {
      if (!hasScrolledRef.current) {
        hasScrolledRef.current = true;
        formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      hasScrolledRef.current = false;
    }
  }, [onSubmitAsync, isSubmitted]);

  const isOtherSelected = selectedProducts.includes("other");

  const toggleProduct = (productId: string) => {
    setShowProductValidationWarning(false);
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (selectedProducts.length === 0) {
      setShowProductValidationWarning(true);
      const targetElement = document.getElementById(productsBlockId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    if (onSubmitAsync) {
      setIsSubmitting(true);
      setSubmitError(null);
      const isHuman = website.trim() === "";
      if (isHuman) {
        emitLeadEvent((base) => trackLeadEvent("lead_submit", base));
      }
      try {
        const submitData: AdvisoryFormSubmitData = {
          name: fullName,
          email,
          phone: phoneNumber,
          message,
          selectedProducts,
          website,
        };
        // Only include the free-text detail when "other" is actually selected
        if (isOtherSelected && otherProductText.trim().length > 0) {
          submitData.otherProduct = otherProductText.trim();
        }
        const submittedProducts = await onSubmitAsync(submitData);

        if (isHuman) {
          emitLeadEvent((base) => trackLeadEvent("lead_submit_success", base));
          if (Array.isArray(submittedProducts)) {
            for (const product of toValidProductIds(submittedProducts)) {
              emitLeadEvent((base) =>
                trackLeadEvent("lead_product_interest", {
                  ...base,
                  // Validated against PRODUCTS_BY_VERTICAL; guard confirmed ProductId.
                  product: product as ProductId,
                })
              );
            }
          }
        }

        setIsSubmitted(true);
      } catch (err) {
        if (isHuman) {
          // fetch network rejection is a TypeError; everything else is server-side.
          const errorType: LeadAnalyticsErrorType = err instanceof TypeError ? "network" : "server";
          emitLeadEvent((base) =>
            trackLeadEvent("lead_submit_error", { ...base, error_type: errorType })
          );
        }
        setSubmitError("No pudimos enviar tu solicitud. Intenta nuevamente.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Legacy behavior
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    startFiredRef.current = false; // new interaction cycle (view guard intentionally kept)
    setFullName("");
    setPhoneNumber("");
    setEmail("");
    setSelectedProducts([]);
    setOtherProductText("");
    setMessage("");
    setWebsite("");
    setIsSubmitted(false);
    setIsSubmitting(false);
    setSubmitError(null);
    setShowProductValidationWarning(false);
    if (contextResetFn) {
      contextResetFn();
    }
  };

  return (
    <Section id={sectionId} className="bg-[#FAF9F5] border-b border-[#E8E8E8] py-24 sm:py-28 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-start">
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="space-y-4">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
                SOLICITA ASESORÍA ESPECIALIZADA
              </p>
              <h2
                className="font-display text-2xl sm:text-3xl md:text-[2.35rem] lg:text-[2.65rem] text-[#0B2D58] leading-[1.14] font-medium tracking-tight"
                style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
              >
                {heading}
              </h2>
              <p className="text-base text-[#2E2E2E]/85 leading-relaxed pt-1">{subheading}</p>
            </div>

            <div className="space-y-6 pt-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <span className="font-mono text-sm font-bold text-[#D4A737] tracking-wider pt-0.5">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-[0.95rem] font-bold text-[#0B2D58] tracking-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C626B] leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E8E8E8]/90">
              <div className="flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-[#D4A737] shrink-0 mt-0.5" />
                <p className="text-xs text-[#5C626B] leading-relaxed">
                  La información que compartas será utilizada únicamente para atender tu solicitud.{" "}
                  <Link
                    href="#aviso-de-privacidad"
                    className="text-[#0B2D58] font-semibold underline underline-offset-2 hover:text-[#D4A737] transition-colors"
                  >
                    Aviso de Privacidad
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div ref={formSectionRef} className="bg-white border border-[#E8E8E8] rounded-[2px] p-6 sm:p-9 lg:p-10 shadow-xs">
              {isSubmitted ? (
                <div className="py-12 px-4 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-[#D4A737]/15 text-[#0B2D58] flex items-center justify-center mx-auto border border-[#D4A737]/30">
                    <CheckCircle2 className="w-9 h-9 text-[#0B2D58]" />
                  </div>
                  <div className="space-y-2.5 max-w-lg mx-auto">
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
                      SOLICITUD ENVIADA
                    </p>
                    <h3
                      className="font-display text-2xl sm:text-3xl text-[#0B2D58] font-medium"
                      style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
                    >
                      {confirmationHeading}
                    </h3>
                    <p className="text-sm text-[#5C626B] leading-relaxed">{confirmationBody}</p>
                  </div>
                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center justify-center text-xs font-bold tracking-[0.14em] uppercase text-[#0B2D58] bg-[#FAF9F5] border border-[#E8E8E8] px-6 py-3 rounded-[2px] hover:border-[#0B2D58] transition-colors"
                    >
                      ENVIAR OTRA SOLICITUD
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} onChange={handleFormChange} noValidate={false} className="space-y-8">
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 p-4 rounded-[2px]">
                      <p className="text-sm font-medium text-red-800">{submitError}</p>
                    </div>
                  )}

                  {/* Honeypot field */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <label htmlFor={`${idPrefix}-website`}>Sitio Web</label>
                    <input
                      id={`${idPrefix}-website`}
                      type="text"
                      name="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="space-y-5">
                    <div className="border-b border-[#E8E8E8] pb-2.5">
                      <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-[#0B2D58]">
                        INFORMACIÓN DE CONTACTO
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor={`${idPrefix}-nombre`}
                          className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5"
                        >
                          NOMBRE COMPLETO <span className="text-[#D4A737] font-bold">*</span>
                        </label>
                        <input
                          id={`${idPrefix}-nombre`}
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Ej. Alejandro Valdés"
                          disabled={isSubmitting}
                          className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] placeholder-[#5C626B]/50 focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors disabled:opacity-50"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor={`${idPrefix}-telefono`}
                            className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5"
                          >
                            TELÉFONO / WHATSAPP <span className="text-[#D4A737] font-bold">*</span>
                          </label>
                          <div className={`flex rounded-[2px] border border-[#E8E8E8] bg-[#FAF9F5]/60 transition-colors ${isSubmitting ? "opacity-50" : "focus-within:border-[#0B2D58] focus-within:bg-white"}`}>
                            <span className="inline-flex items-center px-3 text-xs font-semibold text-[#0B2D58] border-r border-[#E8E8E8] bg-[#FAF9F5] select-none">
                              +52 (MX)
                            </span>
                            <input
                              id={`${idPrefix}-telefono`}
                              type="tel"
                              required
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              placeholder="55 1234 5678"
                              disabled={isSubmitting}
                              className="w-full bg-transparent px-3 py-3 text-sm text-[#0B2D58] placeholder-[#5C626B]/50 focus:outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor={`${idPrefix}-email`}
                            className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5"
                          >
                            CORREO ELECTRÓNICO <span className="text-[#D4A737] font-bold">*</span>
                          </label>
                          <input
                            id={`${idPrefix}-email`}
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="nombre@empresa.com"
                            disabled={isSubmitting}
                            className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] placeholder-[#5C626B]/50 focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors disabled:opacity-50"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id={productsBlockId} className="space-y-4 pt-2">
                    <div className="border-b border-[#E8E8E8] pb-2.5">
                      <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-[#0B2D58]">
                        PRODUCTOS DE INTERÉS
                      </h3>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#0B2D58]">
                        ¿QUÉ PRODUCTOS TE INTERESAN? <span className="text-[#D4A737] font-bold">*</span>
                      </p>
                      <p className="text-xs text-[#5C626B]">Puedes seleccionar más de una opción.</p>
                    </div>
                    {showProductValidationWarning && (
                      <p className="text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-[2px]">
                        Por favor selecciona al menos un producto de interés para orientar tu asesoría.
                      </p>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {products.map((prod) => {
                        const checked = selectedProducts.includes(prod.id);
                        return (
                          <label
                            key={prod.id}
                            htmlFor={`${idPrefix}-product-${prod.id}`}
                            className={`flex items-start gap-3 p-3.5 rounded-[2px] border cursor-pointer select-none transition-all duration-150 ${isSubmitting ? "opacity-50 pointer-events-none" : ""} ${
                              checked
                                ? "border-[#0B2D58] bg-[#0B2D58]/5"
                                : "border-[#E8E8E8] bg-white hover:border-[#0B2D58]/40 hover:bg-[#FAF9F5]/70"
                            }`}
                          >
                            <input
                              id={`${idPrefix}-product-${prod.id}`}
                              type="checkbox"
                              name={checkboxGroupName}
                              value={prod.id}
                              checked={checked}
                              onChange={() => toggleProduct(prod.id)}
                              disabled={isSubmitting}
                              className="w-4 h-4 mt-0.5 rounded-[2px] text-[#0B2D58] border-[#E8E8E8] focus:ring-[#0B2D58] focus:ring-offset-0 shrink-0 accent-[#0B2D58]"
                            />
                            <span className="text-xs sm:text-[0.82rem] font-medium text-[#0B2D58] leading-tight">
                              {prod.label}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    {isOtherSelected && (
                      <div className="pt-3 animate-fadeIn">
                        <label
                          htmlFor={`${idPrefix}-otro-producto`}
                          className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5"
                        >
                          ESPECIFICA EL OTRO PRODUCTO <span className="text-[#D4A737] font-bold">*</span>
                        </label>
                        <input
                          id={`${idPrefix}-otro-producto`}
                          type="text"
                          required={isOtherSelected}
                          maxLength={200}
                          value={otherProductText}
                          onChange={(e) => setOtherProductText(e.target.value)}
                          placeholder={otherProductPlaceholder}
                          disabled={isSubmitting}
                          className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] placeholder-[#5C626B]/50 focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors disabled:opacity-50"
                        />
                      </div>
                    )}
                  </div>

                  {contextFields(idPrefix, registerContextReset)}

                  <div className="space-y-2 pt-2">
                    <label
                      htmlFor={`${idPrefix}-mensaje`}
                      className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58]"
                    >
                      {messageLabel}{" "}
                      <span className="text-[#5C626B] text-[0.7rem] font-normal lowercase">(opcional)</span>
                    </label>
                    <textarea
                      id={`${idPrefix}-mensaje`}
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={messagePlaceholder}
                      disabled={isSubmitting}
                      className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] placeholder-[#5C626B]/50 focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors resize-y min-h-[84px] disabled:opacity-50"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#D4A737] hover:bg-[#c4982f] text-[#0B2D58] font-bold text-xs sm:text-sm tracking-[0.14em] uppercase py-4 px-8 rounded-[2px] transition-all shadow-xs flex items-center justify-center gap-2 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0B2D58] focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span>{isSubmitting ? "ENVIANDO..." : "SOLICITAR ASESORÍA"}</span>
                      {!isSubmitting && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}




