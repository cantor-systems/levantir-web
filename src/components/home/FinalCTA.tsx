import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Container } from '../layout/Container';
export function FinalCTA() {
  return (
    <section id="contacto" className="bg-[#0B2D58] text-white py-24 sm:py-28 lg:py-32 xl:py-36 relative overflow-hidden border-t border-[#071E3B] flex items-center">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          {/* Left Column: Eyebrow + H2 (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-4 min-w-0">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
              ASESORÍA ESPECIALIZADA
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl md:text-[2.95rem] lg:text-[3.35rem] text-white leading-[1.12] font-medium"
              style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
            >
              Lo que has construido merece una estrategia de protección a su altura.
            </h2>
          </div>

          {/* Right Column: Supporting copy + CTAs (5 cols on lg) */}
          <div className="lg:col-span-5 lg:border-l lg:border-white/15 lg:pl-8 xl:pl-12 flex flex-col justify-center space-y-6 sm:space-y-7 min-w-0">
            <p className="text-base sm:text-lg text-white/90 leading-relaxed">
              Cuéntanos qué necesitas proteger. Te ayudaremos a identificar el siguiente paso con visión de largo plazo.
            </p>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center lg:items-stretch xl:items-center gap-3.5 sm:gap-4 pt-2">
              <Link
                href="?advisory=true"
                scroll={false}
                className="inline-flex items-center justify-center gap-2 bg-[#D4A737] hover:bg-[#C4962B] text-[#0B2D58] px-8 sm:px-10 py-4 text-xs font-bold tracking-[0.14em] uppercase rounded-[2px] transition-colors shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Solicitar Asesoría</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="https://wa.me/5215500000000?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20asesor%C3%ADa%20en%20LEVANTIR"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white text-white px-6 py-4 text-xs sm:text-[0.82rem] font-semibold tracking-[0.12em] uppercase rounded-[2px] transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-[#D4A737]" />
                <span>ESCRÍBENOS POR WHATSAPP</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
