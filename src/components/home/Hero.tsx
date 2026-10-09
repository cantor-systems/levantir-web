"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { AdvisoryLink as Link } from "@/components/ui/AdvisoryLink";
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Container } from '../layout/Container';
import { heroSlides } from '../../config/site';

export function Hero() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Next and Prev handlers
  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  // Automatic slideshow rotation (respects pause and reduced-motion)
  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [nextSlide, isPaused, prefersReducedMotion]);

  const currentSlide = heroSlides[currentSlideIndex];

  return (
    <section
      aria-label="Presentación principal"
      className="relative w-full bg-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ────────────────────────────────────────────────────────────────────────
          DESKTOP LAYOUT (>= 768px)
          Exact preservation of the original Hero for tablet and desktop.
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="hidden md:flex relative w-full min-h-[720px] lg:min-h-[780px] 2xl:min-h-[820px] items-center overflow-hidden bg-[#071E3B]">
        {/* Background Slideshow with Smooth Crossfade Dissolve & Enhanced Contrast */}
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, index) => {
            const isActive = index === currentSlideIndex;
            return (
              <div
                key={`desktop-img-${slide.id}`}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
                aria-hidden={!isActive}
              >
                <img
                  src={slide.imageUrl}
                  alt={slide.altText}
                  className="w-full h-full object-cover object-center sm:object-[center_35%] filter brightness-[0.96] contrast-[1.12] saturate-[1.08]"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            );
          })}

          {/* Directional Editorial Overlay */}
          <div
            className="absolute inset-0 z-20 pointer-events-none hidden sm:block"
            style={{
              background:
                "linear-gradient(90deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.76) 24%, rgba(255, 255, 255, 0.45) 44%, rgba(255, 255, 255, 0.12) 60%, rgba(255, 255, 255, 0.0) 72%)",
            }}
          />

          {/* Mobile-optimized vertical soft overlay (kept for identical preservation, though hidden on md) */}
          <div
            className="absolute inset-0 z-20 pointer-events-none sm:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.78) 40%, rgba(255, 255, 255, 0.25) 70%, rgba(255, 255, 255, 0.0) 88%)",
            }}
          />

          {/* Subtle bottom gradient for slide label and indicator contrast */}
          <div
            className="absolute bottom-0 inset-x-0 h-36 z-20 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(7, 30, 59, 0) 0%, rgba(7, 30, 59, 0.55) 100%)",
            }}
          />
        </div>

        {/* Main Hero Fixed Content */}
        <Container className="relative z-30 py-20 sm:py-24 lg:py-28">
          <div className="max-w-2xl lg:max-w-3xl">
            {/* Fixed Eyebrow */}
            <p className="text-[0.74rem] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#0B2D58] mb-4 sm:mb-6">
              SEGUROS · GESTIÓN DE RIESGOS · PROTECCIÓN PATRIMONIAL
            </p>

            {/* Fixed Main H1 (Playfair Display) */}
            <h1
              className="font-display text-[2.75rem] sm:text-[3.65rem] md:text-[4.35rem] lg:text-[4.95rem] leading-[1.03] text-[#0B2D58] tracking-[-0.015em] font-medium"
              style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
            >
              Protegemos <br />
              lo que has construido.
            </h1>

            {/* Fixed Supporting Copy */}
            <p className="mt-5 sm:mt-7 text-base sm:text-lg md:text-[1.15rem] leading-[1.65] text-[#1B2533] max-w-[54ch] font-normal">
              Soluciones de seguros y gestión de riesgos para personas, empresarios y empresas que buscan un futuro con mayor certeza.
            </p>

            {/* Action CTAs */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="?advisory=true"
                scroll={false}
                className="inline-flex items-center gap-2 bg-[#D4A737] hover:bg-[#C4962B] text-[#0B2D58] px-6 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-[0.8rem] font-bold tracking-[0.14em] uppercase rounded-[2px] transition-all shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2D58]"
              >
                <span>SOLICITAR ASESORÍA</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#soluciones"
                className="inline-flex items-center gap-2 border border-[#0B2D58]/35 hover:border-[#0B2D58] text-[#0B2D58] bg-white/85 hover:bg-white px-5 sm:px-6 py-3.5 sm:py-4 text-xs sm:text-[0.8rem] font-semibold tracking-[0.12em] uppercase rounded-[2px] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2D58] shadow-xs"
              >
                <span>Conocer soluciones</span>
              </a>
            </div>
          </div>
        </Container>

        {/* Side Slide Navigation Arrows (Desktop & Tablet) */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Diapositiva anterior"
          className="hidden md:inline-flex items-center justify-center absolute left-3 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/70 hover:bg-white text-[#0B2D58] transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A737]"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Siguiente diapositiva"
          className="hidden md:inline-flex items-center justify-center absolute right-3 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/70 hover:bg-white text-[#0B2D58] transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A737]"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Anchored Bottom Bar within Container Grid */}
        <div className="absolute bottom-6 sm:bottom-8 inset-x-0 z-30 pointer-events-none">
          <Container className="flex items-end justify-between gap-4">
            {/* Slide Indicators (Left/Center) */}
            <div
              className="pointer-events-auto flex items-center gap-2"
              role="tablist"
              aria-label="Controles del carrusel"
            >
              {heroSlides.map((slide, index) => {
                const isActive = index === currentSlideIndex;
                return (
                  <button
                    key={`desktop-dot-${slide.id}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Ir a diapositiva ${index + 1}: ${slide.theme}`}
                    onClick={() => setCurrentSlideIndex(index)}
                    className={`h-1.5 transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A737] ${
                      isActive ? 'w-8 bg-[#D4A737]' : 'w-2.5 bg-[#0B2D58]/35 hover:bg-[#0B2D58]/60'
                    }`}
                  />
                );
              })}
            </div>

            {/* Contextual Subordinate Slide Label in Lower Right */}
            <div className="text-right hidden sm:block pointer-events-none max-w-xs">
              <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-white/80 drop-shadow-xs">
                {currentSlide.labelCategory}
              </p>
              <p className="font-display italic text-sm md:text-base text-white font-normal drop-shadow-md">
                {currentSlide.labelTagline}
              </p>
            </div>
          </Container>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────────────
          MOBILE LAYOUT (< 768px)
          Stacked layout: Photo -> Category -> Institutional -> Indicators.
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col w-full bg-white">
        {/* 1. Photo (16:9 ratio, full width) */}
        <div className="relative w-full aspect-video overflow-hidden">
          {heroSlides.map((slide, index) => {
            const isActive = index === currentSlideIndex;
            return (
              <div
                key={`mobile-img-${slide.id}`}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
                aria-hidden={!isActive}
              >
                <img
                  src={slide.imageUrl}
                  alt={slide.altText}
                  className="w-full h-full object-cover object-center filter brightness-[0.96] contrast-[1.12] saturate-[1.08]"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            );
          })}
        </div>

        {/* 2. Category & Tagline (Crossfade with Grid to maintain height) */}
        <div className="px-5 pt-6 pb-4">
          <div className="grid">
            {heroSlides.map((slide, index) => {
              const isActive = index === currentSlideIndex;
              return (
                <div
                  key={`mobile-text-${slide.id}`}
                  className={`col-start-1 row-start-1 transition-opacity duration-1000 ease-in-out ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                  aria-hidden={!isActive}
                >
                  <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#0B2D58] mb-1.5">
                    {slide.labelCategory}
                  </p>
                  <p className="text-base font-medium text-[#1B2533] leading-snug">
                    {slide.labelTagline}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Institutional content */}
        <div className="px-5 pb-6">
          <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#0B2D58] mb-4 opacity-75">
            SEGUROS · GESTIÓN DE RIESGOS · PROTECCIÓN PATRIMONIAL
          </p>

          <h1
            className="font-display text-[2.25rem] leading-[1.05] text-[#0B2D58] tracking-[-0.015em] font-medium mb-4"
            style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
          >
            Protegemos <br />
            lo que has construido.
          </h1>

          <p className="text-[0.95rem] leading-[1.65] text-[#1B2533] mb-8 font-normal">
            Soluciones de seguros y gestión de riesgos para personas, empresarios y empresas que buscan un futuro con mayor certeza.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col gap-3.5">
            <Link
              href="?advisory=true"
              scroll={false}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#D4A737] hover:bg-[#C4962B] text-[#0B2D58] px-5 py-4 text-[0.8rem] font-bold tracking-[0.14em] uppercase rounded-[2px] transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2D58]"
            >
              <span>SOLICITAR ASESORÍA</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#soluciones"
              className="w-full inline-flex items-center justify-center gap-2 border border-[#0B2D58]/30 hover:border-[#0B2D58] text-[#0B2D58] bg-white px-5 py-4 text-[0.8rem] font-semibold tracking-[0.12em] uppercase rounded-[2px] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2D58]"
            >
              <span>Conocer soluciones</span>
            </a>
          </div>
        </div>

        {/* 4. Indicators */}
        <div className="pb-10 pt-2 flex justify-center items-center gap-2.5" role="tablist" aria-label="Controles del carrusel">
          {heroSlides.map((slide, index) => {
            const isActive = index === currentSlideIndex;
            return (
              <button
                key={`mobile-dot-${slide.id}`}
                role="tab"
                aria-selected={isActive}
                aria-label={`Ir a diapositiva ${index + 1}: ${slide.theme}`}
                onClick={() => setCurrentSlideIndex(index)}
                className={`h-1.5 transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A737] ${
                  isActive ? 'w-8 bg-[#D4A737]' : 'w-2.5 bg-[#0B2D58]/20 hover:bg-[#0B2D58]/40'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

