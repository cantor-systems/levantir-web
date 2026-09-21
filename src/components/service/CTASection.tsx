"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../layout/Container";

interface CTASectionProps {
  eyebrow?: string;
  title?: string;
  supportingCopy?: string;
  primaryCtaText: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

export function CTASection({
  eyebrow = "ASESORÍA ESPECIALIZADA",
  title = "Lo que has construido merece una estrategia de protección a su altura.",
  supportingCopy = "Cuéntanos tus prioridades y las de tu familia. Te ayudaremos a evaluar las alternativas disponibles con criterio independiente, rigor técnico y visión de largo plazo.",
  primaryCtaText,
  primaryCtaHref = "/?advisory=true",
  secondaryCtaText = "SOLICITAR ASESORÍA",
  secondaryCtaHref = "/?advisory=true",
}: CTASectionProps) {
  return (
    <section className="bg-[#0B2D58] text-white py-24 sm:py-28 lg:py-32 xl:py-36 relative overflow-hidden border-t border-[#071E3B] flex items-center">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">{eyebrow}</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-[2.95rem] lg:text-[3.35rem] text-white leading-[1.12] font-medium" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
              {title}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:border-l lg:border-white/15 lg:pl-8 xl:pl-12 flex flex-col justify-center space-y-6 sm:space-y-7 min-w-0">
            <p className="text-base sm:text-lg text-white/90 leading-relaxed">{supportingCopy}</p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href={primaryCtaHref}
                className="inline-flex items-center justify-center gap-2 bg-[#D4A737] hover:bg-[#C4962B] text-[#0B2D58] px-7 py-4 text-xs sm:text-[0.82rem] font-bold tracking-[0.14em] uppercase rounded-[2px] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap"
              >
                <span>{primaryCtaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              {secondaryCtaText && (
                <Link
                  href={secondaryCtaHref}
                  className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white text-white px-6 py-4 text-xs sm:text-[0.82rem] font-semibold tracking-[0.12em] uppercase rounded-[2px] transition-colors whitespace-nowrap"
                >
                  <span>{secondaryCtaText}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
