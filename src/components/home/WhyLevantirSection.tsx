import React from 'react';
import { Search, Shield, Layers, Users } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { principlesData } from '../../config/site';

export function WhyLevantirSection() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'analysis':
        return <Search className="w-5 h-5 text-[#D4A737]" />;
      case 'protection':
        return <Shield className="w-5 h-5 text-[#D4A737]" />;
      case 'solutions':
        return <Layers className="w-5 h-5 text-[#D4A737]" />;
      case 'accompaniment':
        return <Users className="w-5 h-5 text-[#D4A737]" />;
      default:
        return <Shield className="w-5 h-5 text-[#D4A737]" />;
    }
  };

  return (
    <Section className="bg-[#FFFFFF] border-b border-[#E8E8E8] py-22 sm:py-28 lg:py-36">
      <Container>
        {/* Section Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start mb-18 sm:mb-24 lg:mb-28">
          <div className="lg:col-span-6 space-y-3.5">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
              POR QUÉ LEVANTIR
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl lg:text-[3.15rem] text-[#0B2D58] leading-[1.12] font-medium"
              style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
            >
              Criterio antes que catálogo.
            </h2>
          </div>

          <div className="lg:col-span-6 lg:pt-8">
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed max-w-[52ch]">
              Más que intermediarios, somos asesores. Nuestro compromiso es ayudarte a tomar mejores decisiones, con una visión de largo plazo.
            </p>
          </div>
        </div>

        {/* 4 Principle Columns: Airy, Elegant & High Readability */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9 sm:gap-11 lg:gap-10 xl:gap-14">
          {principlesData.map((item) => (
            <div key={item.id} className="group space-y-4 min-w-0">
              {/* Circular clean badge with gold/navy icon */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F8F5EF] border border-[#E8E8E8] flex items-center justify-center mb-7 group-hover:border-[#D4A737] transition-colors">
                {getIcon(item.iconType)}
              </div>

              <h3 className="text-xl sm:text-[1.36rem] font-bold text-[#0B2D58] tracking-tight">
                {item.title}
              </h3>

              <p className="text-[1rem] sm:text-[1.04rem] text-[#2E2E2E]/90 leading-[1.72]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
