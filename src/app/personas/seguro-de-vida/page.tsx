import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/service/PageHero";
import { ApproachSection } from "@/components/service/ApproachSection";
import { ServiceMethodologySection } from "@/components/service/ServiceMethodologySection";
import { CTASection } from "@/components/service/CTASection";
import { Users, HelpCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Seguro de Vida y Protección Patrimonial | LEVANTIR",
  description: "Protección financiera para quienes dependen de ti. En LEVANTIR analizamos dependencias económicas, compromisos y horizontes temporales para estructurar tu seguro de vida.",
  alternates: { canonical: "https://levantir.com/personas/seguro-de-vida" },
};

const breadcrumbs = [
  { label: "Inicio", href: "/" },
  { label: "Personas", href: "/personas" },
  { label: "Seguro de Vida", isCurrent: true },
];

const conceptualQuestions = [
  {
    question: "¿Quién depende económicamente de la persona asegurada?",
    context: "Identificar claramente los beneficiarios primarios y sus necesidades materiales inmediatas y proyectadas.",
  },
  {
    question: "¿Durante cuánto tiempo se requerirá dicho respaldo?",
    context: "Calcular los años indispensables para que los dependientes alcancen suficiencia económica o concluyan sus etapas formativas.",
  },
  {
    question: "¿Qué compromisos financieros y pasivos existen?",
    context: "Cuantificar obligaciones patrimoniales, créditos hipotecarios o pasivos corporativos que no deben transferirse a la familia.",
  },
  {
    question: "¿Qué horizonte de protección es el adecuado?",
    context: "Definir si se requiere un respaldo temporal para etapas de alta exposición o una estructura de protección continua de largo plazo.",
  },
];

