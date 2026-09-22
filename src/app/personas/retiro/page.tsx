import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/service/PageHero";
import { ApproachSection } from "@/components/service/ApproachSection";
import { ServiceMethodologySection } from "@/components/service/ServiceMethodologySection";
import { CTASection } from "@/components/service/CTASection";
import { Clock, PiggyBank, Target, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Planes de Retiro y Protección Financiera | LEVANTIR",
  description: "Construir patrimonio también significa preparar el futuro. En LEVANTIR te ayudamos a estructurar planes de retiro con visión de largo plazo y criterio independiente.",
  alternates: { canonical: "https://levantir.com/personas/retiro" },
};

const breadcrumbs = [
  { label: "Inicio", href: "/" },
  { label: "Personas", href: "/personas" },
  { label: "Retiro", isCurrent: true },
];

const keyAspects = [
  {
    name: "Horizonte de tiempo",
    icon: Clock,
    summary: "Los años proyectados para capitalizar y consolidar el fondo, permitiendo que la disciplina y el tiempo jueguen a favor de tu meta.",
  },
  {
    name: "Capacidad de aportación",
    icon: PiggyBank,
    summary: "Estructuración de aportaciones sostenibles y proporcionales a tu flujo de ingresos actual, sin asfixiar la liquidez familiar diaria.",
  },
  {
    name: "Objetivos futuros",
    icon: Target,
    summary: "Definición clara del nivel de gasto e ingreso recurrente deseado para preservar tu estándar de vida y proyectos de retiro.",
  },
  {
    name: "Protección",
    icon: ShieldCheck,
    summary: "Blindaje complementario diseñado para dar continuidad al plan o liquidar anticipadamente el capital ante invalidez total o contingencias mayores.",
  },
];

const relatedServices = [
  {
    id: "seguro-de-vida",
    title: "Seguro de Vida",
    category: "PERSONAS",
    description: "Respaldo patrimonial y estabilidad financiera para el futuro de quienes más dependen de ti.",
    href: "/personas/seguro-de-vida",
    imageUrl: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800&auto=format&fit=crop",
    altText: "Familia compartiendo tiempo en serenidad en un entorno natural",
  },
  {
    id: "gastos-medicos-mayores",
    title: "Gastos Médicos Mayores",
    category: "PERSONAS",
    description: "Protección ante eventualidades médicas de alto impacto que puedan comprometer tu estabilidad económica.",
    href: "/personas/gastos-medicos-mayores",
    imageUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
    altText: "Familia caminando en calma en un entorno natural",
  },
  {
    id: "personas",
    title: "Personas",
    category: "PORTAFOLIO",
    description: "Visión integral de protección personal y familiar que armoniza salud, vida y patrimonio global.",
    href: "/personas",
    imageUrl: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?q=80&w=800&auto=format&fit=crop",
    altText: "Silueta familiar unida en un entorno abierto y sereno",
  },
];

