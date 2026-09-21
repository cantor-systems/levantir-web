import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { methodologySteps } from '../../config/site';

export function MethodologySection() {
  return (
    <Section className="bg-[#FFFFFF] border-b border-[#E8E8E8] py-22 sm:py-28 lg:py-36">
      <Container>
        {/* Top Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start mb-18 sm:mb-24">
          <div className="lg:col-span-7 space-y-3.5">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
              NUESTRO ENFOQUE
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl lg:text-[3.15rem] text-[#0B2D58] leading-[1.12] font-medium"
              style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
            >
              Primero entendemos el riesgo. <br className="hidden sm:inline" />
              Después hablamos de seguros.
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pt-8">
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed max-w-[48ch]">
              Un proceso claro y riguroso para diseñar soluciones que realmente protegen lo que valoras y te permiten avanzar con confianza.
            </p>
          </div>
        </div>

        {/* 5 Progression Steps: Solid Architectural Hierarchy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-9 lg:gap-8 xl:gap-10 relative">
          {methodologySteps.map((step, index) => (
            <div
              key={step.number}
              className={`relative flex flex-col group min-w-0 pt-9 sm:pt-10 lg:pt-11 border-t-2 border-[#D4A737]/45 group-hover:border-[#D4A737] transition-all duration-300 ${
                index === 4 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Step Number in High-Hierarchy Serif Display */}
              <span
                className="font-display text-[2.85rem] sm:text-[3.4rem] xl:text-[3.75rem] text-[#D4A737] font-normal tracking-tight block mb-4 sm:mb-5 leading-none"
                style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
              >
                {step.number}
              </span>

              {/* Step Title */}
              <h3 className="text-xl sm:text-[1.35rem] font-bold text-[#0B2D58] tracking-tight mb-4">
                {step.title}
              </h3>

              {/* Step Description with Strong Readability & Generous Line Height */}
              <p className="text-[0.98rem] sm:text-[1.04rem] text-[#2E2E2E]/90 leading-[1.72]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
