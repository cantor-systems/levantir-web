import type { Metadata } from "next";
import Link from "next/link";
import { AdvisoryLink } from "@/components/ui/AdvisoryLink";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/service/PageHero";
import { GuiaCard } from "@/components/guias/GuiaCard";
import { methodologySteps, siteConfig } from "@/config/site";
import {
  GUIAS_BASE_PATH,
  GUIAS_CRITERIO_PUBLICACION,
  GUIA_DESTACADA_SLUG,
  GUIA_TOPICS,
  findGuiaTopicById,
  getGuiaBySlug,
  getGuiaHref,
  getGuiasByTopic,
  guiasDeSeguros,
} from "@/content/guias-de-seguros";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";

const PAGE_TITLE = "Guías de seguros | LEVANTIR";
const PAGE_DESCRIPTION =
  "Guías educativas de LEVANTIR para comprender mejor los seguros: cuándo revisarlos, qué considerar al comparar opciones y qué aspectos de las coberturas conviene entender.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `${siteConfig.url}${GUIAS_BASE_PATH}` },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}${GUIAS_BASE_PATH}`,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    locale: "es_MX",
    siteName: "LEVANTIR",
  },
};

const displayStyle = {
  fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif',
};

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="w-6 h-[1.5px] bg-[#D4A737]" aria-hidden="true" />
      <p className={`text-xs font-bold tracking-[0.2em] uppercase ${light ? "text-[#D4A737]" : "text-[#D4A737]"}`}>
        {children}
      </p>
    </div>
  );
}

type GuiasDeSegurosPageProps = {
  searchParams: Promise<{ tema?: string }>;
};