export default function RetiroPage() {
  return (
    <div className="flex-1 bg-white">
      {/* 1. Hero Editorial */}
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="PERSONAS"
        title="Construir patrimonio también significa preparar el futuro."
        supportingCopy="Un retiro con claridad e independencia económica no es producto del azar, sino de una estrategia de previsión estructurada con disciplina, tiempo y rigor. En LEVANTIR analizamos tu horizonte con criterio técnico e independiente."
        primaryCtaText="Revisar mi estrategia de retiro"
        primaryCtaHref="/?advisory=true"
        secondaryCtaText="CONOCER ASPECTOS CLAVE"
        secondaryCtaHref="#aspectos-clave"
        imageUrl="https://images.unsplash.com/photo-1496889250866-0c3d0c8f22d2?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Pareja madura conversando y sonriendo en un entorno natural junto a un lago, transmitiendo serenidad, plenitud y visión de futuro"
        imagePositionClass="object-[65%_center] sm:object-[70%_center] lg:object-right lg:origin-center lg:scale-[1.12] lg:translate-x-[5%] xl:scale-[1.15] xl:translate-x-[7%] 2xl:scale-[1.18] 2xl:translate-x-[8%]"
        trustNote="Asesoría objetiva · Estructuración patrimonial · Acompañamiento continuo"
        cornerDescriptorCategory="FUTURO & PATRIMONIO"
        cornerDescriptorText="Construir independencia económica con visión de largo plazo."
        ariaLabel="Presentación de Planes de Retiro"
      />

      {/* 2. Contexto */}
      <Section className="bg-[#FFFFFF] border-b border-[#E8E8E8] py-24 sm:py-28 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
            <div className="lg:col-span-6 space-y-6 sm:space-y-7">
              <div className="space-y-3.5">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
                  EL HORIZONTE DE LARGO PLAZO
                </p>
                <h2
                  className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.75rem] text-[#0B2D58] leading-[1.16] font-medium"
                  style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
                >
                  Independencia financiera para tu siguiente etapa.
                </h2>
              </div>

              <div className="space-y-4 text-[0.98rem] sm:text-[1.04rem] text-[#2E2E2E]/90 leading-[1.72]">
                <p>
                  Durante la etapa de mayor productividad profesional es natural centrarse en los compromisos inmediatos. Sin embargo, el retiro exige anticipación para convertir el ahorro intermitente en un capital patrimonial estructurado.
                </p>
                <p>
                  Un esquema de retiro no debe diseñarse bajo promesas volátiles ni conjeturas especulativas. Su valor radica en la consistencia de aportaciones sostenibles, incentivos fiscales estratégicos y la protección de lo acumulado.
                </p>
              </div>

              <div className="p-6 sm:p-7 bg-[#F8F5EF] border-l-2 border-[#D4A737] rounded-r-[2px]">
                <p className="text-xs uppercase tracking-[0.16em] font-bold text-[#0B2D58] mb-2">
                  CRITERIO DE PREVISIÓN
                </p>
                <blockquote className="text-sm sm:text-base italic text-[#0B2D58]/90 font-serif leading-relaxed">
                  &ldquo;El mejor momento para planear el retiro siempre es el presente: cada año de anticipación reduce el esfuerzo de aportación y amplía tus alternativas futuras.&rdquo;
                </blockquote>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5 lg:pt-2">
              <div className="mb-2">
                <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[#5C626B]">
                  PILARES DE LA PREVISIÓN FUTURA
                </p>
              </div>

              <div className="space-y-5 sm:space-y-6">
                <div className="p-5 sm:p-6 bg-[#FFFFFF] border border-[#E8E8E8] rounded-[2px] hover:border-[#D4A737]/60 transition-colors flex items-start gap-4 sm:gap-5 group">
                  <div className="w-10 h-10 rounded-full bg-[#F8F5EF] border border-[#E8E8E8] flex-shrink-0 flex items-center justify-center text-[#0B2D58] group-hover:border-[#D4A737] transition-colors mt-0.5">
                    <Clock className="w-5 h-5 text-[#0B2D58]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-[1.05rem] font-bold text-[#0B2D58] tracking-tight">
                      Horizonte de tiempo y consistencia
                    </h3>
                    <p className="text-xs sm:text-[0.9rem] text-[#2E2E2E]/80 leading-relaxed">
                      Estructuración temporal que aprovecha los años previos para generar una base de acumulación sólida sin presionar tus ingresos.
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 bg-[#FFFFFF] border border-[#E8E8E8] rounded-[2px] hover:border-[#D4A737]/60 transition-colors flex items-start gap-4 sm:gap-5 group">
                  <div className="w-10 h-10 rounded-full bg-[#F8F5EF] border border-[#E8E8E8] flex-shrink-0 flex items-center justify-center text-[#0B2D58] group-hover:border-[#D4A737] transition-colors mt-0.5">
                    <PiggyBank className="w-5 h-5 text-[#0B2D58]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-[1.05rem] font-bold text-[#0B2D58] tracking-tight">
                      Aportaciones sostenibles
                    </h3>
                    <p className="text-xs sm:text-[0.9rem] text-[#2E2E2E]/80 leading-relaxed">
                      Mecanismos periódicos adaptados a tu flujo financiero, evitando compromisos que desestabilicen el día a día familiar.
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 bg-[#FFFFFF] border border-[#E8E8E8] rounded-[2px] hover:border-[#D4A737]/60 transition-colors flex items-start gap-4 sm:gap-5 group">
                  <div className="w-10 h-10 rounded-full bg-[#F8F5EF] border border-[#E8E8E8] flex-shrink-0 flex items-center justify-center text-[#0B2D58] group-hover:border-[#D4A737] transition-colors mt-0.5">
                    <ShieldCheck className="w-5 h-5 text-[#0B2D58]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-[1.05rem] font-bold text-[#0B2D58] tracking-tight">
                      Blindaje del plan ante contingencias
                    </h3>
                    <p className="text-xs sm:text-[0.9rem] text-[#2E2E2E]/80 leading-relaxed">
                      Protección integrada orientada a dar continuidad o entrega del capital previsto ante invalidez o fallecimiento prematuro.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#5C626B] pt-2 italic">
                * Las opciones se estructuran bajo términos contractuales específicos y análisis de perfil personal.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Aspectos Clave (4 Bloques Destacados) */}
      <Section id="aspectos-clave" className="bg-[#FFFFFF] border-b border-[#E8E8E8] py-24 sm:py-28 lg:py-32">
        <Container>
          <div className="max-w-3xl mb-14 sm:mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3.5">
              ASPECTOS CLAVE
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.15] font-medium tracking-tight mb-4"
              style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
            >
              Variables fundamentales para estructurar tu retiro.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
              Un plan de retiro sólido equilibra cuatro variables esenciales para asegurar que la estrategia sea realista y cumpla su cometido en el tiempo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 mb-10">
            {keyAspects.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="h-full min-h-[220px] p-6 sm:p-7 bg-[#FFFFFF] border border-[#E8E8E8] rounded-[2px] hover:border-[#D4A737] transition-all flex flex-col justify-between group hover:shadow-xs"
                >
                  <div>
                    <div className="w-11 h-11 rounded-full bg-[#F8F5EF] border border-[#E8E8E8] flex items-center justify-center text-[#0B2D58] mb-5 group-hover:border-[#D4A737] group-hover:text-[#D4A737] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0B2D58] mb-2.5 tracking-tight">
                      {item.name}
                    </h3>
                    <p className="text-[0.92rem] text-[#2E2E2E]/85 leading-[1.62]">
                      {item.summary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-6 sm:p-7 bg-[#F8F5EF] border border-[#E8E8E8] border-l-4 border-l-[#D4A737] rounded-[2px]">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
              <span className="text-xs uppercase tracking-[0.16em] font-bold text-[#0B2D58] whitespace-nowrap">
                También analizamos:
              </span>
              <p className="text-sm sm:text-[0.95rem] text-[#2E2E2E]/90 leading-relaxed font-medium">
                beneficios e incentivos fiscales aplicables, esquemas de rentas vitalicias o retiro programado y protección contra la inflación.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Enfoque LEVANTIR */}
      <ApproachSection />

      {/* 5. Metodología de 5 Pasos */}
      <ServiceMethodologySection />

      {/* 6. Soluciones Relacionadas */}
      <Section className="bg-[#F8F5EF] border-b border-[#E8E8E8] py-24 sm:py-28 lg:py-32">
        <Container>
          <div className="max-w-3xl mb-14 sm:mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3.5">
              SOLUCIONES RELACIONADAS
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.15] font-medium tracking-tight mb-4"
              style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
            >
              Completa tu estrategia de protección.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
              La planeación del futuro se complementa con la salvaguarda inmediata de la salud y el respaldo financiero de la familia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {relatedServices.map((service) => (
              <div
                key={service.id}
                className="bg-white border border-[#E8E8E8] rounded-[2px] overflow-hidden flex flex-col group hover:border-[#D4A737] transition-all duration-300 shadow-xs"
              >
                <div className="aspect-[16/10] w-full overflow-hidden relative bg-[#E8E8E8]">
                  <img
                    src={service.imageUrl}
                    alt={service.altText}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B2D58]/90 text-[#D4A737] px-2.5 py-1 text-[0.68rem] font-bold tracking-[0.14em] uppercase rounded-sm">
                    {service.category}
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#0B2D58] tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-[0.92rem] text-[#2E2E2E]/85 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E8E8E8]">
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase text-[#0B2D58] group-hover:text-[#D4A737] transition-colors"
                    >
                      <span>CONOCER MÁS</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. CTA Final */}
      <CTASection
        eyebrow="ASESORÍA ESPECIALIZADA"
        title="Construye una estrategia de retiro con claridad y visión patrimonial."
        supportingCopy="Cuéntanos tus metas y horizonte temporal. Te orientamos para evaluar las alternativas de retiro disponibles con rigor técnico, objetividad y acompañamiento continuo."
        primaryCtaText="Revisar mi estrategia de retiro"
        primaryCtaHref="/?advisory=true"
        secondaryCtaText="SOLICITAR ASESORÍA"
        secondaryCtaHref="/?advisory=true"
      />
    </div>
  );
}
