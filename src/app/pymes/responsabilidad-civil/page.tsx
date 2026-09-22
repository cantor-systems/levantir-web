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
  Building2,
  AlertCircle,
  FileSpreadsheet,
  Briefcase,
  Building,
  MapPin,
  Sliders,
  Search,
  SlidersHorizontal,
  Handshake,
  ArrowRight,
  Info,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Seguro de Responsabilidad Civil | LEVANTIR",
  description: "Asesoría técnica para evaluar la exposición frente a terceros y estructurar coberturas de responsabilidad civil acordes a la actividad y operación de tu empresa.",
  alternates: { canonical: "https://levantir.com/pymes/responsabilidad-civil" },
};

const breadcrumbs = [
  { label: "Inicio", href: "/" },
  { label: "PYMES", href: "/pymes" },
  { label: "Responsabilidad Civil", isCurrent: true },
];

const exposureScenarios = [
  {
    title: "Daños a personas",
    icon: Users,
    description:
      "Lesiones corporales o afectaciones a la salud de terceros ocurridas en tus instalaciones o derivadas de la actividad.",
  },
  {
    title: "Daños a bienes",
    icon: Building2,
    description:
      "Deterioro o destrucción accidental de propiedades o infraestructura de terceros atribuibles a tu operación.",
  },
  {
    title: "Errores u omisiones",
    icon: AlertCircle,
    description:
      "Fallas involuntarias en servicios o asesoría técnica que generen perjuicio patrimonial directo para un cliente.",
  },
  {
    title: "Actividades de terceros",
    icon: FileSpreadsheet,
    description:
      "Responsabilidad indirecta o subsidiaria derivada de trabajos ejecutados por contratistas en nombre del negocio.",
  },
];

const riskFactors = [
  {
    name: "Giro y actividad",
    icon: Briefcase,
    summary:
      "El sector comercial, industrial o de servicios define el tipo y frecuencia de interacción con terceros.",
  },
  {
    name: "Tamaño de la empresa",
    icon: Building,
    summary:
      "El volumen operativo, plantilla y afluencia de personas condicionan las sumas aseguradas necesarias.",
  },
  {
    name: "Ubicación",
    icon: MapPin,
    summary:
      "El entorno donde opera la empresa y la afluencia en sus instalaciones determinan el nivel de exposición.",
  },
  {
    name: "Procesos y controles",
    icon: Sliders,
    summary:
      "Los estándares de seguridad, supervisión y mantenimiento preventivo inciden en la probabilidad de contingencias.",
  },
];

const approachPillars = [
  {
    icon: Search,
    title: "Análisis personalizado",
    description:
      "Evaluamos la dinámica operativa, contratos y relación con terceros para identificar puntos críticos de exposición.",
  },
  {
    icon: SlidersHorizontal,
    title: "Evaluación de alternativas",
    description:
      "Comparamos alcances, sublimites y esquemas de deducibles para estructurar una protección equilibrada y adecuada al perfil del negocio.",
  },
  {
    icon: Handshake,
    title: "Acompañamiento continuo",
    description:
      "Brindamos respaldo técnico en la interpretación contractual, actualización de pólizas y atención ante cualquier eventualidad.",
  },
];

const methodologySteps = [
  {
    number: "01",
    title: "Comprender",
    description: "Negocio, actividad y relación con terceros.",
  },
  {
    number: "02",
    title: "Identificar",
    description: "Riesgos y exposiciones relevantes.",
  },
  {
    number: "03",
    title: "Estructurar",
    description: "Alternativas de protección acordes al perfil de riesgo.",
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
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
    altText: "Estudio técnico y espacio de trabajo profesional con proyectos y maquetas",
  },
  {
    id: "hombre-clave",
    title: "Hombre Clave",
    category: "CONTINUIDAD FINANCIERA",
    description:
      "Mitigación del impacto financiero ante la falta imprevista de directivos o socios clave para la estabilidad de la empresa.",
    href: "/pymes/hombre-clave",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
    altText: "Directivo y líder empresarial en sesión estratégica de planeación",
  },
  {
    id: "pymes-hub",
    title: "Empresas & PYMES",
    category: "HUB EMPRESARIAL",
    description:
      "Visión integral de protección y continuidad para el patrimonio, las personas y las operaciones de tu empresa.",
    href: "/pymes",
    imageUrl: "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=800&auto=format&fit=crop",
    altText: "Operación comercial y servicio en establecimiento de pequeña y mediana empresa",
  },
];

