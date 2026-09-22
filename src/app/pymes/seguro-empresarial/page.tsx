import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/service/PageHero";
import { ApproachSection } from "@/components/service/ApproachSection";
import { ServiceMethodologySection } from "@/components/service/ServiceMethodologySection";
import { CTASection } from "@/components/service/CTASection";
import {
  Building2,
  Cog,
  Package,
  Laptop,
  Briefcase,
  Building,
  MapPin,
  Layers,
  Search,
  SlidersHorizontal,
  Handshake,
  ArrowRight,
  Info,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Seguro Empresarial | Protección para Empresas | LEVANTIR",
  description: "Protege los activos físicos, maquinaria e inventario que mantienen en marcha tu empresa ante eventualidades y contingencias operativas con LEVANTIR.",
  alternates: { canonical: "https://levantir.com/pymes/seguro-empresarial" },
};

const breadcrumbs = [
  { label: "Inicio", href: "/" },
  { label: "PYMES", href: "/pymes" },
  { label: "Seguro Empresarial", isCurrent: true },
];

const assetsToAnalyze = [
  {
    title: "Instalaciones",
    icon: Building2,
    description: "Edificios, bodegas, oficinas y locales comerciales ante eventos hidrometeorológicos, incendio o daños estructurales súbitos.",
  },
  {
    title: "Equipo y maquinaria",
    icon: Cog,
    description: "Maquinaria de producción, sistemas electromecánicos y herramientas indispensables para mantener la operación.",
  },
  {
    title: "Inventario",
    icon: Package,
    description: "Materias primas, mercancías en almacén o tránsito y producto terminado destinado a comercialización.",
  },
  {
    title: "Otros activos",
    icon: Laptop,
    description: "Mobiliario operativo, equipo de cómputo, servidores y bienes accesorios necesarios para la actividad productiva.",
  },
];

const riskFactors = [
  {
    name: "Giro y actividad",
    icon: Briefcase,
    summary: "El sector industrial, comercial o de servicios define los riesgos intrínsecos de la operación y su nivel de exposición.",
  },
  {
    name: "Tamaño de la empresa",
    icon: Building,
    summary: "Ingresos, plantilla, capacidad instalada y flujo operativo que determinan las sumas aseguradas necesarias.",
  },
  {
    name: "Ubicación",
    icon: MapPin,
    summary: "Entorno urbano o industrial, zonas sísmicas, cercanía a costas o vías de acceso que condicionan el riesgo físico.",
  },
  {
    name: "Activos críticos",
    icon: Layers,
    summary: "Bienes o maquinaria indispensable cuya afectación paralizaría la facturación y la continuidad del negocio.",
  },
];

const approachPillars = [
  {
    icon: Search,
    title: "Análisis personalizado",
    description: "Evaluamos las características físicas, procesos productivos y nivel de exposición de tus activos antes de proponer cualquier esquema.",
  },
  {
    icon: SlidersHorizontal,
    title: "Evaluación de alternativas",
    description: "Contrastamos condiciones, deducibles, coaseguros y sumas aseguradas entre las instituciones aseguradoras más sólidas.",
  },
  {
    icon: Handshake,
    title: "Acompañamiento continuo",
    description: "Respaldamos a tu empresa en la contratación, renovaciones anuales y gestión técnica especializada ante eventuales siniestros.",
  },
];

const methodologySteps = [
  {
    number: "01",
    title: "Comprender",
    description: "Negocio, operación, activos y objetivos.",
  },
  {
    number: "02",
    title: "Identificar",
    description: "Riesgos y exposiciones relevantes.",
  },
  {
    number: "03",
    title: "Estructurar",
    description: "Alternativas de protección y límites adecuados al riesgo identificado.",
  },
  {
    number: "04",
    title: "Implementar",
    description: "Acompañamiento en selección y contratación.",
  },
  {
    number: "05",
    title: "Revisar",
    description: "Actualizar la protección conforme evoluciona la empresa.",
  },
];

const relatedSolutions = [
  {
    id: "responsabilidad-civil",
    title: "Responsabilidad Civil",
    category: "PROTECCIÓN LEGAL & TERCEROS",
    description: "Respaldo financiero y legal ante reclamaciones por daños materiales o corporales derivados de la actividad empresarial.",
    href: "/pymes/responsabilidad-civil",
    imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=800&auto=format&fit=crop",
    altText: "Reunión de asesoría corporativa y revisión de contratos y responsabilidades empresariales",
  },
  {
    id: "hombre-clave",
    title: "Hombre Clave",
    category: "CONTINUIDAD FINANCIERA",
    description: "Mitigación del impacto financiero ante la falta imprevista de directivos o personas clave para la estabilidad del negocio.",
    href: "/pymes/hombre-clave",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
    altText: "Directivo y líder empresarial en sesión estratégica de planeación",
  },
  {
    id: "pymes-hub",
    title: "Empresas & PYMES",
    category: "HUB EMPRESARIAL",
    description: "Visión integral de protección y continuidad para el patrimonio, las personas y las operaciones de tu empresa.",
    href: "/pymes",
    imageUrl: "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=800&auto=format&fit=crop",
    altText: "Operación comercial y servicio en establecimiento de pequeña y mediana empresa",
  },
];

