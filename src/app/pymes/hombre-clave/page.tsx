import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/service/PageHero";
import { ApproachSection } from "@/components/service/ApproachSection";
import { ServiceMethodologySection } from "@/components/service/ServiceMethodologySection";
import { CTASection } from "@/components/service/CTASection";
import {
  Users,
  Briefcase,
  MapPin,
  Search,
  SlidersHorizontal,
  Handshake,
  ArrowRight,
  Info,
  Award,
  TrendingUp,
  Cpu,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Seguro de Hombre Clave para Empresas | LEVANTIR",
  description: "Asesoría técnica para identificar personas clave, evaluar el nivel de dependencia y estructurar esquemas de protección patrimonial y continuidad empresarial.",
  alternates: { canonical: "https://levantir.com/pymes/hombre-clave" },
};

const breadcrumbs = [
  { label: "Inicio", href: "/" },
  { label: "PYMES", href: "/pymes" },
  { label: "Hombre Clave", isCurrent: true },
];

const commonProfiles = [
  {
    title: "Fundador",
    icon: Award,
    description: "Persona que impulsa y dirige el negocio desde su origen.",
  },
  {
    title: "Ejecutivo clave",
    icon: UserCheck,
    description: "Liderazgo estratégico en áreas críticas de la empresa.",
  },
  {
    title: "Comercial estratégico",
    icon: TrendingUp,
    description: "Genera o mantiene relaciones relevantes con clientes.",
  },
  {
    title: "Especialista",
    icon: Cpu,
    description: "Conocimiento técnico difícil de reemplazar.",
  },
  {
    title: "Socio operativo",
    icon: Users,
    description: "Participa activamente en la operación y toma de decisiones.",
  },
];

const riskFactors = [
  {
    name: "Giro y actividad",
    icon: Briefcase,
    summary:
      "El sector y la naturaleza del negocio definen qué funciones resultan críticas para la estabilidad operativa.",
  },
  {
    name: "Tamaño de la empresa",
    icon: Users,
    summary:
      "La estructura de la organización y la distribución de responsabilidades influyen en la capacidad de absorción de un imprevisto.",
  },
  {
    name: "Ubicación",
    icon: MapPin,
    summary:
      "El entorno de mercado, la disponibilidad local de talento especializado y el marco regulatorio aplicable.",
  },
  {
    name: "Nivel de dependencia",
    icon: ShieldCheck,
    summary:
      "Qué tan crítico es el rol de la persona para la operación cotidiana, los ingresos, el crecimiento y la continuidad del negocio.",
  },
];

const approachPillars = [
  {
    icon: Search,
    title: "Análisis personalizado",
    description:
      "Identificar personas clave y evaluar su relevancia para la operación.",
  },
  {
    icon: SlidersHorizontal,
    title: "Evaluación de alternativas",
    description:
      "Comparar opciones de protección acordes al contexto de la empresa.",
  },
  {
    icon: Handshake,
    title: "Acompañamiento continuo",
    description:
      "Apoyar antes, durante y después de la contratación.",
  },
];

const methodologySteps = [
  {
    number: "01",
    title: "Comprender",
    description: "Negocio, estructura y personas clave.",
  },
  {
    number: "02",
    title: "Identificar",
    description: "Riesgos y dependencia relevante.",
  },
  {
    number: "03",
    title: "Estructurar",
    description: "Alternativas de protección acordes al contexto.",
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
    id: "seguro-empresarial",
    title: "Seguro Empresarial",
    category: "PROTECCIÓN PATRIMONIAL",
    description:
      "Estructuración técnica para salvaguardar instalaciones, maquinaria, equipo e inventarios indispensables para la continuidad del negocio.",
    href: "/pymes/seguro-empresarial",
    actionText: "Conocer Seguro Empresarial",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
    altText: "Estudio técnico y espacio de trabajo profesional con proyectos y maquetas",
  },
  {
    id: "responsabilidad-civil",
    title: "Responsabilidad Civil",
    category: "RESPONSABILIDAD OPERATIVA",
    description:
      "Evaluación técnica y esquemas de protección ante eventuales obligaciones y reclamos derivados de la actividad empresarial frente a terceros.",
    href: "/pymes/responsabilidad-civil",
    actionText: "Conocer Responsabilidad Civil",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
    altText: "Equipo directivo revisando procesos operativos y documentación en sala de juntas",
  },
  {
    id: "pymes-hub",
    title: "Empresas & PYMES",
    category: "HUB EMPRESARIAL",
    description:
      "Visión integral de protección y continuidad para el patrimonio, las personas y las operaciones de tu empresa.",
    href: "/pymes",
    actionText: "Explorar soluciones para PYMES",
    imageUrl: "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=800&auto=format&fit=crop",
    altText: "Operación comercial y servicio en establecimiento de pequeña y mediana empresa",
  },
];

