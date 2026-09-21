"use client";

import React, { useState, ReactNode, useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { Container } from "../layout/Container";
import { Section } from "../layout/Section";

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

export interface AdvisoryFormSectionProps {
  config: AdvisoryFormConfig;
  contextFields: (idPrefix: string, onRegisterReset: (fn: () => void) => void) => ReactNode;
}

export function AdvisoryFormSection({ config, contextFields }: AdvisoryFormSectionProps) {
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showProductValidationWarning, setShowProductValidationWarning] = useState(false);

  const contextResetRef = useRef<(() => void) | null>(null);
  const registerContextReset = (fn: () => void) => {
    contextResetRef.current = fn;
  };

  const isOtherSelected = selectedProducts.includes("other");

  const toggleProduct = (productId: string) => {
    setShowProductValidationWarning(false);
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProducts.length === 0) {
      setShowProductValidationWarning(true);
      const targetElement = document.getElementById(productsBlockId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFullName("");
    setPhoneNumber("");
    setEmail("");
    setSelectedProducts([]);
    setOtherProductText("");
    setMessage("");
    setIsSubmitted(false);
    setShowProductValidationWarning(false);
    if (contextResetRef.current) {
      contextResetRef.current();
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
            <div className="bg-white border border-[#E8E8E8] rounded-[2px] p-6 sm:p-9 lg:p-10 shadow-xs">
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
                <form onSubmit={handleSubmit} noValidate={false} className="space-y-8">
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
                          className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] placeholder-[#5C626B]/50 focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors"
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
                          <div className="flex rounded-[2px] border border-[#E8E8E8] bg-[#FAF9F5]/60 focus-within:border-[#0B2D58] focus-within:bg-white transition-colors">
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
                            className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] placeholder-[#5C626B]/50 focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors"
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
                            className={`flex items-start gap-3 p-3.5 rounded-[2px] border cursor-pointer select-none transition-all duration-150 ${
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
                          value={otherProductText}
                          onChange={(e) => setOtherProductText(e.target.value)}
                          placeholder={otherProductPlaceholder}
                          className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] placeholder-[#5C626B]/50 focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors"
                        />
                      </div>
                    )}
                  </div>

                  {/* eslint-disable-next-line react-hooks/refs */}
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
                      className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] placeholder-[#5C626B]/50 focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors resize-y min-h-[84px]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#D4A737] hover:bg-[#c4982f] text-[#0B2D58] font-bold text-xs sm:text-sm tracking-[0.14em] uppercase py-4 px-8 rounded-[2px] transition-all shadow-xs flex items-center justify-center gap-2 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0B2D58] focus:ring-offset-2"
                    >
                      <span>SOLICITAR ASESORÍA</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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

