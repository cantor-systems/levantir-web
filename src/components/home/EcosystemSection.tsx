import React from 'react';
import Link from 'next/link';
import { ArrowRight, User, Home, Building2, Briefcase, ShieldCheck } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';

export function EcosystemSection() {
  return (
    <Section className="bg-[#F8F5EF] border-b border-[#E8E8E8] py-18 sm:py-24 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-stretch">
          {/* Left Column: Architectural Photo with Editorial Text Overlay (4 cols on lg) */}
          <div className="lg:col-span-4 relative rounded-[2px] overflow-hidden min-h-[360px] lg:min-h-[440px] bg-[#0B2D58] border border-[#E8E8E8]">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
              alt="Arquitectura corporativa contemporánea y patrimonio"
              className="w-full h-full object-cover opacity-75 filter brightness-[0.98] contrast-[1.05]"
              loading="lazy"
            />
            {/* Subtle Gradient & Typographic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2D58]/95 via-[#0B2D58]/55 to-transparent p-8 sm:p-10 flex flex-col justify-end">
              <div className="space-y-2.5 border-l-2 border-[#D4A737] pl-4">
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/70">
                  EMPRESAS
                </p>
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/70">
                  PERSONAS
                </p>
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/70">
                  PATRIMONIO
                </p>
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D4A737]">
                  CONTINUIDAD
                </p>
              </div>
            </div>
          </div>

          {/* Center Column: Editorial Narrative & CTA (4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-6 sm:space-y-7">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
              UN ECOSISTEMA INTEGRADO
            </p>

            <h2
              className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] text-[#0B2D58] leading-[1.14] font-medium"
              style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
            >
              Tu empresa y tu patrimonio no existen por separado.
            </h2>

            <p className="text-base sm:text-[1.05rem] text-[#2E2E2E]/85 leading-relaxed">
              En LEVANTIR integramos una visión completa de tus personas, tu patrimonio y tu operación, para diseñar soluciones que consideren todas sus dimensiones.
            </p>

            <div className="pt-2">
              <Link
                href="?advisory=true"
                scroll={false}
                className="inline-flex items-center gap-2 bg-[#D4A737] hover:bg-[#C4962B] text-[#0B2D58] px-7 py-4 text-xs sm:text-[0.82rem] font-bold tracking-[0.14em] uppercase rounded-[2px] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2D58] whitespace-nowrap"
              >
                <span>CONSULTAR A UN ASESOR</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Editorial Structural Constellation (4 cols on lg) */}
          <div className="lg:col-span-4 flex items-center justify-center p-6 sm:p-8 lg:p-10 bg-white rounded-[2px] border border-[#E8E8E8] min-h-[400px] sm:min-h-[440px] overflow-hidden">
            <div className="relative w-full max-w-[340px] sm:max-w-[350px] aspect-square flex items-center justify-center">
              {/* Subtle cross trajectory lines */}
              <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-[1px] bg-[#E8E8E8]" />
              <div className="absolute inset-y-8 left-1/2 -translate-x-1/2 w-[1px] bg-[#E8E8E8]" />

              {/* Center: Empresa (Lo que te impulsa) */}
              <div className="relative z-10 flex flex-col items-center text-center p-4 sm:p-4.5 bg-white rounded-[2px] border border-[#0B2D58]/25 shadow-xs">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F8F5EF] flex items-center justify-center text-[#0B2D58] mb-1.5">
                  <Building2 className="w-5 h-5 text-[#0B2D58]" />
                </div>
                <span className="text-xs sm:text-[0.82rem] font-bold text-[#0B2D58]">Empresa</span>
                <span className="text-[0.68rem] sm:text-[0.72rem] text-[#5C626B]">Lo que te impulsa</span>
              </div>

              {/* Top: Personas */}
              <div className="absolute top-1 sm:top-2 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center text-[#0B2D58] mb-1.5 shadow-xs">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B2D58]" />
                </div>
                <span className="text-xs sm:text-[0.82rem] font-bold text-[#0B2D58]">Personas</span>
                <span className="text-[0.68rem] sm:text-[0.72rem] text-[#5C626B] whitespace-nowrap">Tu mayor valor</span>
              </div>

              {/* Left: Patrimonio */}
              <div className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center text-[#0B2D58] mb-1.5 shadow-xs">
                  <Home className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B2D58]" />
                </div>
                <span className="text-xs sm:text-[0.82rem] font-bold text-[#0B2D58]">Patrimonio</span>
                <span className="text-[0.68rem] sm:text-[0.72rem] text-[#5C626B] whitespace-nowrap">Lo construido</span>
              </div>

              {/* Right: Operación */}
              <div className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center text-[#0B2D58] mb-1.5 shadow-xs">
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B2D58]" />
                </div>
                <span className="text-xs sm:text-[0.82rem] font-bold text-[#0B2D58]">Operación</span>
                <span className="text-[0.68rem] sm:text-[0.72rem] text-[#5C626B] whitespace-nowrap">Lo hace posible</span>
              </div>

              {/* Bottom: Riesgos especializados */}
              <div className="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center text-[#0B2D58] mb-1.5 shadow-xs">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4A737]" />
                </div>
                <span className="text-xs sm:text-[0.82rem] font-bold text-[#0B2D58] whitespace-nowrap">Riesgos especializados</span>
                <span className="text-[0.68rem] sm:text-[0.72rem] text-[#5C626B] whitespace-nowrap">Lo extraordinario</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
