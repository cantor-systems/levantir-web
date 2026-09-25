"use client";

import React from "react";
import { AdvisoryLink as Link } from "@/components/ui/AdvisoryLink";
import { ArrowRight, ArrowDown, ShieldCheck } from "lucide-react";
import { Container } from "../layout/Container";
import { Breadcrumbs, BreadcrumbItem } from "./Breadcrumbs";

interface PageHeroProps {
  breadcrumbs: BreadcrumbItem[];
  eyebrow?: string;
  title: string;
  supportingCopy: string;
  primaryCtaText: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  imageUrl: string;
  imageAlt: string;
  imagePositionClass?: string;
  trustNote?: string;
  cornerDescriptorCategory?: string;
  cornerDescriptorText?: string;
  ariaLabel?: string;
}

export function PageHero({
  breadcrumbs,
  eyebrow = "PERSONAS",
  title,
  supportingCopy,
  primaryCtaText,
  primaryCtaHref = "/?advisory=true",
  secondaryCtaText,
  secondaryCtaHref,
  imageUrl,
  imageAlt,
  imagePositionClass = "object-[65%_center] sm:object-[72%_center] lg:object-[78%_center] xl:object-[82%_center]",
  trustNote = "Asesoría objetiva · Estructuración patrimonial · Acompañamiento continuo",
  cornerDescriptorCategory = "PROTECCIÓN PERSONAL & FAMILIAR",
  cornerDescriptorText = "Criterio especializado para proteger lo que no tiene sustituto.",
  ariaLabel,
}: PageHeroProps) {
  const handleSecondaryScroll = (e: React.MouseEvent) => {
    if (secondaryCtaHref && secondaryCtaHref.startsWith("#")) {
      e.preventDefault();
      const el = document.getElementById(secondaryCtaHref.replace("#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      aria-label={ariaLabel || title}
      className="relative w-full min-h-[580px] sm:min-h-[640px] md:min-h-[680px] lg:min-h-[720px] xl:min-h-[760px] flex items-center overflow-hidden bg-[#F8F5EF] border-b border-[#E8E8E8]"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={imageUrl}
          alt={imageAlt}
          className={`w-full h-full object-cover ${imagePositionClass} filter brightness-[1.0] contrast-[1.08] saturate-[1.06]`}
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <div
          className="absolute inset-0 z-10 pointer-events-none hidden lg:block"
          style={{ background: "linear-gradient(90deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0.91) 28%, rgba(255, 255, 255, 0.72) 44%, rgba(255, 255, 255, 0.32) 58%, rgba(255, 255, 255, 0.06) 72%, rgba(255, 255, 255, 0.0) 84%)" }}
        />
        <div
          className="absolute inset-0 z-10 pointer-events-none hidden sm:block lg:hidden"
          style={{ background: "linear-gradient(90deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0.90) 36%, rgba(255, 255, 255, 0.62) 56%, rgba(255, 255, 255, 0.20) 74%, rgba(255, 255, 255, 0.0) 86%)" }}
        />
        <div
          className="absolute inset-0 z-10 pointer-events-none sm:hidden"
          style={{ background: "linear-gradient(180deg, rgba(255, 255, 255, 0.97) 0%, rgba(255, 255, 255, 0.90) 50%, rgba(255, 255, 255, 0.45) 74%, rgba(255, 255, 255, 0.0) 92%)" }}
        />
      </div>

      <Container className="relative z-20 py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32">
        <div className="max-w-2xl lg:max-w-[700px] xl:max-w-[760px]">
          <div className="mb-6 sm:mb-8">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
            <span className="w-7 h-[1.5px] bg-[#D4A737]" aria-hidden="true" />
            <p className="text-xs sm:text-[0.8rem] font-bold tracking-[0.2em] uppercase text-[#D4A737]">{eyebrow}</p>
          </div>

          <h1
            className="font-display text-3xl sm:text-4xl md:text-[3.25rem] lg:text-[3.75rem] xl:text-[4.2rem] leading-[1.08] text-[#0B2D58] tracking-[-0.015em] font-medium mb-6 sm:mb-7"
            style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
          >
            {title}
          </h1>

          <p className="text-base sm:text-lg md:text-[1.12rem] text-[#2E2E2E]/90 leading-[1.68] max-w-[58ch] mb-8 sm:mb-10 font-normal">
            {supportingCopy}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-6 sm:mb-8">
            <Link
              href={primaryCtaHref}
              className="inline-flex items-center justify-center gap-2.5 bg-[#D4A737] hover:bg-[#C4962B] text-[#0B2D58] h-[52px] sm:h-[56px] px-8 sm:px-9 text-xs sm:text-[0.82rem] font-bold tracking-[0.14em] uppercase rounded-[2px] transition-all shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2D58] whitespace-nowrap"
            >
              <span>{primaryCtaText}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>

            {secondaryCtaText && (
              <Link
                href={secondaryCtaHref || "#"}
                onClick={handleSecondaryScroll}
                className="inline-flex items-center justify-center gap-2.5 border border-[#0B2D58]/35 hover:border-[#0B2D58] text-[#0B2D58] bg-white/90 hover:bg-white h-[52px] sm:h-[56px] px-7 sm:px-8 text-xs sm:text-[0.82rem] font-semibold tracking-[0.12em] uppercase rounded-[2px] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A737] whitespace-nowrap shadow-xs"
              >
                <span>{secondaryCtaText}</span>
                <ArrowDown className="w-4 h-4 text-[#D4A737]" aria-hidden="true" />
              </Link>
            )}
          </div>

          {trustNote && (
            <div className="inline-flex items-center gap-2.5 text-xs sm:text-[0.8rem] text-[#0B2D58] font-medium tracking-wide bg-white/80 backdrop-blur-[3px] py-1.5 px-3.5 rounded-[3px] border border-[#0B2D58]/10 shadow-[0_1px_2px_rgba(11,45,88,0.03)]">
              <ShieldCheck className="w-4 h-4 text-[#D4A737] flex-shrink-0" />
              <span>{trustNote}</span>
            </div>
          )}
        </div>
      </Container>

      {cornerDescriptorCategory && (
        <div className="hidden xl:block absolute bottom-8 right-8 z-20 max-w-xs text-right pointer-events-none p-2 bg-gradient-to-tl from-black/35 via-black/15 to-transparent rounded-[2px]">
          <p className="text-[0.7rem] uppercase tracking-[0.16em] font-bold text-[#D4A737] mb-0.5 drop-shadow-xs">{cornerDescriptorCategory}</p>
          <p className="text-xs text-white/95 font-medium leading-relaxed drop-shadow-xs">{cornerDescriptorText}</p>
        </div>
      )}
    </section>
  );
}