export default function ResponsabilidadCivilPage() {
  return (
    <div className="flex-1 bg-white">
      {/* 1. Hero */}
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="RESPONSABILIDAD CIVIL"
        title="Cuando tu operación puede generar una obligación frente a terceros."
        supportingCopy="La exposición frente a terceros depende del giro, la actividad, la operación y el contexto específico de cada empresa. En LEVANTIR evaluamos estos factores para estructurar una protección con rigor técnico y criterio independiente."
        primaryCtaText="EVALUAR MI EXPOSICIÓN"
        primaryCtaHref="/?advisory=true"
        secondaryCtaText="CONOCER MÁS"
        secondaryCtaHref="#contexto"
        imageUrl="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Equipo directivo y responsables de empresa revisando procesos operativos y documentación en sala de juntas"
        imagePositionClass="object-[84%_center] sm:object-[86%_center] lg:object-[89%_center] xl:object-[92%_center]"
        trustNote="Asesoría técnica · Estructuración patrimonial · Criterio independiente"
        cornerDescriptorCategory="RESPONSABILIDAD CIVIL"
        cornerDescriptorText="Criterio para analizar la exposición de tu empresa frente a terceros."
        ariaLabel="Responsabilidad Civil - Protección para una operación responsable"
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
                  Protección para una operación responsable.
                </h2>
              </div>

              <div className="space-y-4 text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
                <p>
                  Cualquier empresa puede generar exposición frente a terceros derivada de su actividad cotidiana, la prestación de servicios, las características de sus instalaciones o los productos que comercializa.
                </p>
                <p>
                  Una estructuración adecuada evalúa los procesos operativos, el contacto con el público y los compromisos contractuales para determinar los alcances y límites pertinentes para salvaguardar la estabilidad financiera del negocio.
                </p>
                <p className="text-xs text-[#5C626B] italic pt-1">
                  * La disponibilidad, sumas aseguradas, alcances y condiciones dependen de la póliza contratada y de cada aseguradora.
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
                  &ldquo;Una contingencia frente a terceros no debe comprometer la continuidad patrimonial de tu empresa.&rdquo;
                </blockquote>
                <p className="text-xs sm:text-sm text-[#5C626B] pt-2 border-t border-[#E8E8E8]/80 leading-relaxed">
                  Identificamos de forma preventiva las obligaciones potenciales y los riesgos operativos para estructurar pólizas con límites técnicos acordes a la escala real de tu negocio.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Escenarios Comunes de Responsabilidad (4 Bloques Conceptuales) */}
      <Section id="escenarios" className="bg-[#F8F5EF] border-b border-[#E8E8E8] py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="max-w-3xl mb-12 sm:mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3">
              ¿EN QUÉ SITUACIONES PUEDES ESTAR EXPUESTO?
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.15] font-medium tracking-tight mb-4"
              style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
            >
              Escenarios comunes de responsabilidad.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
              Analizamos los escenarios habituales en los que una empresa puede generar obligaciones frente a terceros, adaptando la evaluación a su dinámica de negocio.
            </p>
          </div>

          {/* 4 Exposure Scenarios */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-10">
            {exposureScenarios.map((item) => {
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
              Cada empresa tiene un nivel de exposición distinto.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
              Estructurar una protección adecuada exige ponderar las variables operativas, contractuales y territoriales que caracterizan a tu organización.
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
                alcance territorial, subcontratación de servicios, cláusulas contractuales, interacción con usuarios y normas de cumplimiento sectorial.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. Nuestro Enfoque (3 Pilares Reutilizados) */}
      <ApproachSection
        eyebrow="NUESTRO ENFOQUE"
        title="Más que un seguro, un aliado para tu empresa."
        subheadline="Analizamos las alternativas disponibles para estructurar una protección de responsabilidad adecuada a tu negocio."
        pillars={approachPillars}
      />

      {/* 6. Metodología Institucional (Contextualizada a Responsabilidad Civil) */}
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
              La salvaguarda frente a obligaciones con terceros se complementa de forma estratégica con la protección de tus activos físicos y la retención del talento clave.
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
        eyebrow="ASESORÍA EN RESPONSABILIDAD CIVIL"
        title="Revisemos tu exposición y cómo proteger la continuidad de tu negocio."
        supportingCopy="Evaluamos la interacción de tu empresa con terceros para estructurar una protección equilibrada, técnica y ajustada a tu realidad operativa."
        primaryCtaText="EVALUAR MI EXPOSICIÓN"
        primaryCtaHref="/?advisory=true"
        secondaryCtaText="HABLAR CON UN ASESOR"
        secondaryCtaHref="/?advisory=true"
      />
    </div>
  );
}
