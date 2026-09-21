import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';

export function PhilosophySection() {
  return (
    <Section id="nosotros" className="bg-[#FFFFFF] border-b border-[#E8E8E8] py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Left Column: Eyebrow + H2 */}
          <div className="lg:col-span-6 space-y-4">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
              NUESTRA FILOSOFÍA
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl md:text-[2.85rem] lg:text-[3.25rem] text-[#0B2D58] leading-[1.12] font-medium"
              style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
            >
              El riesgo cambia. <br />
              Lo importante es estar preparado.
            </h2>
          </div>

          {/* Right Column: Highlighted statement + supporting copy */}
          <div className="lg:col-span-6 lg:border-l lg:border-[#E8E8E8] lg:pl-8 xl:pl-12 flex flex-col justify-center space-y-6 pt-2 lg:pt-4">
            <div className="border-l-2 border-[#D4A737] pl-5 lg:border-none lg:pl-0">
              <p className="text-xl sm:text-2xl lg:text-[1.65rem] font-medium text-[#0B2D58] leading-[1.3]">
                No comenzamos por una póliza. Comenzamos por entender qué necesitas proteger.
              </p>
            </div>

            <p className="text-base sm:text-[1.05rem] text-[#2E2E2E]/85 leading-relaxed max-w-[55ch]">
              Escuchamos, analizamos y diseñamos soluciones a la medida, con una visión integral de tu patrimonio, para que puedas avanzar con tranquilidad.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
