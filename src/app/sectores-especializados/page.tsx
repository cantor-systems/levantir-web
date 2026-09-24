import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Gem, Cpu, Building2, Scale, Activity, Users, Gauge, Coins, Compass, FileText, Search, SlidersHorizontal, Handshake, CheckCircle2, Info } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/service/PageHero";
import { ApproachSection } from "@/components/service/ApproachSection";
import { SpecializedAdvisoryFormSection } from "@/components/service/SpecializedAdvisoryFormSection";
import { ServiceMethodologySection } from "@/components/service/ServiceMethodologySection";
import { CTASection } from "@/components/service/CTASection";

export const metadata: Metadata = {
  title: "Sectores Especializados | Soluciones para Riesgos Complejos | LEVANTIR",
  description: "Análisis técnico y estructuración de coberturas para operaciones complejas, activos de alto valor y responsabilidades no estandarizadas con LEVANTIR.",
  alternates: { canonical: "https://levantir.com/sectores-especializados" },
};

const breadcrumbs = [
  { label: "Inicio", href: "/" },
  { label: "Sectores especializados", isCurrent: true },
];

const dimensionsOfAnalysis = [
  { id: "activos-alto-valor", title: "Activos de alto valor", icon: Gem, description: "Cobertura estructurada para equipos, maquinaria o aeronaves cuyo valor de reposición e impacto patrimonial justifican un análisis a detalle." },
  { id: "operacion-tecnica", title: "Operación técnica", icon: Cpu, description: "Procesos especializados donde las contingencias operativas pueden paralizar proyectos o alterar compromisos contractuales de alta exigencia." },
  { id: "infraestructura", title: "Infraestructura", icon: Building2, description: "Instalaciones, hangares, talleres o centros de operación con requerimientos técnicos y normas de seguridad específicas." },
  { id: "responsabilidad-terceros", title: "Responsabilidad frente a terceros", icon: Scale, description: "Mitigación de reclamos y obligaciones civiles derivadas de operaciones complejas o de alto impacto potencial." },
  { id: "continuidad-operativa", title: "Continuidad operativa", icon: Activity, description: "Mecanismos de protección diseñados para salvaguardar el flujo financiero y la viabilidad del negocio ante interrupciones severas." },
  { id: "personal-critico", title: "Personal y recursos críticos", icon: Users, description: "Salvaguarda para especialistas, técnicos certificados y operadores clave cuya ausencia impactaría la capacidad operativa." },
];

const riskFactors = [
  { name: "Tipo de actividad", icon: Activity, summary: "Naturaleza técnica, grado de peligrosidad y procesos intrínsecos de la operación." },
  { name: "Nivel de exposición", icon: Gauge, summary: "Frecuencia, severidad potencial y vulnerabilidad ante factores externos o imprevistos." },
  { name: "Valor de activos", icon: Coins, summary: "Costos de reemplazo, importación de componentes y tiempos de recuperación o entrega." },
  { name: "Entorno operativo", icon: Compass, summary: "Condiciones geográficas, normatividad sectorial, certificaciones y protocolos de mantenimiento." },
  { name: "Responsabilidades asociadas", icon: FileText, summary: "Obligaciones legales, contratos con clientes y terceras partes involucradas." },
];

const approachPillars = [
  { icon: Search, title: "Análisis personalizado", description: "Identificamos los puntos críticos de tu actividad, las características de los activos y la exposición particular de tu modelo operativo." },
  { icon: SlidersHorizontal, title: "Evaluación de alternativas", description: "Contrastamos diferentes estructuras de aseguramiento, deducibles y coberturas para encontrar la mejor relación técnica y patrimonial." },
  { icon: Handshake, title: "Acompañamiento continuo", description: "Soporte cercano en la administración de la póliza, actualización de sumas y gestión ágil ante eventuales reclamaciones." },
];

