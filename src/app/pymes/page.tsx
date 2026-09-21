import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Activity, Users, Briefcase, MapPin, ShieldAlert, Search, SlidersHorizontal, Handshake, Info } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/service/PageHero";
import { ApproachSection } from "@/components/service/ApproachSection";
import { PymesAdvisoryFormSection } from "@/components/service/PymesAdvisoryFormSection";
import { ServiceMethodologySection } from "@/components/service/ServiceMethodologySection";
import { CTASection } from "@/components/service/CTASection";

export const metadata: Metadata = {
  title: "Seguros para PYMES y Empresas | LEVANTIR",
  description: "Asesoría para proteger tu empresa. Evaluamos activos, responsabilidad civil y continuidad operativa para estructurar coberturas corporativas sólidas.",
  alternates: { canonical: "https://levantir.com/pymes" },
};

const breadcrumbs = [
  { label: "Inicio", href: "/" },
  { label: "PYMES", isCurrent: true },
];

const protectionAreas = [
  { icon: Building2, title: "Patrimonio empresarial", description: "Amparo para inmuebles, maquinaria, inventarios y equipo ante daños materiales, eventos de la naturaleza o sustracción de activos." },
  { icon: Activity, title: "Continuidad de operaciones", description: "Respaldo financiero ante interrupción de actividades, contingencias de responsabilidad civil y gastos fijos indispensables." },
  { icon: Users, title: "Personas que hacen tu negocio", description: "Protección integral para socios estratégicos, directivos y equipos de trabajo ante contingencias de salud o accidentes." },
];

const primaryFactors = [
  { name: "Giro y actividad", icon: Briefcase, summary: "El sector productivo, comercial o de servicios define la exposición operativa y el nivel de responsabilidad frente a terceros." },
  { name: "Tamaño de la empresa", icon: Users, summary: "El número de colaboradores, el flujo operativo y la estructura societaria condicionan las sumas aseguradas necesarias." },
  { name: "Ubicación", icon: MapPin, summary: "El entorno geográfico de cada sede, los riesgos del entorno y las características del inmueble determinan la exposición física." },
  { name: "Activos críticos", icon: ShieldAlert, summary: "La concentración de maquinaria esencial, inventarios de alto valor o infraestructura clave requiere esquemas de reposición precisos." },
];

const approachPillars = [
  { icon: Search, title: "Análisis personalizado", description: "Revisamos la actividad, activos clave y dinámica operativa de tu negocio antes de proponer una configuración." },
  { icon: SlidersHorizontal, title: "Evaluación de alternativas", description: "Comparamos sumas aseguradas, deducibles y coberturas para estructurar una protección equilibrada y eficiente." },
  { icon: Handshake, title: "Acompañamiento continuo", description: "Brindamos respaldo técnico en la toma de decisiones, gestión de eventualidades y actualización periódica del programa." },
];

const pymesMethodologySteps = [
  { number: "01", title: "Comprender", description: "Negocio, operación, personas y objetivos." },
  { number: "02", title: "Identificar", description: "Riesgos y exposiciones relevantes." },
  { number: "03", title: "Estructurar", description: "Alternativas de protección." },
  { number: "04", title: "Implementar", description: "Acompañamiento en selección y contratación." },
  { number: "05", title: "Revisar", description: "Actualizar la protección conforme evoluciona la empresa." },
];

const relatedSolutions = [
  {
    id: "gastos-medicos-mayores",
    title: "Gastos Médicos Mayores",
    category: "SALUD & PATRIMONIO",
    description: "Protección médica de alto impacto para cuidar el bienestar y la tranquilidad de los líderes y colaboradores que impulsan tu organización.",
    href: "/personas",
    imageUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
    altText: "Familia caminando en calma en un entorno natural al atardecer",
  },
  {
    id: "seguro-de-vida",
    title: "Seguro de Vida",
    category: "RESPALDO FAMILIAR & SOCIOS",
    description: "Certidumbre financiera y respaldo patrimonial ante imprevistos para socios estratégicos, directivos y familias vinculadas al negocio.",
    href: "/personas",
    imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop",
    altText: "Pareja y familia compartiendo un momento cálido de protección",
  },
  {
    id: "seguro-de-auto",
    title: "Seguro de Auto",
    category: "MOVILIDAD & FLOTILLAS",
    description: "Estructuración técnica de coberturas para vehículos particulares, ejecutivos o unidades utilitarias vinculadas a la actividad de la empresa.",
    href: "/autos",
    imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop",
    altText: "Vehículo en carretera escénica",
  },
];

