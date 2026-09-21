import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Activity, ShieldCheck, TrendingUp } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/service/PageHero";
import { ApproachSection } from "@/components/service/ApproachSection";
import { PersonalAdvisoryFormSection } from "@/components/service/PersonalAdvisoryFormSection";
import { ServiceMethodologySection } from "@/components/service/ServiceMethodologySection";
import { CTASection } from "@/components/service/CTASection";

export const metadata: Metadata = {
  title: "Seguros para Personas y Patrimonio | LEVANTIR",
  description: "Protege tu salud, tu familia y tu futuro financiero. En LEVANTIR estructuramos soluciones integrales de seguros para personas con criterio independiente.",
  alternates: { canonical: "https://levantir.com/personas" },
};

const breadcrumbs = [
  { label: "Inicio", href: "/" },
  { label: "Personas", isCurrent: true },
];

const pillars = [
  {
    icon: Activity,
    title: "Salud",
    subtitle: "Amortiguador ante contingencias médicas",
    description: "Acceso oportuno a medicina de alta especialidad y centros hospitalarios, preservando tus activos ante eventualidades imprevistas.",
  },
  {
    icon: ShieldCheck,
    title: "Protección financiera",
    subtitle: "Certidumbre para quienes dependen de ti",
    description: "Estructuras de respaldo que garantizan el cumplimiento de compromisos y la continuidad de vida de tu núcleo familiar.",
  },
  {
    icon: TrendingUp,
    title: "Futuro",
    subtitle: "Consolidación patrimonial a largo plazo",
    description: "Estrategias de acumulación y previsión estructuradas para respaldar tu independencia económica en las distintas etapas de vida.",
  },
];

const highlightedServices = [
  {
    title: "Gastos Médicos Mayores",
    category: "SALUD & PATRIMONIO",
    description: "Protección ante eventualidades médicas de alto impacto que puedan comprometer la estabilidad económica familiar.",
    href: "/personas/gastos-medicos-mayores",
    imageUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1200&auto=format&fit=crop",
    altText: "Familia compartiendo un momento sereno en entorno natural",
    ctaText: "EXPLORAR SOLUCIÓN",
  },
  {
    title: "Seguro de Vida",
    category: "RESPALDO FAMILIAR",
    description: "Protección financiera y certidumbre patrimonial para garantizar los proyectos de quienes dependen de ti.",
    href: "/personas/seguro-de-vida",
    imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop",
    altText: "Pareja y familia caminando en serenidad con luz natural",
    ctaText: "EXPLORAR SOLUCIÓN",
  },
  {
    title: "Retiro",
    category: "FUTURO & PATRIMONIO",
    description: "Estrategias de acumulación y protección de largo plazo para consolidar tu tranquilidad futura con horizonte definido.",
    href: "/personas/retiro",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
    altText: "Planeación patrimonial en entorno arquitectónico residencial sobrio",
    ctaText: "EXPLORAR SOLUCIÓN",
  },
];

export default function PersonasPage() {
  return (
    <div className="flex-1 bg-white">
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="PERSONAS"
        title="Protege tu salud, tu familia y tu futuro financiero."
        supportingCopy="La protección personal conecta la salud presente con la estabilidad financiera y el bienestar futuro de tu familia. En LEVANTIR estructuramos cada solución con criterio independiente y visión patrimonial."
        primaryCtaText="Hablar con un asesor"
        primaryCtaHref="/?advisory=true"
        secondaryCtaText="CONOCER SOLUCIONES"
        secondaryCtaHref="#soluciones-destacadas"
        imageUrl="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Familia caminando en calma en un entorno natural al atardecer"
        trustNote="Asesoría objetiva · Estructuración patrimonial · Acompañamiento continuo"
        cornerDescriptorCategory="PERSONAS & FAMILIA"
        cornerDescriptorText="Protección integral que armoniza salud, vida y horizonte futuro."
        ariaLabel="Presentación de Soluciones para Personas"
      />

      <Section className="bg-[#FFFFFF] border-b border-[#E8E8E8] py-24 sm:py-28 lg:py-32">
        <Container>
          <div className="max-w-3xl mb-16 sm:mb-20">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3.5">
              TRES DIMENSIONES PATRIMONIALES
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.15] font-medium tracking-tight mb-4"
              style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
            >
              La protección personal como un sistema integral.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
              No concebimos las coberturas como productos aislados. Cada dimensión cumple una función complementaria en la defensa y crecimiento de tu patrimonio familiar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-[#F8F5EF] p-8 sm:p-9 lg:p-10 min-h-[260px] rounded-[2px] border border-[#E8E8E8] hover:border-[#D4A737]/60 transition-all flex flex-col justify-between group shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-7">
                      <div className="w-12 h-12 rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center text-[#0B2D58] group-hover:border-[#D4A737] transition-colors">
                        <Icon className="w-5 h-5 text-[#0B2D58]" />
                      </div>
                      <span className="text-xs font-mono font-bold tracking-widest text-[#D4A737]">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#0B2D58] mb-1.5 tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.14em] font-semibold text-[#D4A737] mb-3">
                      {pillar.subtitle}
                    </p>
                    <p className="text-[0.93rem] text-[#2E2E2E]/85 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section id="soluciones-destacadas" className="bg-[#F8F5EF] border-b border-[#E8E8E8] py-24 sm:py-28 lg:py-32">
        <Container>
          <div className="max-w-3xl mb-14 sm:mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3.5">
              SOLUCIONES DISPONIBLES
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.15] font-medium tracking-tight mb-4"
              style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
            >
              Estructuradas para responder a cada etapa de tu vida.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
              Explora las áreas de especialidad en aseguramiento personal y conoce las variables fundamentales para evaluar cada esquema con criterio independiente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {highlightedServices.map((service) => (
              <div
                key={service.title}
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
                      <span>{service.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <ApproachSection />

      <PersonalAdvisoryFormSection />

      <ServiceMethodologySection />

      <CTASection
        eyebrow="ASESORÍA ESPECIALIZADA"
        title="Construye una estrategia de protección personal a la altura de tu patrimonio."
        supportingCopy="Cuéntanos tus prioridades y las de tu familia. Te orientamos para estructurar un esquema armónico de salud, vida y retiro con rigor técnico y total independencia."
        primaryCtaText="Hablar con un asesor"
        primaryCtaHref="/?advisory=true"
        secondaryCtaText="SOLICITAR ASESORÍA"
        secondaryCtaHref="/?advisory=true"
      />
    </div>
  );
}
