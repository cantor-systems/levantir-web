import React from 'react';
import Link from 'next/link';
import { LevantirLogo } from '../brand/LevantirLogo';
import { Container } from './Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const solutions = [
    { label: "Autos", href: "/autos" },
    { label: "Personas", href: "/personas" },
    { label: "PYMES", href: "/pymes" },
    { label: "Mercancías", href: "/mercancias" },
    { label: "Aeronaves", href: "/aeronaves" },
    { label: "Sectores especializados", href: "/sectores-especializados" },
  ];

  const brandLinks = [
    { label: "Nosotros", href: "/nosotros" },
    { label: "Insights", href: "/insights" },
    { label: "Contacto", href: "/contacto" },
  ];

  const legalLinks = [
    { label: "Aviso de privacidad", href: "#aviso-de-privacidad" },
    { label: "Términos y condiciones", href: "#terminos-y-condiciones" },
  ];

  return (
    <footer className="bg-[#0B2D58] text-white pt-16 pb-12 border-t border-[#071E3B]">
      <Container>
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 pb-14 border-b border-white/15">
          {/* Column 1: Brand & Descriptor (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6 min-w-0">
            <Link
              href="/"
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A737]"
            >
              <LevantirLogo variant="light" size="md" showDescriptor={true} />
            </Link>

            <p className="text-white/90 text-sm sm:text-base font-normal max-w-[42ch] leading-relaxed pt-2">
              Protegemos lo que has construido.
            </p>

            <p className="text-white/60 text-xs sm:text-sm max-w-[48ch] leading-relaxed">
              Soluciones de protección para personas, empresarios y empresas que buscan tomar mejores decisiones frente al riesgo.
            </p>
          </div>

          {/* Column 2: Soluciones (3 cols on lg) */}
          <div className="lg:col-span-3 min-w-0">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#D4A737] mb-4">
              Soluciones
            </p>
            <ul className="space-y-2.5">
              {solutions.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/80 hover:text-white transition-colors py-0.5 inline-block focus:outline-none focus-visible:text-[#D4A737]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: LEVANTIR (2 cols on lg) */}
          <div className="lg:col-span-2 min-w-0">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#D4A737] mb-4">
              LEVANTIR
            </p>
            <ul className="space-y-2.5">
              {brandLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/80 hover:text-white transition-colors py-0.5 inline-block focus:outline-none focus-visible:text-[#D4A737]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal (2 cols on lg) */}
          <div className="lg:col-span-2 min-w-0">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#D4A737] mb-4">
              Legal
            </p>
            <ul className="space-y-2.5">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/80 hover:text-white transition-colors py-0.5 inline-block focus:outline-none focus-visible:text-[#D4A737]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/50">
          <p>© {currentYear} LEVANTIR. Todos los derechos reservados.</p>
          <p className="tracking-[0.12em] uppercase text-[0.7rem] text-white/60">
            Criterio · Estructura · Protección · Continuidad
          </p>
        </div>
      </Container>
    </footer>
  );
}