export default function PymesPage() {
  return (
    <div className="flex-1 bg-white">
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="PYMES"
        title="Protección y continuidad para tu empresa."
        supportingCopy="La protección de una empresa requiere analizar de forma conjunta a las personas, los activos críticos, la responsabilidad frente a terceros, la movilidad operativa y la continuidad del negocio ante cualquier eventualidad. En LEVANTIR estructuramos soluciones con rigor técnico y criterio independiente."
        primaryCtaText="EVALUAR RIESGOS DE MI EMPRESA"
        primaryCtaHref="/?advisory=true"
        secondaryCtaText="CONOCER MÁS"
        secondaryCtaHref="#contexto-riesgo"
        imageUrl="https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Operación comercial de una pequeña empresa en mostrador con terminal de cobro y atención al cliente"
        imagePositionClass="object-[80%_center] sm:object-[82%_center] lg:object-[85%_center]"
        cornerDescriptorCategory="PROTECCIÓN EMPRESARIAL"
        cornerDescriptorText="Criterio para proteger la operación, los activos y la continuidad de tu empresa."
        trustNote="Asesoría técnica · Estructuración patrimonial · Criterio independiente"
        ariaLabel="PYMES - Protección y continuidad para tu empresa"
      />

      <Section id="contexto-riesgo" className="bg-[#FFFFFF] border-b border-[#E8E8E8] py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">TU NEGOCIO IMPORTA</p>
                <h2 className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.75rem] text-[#0B2D58] leading-[1.16] font-medium" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
                  Empresas más sólidas para un mejor futuro.
                </h2>
              </div>
              <div className="space-y-3.5 text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
                <p>En una empresa convergen personas, activos, compromisos comerciales y continuidad financiera. Un imprevisto operativo no sólo afecta bienes materiales, sino la estabilidad integral del negocio.</p>
                <p>Estructurar la protección con criterio técnico permite alinear las coberturas a la operación real, evitando brechas patrimoniales y asegurando capacidad de respuesta inmediata.</p>
              </div>
            </div>
            <div className="lg:col-span-6 lg:pt-2">
              <div className="p-7 sm:p-8 bg-[#F8F5EF] border border-[#E8E8E8] border-l-4 border-l-[#0B2D58] rounded-[2px] space-y-4">
                <p className="text-xs uppercase tracking-[0.16em] font-bold text-[#D4A737]">CRITERIO EDITORIAL</p>
                <blockquote className="text-base sm:text-lg italic text-[#0B2D58] font-serif leading-relaxed">&quot;Una empresa puede estar asegurada y seguir estando mal protegida si sus pólizas no corresponden a su operación real.&quot;</blockquote>
                <p className="text-xs sm:text-sm text-[#5C626B] pt-2 border-t border-[#E8E8E8]/80 leading-relaxed">
                  La protección empresarial no consiste en acumular pólizas aisladas, sino en calibrar los riesgos críticos que pueden comprometer la liquidez y continuidad del negocio.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="areas-proteccion" className="bg-[#F8F5EF] border-b border-[#E8E8E8] py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="max-w-3xl mb-12 sm:mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3">ÁREAS CLAVE DE PROTECCIÓN</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.15] font-medium tracking-tight mb-4" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
              Dimensiones esenciales para proteger tu operación.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
              Analizamos los pilares conceptuales necesarios para estructurar una protección coherente con la escala de tu empresa.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
            {protectionAreas.map((item) => {
              const IconComp = item.icon;
              return (
                <div key={item.title} className="bg-white border border-[#E8E8E8] rounded-[2px] p-7 sm:p-8 hover:border-[#D4A737] transition-all flex flex-col justify-between group shadow-xs">
                  <div>
                    <div className="w-12 h-12 rounded-full bg-[#F8F5EF] border border-[#E8E8E8] flex items-center justify-center text-[#0B2D58] mb-6 group-hover:border-[#D4A737] group-hover:text-[#D4A737] transition-colors">
                      <IconComp className="w-6 h-6 stroke-[1.75]" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0B2D58] mb-3">{item.title}</h3>
                    <p className="text-sm sm:text-[0.94rem] text-[#5C626B] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-5 sm:p-6 bg-white border border-[#E8E8E8] rounded-[2px] flex items-start sm:items-center gap-3.5">
            <Info className="w-5 h-5 text-[#D4A737] flex-shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-xs sm:text-sm text-[#5C626B] font-medium leading-relaxed">
              Las coberturas, servicios, límites y condiciones dependen de la póliza contratada.
            </p>
          </div>
        </Container>
      </Section>

      <Section id="factores-clave" className="bg-white border-b border-[#E8E8E8] py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="max-w-3xl mb-12 sm:mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3">FACTORES A CONSIDERAR</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.15] font-medium tracking-tight mb-4" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
              Cada empresa tiene un perfil de riesgo distinto.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
              Estructurar una solución adecuada requiere evaluar los aspectos operativos que diferencian a tu negocio.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {primaryFactors.map((item) => {
              const IconComp = item.icon;
              return (
                <div key={item.name} className="h-full min-h-[200px] p-6 sm:p-7 bg-[#FFFFFF] border border-[#E8E8E8] rounded-[2px] hover:border-[#D4A737] transition-all flex flex-col justify-between group hover:shadow-xs">
                  <div>
                    <div className="w-11 h-11 rounded-full bg-[#F8F5EF] border border-[#E8E8E8] flex items-center justify-center text-[#0B2D58] mb-5 group-hover:border-[#D4A737] group-hover:text-[#D4A737] transition-colors">
                      <IconComp className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0B2D58] mb-2.5">{item.name}</h3>
                    <p className="text-sm text-[#5C626B] leading-relaxed">{item.summary}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-6 sm:p-7 bg-[#F8F5EF] border border-[#E8E8E8] border-l-4 border-l-[#D4A737] rounded-[2px]">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
              <span className="text-xs uppercase tracking-[0.16em] font-bold text-[#0B2D58] whitespace-nowrap">Otras variables a evaluar:</span>
              <p className="text-sm sm:text-[0.95rem] text-[#2E2E2E]/90 leading-relaxed font-medium">cadena de suministro, responsabilidad civil, interrupción de operaciones, movilidad, riesgos especializados y otras variables relevantes.</p>
            </div>
          </div>
        </Container>
      </Section>

      <ApproachSection eyebrow="NUESTRO ENFOQUE" title="Más que un seguro, una estrategia de protección." subheadline="Analizamos alternativas disponibles para estructurar una protección adecuada a tu situación." pillars={approachPillars} />

      <PymesAdvisoryFormSection />

      <ServiceMethodologySection eyebrow="¿CÓMO TE APOYAMOS?" title="Un proceso claro y sin complicaciones." subtitle="Metodología institucional estructurada con rigor técnico y total transparencia." steps={pymesMethodologySteps} />

      <Section className="bg-[#F8F5EF] border-b border-[#E8E8E8] py-24 sm:py-28 lg:py-32">
        <Container>
          <div className="max-w-3xl mb-14 sm:mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3.5">SOLUCIONES RELACIONADAS</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.15] font-medium tracking-tight mb-4" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
              Protección integral para otras dimensiones patrimoniales.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
              La solidez operativa de tu negocio se complementa de forma directa con la salvaguarda de la salud de sus integrantes y el amparo de la movilidad vehicular.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {relatedSolutions.map((service) => (
              <div key={service.id} className="bg-white border border-[#E8E8E8] rounded-[2px] overflow-hidden flex flex-col group hover:border-[#D4A737] transition-all duration-300 shadow-xs">
                <div className="aspect-[16/10] w-full overflow-hidden relative bg-[#E8E8E8]">
                  <img src={service.imageUrl} alt={service.altText} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                  <div className="absolute top-3 left-3 bg-[#0B2D58]/90 text-[#D4A737] px-2.5 py-1 text-[0.68rem] font-bold tracking-[0.14em] uppercase rounded-xs">{service.category}</div>
                </div>
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#0B2D58] tracking-tight">{service.title}</h3>
                    <p className="text-[0.92rem] text-[#2E2E2E]/85 leading-relaxed">{service.description}</p>
                  </div>
                  <div className="pt-3 border-t border-[#E8E8E8]">
                    <Link href={service.href} className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase text-[#0B2D58] group-hover:text-[#D4A737] transition-colors">
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

      <CTASection
        eyebrow="ASESORÍA EMPRESARIAL"
        title="Hablemos sobre la protección que tu empresa necesita."
        supportingCopy="Analizamos tu perfil operativo y evaluamos las alternativas más sólidas del mercado institucional, con criterio técnico independiente y sin compromisos comerciales."
        primaryCtaText="EVALUAR RIESGOS DE MI EMPRESA"
        primaryCtaHref="/?advisory=true"
        secondaryCtaText="HABLAR CON UN ASESOR"
        secondaryCtaHref="/?advisory=true"
      />
    </div>
  );
}