const methodologySteps = [
  { number: "01", title: "Comprender", description: "Conocemos a fondo tu operación, tus activos y los objetivos estratégicos de tu organización." },
  { number: "02", title: "Identificar", description: "Mapeamos las exposiciones críticas, vulnerabilidades operativas y requerimientos contractuales." },
  { number: "03", title: "Estructurar", description: "Diseñamos esquemas de aseguramiento a la medida que integran coberturas y condiciones idóneas." },
  { number: "04", title: "Implementar", description: "Gestionamos la colocación con aseguradoras de primer nivel y facilitamos una contratación sin fricciones." },
  { number: "05", title: "Revisar", description: "Monitoreamos periódicamente la vigencia, ajustamos coberturas y respondemos ante cualquier cambio operativo." },
];

const relatedSolutions = [
  {
    id: "aeronaves",
    title: "Aeronaves",
    category: "AVIACIÓN & ACTIVOS EJECUTIVOS",
    description: "Coberturas para aeronaves ejecutivas, cascos, responsabilidad civil legal aérea y tripulaciones.",
    href: "/aeronaves",
    actionText: "Conocer Aeronaves",
    imageUrl: "https://images.unsplash.com/photo-1559628233-100c798642d4?q=80&w=800&auto=format&fit=crop",
    altText: "Aeronave ejecutiva Beechcraft Bonanza en plataforma aeroportuaria",
  },
  {
    id: "mercancias",
    title: "Mercancías",
    category: "LOGÍSTICA & TRÁNSITO",
    description: "Esquemas para carga, transporte multimodal y protección integral de cadenas de suministro logísticas.",
    href: "/mercancias",
    actionText: "Conocer Mercancías",
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop",
    altText: "Operación logística de carga con contenedores intermodales",
  },
  {
    id: "pymes",
    title: "Empresas & PYMES",
    category: "PATRIMONIO EMPRESARIAL",
    description: "Salvaguarda de instalaciones, inventarios, responsabilidad civil general y continuidad de negocio.",
    href: "/pymes",
    actionText: "Explorar Empresas & PYMES",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
    altText: "Sesión ejecutiva de planeación estratégica y gestión operativa de empresas",
  },
];

