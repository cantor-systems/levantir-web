import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/service/PageHero";
import {
  ArrowRight,
  Shield,
  UserCheck,
  Compass,
  HeartHandshake,
  FileSearch,
  Users,
  Building2,
  RefreshCw,
  Award,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Nosotros | Asesoría en Seguros y Gestión de Riesgos | LEVANTIR",
  description:
    "Conoce el enfoque de LEVANTIR para entender riesgos, proteger patrimonio y acompañar a personas, empresarios y empresas con criterio técnico e independiente.",
  alternates: { canonical: "https://levantir.com/nosotros" },
};

const breadcrumbs = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", isCurrent: true },
];

const principles = [
  {
    icon: UserCheck,
    title: "Enfoque en el cliente",
    description:
      "Las decisiones parten de las necesidades, objetivos y contexto real de cada cliente, asegurando pertinencia en cada cobertura.",
  },
  {
    icon: Compass,
    title: "Independencia",
    description:
      "Analizamos alternativas con criterio objetivo y sin partir de una solución predeterminada ni compromisos de colocación.",
  },
  {
    icon: Shield,
    title: "Visión integral",
    description:
      "Entendemos el riesgo desde una perspectiva patrimonial, personal y empresarial, protegiendo todos los frentes que interactúan.",
  },
  {
    icon: HeartHandshake,
    title: "Relaciones de largo plazo",
    description:
      "Construimos vínculos basados en claridad, seguimiento y acompañamiento continuo en cada etapa de evolución o siniestro.",
  },
];

const dimensions = [
  {
    label: "Contexto",
    text: "Comprendemos la realidad particular y el entorno operativo o familiar en que te desenvuelves.",
  },
  {
    label: "Patrimonio",
    text: "Evaluamos los activos tangibles e intangibles que dan sustento y continuidad a tu trayectoria.",
  },
  {
    label: "Objetivos",
    text: "Alineamos cada estructura de cobertura con tus prioridades inmediatas y de largo plazo.",
  },
  {
    label: "Operación",
    text: "Identificamos los puntos neurálgicos, dependencias críticas y contingencias de actividad.",
  },
  {
    label: "Responsabilidades",
    text: "Dimensionamos las obligaciones hacia terceros, colaboradores y dependientes familiares.",
  },
  {
    label: "Necesidades reales",
    text: "Partimos de lo que verdaderamente requieres, sin empaquetados genéricos ni sobrecostos.",
  },
];

const methodologySteps = [
  {
    number: "01",
    title: "Comprender",
    description: "Conocemos tu contexto, patrimonio, operación, responsabilidades y objetivos.",
  },
  {
    number: "02",
    title: "Identificar",
    description: "Analizamos las exposiciones relevantes de acuerdo con tu realidad.",
  },
  {
    number: "03",
    title: "Estructurar",
    description: "Evaluamos alternativas de protección adecuadas a tu perfil de riesgo.",
  },
  {
    number: "04",
    title: "Implementar",
    description: "Acompañamos la selección y contratación de la solución.",
  },
  {
    number: "05",
    title: "Revisar",
    description: "Damos seguimiento y adaptamos la protección conforme evoluciona tu situación.",
  },
];

const credibilityAttributes = [
  {
    icon: FileSearch,
    title: "Análisis técnico",
    description: "Evaluación rigurosa de cláusulas, sumas aseguradas, deducibles y coberturas reales.",
  },
  {
    icon: Users,
    title: "Atención personalizada",
    description: "Un interlocutor experto dedicado a tu cuenta, disponible cuando surgen inquietudes.",
  },
  {
    icon: Building2,
    title: "Visión patrimonial",
    description: "Conexión integral entre riesgos personales, familiares y estructuras de negocio.",
  },
  {
    icon: RefreshCw,
    title: "Acompañamiento continuo",
    description: "Respaldo activo en renovaciones, siniestros y adaptaciones periódicas de póliza.",
  },
  {
    icon: Award,
    title: "Relaciones de largo plazo",
    description: "Compromiso de permanencia cimentado en transparencia, rigor profesional y ética.",
  },
];