export default function HombreClavePage() {
  return (
    <div className="flex-1 bg-white">
      {/* 1. Hero */}
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="HOMBRE CLAVE"
        title="¿Qué ocurre con tu empresa cuando una persona es difícil de reemplazar?"
        supportingCopy="La ausencia de una persona clave puede comprometer la operación cotidiana, los flujos de ingresos, la continuidad estratégica, las relaciones con clientes o proveedores, el conocimiento técnico acumulado y la capacidad de ejecución de tu empresa. En LEVANTIR estructuramos soluciones con rigor técnico y criterio independiente."
        primaryCtaText="ANALIZAR PERSONAS CLAVE DE MI EMPRESA"
        primaryCtaHref="?advisory=true"
        secondaryCtaText="CONOCER MÁS"
        secondaryCtaHref="#contexto"
        imageUrl="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Especialista y líder técnico concentrado en su labor profesional con equipo de trabajo colaborando en segundo plano"
        imagePositionClass="object-[84%_center] sm:object-[86%_center] lg:object-[88%_center] xl:object-[90%_center]"
        trustNote="Asesoría técnica · Estructuración patrimonial · Criterio independiente"
        cornerDescriptorCategory="HOMBRE CLAVE"
        cornerDescriptorText="Criterio para proteger la continuidad de tu empresa ante la ausencia de roles críticos."
        ariaLabel="Hombre Clave - Continuidad ante la ausencia de personas clave"
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
                  Continuidad ante la ausencia de personas clave.
                </h2>
              </div>

              <div className="space-y-4 text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
                <p>
                  En toda organización existen personas cuyo rol genera un valor determinante para la estabilidad del negocio. Su aportación suele estar vinculada a conocimientos especializados, liderazgo directivo, confianza en relaciones comerciales clave o experiencia acumulada a lo largo del tiempo.
                </p>
                <p>
                  Estructurar esquemas de previsión permite a la empresa contar con un respaldo financiero ordenado para absorber contingencias, mantener compromisos operativos y facilitar la transición o sustitución sin vulnerar su viabilidad.
                </p>
                <p className="text-xs text-[#5C626B] italic pt-1">
                  * La disponibilidad, sumas aseguradas, alcances y condiciones dependen de la póliza contratada y de cada aseguradora.
                </p>
              </div>
            </div>

            {/* Right Column: Editorial Highlight Box with Statement */}
            <div className="lg:col-span-6 lg:pt-2">
              <div className="p-7 sm:p-8 bg-[#F8F5EF] border border-[#E8E8E8] border-l-4 border-l-[#0B2D58] rounded-[2px] space-y-4">
                <p className="text-xs uppercase tracking-[0.16em] font-bold text-[#D4A737]">
                  CRITERIO EDITORIAL
                </p>
                <blockquote className="text-base sm:text-lg italic text-[#0B2D58] font-serif leading-relaxed">
                  &ldquo;Las personas clave generan valor que va más allá de su puesto.&rdquo;
                </blockquote>
                <p className="text-xs sm:text-sm text-[#5C626B] pt-2 border-t border-[#E8E8E8]/80 leading-relaxed">
                  Identificamos de forma técnica qué funciones concentran dependencia operativa o financiera para estructurar alternativas de protección que respalden la continuidad institucional de tu empresa.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Perfiles Comunes (Exactamente 5 Perfiles) */}
      <Section id="perfiles" className="bg-[#F8F5EF] border-b border-[#E8E8E8] py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="max-w-3xl mb-12 sm:mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3">
              ¿QUIÉNES PUEDEN SER PERSONAS CLAVE?
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.15] font-medium tracking-tight mb-4"
              style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
            >
              Perfiles comunes en las empresas.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
              Cada negocio cuenta con figuras que concentran conocimiento, liderazgo o relaciones estratégicas determinantes para su desempeño cotidiano.
            </p>
          </div>

          {/* 5 Profiles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-6 mb-10">
            {commonProfiles.map((item) => {
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

      {/* 4. Factores a Considerar (4 Factores) */}
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
              Cada empresa tiene un nivel de riesgo distinto.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
              Estructurar una protección adecuada exige ponderar las variables que determinan el grado de dependencia operativa, técnica y financiera de la organización.
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
                tiempos estimados de reemplazo, transferibilidad del conocimiento, concentración de relaciones comerciales y acuerdos entre socios.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. Nuestro Enfoque (3 Pilares Reutilizados) */}
      <ApproachSection
        eyebrow="NUESTRO ENFOQUE"
        title="Más que un seguro, un aliado para tu empresa."
        subheadline="Analizamos las alternativas disponibles para estructurar una protección de personas clave acorde al contexto de tu negocio."
        pillars={approachPillars}
      />

      {/* 6. Metodología Institucional (Contextualizada a Hombre Clave) */}
      <ServiceMethodologySection
        eyebrow="METODOLOGÍA LEVANTIR"
        title="Un proceso estructurado para proteger tu empresa."
        subtitle="Rigor consultivo de cinco fases enfocado en la mitigación de contingencias y la estabilidad de tu negocio."
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
              La continuidad ante la ausencia de figuras clave se complementa de forma directa con la salvaguarda de tus instalaciones físicas y la mitigación de responsabilidades frente a terceros.
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
                      <span>{service.actionText}</span>
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
        eyebrow="HOMBRE CLAVE"
        title="Revisemos juntos la protección para las personas clave de tu empresa."
        supportingCopy="Identifiquemos las dependencias operativas y estratégicas de tu organización para estructurar un esquema de previsión patrimonial ordenado, prudente y con rigor técnico."
        primaryCtaText="ANALIZAR PERSONAS CLAVE DE MI EMPRESA"
        primaryCtaHref="?advisory=true"
        secondaryCtaText="HABLAR CON UN ASESOR"
        secondaryCtaHref="?advisory=true"
      />
    </div>
  );
}