export default function SectoresEspecializadosPage() {
  return (
    <div className="flex-1 bg-white">
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="SECTORES ESPECIALIZADOS"
        title="Soluciones para riesgos que requieren una mirada más especializada."
        supportingCopy="No todas las operaciones encajan en esquemas convencionales. En LEVANTIR analizamos actividades, activos y responsabilidades con mayor nivel de complejidad para estructurar soluciones con criterio técnico, visión patrimonial y acompañamiento independiente."
        primaryCtaText="REVISAR MI OPERACIÓN ESPECIALIZADA"
        primaryCtaHref="?advisory=true"
        secondaryCtaText="CONOCER MÁS"
        secondaryCtaHref="#contexto"
        imageUrl="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Hangar operativo de aviación general con aeronaves en resguardo e infraestructura técnica de mantenimiento especializado"
        imagePositionClass="object-[60%_center] sm:object-[65%_center] lg:object-[70%_center] xl:object-[72%_center]"
        trustNote="Asesoría técnica · Riesgos complejos · Criterio independiente"
        cornerDescriptorCategory="SECTORES ESPECIALIZADOS"
        cornerDescriptorText="Soluciones diseñadas para operaciones, activos y responsabilidades fuera del estándar."
        ariaLabel="Sectores Especializados - Soluciones para riesgos complejos"
      />

      <Section id="contexto" className="bg-white border-b border-[#E8E8E8] py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">MÁS QUE UNA COBERTURA</p>
                <h2 className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.75rem] text-[#0B2D58] leading-[1.16] font-medium" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
                  Entender la complejidad es parte de la solución.
                </h2>
              </div>
              <div className="space-y-4 text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
                <p>En sectores especializados, los riesgos no siempre pueden analizarse con criterios generales. Existen operaciones, activos y responsabilidades que requieren revisar el contexto técnico, la exposición real y las particularidades de cada actividad para estructurar una solución útil y coherente.</p>
                <p>Cada industria con procesos no convencionales demanda una lectura integral donde los límites de responsabilidad, las condiciones operativas y las contingencias patrimoniales estén dimensionados con precisión y visión preventiva.</p>
                <p className="text-xs text-[#5C626B] italic pt-1">* La disponibilidad, sumas aseguradas, alcances y condiciones dependen de la evaluación técnica y de cada aseguradora.</p>
              </div>
            </div>
            <div className="lg:col-span-6 lg:pt-2">
              <div className="p-7 sm:p-8 bg-[#F8F5EF] border border-[#E8E8E8] border-l-4 border-l-[#0B2D58] rounded-[2px] space-y-5">
                <p className="text-xs uppercase tracking-[0.16em] font-bold text-[#D4A737]">CRITERIO DE ANÁLISIS ESPECIALIZADO</p>
                <blockquote className="text-base sm:text-lg italic text-[#0B2D58] font-serif leading-relaxed">&quot;Evaluamos operaciones con exposición no estándar, activos de alto valor, procesos complejos y responsabilidades que requieren una lectura más detallada que la de un esquema tradicional.&quot;</blockquote>
                <div className="pt-3 border-t border-[#E8E8E8]/90">
                  <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#0B2D58] mb-3">Pilares del análisis:</p>
                  <ul className="space-y-2.5">
                    {["Análisis del contexto operativo", "Revisión de activos y responsabilidades", "Evaluación de exposición real", "Estructuración con criterio técnico"].map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-[#2E2E2E]/90 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#D4A737] flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-[#5C626B] italic pt-1 border-t border-[#E8E8E8]/70">* Análisis consultivo independiente alineado a la viabilidad patrimonial de la operación.</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="dimensiones" className="bg-[#F8F5EF] border-b border-[#E8E8E8] py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="max-w-3xl mb-12 sm:mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3">DIMENSIONES DE ANÁLISIS</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.15] font-medium tracking-tight mb-4" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
              Una visión integral para operaciones especializadas.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
              El análisis de sectores especializados puede involucrar distintas dimensiones de riesgo, dependiendo del tipo de actividad, activos involucrados y responsabilidades asociadas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-10">
            {dimensionsOfAnalysis.map((item) => {
              const IconComp = item.icon;
              return (
                <div key={item.id} className="bg-white border border-[#E8E8E8] rounded-[2px] p-7 sm:p-8 hover:border-[#D4A737] transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-sm">
                  <div>
                    <div className="w-12 h-12 rounded-full bg-[#F8F5EF] border border-[#E8E8E8] flex items-center justify-center text-[#0B2D58] mb-5 group-hover:border-[#D4A737] group-hover:text-[#D4A737] transition-colors">
                      <IconComp className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0B2D58] mb-3 group-hover:text-[#D4A737] transition-colors">{item.title}</h3>
                    <p className="text-sm sm:text-[0.93rem] text-[#5C626B] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-5 sm:p-6 bg-white border border-[#E8E8E8] rounded-[2px] flex items-start sm:items-center gap-3.5">
            <Info className="w-5 h-5 text-[#D4A737] flex-shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-xs sm:text-sm text-[#5C626B] font-medium leading-relaxed">Cada configuración requiere análisis independiente según actividad, ubicación, procesos, exposición y alcance operativo.</p>
          </div>
        </Container>
      </Section>

      <Section id="factores" className="bg-white border-b border-[#E8E8E8] py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="max-w-3xl mb-12 sm:mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3">FACTORES A CONSIDERAR</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.15] font-medium tracking-tight mb-4" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
              Cada operación tiene un perfil de riesgo distinto.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
              La evaluación debe adaptarse a la naturaleza de la operación, al tipo de activos involucrados y a la exposición específica del negocio.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {riskFactors.map((item) => {
              const IconComp = item.icon;
              return (
                <div key={item.name} className="h-full min-h-[220px] p-6 sm:p-7 bg-[#FFFFFF] border border-[#E8E8E8] rounded-[2px] hover:border-[#D4A737] transition-all flex flex-col justify-between group hover:shadow-xs">
                  <div>
                    <div className="w-11 h-11 rounded-full bg-[#F8F5EF] border border-[#E8E8E8] flex items-center justify-center text-[#0B2D58] mb-5 group-hover:border-[#D4A737] group-hover:text-[#D4A737] transition-colors">
                      <IconComp className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <h3 className="text-base sm:text-[1.05rem] font-bold text-[#0B2D58] mb-2.5">{item.name}</h3>
                    <p className="text-sm text-[#5C626B] leading-relaxed">{item.summary}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-6 sm:p-7 bg-[#F8F5EF] border border-[#E8E8E8] border-l-4 border-l-[#D4A737] rounded-[2px]">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
              <span className="text-xs uppercase tracking-[0.16em] font-bold text-[#0B2D58] whitespace-nowrap">Variables complementarias a evaluar:</span>
              <p className="text-sm sm:text-[0.95rem] text-[#2E2E2E]/90 leading-relaxed font-medium">ubicación, frecuencia de uso, dependencia operativa, proveedores críticos, personal clave y relación con terceros.</p>
            </div>
          </div>
        </Container>
      </Section>

      <ApproachSection eyebrow="NUESTRO ENFOQUE" title="Más que un seguro, una estrategia de protección." subheadline="Analizamos alternativas disponibles para estructurar una solución adecuada a tu operación y a la complejidad real de tus riesgos." pillars={approachPillars} />

      <SpecializedAdvisoryFormSection />

      <ServiceMethodologySection eyebrow="¿CÓMO TE APOYAMOS?" title="Un proceso claro y sin complicaciones." subtitle="Metodología institucional estructurada con rigor técnico y total transparencia." steps={methodologySteps} />

      <Section className="bg-[#F8F5EF] border-b border-[#E8E8E8] py-24 sm:py-28 lg:py-32">
        <Container>
          <div className="max-w-3xl mb-14 sm:mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3.5">SOLUCIONES RELACIONADAS</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.15] font-medium tracking-tight mb-4" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
              Protección coordinada para otras dimensiones de tu operación.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
              La protección de riesgos complejos suele complementarse con coberturas para logística, instalaciones y transporte especializado.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {relatedSolutions.map((service) => (
              <div key={service.id} className="bg-white border border-[#E8E8E8] rounded-[2px] overflow-hidden flex flex-col group hover:border-[#D4A737] transition-all duration-300 shadow-xs">
                <div className="relative h-48 sm:h-52 overflow-hidden bg-[#0B2D58]/10">
                  <img src={service.imageUrl} alt={service.altText} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2D58]/60 via-transparent to-transparent opacity-60" />
                  <span className="absolute top-4 left-4 bg-white/95 text-[#0B2D58] text-[0.68rem] font-bold tracking-[0.16em] uppercase px-3 py-1 rounded-[2px] shadow-xs">{service.category}</span>
                </div>
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl text-[#0B2D58] font-medium mb-2.5 group-hover:text-[#D4A737] transition-colors">{service.title}</h3>
                    <p className="text-sm text-[#5C626B] leading-relaxed">{service.description}</p>
                  </div>
                  <div className="pt-3 border-t border-[#E8E8E8]">
                    <Link href={service.href} className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase text-[#0B2D58] group-hover:text-[#D4A737] transition-colors focus:outline-none focus-visible:underline">
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

      <CTASection
        eyebrow="SECTORES ESPECIALIZADOS"
        title="Evaluemos juntos la protección que requiere tu operación compleja."
        supportingCopy="Si tu empresa enfrenta riesgos no convencionales, cuenta con activos de alta especificidad o requiere asegurar responsabilidades extraordinarias, permítenos asesorarte."
        primaryCtaText="REVISAR MI OPERACIÓN ESPECIALIZADA"
        primaryCtaHref="?advisory=true"
        secondaryCtaText="HABLAR CON UN ASESOR"
        secondaryCtaHref="?advisory=true"
      />
    </div>
  );
}