export default function NosotrosPage() {
  return (
    <div className="w-full">
      {/* 1. Hero */}
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="NUESTRO PROPÓSITO"
        title="El riesgo se entiende antes de asegurarse."
        supportingCopy="En LEVANTIR ayudamos a personas, empresarios y empresas a tomar mejores decisiones frente al riesgo, con análisis técnico, acceso a soluciones y un acompañamiento independiente."
        primaryCtaText="SOLICITAR ASESORÍA"
        primaryCtaHref="?advisory=true"
        secondaryCtaText="CONOCER NUESTRA METODOLOGÍA"
        secondaryCtaHref="#metodologia"
        trustNote="Asesoría objetiva · Visión patrimonial · Acompañamiento continuo"
        cornerDescriptorCategory="NUESTRO PROPÓSITO"
        cornerDescriptorText="Protegemos lo que has construido."
        imageUrl="/images/nosotros/hero-familia.webp"
        imageAlt="Familia completa —padre, madre e hijos— compartiendo un momento de tranquilidad y convivencia en un hogar contemporáneo"
        imagePositionClass="object-[75%_center] sm:object-[78%_center] lg:object-[82%_center] xl:object-[85%_center]"
        ariaLabel="Página institucional Nosotros de LEVANTIR"
      />

      {/* 2. Quiénes Somos */}
      <Section id="quienes-somos" className="bg-[#FFFFFF] border-b border-[#E8E8E8] py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start mb-16 sm:mb-20">
            {/* Left Header */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-[1.5px] bg-[#D4A737]" aria-hidden="true" />
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
                  QUIÉNES SOMOS
                </p>
              </div>
              <h2
                className="font-display text-3xl sm:text-4xl md:text-[2.65rem] lg:text-[2.95rem] text-[#0B2D58] leading-[1.14] font-medium"
                style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
              >
                Más que seguros, una visión patrimonial.
              </h2>
            </div>

            {/* Right Context Copy */}
            <div className="lg:col-span-6 lg:border-l lg:border-[#E8E8E8] lg:pl-8 xl:pl-12 flex flex-col justify-center space-y-4 pt-1 lg:pt-3">
              <p className="text-base sm:text-[1.08rem] text-[#2E2E2E] leading-relaxed font-normal">
                <strong className="text-[#0B2D58] font-semibold">LEVANTIR</strong> es un despacho de asesoría en seguros y gestión de riesgos que acompaña a personas, empresarios y empresas a entender sus exposiciones y estructurar soluciones de protección acordes a su realidad.
              </p>
              <p className="text-[0.95rem] sm:text-base text-[#2E2E2E]/80 leading-relaxed font-normal">
                No creemos en pólizas genéricas ni en catálogos cerrados. Nuestro trabajo consiste en traducir complejidades contractuales en certidumbre, asegurando que cada activo, persona y operación cuente con el respaldo exacto que requiere.
              </p>
            </div>
          </div>

          {/* 6 Dimensions Matrix */}
          <div className="pt-2">
            <div className="mb-6">
              <p className="text-xs font-bold tracking-[0.16em] uppercase text-[#0B2D58]/70">
                DIMENSIONES QUE FUNDAMENTAN NUESTRO ANÁLISIS
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {dimensions.map((dim, idx) => (
                <div
                  key={dim.label}
                  className="bg-[#F8F5EF] border border-[#E8E8E8] p-6 sm:p-7 rounded-[2px] hover:border-[#D4A737]/60 transition-colors"
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="text-xs font-mono font-bold text-[#D4A737]">0{idx + 1}</span>
                    <h3 className="text-base sm:text-[1.05rem] font-bold text-[#0B2D58] tracking-tight">
                      {dim.label}
                    </h3>
                  </div>
                  <p className="text-[0.92rem] sm:text-[0.96rem] text-[#2E2E2E]/85 leading-relaxed font-normal">
                    {dim.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Principios / Valores */}
      <Section className="bg-[#F8F5EF] border-b border-[#E8E8E8] py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="max-w-2xl mb-14 sm:mb-16">
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="w-6 h-[1.5px] bg-[#D4A737]" aria-hidden="true" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
                NUESTROS PRINCIPIOS
              </p>
            </div>
            <h2
              className="font-display text-2xl sm:text-3xl md:text-[2.45rem] text-[#0B2D58] leading-[1.18] font-medium"
              style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
            >
              Criterio técnico e independencia en cada recomendación.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {principles.map((p) => {
              const IconComp = p.icon;
              return (
                <div
                  key={p.title}
                  className="bg-white border border-[#E8E8E8] p-7 rounded-[2px] flex flex-col justify-between shadow-[0_2px_8px_rgba(11,45,88,0.02)] hover:border-[#D4A737]/60 transition-all duration-200"
                >
                  <div>
                    <div className="w-11 h-11 rounded-[2px] bg-[#F8F5EF] border border-[#E8E8E8] flex items-center justify-center text-[#0B2D58] mb-5">
                      <IconComp className="w-5 h-5 text-[#D4A737]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0B2D58] tracking-tight mb-2.5">
                      {p.title}
                    </h3>
                    <p className="text-[0.93rem] text-[#2E2E2E]/85 leading-relaxed font-normal">
                      {p.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 4. Filosofía LEVANTIR */}
      <Section className="bg-[#FFFFFF] border-b border-[#E8E8E8] py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-6 order-2 lg:order-1 relative">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-[2px] overflow-hidden border border-[#E8E8E8] shadow-sm">
                <img
                  src="/images/nosotros/filosofia.webp"
                  alt="Residencia contemporánea con luz cálida y entorno sereno"
                  className="w-full h-full object-cover filter brightness-[0.98] contrast-[1.04]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />

                {/* Overlaid Editorial Card */}
                <div className="absolute bottom-6 left-6 right-6 p-5 sm:p-6 bg-white/95 backdrop-blur-[4px] border border-[#E8E8E8] rounded-[2px] shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-4 h-[1.5px] bg-[#D4A737]" aria-hidden="true" />
                    <p className="text-[0.7rem] sm:text-xs font-bold tracking-[0.16em] uppercase text-[#D4A737]">
                      COMPROMISO INSTITUCIONAL
                    </p>
                  </div>
                  <blockquote
                    className="font-display text-lg sm:text-xl md:text-[1.35rem] text-[#0B2D58] leading-snug font-medium mb-1.5"
                    style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
                  >
                    &ldquo;Protegemos lo que has construido.&rdquo;
                  </blockquote>
                  <p className="text-xs sm:text-sm text-[#2E2E2E]/80 font-normal">
                    Nuestro principio, hoy y siempre.
                  </p>
                </div>
              </div>
            </div>

            {/* Textual Column */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <div className="space-y-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-[1.5px] bg-[#D4A737]" aria-hidden="true" />
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
                    NUESTRA FILOSOFÍA
                  </p>
                </div>
                <h2
                  className="font-display text-3xl sm:text-4xl md:text-[2.75rem] text-[#0B2D58] leading-[1.14] font-medium"
                  style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
                >
                  Riesgos hoy. <br className="hidden sm:inline" />
                  Oportunidades mañana.
                </h2>
              </div>

              <div className="border-l-2 border-[#D4A737] pl-5 py-1">
                <p className="text-lg sm:text-[1.12rem] text-[#0B2D58] font-medium leading-relaxed">
                  Creemos que una gestión de riesgos bien estructurada no sólo protege lo que ha costado construir, sino que también ayuda a crear mejores condiciones para tomar decisiones y avanzar con mayor tranquilidad.
                </p>
              </div>

              <div className="space-y-4 pt-1 text-[0.96rem] sm:text-base text-[#2E2E2E]/85 leading-relaxed font-normal">
                <p>
                  <strong className="text-[#0B2D58] font-semibold">Criterio antes que catálogo:</strong> El valor no está en acumular pólizas aisladas, sino en estructurar coberturas que respondan con exactitud técnica y contractual en el momento en que se presentan los imprevistos.
                </p>
                <p>
                  <strong className="text-[#0B2D58] font-semibold">Certidumbre para decidir:</strong> Cuando las personas y empresas entienden con claridad sus exposiciones, operan, invierten y planifican con una base sólida de confianza y estabilidad.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. Metodología */}
      <Section id="metodologia" className="bg-[#F8F5EF] border-b border-[#E8E8E8] py-22 sm:py-26 lg:py-32 scroll-mt-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start mb-16 sm:mb-20">
            <div className="lg:col-span-7 space-y-3.5">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-[1.5px] bg-[#D4A737]" aria-hidden="true" />
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
                  NUESTRA METODOLOGÍA
                </p>
              </div>
              <h2
                className="font-display text-3xl sm:text-4xl lg:text-[3.15rem] text-[#0B2D58] leading-[1.12] font-medium"
                style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
              >
                Un proceso claro para decisiones más sólidas.
              </h2>
            </div>

            <div className="lg:col-span-5 lg:pt-8">
              <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed max-w-[48ch]">
                Aplicamos una metodología estructurada para entender, analizar y acompañar cada decisión de protección patrimonial.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-7 sm:gap-8 lg:gap-7 xl:gap-9">
            {methodologySteps.map((step, index) => (
              <div
                key={step.number}
                className={`relative flex flex-col bg-white border border-[#E8E8E8] p-7 sm:p-8 rounded-[2px] transition-all duration-300 hover:border-[#D4A737] hover:shadow-sm ${
                  index === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <span
                  className="font-display text-[2.65rem] sm:text-[3.15rem] text-[#D4A737] font-normal tracking-tight block mb-3.5 leading-none"
                  style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
                >
                  {step.number}
                </span>

                <h3 className="text-lg sm:text-[1.2rem] font-bold text-[#0B2D58] tracking-tight mb-2.5">
                  {step.title}
                </h3>

                <p className="text-[0.92rem] sm:text-[0.96rem] text-[#2E2E2E]/85 leading-[1.65]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. Prueba / Credibilidad */}
      <Section className="bg-[#FFFFFF] border-b border-[#E8E8E8] py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="max-w-2xl mb-14 sm:mb-16">
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="w-6 h-[1.5px] bg-[#D4A737]" aria-hidden="true" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
                NUESTRO COMPROMISO
              </p>
            </div>
            <h2
              className="font-display text-2xl sm:text-3xl md:text-[2.45rem] text-[#0B2D58] leading-[1.18] font-medium"
              style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
            >
              Confianza respaldada por rigor, criterio y atención cercana.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-7">
            {credibilityAttributes.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-[#F8F5EF] border border-[#E8E8E8] p-6 sm:p-7 rounded-[2px] flex flex-col justify-between hover:border-[#D4A737]/60 transition-colors"
                >
                  <div>
                    <div className="w-10 h-10 rounded-[2px] bg-white border border-[#E8E8E8] flex items-center justify-center text-[#0B2D58] mb-4">
                      <IconComp className="w-5 h-5 text-[#D4A737]" />
                    </div>
                    <h3 className="text-base sm:text-[1.05rem] font-bold text-[#0B2D58] tracking-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[0.88rem] sm:text-[0.92rem] text-[#2E2E2E]/80 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 7. Experiencia y Equipo */}
      <Section className="bg-[#F8F5EF] border-b border-[#E8E8E8] py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-[1.5px] bg-[#D4A737]" aria-hidden="true" />
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
                    NUESTRO EQUIPO
                  </p>
                </div>
                <h2
                  className="font-display text-3xl sm:text-4xl md:text-[2.75rem] text-[#0B2D58] leading-[1.14] font-medium"
                  style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
                >
                  Experiencia que se traduce en mejores decisiones.
                </h2>
              </div>

              <p className="text-base sm:text-lg text-[#2E2E2E]/90 leading-relaxed font-normal">
                Nuestro equipo combina experiencia en seguros, análisis de riesgos y atención personalizada. Trabajamos de manera cercana para entender lo que realmente importa y construir soluciones que tengan sentido en cada contexto.
              </p>

              <div className="space-y-3 pt-2 text-[0.95rem] text-[#2E2E2E]/85">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D4A737] flex-shrink-0 mt-0.5" />
                  <span>Análisis técnico y contractual sin sesgos comerciales predeterminados.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D4A737] flex-shrink-0 mt-0.5" />
                  <span>Interlocutores consultivos que entienden la dinámica patrimonial y empresarial.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D4A737] flex-shrink-0 mt-0.5" />
                  <span>Acompañamiento proactivo en la gestión de siniestros y renovaciones periódicas.</span>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  href="?advisory=true"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#0B2D58] hover:bg-[#071E3B] text-white h-[52px] sm:h-[54px] px-8 text-xs sm:text-[0.82rem] font-bold tracking-[0.14em] uppercase rounded-[2px] transition-all shadow-sm"
                >
                  <span>HABLAR CON UN ASESOR</span>
                  <ArrowRight className="w-4 h-4 text-[#D4A737]" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-[2px] overflow-hidden border border-[#E8E8E8] shadow-sm">
                <img
                  src="/images/nosotros/equipo-consultoria.webp"
                  alt="Mesa de trabajo profesional con análisis documental y asesoría estratégica"
                  className="w-full h-full object-cover filter brightness-[0.98] contrast-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent pointer-events-none" />

                <div className="absolute bottom-5 left-5 right-5 p-4 bg-white/95 backdrop-blur-[3px] border border-[#E8E8E8] rounded-[2px]">
                  <p className="text-xs font-bold text-[#0B2D58] tracking-tight mb-0.5">
                    Asesoría Técnica y Consulta Especializada
                  </p>
                  <p className="text-[0.82rem] text-[#2E2E2E]/80">
                    Atención personalizada y análisis continuo para cada estructura patrimonial.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 8. CTA Final */}
      <section className="bg-[#0B2D58] text-white py-24 sm:py-28 lg:py-32 xl:py-36 relative overflow-hidden border-t border-[#071E3B] flex items-center">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-4 min-w-0">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-[1.5px] bg-[#D4A737]" aria-hidden="true" />
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
                  HABLEMOS DE TU PROTECCIÓN
                </p>
              </div>
              <h2
                className="font-display text-3xl sm:text-4xl md:text-[2.95rem] lg:text-[3.35rem] text-white leading-[1.12] font-medium"
                style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
              >
                Tu patrimonio merece una conversación con criterio.
              </h2>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 lg:border-l lg:border-white/15 lg:pl-8 xl:pl-12 flex flex-col justify-center space-y-6 sm:space-y-7 min-w-0">
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                Cuéntanos tu situación y descubre cómo podemos ayudarte a proteger lo que has construido y lo que está por venir.
              </p>

              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center lg:items-stretch xl:items-center gap-3.5 sm:gap-4 pt-1">
                <Link
                  href="?advisory=true"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#D4A737] hover:bg-[#C4962B] text-[#0B2D58] px-7 py-4 text-xs sm:text-[0.82rem] font-bold tracking-[0.14em] uppercase rounded-[2px] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap"
                >
                  <span>SOLICITAR ASESORÍA</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="?advisory=true"
                  className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white text-white px-6 py-4 text-xs sm:text-[0.82rem] font-semibold tracking-[0.12em] uppercase rounded-[2px] transition-colors whitespace-nowrap"
                >
                  <span>HABLAR CON UN ASESOR</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