export default async function GuiasDeSegurosPage({
  searchParams,
}: GuiasDeSegurosPageProps) {
  const params = await searchParams;
  const activeTopic = findGuiaTopicById(params?.tema);

  const destacada = getGuiaBySlug(GUIA_DESTACADA_SLUG);
  const demas = guiasDeSeguros.filter((g) => g.slug !== GUIA_DESTACADA_SLUG);

  const displayedGuias = activeTopic ? getGuiasByTopic(activeTopic.id) : demas;

  return (
    <div className="bg-white">
      {/* 1. Hero */}
      <PageHero
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Guías de seguros", href: GUIAS_BASE_PATH },
        ]}
        eyebrow="GUÍAS DE SEGUROS"
        title="Entender tus seguros te ayuda a tomar mejores decisiones."
        supportingCopy="Guías educativas para comprender cuándo revisar tus seguros, qué considerar al comparar opciones y qué aspectos de las coberturas conviene conocer."
        primaryCtaText="EXPLORAR GUÍAS"
        primaryCtaHref="#guias"
        secondaryCtaText="SOLICITAR ORIENTACIÓN"
        secondaryCtaHref="?advisory=true"
        imageUrl="/images/insights/hero-insights.webp"
        imageAlt="Profesionales revisando documentación técnica y notas de análisis en mesa de trabajo con luz natural"
        imagePositionClass="object-[70%_center] sm:object-[75%_center] lg:object-[80%_center]"
        trustNote="Contenido informativo · No sustituye la atención de un agente autorizado"
        cornerDescriptorCategory="GUÍAS DE SEGUROS"
        cornerDescriptorText="Información antes de decidir."
        ariaLabel="Hero de Guías de seguros"
      />

      {/* 2. Guía destacada */}
      {destacada && (
        <section
          id="destacada"
          aria-labelledby="guia-destacada-titulo"
          className="py-20 sm:py-24 lg:py-32 bg-white border-b border-[#E8E8E8] scroll-mt-20"
        >
          <Container>
            <div className="mb-10 sm:mb-12">
              <Eyebrow>GUÍA DESTACADA</Eyebrow>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-16 items-center bg-[#F8F5EF] border border-[#E8E8E8] rounded-[2px] overflow-hidden p-6 sm:p-8 lg:p-12 xl:p-14">
              <div className="lg:col-span-6 overflow-hidden rounded-[2px] bg-[#E8E8E8] aspect-[16/11] lg:aspect-[4/3] shadow-sm">
                <img
                  src={destacada.image.src}
                  alt={destacada.image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                  loading="eager"
                  decoding="async"
                />
              </div>

              <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E8E8E8] rounded-full text-xs font-semibold tracking-wider uppercase text-[#0B2D58] w-fit">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A737]" aria-hidden="true" />
                  <span>{destacada.category}</span>
                </div>

                <h2
                  id="guia-destacada-titulo"
                  className="font-display text-2xl sm:text-3xl lg:text-[2.35rem] text-[#0B2D58] leading-[1.18] font-medium"
                  style={displayStyle}
                >
                  {destacada.title}
                </h2>

                <p className="text-base sm:text-[1.05rem] text-[#2E2E2E]/80 leading-relaxed">
                  {destacada.metaDescription}
                </p>

                <div className="pt-3">
                  <Link
                    href={getGuiaHref(destacada.slug)}
                    className="inline-flex items-center gap-2.5 bg-[#0B2D58] hover:bg-[#071E3B] text-white px-7 py-3.5 text-xs sm:text-[0.82rem] font-bold tracking-[0.14em] uppercase rounded-[2px] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A737]"
                  >
                    <span>LEER GUÍA</span>
                    <ArrowRight className="w-4 h-4 text-[#D4A737]" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 3. Explora por tema */}
      <Section className="py-20 sm:py-24 bg-[#F8F5EF] border-b border-[#E8E8E8]">
        <Container>
          <div className="max-w-3xl space-y-4 mb-14">
            <Eyebrow>EXPLORA POR TEMA</Eyebrow>
            <h2
              className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] text-[#0B2D58] leading-[1.12] font-medium"
              style={displayStyle}
            >
              Información para distintos tipos de seguros.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/80 leading-relaxed pt-1">
              Selecciona un tema para explorar los artículos correspondientes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {GUIA_TOPICS.map((topic) => {
              const isActive = activeTopic?.id === topic.id;
              const targetHref = isActive
                ? `${GUIAS_BASE_PATH}#guias`
                : `${GUIAS_BASE_PATH}?tema=${topic.id}#guias`;

              return (
                <Link
                  href={targetHref}
                  key={topic.id}
                  className={`p-6 sm:p-7 rounded-[2px] border ${
                    isActive
                      ? "border-[#D4A737] bg-white ring-1 ring-[#D4A737] shadow-xs"
                      : "border-[#E8E8E8] bg-white hover:border-[#0B2D58]/40 hover:shadow-xs"
                  } text-[#2E2E2E] transition-all duration-200 flex flex-col justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A737]`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold tracking-[0.16em] uppercase text-[#D4A737]">
                        {topic.name}
                      </p>
                      <ArrowUpRight
                        className={`w-4 h-4 ${
                          isActive
                            ? "text-[#D4A737]"
                            : "text-[#0B2D58]/40 group-hover:text-[#0B2D58]"
                        } transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-sm text-[#2E2E2E]/75 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>

                  <div className="pt-5 border-t mt-5 border-[#E8E8E8]">
                    <span className="text-[0.75rem] font-bold tracking-[0.12em] uppercase inline-flex items-center gap-1.5 text-[#0B2D58] group-hover:text-[#D4A737] transition-colors">
                      <span>{isActive ? "TEMA ACTIVO" : "EXPLORAR"}</span>
                      <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 4. Biblioteca */}
      <Section id="guias" className="py-20 sm:py-24 lg:py-32 bg-white scroll-mt-20">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 sm:mb-16">
            <div className="max-w-2xl space-y-3">
              <Eyebrow>BIBLIOTECA</Eyebrow>
              <h2
                className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] text-[#0B2D58] leading-[1.12] font-medium"
                style={displayStyle}
              >
                {activeTopic
                  ? `Guías sobre ${activeTopic.name.toLowerCase()}`
                  : "Guías para entender mejor tus seguros."}
              </h2>
              {activeTopic && (
                <p className="text-base text-[#2E2E2E]/80 leading-relaxed">
                  Mostrando artículos educativos en la categoría{" "}
                  <span className="font-semibold text-[#0B2D58]">{activeTopic.name}</span>.
                </p>
              )}
            </div>

            {activeTopic && (
              <div className="pt-2 sm:pt-0">
                <Link
                  href={`${GUIAS_BASE_PATH}#guias`}
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase text-[#0B2D58] hover:text-[#D4A737] border border-[#E8E8E8] hover:border-[#D4A737] px-4 py-2.5 rounded-[2px] transition-colors bg-white shadow-2xs whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A737]"
                >
                  <span>VER TODAS LAS GUÍAS</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>

          {displayedGuias.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9 lg:gap-10">
              {displayedGuias.map((guia) => (
                <GuiaCard key={guia.slug} guia={guia} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-[#E8E8E8] rounded-[2px] bg-[#F8F5EF] space-y-4">
              <p className="text-base text-[#2E2E2E]/80">
                No se encontraron guías en este tema.
              </p>
              <Link
                href={`${GUIAS_BASE_PATH}#guias`}
                className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase text-[#0B2D58] hover:text-[#D4A737] transition-colors font-semibold"
              >
                <span>VER TODAS LAS GUÍAS</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          )}
        </Container>
      </Section>

      {/* 5. Enfoque */}
      <Section className="py-20 sm:py-24 lg:py-28 bg-[#0B2D58] text-white border-t border-[#071E3B]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-5">
              <Eyebrow>NUESTRO ENFOQUE</Eyebrow>
              <h2
                className="font-display text-3xl sm:text-4xl text-white leading-[1.15] font-medium"
                style={displayStyle}
              >
                Información clara para decidir con mayor conocimiento.
              </h2>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                {GUIAS_CRITERIO_PUBLICACION}
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white/5 border border-white/12 p-8 sm:p-10 rounded-[2px] space-y-6">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] border-b border-white/10 pb-4">
                  CÓMO TE ORIENTAMOS
                </p>
                <ol className="space-y-4">
                  {methodologySteps.map((step) => (
                    <li key={step.number} className="flex gap-4">
                      <span className="text-[0.75rem] font-mono text-[#D4A737] pt-1">
                        {step.number}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-white font-sans">{step.title}</p>
                        <p className="text-sm text-white/70 leading-normal">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. CTA final */}
      <section className="bg-[#0B2D58] text-white py-24 sm:py-28 lg:py-32 relative overflow-hidden border-t border-white/10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
            <div className="lg:col-span-7 space-y-4 min-w-0">
              <Eyebrow>HABLEMOS DE TU SITUACIÓN</Eyebrow>
              <h2
                className="font-display text-3xl sm:text-4xl md:text-[2.95rem] text-white leading-[1.12] font-medium"
                style={displayStyle}
              >
                ¿Tienes dudas sobre tus seguros?
              </h2>
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-white/15 lg:pl-8 xl:pl-12 flex flex-col justify-center space-y-6 min-w-0">
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                Cuéntanos tu situación y te orientamos para que puedas contactar a un agente de seguros autorizado.
              </p>
              <div className="pt-1">
                <AdvisoryLink
                  href="?advisory=true"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#D4A737] hover:bg-[#C4962B] text-[#0B2D58] px-7 py-4 text-xs sm:text-[0.82rem] font-bold tracking-[0.14em] uppercase rounded-[2px] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap"
                >
                  <span>SOLICITAR ORIENTACIÓN</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </AdvisoryLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
