import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { solutionsData } from '../../config/site';

export function SolutionsSection() {
  return (
    <Section id="soluciones" className="bg-[#F8F5EF] border-b border-[#E8E8E8] py-20 sm:py-24 lg:py-30">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3.5">
            NUESTRAS SOLUCIONES
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl lg:text-[3.15rem] text-[#0B2D58] leading-[1.12] font-medium"
            style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
          >
            Protección para diferentes dimensiones de tu patrimonio.
          </h2>
        </div>

        {/* 6 Solutions Editorial Grid with Elevated Stature */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 lg:gap-9 xl:gap-10">
          {solutionsData.map((item) => (
            <Link
              key={item.id}
              id={`soluciones-${item.id}`}
              href={item.href}
              className="group cursor-pointer bg-white rounded-[2px] border border-[#E8E8E8] hover:border-[#0B2D58]/35 transition-all duration-300 flex flex-col overflow-hidden min-w-0 focus-within:ring-2 focus-within:ring-[#D4A737]"
            >
              {/* Image First with Generous Useful Height (Aspect ratio ~16:11.5) */}
              <div className="relative aspect-[16/11.5] overflow-hidden bg-[#E8E8E8]">
                <img
                  src={item.imageUrl}
                  alt={item.altText}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>

              {/* Card Body with Generous Internal Spacing */}
              <div className="p-7 sm:p-8 lg:p-9 flex flex-col justify-between flex-1">
                <div>
                  <h3
                    className="font-display text-2xl sm:text-[1.72rem] text-[#0B2D58] font-medium leading-snug group-hover:text-[#D4A737] transition-colors"
                    style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.96rem] sm:text-[1rem] text-[#2E2E2E]/85 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                {/* Subtle Directional Arrow */}
                <div className="pt-7 flex items-center text-[#0B2D58] group-hover:text-[#D4A737] transition-colors">
                  <span className="text-xs font-semibold tracking-wider uppercase mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Consultar
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
