import { Metadata } from "next";
import Link from "next/link";
import { AdvisoryLink } from "@/components/ui/AdvisoryLink";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/service/PageHero";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  X,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Insights sobre riesgos y protección | LEVANTIR",
  description:
    "Análisis y perspectivas de LEVANTIR para comprender mejor riesgos personales, empresariales, logísticos, aeronáuticos y patrimoniales.",
  alternates: { canonical: "https://levantir.com/insights" },
};

// --- DATA ---
const insightTopics = [
  {
    id: "personas",
    name: "PERSONAS",
    description: "Patrimonio, protección familiar y decisiones personales.",
    href: "/personas"
  },
  {
    id: "pymes",
    name: "PYMES",
    description: "Continuidad, activos, responsabilidades y operación empresarial.",
    href: "/pymes"
  },
  {
    id: "mercancias",
    name: "MERCANCÍAS",
    description: "Logística, tránsito, almacenamiento y exposición de bienes.",
    href: "/mercancias"
  },
  {
    id: "aeronaves",
    name: "AERONAVES",
    description: "Operación aeronáutica, responsabilidad y protección de activos.",
    href: "/aeronaves"
  },
  {
    id: "sectores-especializados",
    name: "SECTORES ESPECIALIZADOS",
    description: "Riesgos que requieren estructuras y criterios particulares.",
    href: "/sectores-especializados"
  }
];

const featuredInsight = {
  id: "decisiones-proteccion-evolucion-riesgo",
  category: "ANÁLISIS DESTACADO",
  title: "Decisiones de protección que conviene revisar antes de que cambie el riesgo.",
  description: "Las necesidades de protección evolucionan cuando cambian el patrimonio, la operación, las responsabilidades o el entorno. Revisar periódicamente la exposición permite detectar brechas antes de que se conviertan en problemas.",
  imageUrl: "/images/insights/featured-insight.webp",
  imageAlt: "Estructura arquitectónica y corporativa representativa del crecimiento de activos y evolución del riesgo patrimonial",
  readSummary: [
    "La protección patrimonial no es estática; debe adecuarse a las etapas de crecimiento y expansión.",
    "Nuevos proyectos, adquisiciones o cambios regulatorios modifican el perfil de exposición.",
    "El análisis preventivo e independiente permite estructurar coberturas precisas sin sobrecostos ni lagunas."
  ]
};

