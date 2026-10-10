import React from 'react';
import { AdvisoryLink as Link } from "@/components/ui/AdvisoryLink";
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
            <div className="relative w-full max-w-[280px] sm:max-w-[380px] aspect-square flex items-center justify-center mt-4 sm:mt-0">
              {/* Connection Lines via SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                <line x1="50" y1="50" x2="50" y2="14" stroke="#E8E8E8" strokeWidth="0.4" />
                <line x1="50" y1="50" x2="50" y2="86" stroke="#E8E8E8" strokeWidth="0.4" />
                <line x1="50" y1="50" x2="14" y2="50" stroke="#E8E8E8" strokeWidth="0.4" />
                <line x1="50" y1="50" x2="86" y2="50" stroke="#E8E8E8" strokeWidth="0.4" />
              </svg>

              {/* Center: Empresa */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center z-10 w-[100px] sm:w-[120px]">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F8F5EF] border border-[#D4A737]/40 flex items-center justify-center text-[#0B2D58] mb-1 sm:mb-1.5 shadow-sm relative z-10">
                  <Building2 className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <div className="bg-white/95 px-1 py-0.5 rounded text-[#0B2D58] relative z-10">
                  <span className="block text-[0.8rem] sm:text-[0.9rem] font-bold leading-tight">Empresa</span>
                  <span className="block text-[0.65rem] sm:text-[0.7rem] text-[#5C626B] leading-tight mt-0.5">Lo que te impulsa</span>
                </div>
              </div>

              {/* Top: Personas */}
              <div className="absolute top-[14%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center z-10 w-[120px] sm:w-[130px]">
                <div className="bg-white/95 px-1 py-0.5 rounded text-[#0B2D58] absolute bottom-full mb-1">
                  <span className="block text-[0.7rem] sm:text-[0.8rem] font-bold leading-tight">Personas</span>
                  <span className="block text-[0.6rem] sm:text-[0.65rem] text-[#5C626B] leading-tight mt-0.5 whitespace-nowrap">Tu mayor valor</span>
                </div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center text-[#0B2D58] shadow-sm relative z-10">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B2D58]" />
                </div>
              </div>

              {/* Bottom: Riesgos especializados */}
              <div className="absolute top-[86%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center z-10 w-[150px] sm:w-[170px]">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center text-[#0B2D58] shadow-sm relative z-10">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4A737]" />
                </div>
                <div className="bg-white/95 px-1 py-0.5 rounded text-[#0B2D58] absolute top-full mt-1">
                  <span className="block text-[0.7rem] sm:text-[0.8rem] font-bold leading-tight">Riesgos especializados</span>
                  <span className="block text-[0.6rem] sm:text-[0.65rem] text-[#5C626B] leading-tight mt-0.5 whitespace-nowrap">Lo extraordinario</span>
                </div>
              </div>

              {/* Left: Patrimonio */}
              <div className="absolute top-1/2 left-[14%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center z-10 w-[90px] sm:w-[110px]">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center text-[#0B2D58] shadow-sm relative z-10">
                  <Home className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B2D58]" />
                </div>
                <div className="bg-white/95 px-1 py-0.5 rounded text-[#0B2D58] absolute top-full mt-1">
                  <span className="block text-[0.7rem] sm:text-[0.8rem] font-bold leading-tight">Patrimonio</span>
                  <span className="block text-[0.6rem] sm:text-[0.65rem] text-[#5C626B] leading-tight mt-0.5 whitespace-nowrap">Lo construido</span>
                </div>
              </div>

              {/* Right: Operación */}
              <div className="absolute top-1/2 left-[86%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center z-10 w-[90px] sm:w-[110px]">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center text-[#0B2D58] shadow-sm relative z-10">
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B2D58]" />
                </div>
                <div className="bg-white/95 px-1 py-0.5 rounded text-[#0B2D58] absolute top-full mt-1">
                  <span className="block text-[0.7rem] sm:text-[0.8rem] font-bold leading-tight">Operación</span>
                  <span className="block text-[0.6rem] sm:text-[0.65rem] text-[#5C626B] leading-tight mt-0.5 whitespace-nowrap">Lo hace posible</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

