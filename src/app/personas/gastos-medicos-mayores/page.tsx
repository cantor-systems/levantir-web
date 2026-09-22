import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/service/PageHero";
import { ApproachSection } from "@/components/service/ApproachSection";
import { ServiceMethodologySection } from "@/components/service/ServiceMethodologySection";
import { CTASection } from "@/components/service/CTASection";
import { HeartPulse, Wallet, Users, FileSpreadsheet, Percent, Maximize2, Building2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Seguro de Gastos Médicos Mayores | LEVANTIR",
  description: "Protege tu patrimonio frente a gastos médicos de alto impacto. En LEVANTIR te ayudamos a evaluar deducibles, coaseguros y coberturas con criterio independiente.",
  alternates: { canonical: "https://levantir.com/personas/gastos-medicos-mayores" },
};

const breadcrumbs = [
  { label: "Inicio", href: "/" },
  { label: "Personas", href: "/personas" },
  { label: "Gastos Médicos Mayores", isCurrent: true },
];

const conceptualObjectives = [
  {
    icon: HeartPulse,
    title: "Atención médica oportuna",
    description: "Acceso a medicina de alta especialidad y centros hospitalarios sin comprometer tus decisiones clínicas por el costo inmediato.",
  },
  {
    icon: Wallet,
    title: "Protección financiera",
    description: "Blindaje de tus activos, cuentas patrimoniales e inversiones ante procedimientos o tratamientos de curso prolongado.",
  },
  {
    icon: Users,
    title: "Continuidad / tranquilidad para tu familia",
    description: "Preservación del ritmo de vida, proyectos y estabilidad del núcleo familiar frente a contingencias imprevistas.",
  },
];