export default function SeguroEmpresarialPage() {
  return (
    <div className="flex-1 bg-white">
      {/* 1. Hero */}
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="SEGURO EMPRESARIAL"
        title="Protege los activos que mantienen operando tu empresa."
        supportingCopy="Una adecuada protección empresarial analiza en conjunto la actividad, los activos, la operación y la exposición real de tu negocio para estructurar una solución con criterio técnico y visión de continuidad."
        primaryCtaText="REVISAR LA PROTECCIÓN DE MI EMPRESA"
        primaryCtaHref="/?advisory=true"
        secondaryCtaText="CONOCER MÁS"
        secondaryCtaHref="#contexto"
        imageUrl="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Espacio de trabajo y estudio técnico de una empresa en operación con proyectos, modelos y equipamiento"
        imagePositionClass="object-[84%_center] sm:object-[86%_center] lg:object-[90%_center] xl:object-[92%_center]"
        trustNote="Asesoría técnica · Estructuración patrimonial · Criterio independiente"
        cornerDescriptorCategory="SEGURO EMPRESARIAL"
        cornerDescriptorText="Estructuración técnica para proteger los activos y salvaguardar la continuidad de tu empresa."
        ariaLabel="Seguro Empresarial - Protección de activos y continuidad de negocio"
      />

      {/* 2. Contexto Principal */}
      <Section id="contexto" className="bg-white border-b border-[#E8E8E8] py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">
            {/* Left Column: Eyebrow + H2 + Editorial Context */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
                  MÁS QUE UN SEGURO
                </p>
                <h2
                  className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.75rem] text-[#0B2D58] leading-[1.16] font-medium"
                  style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
                >
                  Unidad para la continuidad de tu negocio.
                </h2>
              </div>

              <div className="space-y-4 text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
                <p>
                  La protección de una empresa no debe concebirse como un trámite administrativo aislado o una póliza genérica. Proteger la operación exige un análisis integral y coordinado.
                </p>
                <p>
                  Una estructuración adecuada evalúa giro, ubicación, activos físicos indispensables, procesos productivos y responsabilidad frente a terceros para asegurar la continuidad del negocio.
                </p>
                <p className="text-xs text-[#5C626B] italic pt-1">
                  * La disponibilidad, sumas aseguradas y condiciones dependen de la póliza contratada y de cada aseguradora.
                </p>
              </div>
            </div>

            {/* Right Column: Editorial Highlight Box with Approved Statement */}
            <div className="lg:col-span-6 lg:pt-2">
              <div className="p-7 sm:p-8 bg-[#F8F5EF] border border-[#E8E8E8] border-l-4 border-l-[#0B2D58] rounded-[2px] space-y-4">
                <p className="text-xs uppercase tracking-[0.16em] font-bold text-[#D4A737]">
                  CRITERIO EDITORIAL
                </p>
                <blockquote className="text-base sm:text-lg italic text-[#0B2D58] font-serif leading-relaxed">
                  &ldquo;Una empresa puede estar asegurada y seguir estando mal protegida.&rdquo;
                </blockquote>
                <p className="text-xs sm:text-sm text-[#5C626B] pt-2 border-t border-[#E8E8E8]/80 leading-relaxed">
                  Ponderamos con rigor técnico las brechas entre el valor real de reposición y los límites contratados para garantizar la solvencia operativa ante cualquier siniestro imprevisto.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Activos que pueden analizarse (Únicamente 4 bloques) */}
      <Section id="activos" className="bg-[#F8F5EF] border-b border-[#E8E8E8] py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="max-w-3xl mb-12 sm:mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3">
              ¿QUÉ PUEDES PROTEGER?
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.15] font-medium tracking-tight mb-4"
              style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
            >
              Activos que impulsan tu operación.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
              Examinamos los componentes físicos esenciales para configurar una protección adecuada a las particularidades de tu empresa.
            </p>
          </div>

          {/* 4 Main Asset Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-10">
            {assetsToAnalyze.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white border border-[#E8E8E8] rounded-[2px] p-6 sm:p-7 hover:border-[#D4A737] transition-all flex flex-col justify-between group shadow-xs"
                >
                  <div>
                    <div className="w-11 h-11 rounded-full bg-[#F8F5EF] border border-[#E8E8E8] flex items-center justify-center text-[#0B2D58] mb-5 group-hover:border-[#D4A737] group-hover:text-[#D4A737] transition-colors">
                      <IconComp className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0B2D58] mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-[0.92rem] text-[#5C626B] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Nota Obligatoria sobre Coberturas */}
          <div className="p-5 sm:p-6 bg-white border border-[#E8E8E8] rounded-[2px] flex items-start sm:items-center gap-3.5">
            <Info className="w-5 h-5 text-[#D4A737] flex-shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-xs sm:text-sm text-[#5C626B] font-medium leading-relaxed">
              Las coberturas, servicios, límites, exclusiones y condiciones dependen de la póliza contratada.
            </p>
          </div>
        </Container>
      </Section>

      {/* 4. Factores a Considerar */}
      <Section id="factores" className="bg-white border-b border-[#E8E8E8] py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="max-w-3xl mb-12 sm:mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3">
              FACTORES A CONSIDERAR
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.15] font-medium tracking-tight mb-4"
              style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
            >
              Cada empresa tiene un perfil de riesgo distinto.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
              Estructurar una cobertura certera exige diagnosticar las circunstancias operativas y territoriales propias de cada organización.
            </p>
          </div>

          {/* 4 Factors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {riskFactors.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.name}
                  className="h-full min-h-[200px] p-6 sm:p-7 bg-[#FFFFFF] border border-[#E8E8E8] rounded-[2px] hover:border-[#D4A737] transition-all flex flex-col justify-between group hover:shadow-xs"
                >
                  <div>
                    <div className="w-11 h-11 rounded-full bg-[#F8F5EF] border border-[#E8E8E8] flex items-center justify-center text-[#0B2D58] mb-5 group-hover:border-[#D4A737] group-hover:text-[#D4A737] transition-colors">
                      <IconComp className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0B2D58] mb-2.5">
                      {item.name}
                    </h3>
                    <p className="text-sm text-[#5C626B] leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Franja Secundaria con Variables Relacionadas */}
          <div className="p-6 sm:p-7 bg-[#F8F5EF] border border-[#E8E8E8] border-l-4 border-l-[#D4A737] rounded-[2px]">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
              <span className="text-xs uppercase tracking-[0.16em] font-bold text-[#0B2D58] whitespace-nowrap">
                Variables complementarias a evaluar:
              </span>
              <p className="text-sm sm:text-[0.95rem] text-[#2E2E2E]/90 leading-relaxed font-medium">
                cadena de suministro, responsabilidad civil, interrupción de operaciones, movilidad y riesgos especializados según la industria.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. Nuestro Enfoque (3 Pilares Reutilizados) */}
      <ApproachSection
        eyebrow="NUESTRO ENFOQUE"
        title="Más que un seguro, un aliado para tu empresa."
        subheadline="Analizamos alternativas disponibles para estructurar una protección patrimonial adecuada a tu negocio."
        pillars={approachPillars}
      />

      {/* 6. Metodología Institucional (Contextualizada para Seguro Empresarial) */}
      <ServiceMethodologySection
        eyebrow="METODOLOGÍA LEVANTIR"
        title="Un proceso estructurado para proteger tu empresa."
        subtitle="Rigor consultivo de cinco fases enfocado en la continuidad y preservación patrimonial de tu negocio."
        steps={methodologySteps}
      />

      {/* 7. Soluciones Relacionadas */}
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
              Protección coordinada para otras dimensiones de tu empresa.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
              La salvaguarda de tus activos físicos se complementa de forma estratégica con la protección frente a terceros y la retención del talento directivo clave.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {relatedSolutions.map((service) => (
              <div
                key={service.id}
                className="bg-white border border-[#E8E8E8] rounded-[2px] overflow-hidden flex flex-col group hover:border-[#D4A737] transition-all duration-300 shadow-xs"
              >
                <div className="relative h-48 sm:h-52 overflow-hidden bg-[#0B2D58]/10">
                  <img
                    src={service.imageUrl}
                    alt={service.altText}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2D58]/60 via-transparent to-transparent opacity-60" />
                  <span className="absolute top-4 left-4 bg-white/95 text-[#0B2D58] text-[0.68rem] font-bold tracking-[0.16em] uppercase px-3 py-1 rounded-[2px] shadow-xs">
                    {service.category}
                  </span>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl text-[#0B2D58] font-medium mb-2.5 group-hover:text-[#D4A737] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#5C626B] leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E8E8E8]">
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase text-[#0B2D58] group-hover:text-[#D4A737] transition-colors focus:outline-none focus-visible:underline"
                    >
                      <span>Conocer solución</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 8. CTA Final (Bloque Azul LEVANTIR) */}
      <CTASection
        eyebrow="ASESORÍA EN SEGURO EMPRESARIAL"
        title="Revisemos cómo proteger la continuidad de tu empresa."
        supportingCopy="Evaluamos la exposición física y operativa de tu negocio para estructurar una protección técnica a la medida de tus activos y metas de continuidad."
        primaryCtaText="REVISAR LA PROTECCIÓN DE MI EMPRESA"
        primaryCtaHref="/?advisory=true"
        secondaryCtaText="HABLAR CON UN ASESOR"
        secondaryCtaHref="/?advisory=true"
      />
    </div>
  );
}