const relatedServices = [
  {
    id: "seguro-de-vida",
    title: "Seguro de Vida",
    category: "PERSONAS",
    description: "Respaldo patrimonial y certidumbre financiera para el futuro de quienes más dependen de ti.",
    href: "/personas/seguro-de-vida",
    imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop",
    altText: "Familia caminando en calma en un entorno natural",
  },
  {
    id: "retiro",
    title: "Retiro",
    category: "PERSONAS",
    description: "Estrategias de acumulación y protección de largo plazo para consolidar tu independencia futura.",
    href: "/personas/retiro",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
    altText: "Planeación patrimonial y visión de largo plazo con serenidad",
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

export default function SeguroDeVidaPage() {
  return (
    <div className="flex-1 bg-white">
      {/* 1. Hero Editorial */}
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="PERSONAS"
        title="Protección financiera para quienes dependen de ti."
        supportingCopy="El seguro de vida es la herramienta fundamental para respaldar la estabilidad de tus seres queridos y la continuidad de tus proyectos patrimoniales ante lo imprevisto. En LEVANTIR analizamos tus compromisos con criterio técnico e independiente."
        primaryCtaText="Evaluar mi protección"
        primaryCtaHref="?advisory=true"
        secondaryCtaText="CONOCER QUÉ EVALUAR"
        secondaryCtaHref="#preguntas-clave"
        imageUrl="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Familia compartiendo un momento cálido de protección y tranquilidad en un entorno natural"
        imagePositionClass="object-[68%_center] sm:object-[72%_center] lg:object-[78%_center]"
        trustNote="Asesoría objetiva · Estructuración patrimonial · Acompañamiento continuo"
        cornerDescriptorCategory="RESPALDO & CONTINUIDAD"
        cornerDescriptorText="Respaldar la estabilidad de quienes más te importan."
        ariaLabel="Presentación de Seguro de Vida"
      />

      {/* 2. Riesgo / Contexto */}
      <Section className="bg-[#FFFFFF] border-b border-[#E8E8E8] py-24 sm:py-28 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
            <div className="lg:col-span-6 space-y-6 sm:space-y-7">
              <div className="space-y-3.5">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
                  EL RIESGO Y LA RESPONSABILIDAD
                </p>
                <h2
                  className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.75rem] text-[#0B2D58] leading-[1.16] font-medium"
                  style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
                >
                  Proteger la continuidad cuando más se necesita.
                </h2>
              </div>

              <div className="space-y-4 text-[0.98rem] sm:text-[1.04rem] text-[#2E2E2E]/90 leading-[1.72]">
                <p>
                  La generación de ingresos familiares no es solo una cifra mensual: es el motor que sostiene la vivienda, la educación de los hijos, la estabilidad de la pareja y los proyectos compartidos.
                </p>
                <p>
                  Una ausencia imprevista puede obligar a la liquidación acelerada de activos o a interrumpir planes educativos vitales. El seguro de vida actúa como un respaldo de liquidez inmediata para preservar el nivel de vida y honrar compromisos adquiridos.
                </p>
              </div>

              <div className="p-6 sm:p-7 bg-[#F8F5EF] border-l-2 border-[#D4A737] rounded-r-[2px]">
                <p className="text-xs uppercase tracking-[0.16em] font-bold text-[#0B2D58] mb-2">
                  PRINCIPIO DE RESPALDO FAMILIAR
                </p>
                <blockquote className="text-sm sm:text-base italic text-[#0B2D58]/90 font-serif leading-relaxed">
                  &quot;El seguro de vida no previene la pérdida, pero sí permite que las decisiones futuras de tu familia se tomen con tranquilidad financiera y no desde la urgencia.&quot;
                </blockquote>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5 lg:pt-2">
              <div className="mb-2">
                <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[#5C626B]">
                  DIMENSIONES DE RESPONSABILIDAD PATRIMONIAL
                </p>
              </div>

              <div className="space-y-5 sm:space-y-6">
                <div className="p-5 sm:p-6 bg-[#FFFFFF] border border-[#E8E8E8] rounded-[2px] hover:border-[#D4A737]/60 transition-colors flex items-start gap-4 sm:gap-5 group">
                  <div className="w-10 h-10 rounded-full bg-[#F8F5EF] border border-[#E8E8E8] flex-shrink-0 flex items-center justify-center text-[#0B2D58] group-hover:border-[#D4A737] transition-colors mt-0.5">
                    <Users className="w-5 h-5 text-[#0B2D58]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-[1.05rem] font-bold text-[#0B2D58] tracking-tight">
                      Sustento familiar y educación
                    </h3>
                    <p className="text-xs sm:text-[0.9rem] text-[#2E2E2E]/80 leading-relaxed">
                      Sustitución de ingresos para cubrir manutención corriente y previsión de fondos educativos para dependientes.
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 bg-[#FFFFFF] border border-[#E8E8E8] rounded-[2px] hover:border-[#D4A737]/60 transition-colors flex items-start gap-4 sm:gap-5 group">
                  <div className="w-10 h-10 rounded-full bg-[#F8F5EF] border border-[#E8E8E8] flex-shrink-0 flex items-center justify-center text-[#0B2D58] group-hover:border-[#D4A737] transition-colors mt-0.5">
                    <HelpCircle className="w-5 h-5 text-[#0B2D58]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-[1.05rem] font-bold text-[#0B2D58] tracking-tight">
                      Liquidación de compromisos y pasivos
                    </h3>
                    <p className="text-xs sm:text-[0.9rem] text-[#2E2E2E]/80 leading-relaxed">
                      Cancelación de deudas, créditos hipotecarios y obligaciones financieras para no heredar pasivos patrimoniales.
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 bg-[#FFFFFF] border border-[#E8E8E8] rounded-[2px] hover:border-[#D4A737]/60 transition-colors flex items-start gap-4 sm:gap-5 group">
                  <div className="w-10 h-10 rounded-full bg-[#F8F5EF] border border-[#E8E8E8] flex-shrink-0 flex items-center justify-center text-[#0B2D58] group-hover:border-[#D4A737] transition-colors mt-0.5">
                    <Users className="w-5 h-5 text-[#0B2D58]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-[1.05rem] font-bold text-[#0B2D58] tracking-tight">
                      Transición sucesoria ordenada
                    </h3>
                    <p className="text-xs sm:text-[0.9rem] text-[#2E2E2E]/80 leading-relaxed">
                      Liquidez inmediata exenta de procesos testamentarios prolongados para cubrir gastos de sucesión e impuestos.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#5C626B] pt-2 italic">
                * Los conceptos expuestos representan objetivos analíticos y de previsión financiera.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Preguntas Importantes (Qué Evaluar) */}
      <Section id="preguntas-clave" className="bg-[#FFFFFF] border-b border-[#E8E8E8] py-24 sm:py-28 lg:py-32">
        <Container>
          <div className="max-w-3xl mb-14 sm:mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3.5">
              PREGUNTAS IMPORTANTES
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.15] font-medium tracking-tight mb-4"
              style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
            >
              Criterios conceptuales para dimensionar tu protección.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
              Antes de contratar cualquier esquema, es fundamental responder a estas cuatro interrogantes estructurales para determinar la suma y temporalidad adecuadas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 mb-10">
            {conceptualQuestions.map((item, index) => (
              <div
                key={item.question}
                className="h-full min-h-[220px] p-6 sm:p-7 bg-[#FFFFFF] border border-[#E8E8E8] rounded-[2px] hover:border-[#D4A737] transition-all flex flex-col justify-between group hover:shadow-xs"
              >
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#D4A737] block mb-4">
                    0{index + 1}
                  </span>
                  <h3 className="text-lg font-bold text-[#0B2D58] mb-2.5 tracking-tight leading-snug">
                    {item.question}
                  </h3>
                  <p className="text-[0.92rem] text-[#2E2E2E]/85 leading-[1.62]">
                    {item.context}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 sm:p-7 bg-[#F8F5EF] border border-[#E8E8E8] border-l-4 border-l-[#D4A737] rounded-[2px]">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
              <span className="text-xs uppercase tracking-[0.16em] font-bold text-[#0B2D58] whitespace-nowrap">
                También analizamos:
              </span>
              <p className="text-sm sm:text-[0.95rem] text-[#2E2E2E]/90 leading-relaxed font-medium">
                indexación por inflación, beneficios por invalidez total, cláusulas de exención y estructuras temporales o vitalicias.
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
              Una protección integral conecta la salud con el resguardo de la vida y los planes de retiro, articulando un esquema armónico.
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
                    decoding="async"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B2D58]/90 text-[#D4A737] px-2.5 py-1 text-[0.68rem] font-bold tracking-[0.14em] uppercase rounded-xs">
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
        title="Lo que has construido merece una estrategia de protección a su altura."
        supportingCopy="Cuéntanos tus prioridades y las de tu familia. Te ayudaremos a evaluar las alternativas de seguro de vida disponibles con criterio independiente, rigor técnico y visión de largo plazo."
        primaryCtaText="Evaluar mi protección"
        primaryCtaHref="?advisory=true"
        secondaryCtaText="SOLICITAR ASESORÍA"
        secondaryCtaHref="?advisory=true"
      />
    </div>
  );
}