const primaryVariables = [
  {
    id: "deducible",
    name: "Deducible",
    icon: FileSpreadsheet,
    summary: "Cantidad fija inicial que asume el asegurado antes de que la póliza comience a operar en cada reclamación o padecimiento.",
  },
  {
    id: "coaseguro",
    name: "Coaseguro",
    icon: Percent,
    summary: "Porcentaje de los gastos cubiertos que corresponde al asegurado tras haber descontado el deducible inicial aplicable.",
  },
  {
    id: "suma-asegurada",
    name: "Suma asegurada",
    icon: Maximize2,
    summary: "Monto máximo de responsabilidad económica que la cobertura responderá por evento, padecimiento o periodo asegurado.",
  },
  {
    id: "red-hospitalaria",
    name: "Red hospitalaria",
    icon: Building2,
    summary: "Catálogo e infraestructura de hospitales, clínicas y centros médicos autorizados en convenio donde opera el pago directo.",
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

export default function GastosMedicosMayoresPage() {
  return (
    <div className="flex-1 bg-white">
      {/* 1. Hero */}
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="PERSONAS"
        title="Protege tu patrimonio frente a gastos médicos de alto impacto."
        supportingCopy="Un evento médico severo o prolongado puede comprometer la estabilidad económica construida durante años. En LEVANTIR te ayudamos a evaluar y estructurar las alternativas de aseguramiento idóneas para ti y tu familia, con análisis independiente y visión de largo plazo."
        primaryCtaText="REVISAR MIS OPCIONES"
        primaryCtaHref="/?advisory=true"
        secondaryCtaText="CONOCER QUÉ REVISAR"
        secondaryCtaHref="#que-revisar"
        imageUrl="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Familia compartiendo un momento de calma y protección en entorno natural cálido"
        imagePositionClass="object-[65%_center] sm:object-[72%_center] lg:object-[78%_center] xl:object-[82%_center]"
        trustNote="Asesoría objetiva · Estructuración patrimonial · Acompañamiento continuo"
        cornerDescriptorCategory="PROTECCIÓN PERSONAL & FAMILIAR"
        cornerDescriptorText="Criterio especializado para proteger lo que no tiene sustituto."
        ariaLabel="Presentación de Gastos Médicos Mayores"
      />

      {/* 2. Risk Context Section */}
      <Section className="bg-[#FFFFFF] border-b border-[#E8E8E8] py-24 sm:py-28 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
            <div className="lg:col-span-6 space-y-6 sm:space-y-7">
              <div className="space-y-3.5">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
                  EL RIESGO
                </p>
                <h2
                  className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.75rem] text-[#0B2D58] leading-[1.16] font-medium"
                  style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
                >
                  La salud también es parte de tu patrimonio.
                </h2>
              </div>
              <div className="space-y-4 text-[0.98rem] sm:text-[1.04rem] text-[#2E2E2E]/90 leading-[1.72]">
                <p>
                  Habitualmente asociamos el patrimonio con bienes tangibles o inversiones. Sin embargo, un quebranto severo de salud tiene el potencial de desestabilizar en poco tiempo lo que tomó años consolidar.
                </p>
                <p>
                  La cobertura médica de alto impacto no consiste en adquirir una póliza estándar, sino en contar con un amortiguador patrimonial diseñado con criterio para absorber contingencias sin liquidar activos.
                </p>
              </div>
              <div className="p-6 sm:p-7 bg-[#F8F5EF] border-l-2 border-[#D4A737] rounded-r-[2px]">
                <p className="text-xs uppercase tracking-[0.16em] font-bold text-[#0B2D58] mb-2">
                  CRITERIO DE GESTIÓN PATRIMONIAL
                </p>
                <blockquote className="text-sm sm:text-base italic text-[#0B2D58]/90 font-serif leading-relaxed">
                  &quot;El valor de una adecuada estructuración no se mide en la calma, sino en su capacidad de responder con certeza técnica ante lo inesperado.&quot;
                </blockquote>
              </div>
            </div>
            <div className="lg:col-span-6 space-y-5 lg:pt-2">
              <div className="mb-2">
                <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[#5C626B]">
                  OBJETIVOS CONCEPTUALES DE PROTECCIÓN
                </p>
              </div>
              <div className="space-y-5 sm:space-y-6">
                {conceptualObjectives.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="p-5 sm:p-6 bg-[#FFFFFF] border border-[#E8E8E8] rounded-[2px] hover:border-[#D4A737]/60 transition-colors flex items-start gap-4 sm:gap-5 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#F8F5EF] border border-[#E8E8E8] flex-shrink-0 flex items-center justify-center text-[#0B2D58] group-hover:border-[#D4A737] transition-colors mt-0.5">
                        <IconComponent className="w-5 h-5 text-[#0B2D58]" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base sm:text-[1.05rem] font-bold text-[#0B2D58] tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-[0.9rem] text-[#2E2E2E]/80 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-[#5C626B] pt-2 italic">
                * Los conceptos anteriores representan objetivos estratégicos de gestión patrimonial y no constituyen garantías universales de póliza.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. LEVANTIR Approach Section */}
      <ApproachSection />

      {/* 4. Important Variables / What to Review Section */}
      <Section id="que-revisar" className="bg-[#FFFFFF] border-b border-[#E8E8E8] py-24 sm:py-28 lg:py-32">
        <Container>
          <div className="max-w-3xl mb-14 sm:mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3.5">
              QUÉ REVISAR
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.15] font-medium tracking-tight mb-4"
              style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
            >
              Variables que pueden cambiar significativamente tu protección.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
              Una póliza de Gastos Médicos Mayores no se define únicamente por su nombre comercial. La interacción entre sus variables contractuales determina su alcance real al momento de un siniestro.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 mb-10">
            {primaryVariables.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
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
          <div className="p-6 sm:p-7 bg-[#F8F5EF] border border-[#E8E8E8] border-l-4 border-l-[#D4A737] rounded-[2px] mb-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
              <span className="text-xs uppercase tracking-[0.16em] font-bold text-[#0B2D58] whitespace-nowrap">
                También analizamos:
              </span>
              <p className="text-sm sm:text-[0.95rem] text-[#2E2E2E]/90 leading-relaxed font-medium">
                tope de coaseguro, tabulador, periodos de espera y condiciones de renovación.
              </p>
            </div>
          </div>
          <p className="text-xs text-[#5C626B] leading-relaxed italic">
            * Las condiciones definitivas, deducibles, coaseguros y alcances se rigen por la carátula y condiciones generales de la póliza emitida. Esta guía cumple una función orientativa y de análisis metodológico.
          </p>
        </Container>
      </Section>

      {/* 5. Process / Methodology Section */}
      <ServiceMethodologySection />

      {/* 6. Related Services Section */}
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
                      <span>CONOCER MAS</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. Final Institutional CTA Section */}
      <CTASection
        eyebrow="ASESORÍA ESPECIALIZADA"
        title="Lo que has construido merece una estrategia de protección a su altura."
        supportingCopy="Cuéntanos tus prioridades y las de tu familia. Te ayudaremos a evaluar las alternativas disponibles con criterio independiente, rigor técnico y visión de largo plazo."
        primaryCtaText="REVISAR MIS OPCIONES"
        primaryCtaHref="/?advisory=true"
        secondaryCtaText="SOLICITAR ASESORÍA"
        secondaryCtaHref="/?advisory=true"
      />
    </div>
  );
}
