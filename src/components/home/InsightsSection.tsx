import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { insightsData } from '../../config/site';

export function InsightsSection() {
  return (
    <Section id="insights" className="bg-[#F8F5EF] border-b border-[#E8E8E8] py-20 sm:py-24 lg:py-28">
      <Container>
        {/* Section Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 sm:mb-16">
          <div className="max-w-2xl space-y-3.5">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
              LEVANTIR INSIGHTS
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl lg:text-[3.15rem] text-[#0B2D58] leading-[1.12] font-medium"
              style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
            >
              Entender el riesgo permite tomar mejores decisiones.
            </h2>
          </div>

          <Link
            href="/insights"
            className="inline-flex items-center text-xs font-bold tracking-[0.14em] uppercase text-[#0B2D58] hover:text-[#D4A737] transition-colors whitespace-nowrap pb-1"
          >
            <span>VER TODOS LOS ARTÍCULOS</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        {/* 3 Articles Grid with Elevated Scale & Balance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 sm:gap-8 lg:gap-8 xl:gap-9 items-stretch">
          {insightsData.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group bg-white rounded-[2px] border border-[#E8E8E8] hover:border-[#0B2D58]/35 transition-all duration-300 flex flex-col justify-between overflow-hidden min-w-0 h-full cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4A737] outline-none"
            >
              <div className="aspect-[16/10.5] overflow-hidden bg-[#E8E8E8]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>

              <div className="p-7 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[0.72rem] font-bold tracking-[0.2em] uppercase text-[#D4A737] block mb-2.5">
                    {item.category}
                  </span>
                  <h3
                    className="font-display text-xl sm:text-[1.42rem] lg:text-[1.48rem] text-[#0B2D58] font-medium leading-snug group-hover:text-[#D4A737] transition-colors mb-3"
                    style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[0.93rem] sm:text-[0.96rem] text-[#2E2E2E]/85 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E8E8E8]/80 flex items-center text-[#0B2D58] group-hover:text-[#D4A737] font-semibold text-xs tracking-wider uppercase transition-colors">
                  <span className="mr-2">LEER ARTÍCULO</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
