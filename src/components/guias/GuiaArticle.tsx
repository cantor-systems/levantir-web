import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AdvisoryLink } from "@/components/ui/AdvisoryLink";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/service/Breadcrumbs";
import { GuiaCard } from "@/components/guias/GuiaCard";
import {
  GUIAS_BASE_PATH,
  GUIA_CTA_BUTTON,
  GUIA_EDITORIAL_NOTE,
  getRelatedGuias,
  type GuiaDeSeguros,
} from "@/content/guias-de-seguros";

interface GuiaArticleProps {
  guia: GuiaDeSeguros;
}

const displayFont = {
  fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif',
} as const;

/**
 * Plantilla reutilizable de artículo de «Guías de seguros».
 * Un único <h1> (título), secciones con <h2>, imagen principal,
 * CTA contextual y guías relacionadas.
 */
export function GuiaArticle({ guia }: GuiaArticleProps) {
  const related = getRelatedGuias(guia.slug, 3);

  return (
    <article className="bg-white">
      {/* Encabezado */}
      <header className="bg-[#F8F5EF] border-b border-[#E8E8E8] pt-10 sm:pt-12 pb-12 sm:pb-16 lg:pb-20">
        <Container>
          <div className="max-w-4xl">
            <div className="mb-8 sm:mb-10">
              <Breadcrumbs
                items={[
                  { label: "Inicio", href: "/" },
                  { label: "Guías de seguros", href: GUIAS_BASE_PATH },
                  { label: guia.category, isCurrent: true },
                ]}
              />
            </div>

            <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
              <span className="w-7 h-[1.5px] bg-[#D4A737]" aria-hidden="true" />
              <p className="text-xs sm:text-[0.8rem] font-bold tracking-[0.2em] uppercase text-[#D4A737]">
                {guia.category}
              </p>
            </div>

            <h1
              className="font-display text-3xl sm:text-4xl md:text-[2.9rem] lg:text-[3.2rem] leading-[1.12] text-[#0B2D58] tracking-[-0.01em] font-medium mb-6 sm:mb-8"
              style={displayFont}
            >
              {guia.title}
            </h1>

            <p className="text-base sm:text-lg md:text-[1.18rem] text-[#2E2E2E]/90 leading-[1.7] max-w-[62ch]">
              {guia.intro}
            </p>
          </div>
        </Container>
      </header>

      {/* Imagen principal */}
      <div className="bg-white pt-10 sm:pt-14">
        <Container>
          <figure className="max-w-5xl mx-auto overflow-hidden rounded-[2px] border border-[#E8E8E8] bg-[#E8E8E8] aspect-[16/9] shadow-sm">
            <img
              src={guia.image.src}
              alt={guia.image.alt}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
          </figure>
        </Container>
      </div>

      {/* Cuerpo del artículo */}
      <div className="bg-white py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl mx-auto space-y-10 sm:space-y-12">
            {guia.sections.map((section, index) => {
              const headingId = `seccion-${index + 1}`;
              return (
                <section key={section.heading} aria-labelledby={headingId}>
                  <h2
                    id={headingId}
                    className="font-display text-2xl sm:text-[1.75rem] text-[#0B2D58] leading-[1.25] font-medium mb-3.5"
                    style={displayFont}
                  >
                    {section.heading}
                  </h2>
                  <p className="text-base sm:text-[1.08rem] text-[#2E2E2E]/90 leading-[1.75]">
                    {section.body}
                  </p>
                </section>
              );
            })}
          </div>
        </Container>
      </div>

      {/* CTA contextual */}
      <section aria-labelledby="guia-cta-titulo" className="bg-white pb-14 sm:pb-16 lg:pb-20">
        <Container>
          <div className="max-w-4xl mx-auto bg-[#0B2D58] text-white rounded-[2px] border border-[#071E3B] p-8 sm:p-10 lg:p-12">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-6 h-[1.5px] bg-[#D4A737]" aria-hidden="true" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
                ORIENTACIÓN EN SEGUROS
              </p>
            </div>
            <h2
              id="guia-cta-titulo"
              className="font-display text-2xl sm:text-3xl lg:text-[2.2rem] text-white leading-[1.2] font-medium mb-4"
              style={displayFont}
            >
              {guia.cta.heading}
            </h2>
            <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-[60ch] mb-8">
              {guia.cta.text}
            </p>
            <AdvisoryLink
              href="?advisory=true"
              scroll={false}
              className="inline-flex items-center justify-center gap-2.5 bg-[#D4A737] hover:bg-[#C4962B] text-[#0B2D58] px-7 py-4 text-xs sm:text-[0.82rem] font-bold tracking-[0.14em] uppercase rounded-[2px] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap"
            >
              <span>{GUIA_CTA_BUTTON}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </AdvisoryLink>
          </div>

          <p className="max-w-4xl mx-auto mt-6 text-xs sm:text-[0.8rem] text-[#5C626B] leading-relaxed">
            {GUIA_EDITORIAL_NOTE}
          </p>
        </Container>
      </section>

      {/* Sigue leyendo */}
      <aside
        aria-labelledby="guias-relacionadas-titulo"
        className="bg-[#F8F5EF] border-t border-[#E8E8E8] py-16 sm:py-20"
      >
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 sm:mb-12">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-[1.5px] bg-[#D4A737]" aria-hidden="true" />
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
                  SIGUE LEYENDO
                </p>
              </div>
              <h2
                id="guias-relacionadas-titulo"
                className="font-display text-2xl sm:text-3xl lg:text-[2.35rem] text-[#0B2D58] leading-[1.18] font-medium"
                style={displayFont}
              >
                Más guías de seguros
              </h2>
            </div>

            <Link
              href={GUIAS_BASE_PATH}
              className="inline-flex items-center text-xs font-bold tracking-[0.14em] uppercase text-[#0B2D58] hover:text-[#D4A737] transition-colors whitespace-nowrap gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A737]"
            >
              <span>VER TODAS LAS GUÍAS</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
            {related.map((item) => (
              <GuiaCard key={item.slug} guia={item} />
            ))}
          </div>
        </Container>
      </aside>
    </article>
  );
}