const insightArticles = [
  {
    id: "patrimonio-reflejo-actual",
    category: "PERSONAS",
    title: "¿Tu protección sigue reflejando el patrimonio que tienes hoy?",
    description: "Cambios familiares, nuevos activos y nuevas responsabilidades pueden modificar las necesidades de protección con el tiempo.",
    imageUrl: "/images/insights/article-personas.webp",
    imageAlt: "Entorno residencial y familiar contemporáneo representando la preservación patrimonial",
    readSummary: [
      "El valor de los activos y la estructura familiar cambian con el paso de los años.",
      "Pólizas contratadas en el pasado pueden haber quedado desactualizadas frente al patrimonio actual.",
      "Una revisión técnica permite alinear la suma asegurada con las prioridades presentes."
    ]
  },
  {
    id: "cinco-cambios-empresa-revision-proteccion",
    category: "PYMES",
    title: "Cinco cambios en una empresa que justifican revisar su protección.",
    description: "Crecimiento, nuevas ubicaciones, maquinaria, personal o modificaciones en la operación pueden cambiar el perfil de riesgo.",
    imageUrl: "/images/insights/article-pymes.webp",
    imageAlt: "Instalaciones corporativas e infraestructura empresarial moderna",
    readSummary: [
      "Expansión física o apertura de nuevas sucursales.",
      "Incorporación de maquinaria de alto valor o tecnología crítica.",
      "Incremento significativo de plantilla o personal clave.",
      "Diversificación en líneas de negocio o nuevos modelos de distribución.",
      "Modificaciones contractuales con clientes estratégicos o proveedores."
    ]
  },
  {
    id: "proteccion-mercancia-antes-traslado",
    category: "MERCANCÍAS",
    title: "La protección de una mercancía empieza antes del traslado.",
    description: "Ruta, tipo de carga, almacenamiento, operadores y condiciones de transporte forman parte de una misma exposición.",
    imageUrl: "/images/insights/article-mercancias.webp",
    imageAlt: "Operación logística y almacenamiento estratégico de mercancías",
    readSummary: [
      "La evaluación del riesgo logístico inicia en los puntos de embalaje y carga.",
      "Monitoreo de rutas críticas, condiciones de estiba y tiempos de tránsito.",
      "Definición de responsabilidades claras entre transportistas y propietarios de la carga."
    ]
  },
  {
    id: "aeronave-parte-del-riesgo-aeronautico",
    category: "AERONAVES",
    title: "La aeronave es sólo una parte del riesgo aeronáutico.",
    description: "La operación también involucra tripulación, utilización, infraestructura, responsabilidades y características particulares de cada vuelo.",
    imageUrl: "/images/insights/article-aeronaves.webp",
    imageAlt: "Hangar privado y aeronave ejecutiva en revisión previa al despegue",
    readSummary: [
      "El casco es solo el componente visible; la responsabilidad civil a terceros y pasajeros es fundamental.",
      "Capacitación, horas de vuelo y experiencia de tripulaciones influyen en la gestión del riesgo.",
      "Operaciones en pistas no controladas o vuelos internacionales requieren cláusulas específicas."
    ]
  },
  {
    id: "operacion-fuera-solucion-estandar",
    category: "SECTORES ESPECIALIZADOS",
    title: "Cuando una operación deja de encajar en una solución estándar.",
    description: "Algunas actividades, activos y responsabilidades requieren análisis y estructuras de protección más especializadas.",
    imageUrl: "/images/insights/article-sectores.webp",
    imageAlt: "Instalaciones industriales avanzadas y equipamiento técnico especializado",
    readSummary: [
      "Los formatos comerciales convencionales suelen excluir riesgos complejos o atípicos.",
      "El diseño de un programa a medida exige dictamen de ingeniería y análisis pericial previo.",
      "Acceso a mercados de reaseguro y aseguradoras con apetito por industrias de alta especialización."
    ]
  },
  {
    id: "entender-riesgo-antes-comparar-poliza",
    category: "CRITERIO LEVANTIR",
    title: "¿Por qué entender el riesgo antes de comparar una póliza?",
    description: "Comparar coberturas tiene más sentido cuando primero se comprende qué se necesita proteger y frente a qué escenarios.",
    imageUrl: "/images/insights/article-criterio.webp",
    imageAlt: "Mesa de trabajo analítica con documentos y evaluación estratégica independiente",
    readSummary: [
      "Comparar solo precios oculta exclusiones críticas y deducibles desproporcionados.",
      "Identificar el impacto máximo probable antes de negociar condiciones en el mercado asegurador.",
      "La independencia de criterio garantiza asesoría orientada a la protección real, no a la colocación."
    ]
  }
];
// ------------

