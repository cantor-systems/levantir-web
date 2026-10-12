import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';

export function SpecialtiesSection() {
  return (
    <Section className="bg-[#FFFFFF] border-b border-[#E8E8E8] py-20 sm:py-24 lg:py-28">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3.5">
            SOLUCIONES ESPECIALIZADAS
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl lg:text-[3.15rem] text-[#0B2D58] leading-[1.12] font-medium"
            style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
          >
            Te orientamos sobre seguros para actividades con riesgos especializados.
          </h2>
        </div>

        {/* Two Balanced Editorial Split Cards with Equivalent Visual Weight */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 items-stretch">
          {/* Card 1: Aeronáutica */}
          <Link
            href="/aeronaves"
            className="group cursor-pointer bg-[#F8F5EF] rounded-[2px] border border-[#E8E8E8] hover:border-[#0B2D58]/35 transition-all duration-300 flex flex-col justify-between overflow-hidden min-w-0 h-full focus-visible:ring-2 focus-visible:ring-[#D4A737] outline-none"
          >
            <div className="aspect-[16/10] w-full overflow-hidden bg-[#E8E8E8]">
              <img
                src="/images/sectores-especializados/hangar-hero.webp"
                alt="Aeronave ejecutiva dentro de un hangar"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <div className="p-8 sm:p-10 lg:p-11 flex flex-col justify-between flex-1">
              <div>
                <h3
                  className="font-display text-2xl sm:text-3xl lg:text-[2.15rem] text-[#0B2D58] font-medium leading-snug group-hover:text-[#D4A737] transition-colors"
                  style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
                >
                  Aeronáutica
                </h3>
                <p className="mt-3.5 text-base sm:text-[1.05rem] text-[#2E2E2E]/85 leading-relaxed">
                  Conoce aspectos relevantes del aseguramiento de aeronaves, operadores y actividades relacionadas con la industria aeronáutica.
                </p>
              </div>

              <div className="pt-8 inline-flex items-center text-[#0B2D58] group-hover:text-[#D4A737] font-semibold text-xs tracking-wider uppercase transition-colors">
                <span className="mr-2">CONOCER MÁS</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Card 2: Sectores especializados */}
          <Link
            href="/sectores-especializados"
            className="group cursor-pointer bg-[#F8F5EF] rounded-[2px] border border-[#E8E8E8] hover:border-[#0B2D58]/35 transition-all duration-300 flex flex-col justify-between overflow-hidden min-w-0 h-full focus-visible:ring-2 focus-visible:ring-[#D4A737] outline-none"
          >
            <div className="aspect-[16/10] w-full overflow-hidden bg-[#E8E8E8]">
              <img
                src="/images/home/specialties/sectores-industriales.webp"
                alt="Planta industrial moderna con instalaciones de manufactura y logística"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <div className="p-8 sm:p-10 lg:p-11 flex flex-col justify-between flex-1">
              <div>
                <h3
                  className="font-display text-2xl sm:text-3xl lg:text-[2.15rem] text-[#0B2D58] font-medium leading-snug group-hover:text-[#D4A737] transition-colors"
                  style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
                >
                  Sectores especializados
                </h3>
                <p className="mt-3.5 text-base sm:text-[1.05rem] text-[#2E2E2E]/85 leading-relaxed">
                  Explora alternativas de aseguramiento para actividades como energía, construcción, manufactura y logística, considerando sus riesgos particulares.
                </p>
              </div>

              <div className="pt-8 inline-flex items-center text-[#0B2D58] group-hover:text-[#D4A737] font-semibold text-xs tracking-wider uppercase transition-colors">
                <span className="mr-2">CONOCER MÁS</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