export default function InsightsPage() {
  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <PageHero
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Insights", href: "/insights" }
        ]}
        eyebrow="INSIGHTS"
        title="Entender mejor el riesgo permite tomar mejores decisiones."
        supportingCopy="Análisis, criterios y perspectivas para comprender mejor los riesgos que pueden afectar a personas, empresas, operaciones y patrimonio."
        primaryCtaText="EXPLORAR INSIGHTS"
        primaryCtaHref="#destacado"
        secondaryCtaText="HABLAR CON UN ASESOR"
        secondaryCtaHref="?advisory=true"
        imageUrl="/images/insights/hero-insights.webp"
        imageAlt="Profesionales revisando documentación técnica y notas de análisis en mesa de trabajo con luz natural"
        imagePositionClass="object-[70%_center] sm:object-[75%_center] lg:object-[80%_center]"
        cornerDescriptorCategory="LEVANTIR INSIGHTS"
        cornerDescriptorText="Análisis antes de decidir."
        ariaLabel="Hero de Insights"
      />

      {/* 2. Insight Destacado */}
      <section id="destacado" className="py-20 sm:py-24 lg:py-32 bg-white border-b border-[#E8E8E8] scroll-mt-20">
        <Container>
          <div className="flex flex-col gap-3 mb-10 sm:mb-12">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-[1.5px] bg-[#D4A737]" aria-hidden="true" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
                ANÁLISIS DESTACADO
              </p>
            </div>
            <h2 className="sr-only">Análisis Destacado</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-16 items-center bg-[#F8F5EF] border border-[#E8E8E8] rounded-[2px] overflow-hidden p-6 sm:p-8 lg:p-12 xl:p-14">
            {/* Left: Featured Image */}
            <div className="lg:col-span-6 overflow-hidden rounded-[2px] bg-[#E8E8E8] aspect-[16/11] lg:aspect-[4/3] shadow-sm">
              <img
                src={featuredInsight.imageUrl}
                alt={featuredInsight.imageAlt}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                loading="eager"
              />
            </div>

            {/* Right: Featured Text & Content */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E8E8E8] rounded-full text-xs font-semibold tracking-wider uppercase text-[#0B2D58] w-fit">
                <Sparkles className="w-3.5 h-3.5 text-[#D4A737]" />
                <span>Perspectiva Estratégica</span>
              </div>

              <h3 
                className="font-display text-2xl sm:text-3xl lg:text-[2.35rem] text-[#0B2D58] leading-[1.18] font-medium"
                style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
              >
                {featuredInsight.title}
              </h3>

              <p className="text-base sm:text-[1.05rem] text-[#2E2E2E]/80 leading-relaxed">
                {featuredInsight.description}
              </p>

              <div className="pt-3">
                <Link
                  href={`#modal-${featuredInsight.id}`}
                  scroll={false}
                  className="inline-flex items-center gap-2.5 bg-[#0B2D58] hover:bg-[#071E3B] text-white px-7 py-3.5 text-xs sm:text-[0.82rem] font-bold tracking-[0.14em] uppercase rounded-[2px] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A737]"
                >
                  <span>LEER INSIGHT</span>
                  <ArrowRight className="w-4 h-4 text-[#D4A737]" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Explorar por tema */}
      <Section className="py-20 sm:py-24 bg-[#F8F5EF] border-b border-[#E8E8E8]">
        <Container>
          <div className="max-w-3xl space-y-4 mb-14">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-[1.5px] bg-[#D4A737]" aria-hidden="true" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
                EXPLORA POR TEMA
              </p>
            </div>
            <h2 
              className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] text-[#0B2D58] leading-[1.12] font-medium"
              style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
            >
              Perspectivas para distintos tipos de riesgo.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/80 leading-relaxed pt-1">
              Explora contenidos relacionados con las distintas dimensiones de protección que analizamos en LEVANTIR.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {insightTopics.map((topic) => (
              <Link
                href={topic.href}
                key={topic.id}
                className="p-6 sm:p-7 rounded-[2px] border border-[#E8E8E8] bg-white text-[#2E2E2E] hover:border-[#0B2D58]/40 hover:shadow-xs transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold tracking-[0.16em] uppercase text-[#D4A737]">
                      {topic.name}
                    </p>
                    <ArrowUpRight className="w-4 h-4 text-[#0B2D58]/40 group-hover:text-[#0B2D58] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="text-sm text-[#2E2E2E]/75 leading-relaxed">
                    {topic.description}
                  </p>
                </div>

                <div className="pt-5 border-t mt-5 border-[#E8E8E8]">
                  <span className="text-[0.75rem] font-bold tracking-[0.12em] uppercase inline-flex items-center gap-1.5 text-[#0B2D58] group-hover:text-[#D4A737] transition-colors">
                    <span>EXPLORAR</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Insights Recientes Grid */}
      <Section className="py-20 sm:py-24 lg:py-32 bg-white">
        <Container>
          <div className="max-w-3xl space-y-4 mb-14 sm:mb-16">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-[1.5px] bg-[#D4A737]" aria-hidden="true" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
                PERSPECTIVAS
              </p>
            </div>
            <h2 
              className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] text-[#0B2D58] leading-[1.12] font-medium"
              style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
            >
              Ideas para entender mejor lo que estás protegiendo.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9 lg:gap-10">
            {insightArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-[2px] border border-[#E8E8E8] hover:border-[#0B2D58]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group min-w-0"
              >
                <div className="aspect-[16/10] overflow-hidden bg-[#E8E8E8] relative">
                  <img
                    src={article.imageUrl}
                    alt={article.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B2D58]/90 text-[#D4A737] text-[0.7rem] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-[2px] backdrop-blur-xs">
                    {article.category}
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-5">
                  <div className="space-y-3">
                    <h3 
                      className="font-display text-xl sm:text-[1.35rem] text-[#0B2D58] leading-[1.25] font-medium group-hover:text-[#0B2D58] transition-colors"
                      style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
                    >
                      {article.title}
                    </h3>
                    <p className="text-sm text-[#2E2E2E]/75 leading-relaxed">
                      {article.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E8E8E8]">
                    <Link
                      href={`#modal-${article.id}`}
                      scroll={false}
                      className="inline-flex items-center text-xs font-bold tracking-[0.14em] uppercase text-[#0B2D58] group-hover:text-[#D4A737] transition-colors gap-2"
                    >
                      <span>LEER INSIGHT</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. Bloque de Criterio Editorial */}
      <Section className="py-20 sm:py-24 bg-[#0B2D58] text-white border-t border-[#071E3B]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-[1.5px] bg-[#D4A737]" aria-hidden="true" />
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
                  NUESTRO ENFOQUE
                </p>
              </div>

              <h2 
                className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] text-white leading-[1.15] font-medium"
                style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
              >
                Información para comprender. Criterio para decidir.
              </h2>

              <div className="space-y-4 text-white/85 text-base sm:text-[1.05rem] leading-relaxed">
                <p>
                  El contenido de Insights busca ayudarte a identificar preguntas, escenarios y factores que pueden influir en una decisión de protección.
                </p>
                <p className="text-white/70 text-sm sm:text-base">
                  Cada persona, patrimonio u operación presenta características distintas, por lo que el contenido tiene carácter informativo y no sustituye un análisis particular.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white/5 border border-white/12 p-8 sm:p-10 rounded-[2px] space-y-7">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
                    CRITERIO LEVANTIR
                  </span>
                  <span className="text-xs text-white/50">Metodología de análisis</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-2">
                  <div className="space-y-2 p-3 rounded-[2px] bg-white/[0.03] border border-white/5">
                    <span className="text-[0.7rem] font-mono text-[#D4A737] block">01</span>
                    <h3 className="text-sm font-bold text-white">Comprender</h3>
                    <p className="text-xs text-white/65 leading-normal">Contexto y prioridades reales.</p>
                  </div>

                  <div className="space-y-2 p-3 rounded-[2px] bg-white/[0.03] border border-white/5">
                    <span className="text-[0.7rem] font-mono text-[#D4A737] block">02</span>
                    <h3 className="text-sm font-bold text-white">Identificar</h3>
                    <p className="text-xs text-white/65 leading-normal">Exposición y vulnerabilidades.</p>
                  </div>

                  <div className="space-y-2 p-3 rounded-[2px] bg-white/[0.03] border border-white/5">
                    <span className="text-[0.7rem] font-mono text-[#D4A737] block">03</span>
                    <h3 className="text-sm font-bold text-white">Evaluar</h3>
                    <p className="text-xs text-white/65 leading-normal">Alternativas y coberturas.</p>
                  </div>

                  <div className="space-y-2 p-3 rounded-[2px] bg-white/[0.03] border border-white/5">
                    <span className="text-[0.7rem] font-mono text-[#D4A737] block">04</span>
                    <h3 className="text-sm font-bold text-white">Estructurar</h3>
                    <p className="text-xs text-white/65 leading-normal">Programa a medida y seguimiento.</p>
                  </div>
                </div>

                <p className="text-xs text-white/60 italic text-center pt-2">
                  Comprender → Identificar → Evaluar → Estructurar
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. Final CTA */}
      <section className="bg-[#0B2D58] text-white py-24 sm:py-28 lg:py-32 xl:py-36 relative overflow-hidden border-t border-[#071E3B] flex items-center">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
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
                ¿Hay un riesgo que necesitas entender mejor?
              </h2>
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-white/15 lg:pl-8 xl:pl-12 flex flex-col justify-center space-y-6 sm:space-y-7 min-w-0">
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                Cuéntanos tu situación y revisemos juntos qué factores conviene considerar antes de tomar una decisión.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-1">
                <AdvisoryLink
                  href="?advisory=true"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#D4A737] hover:bg-[#C4962B] text-[#0B2D58] px-7 py-4 text-xs sm:text-[0.82rem] font-bold tracking-[0.14em] uppercase rounded-[2px] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap"
                >
                  <span>HABLAR CON UN ASESOR</span>
                  <ArrowRight className="w-4 h-4" />
                </AdvisoryLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Reading / Detail Modals for Insights using CSS :target */}
      {[featuredInsight, ...insightArticles].map((article) => (
        <div 
          key={article.id}
          id={`modal-${article.id}`}
          className="hidden target:flex fixed inset-0 z-50 items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label={article.title}
        >
          <div className="bg-white max-w-2xl w-full rounded-[2px] shadow-2xl border border-[#E8E8E8] max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-6 sm:p-7 border-b border-[#E8E8E8] flex items-start justify-between gap-4 bg-[#F8F5EF]">
              <div className="space-y-1.5">
                <span className="text-[0.75rem] font-bold tracking-[0.16em] uppercase text-[#D4A737]">
                  {article.category}
                </span>
                <h3 
                  className="font-display text-xl sm:text-2xl text-[#0B2D58] leading-[1.25] font-medium"
                  style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
                >
                  {article.title}
                </h3>
              </div>
              <Link
                href="#_"
                scroll={false}
                className="p-2 text-[#2E2E2E]/60 hover:text-[#0B2D58] rounded-full hover:bg-white transition-colors"
                aria-label="Cerrar ventana"
              >
                <X className="w-5 h-5" />
              </Link>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="aspect-[16/9] rounded-[2px] overflow-hidden bg-[#E8E8E8]">
                <img
                  src={article.imageUrl}
                  alt={article.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-[#2E2E2E]/85 leading-relaxed text-base">
                <p className="font-medium text-[#0B2D58] text-lg leading-snug">
                  {article.description}
                </p>

                {article.readSummary && article.readSummary.length > 0 && (
                  <div className="pt-3 space-y-3">
                    <p className="text-xs font-bold tracking-[0.16em] uppercase text-[#0B2D58]">
                      Puntos clave a considerar:
                    </p>
                    <ul className="space-y-2.5">
                      {article.readSummary.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-[#2E2E2E]/80">
                          <CheckCircle2 className="w-4 h-4 text-[#D4A737] mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="bg-[#F8F5EF] p-5 rounded-[2px] border border-[#E8E8E8] space-y-2">
                <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#0B2D58]">
                  Criterio técnico independiente
                </p>
                <p className="text-xs text-[#2E2E2E]/75 leading-relaxed">
                  En LEVANTIR analizamos tus pólizas actuales o necesidades de cobertura para estructurar programas que realmente mitiguen tus riesgos.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-[#E8E8E8] flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
              <Link
                href="#_"
                scroll={false}
                className="w-full sm:w-auto px-5 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-[#2E2E2E]/70 hover:text-[#0B2D58] transition-colors"
              >
                Cerrar
              </Link>
              <AdvisoryLink
                href="?advisory=true"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D4A737] hover:bg-[#C4962B] text-[#0B2D58] px-6 py-3 text-xs font-bold tracking-[0.14em] uppercase rounded-[2px] transition-colors shadow-sm"
              >
                <span>ANALIZAR ESTE RIESGO</span>
                <ArrowRight className="w-4 h-4" />
              </AdvisoryLink>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

