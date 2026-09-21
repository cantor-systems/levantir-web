import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/service/PageHero";
import { ApproachSection } from "@/components/service/ApproachSection";
import { AutoAdvisoryFormSection } from "@/components/service/AutoAdvisoryFormSection";
import { ServiceMethodologySection } from "@/components/service/ServiceMethodologySection";
import { CTASection } from "@/components/service/CTASection";
import { Scale, Car, ShieldCheck, Sliders, MapPin, Users, Search, SlidersHorizontal, Handshake } from "lucide-react";

export const metadata: Metadata = {
  title: "Seguro de Autos y Movilidad | LEVANTIR",
  description: "Asesoría técnica e independiente para estructurar coberturas de auto. Analizamos uso, tipo de vehículo y entorno de circulación para definir la protección más sólida del mercado.",
  alternates: { canonical: "https://levantir.com/autos" },
};

const breadcrumbs = [
  { label: "Inicio", href: "/" },
  { label: "Autos", isCurrent: true },
];

const protectionObjectives = [
  { icon: Scale, title: "Responsabilidad frente a terceros", description: "Amparo prioritario ante daños materiales o lesiones a terceros, previniendo que una eventualidad vial comprometa tu patrimonio o ahorros personales." },
  { icon: Car, title: "Protección del vehículo", description: "Cobertura ante colisión, siniestros naturales o pérdida total, evaluando esquemas de valuación e indemnización acordes a la inversión de tu unidad." },
  { icon: ShieldCheck, title: "Continuidad en el camino", description: "Asistencia legal presencial, auxilio vial calificado y alternativas de movilidad para resolver contingencias sin interrumpir tus actividades." },
];

const primaryVariables = [
  { name: "Uso del vehículo", icon: Sliders, summary: "Diferenciar entre traslados cotidianos, trayectos carreteros frecuentes o fines comerciales determina el nivel de exposición y la estructura de la póliza." },
  { name: "Zona de circulación", icon: MapPin, summary: "Las rutas habituales, el tránsito urbano y la incidencia de eventos en cada región inciden directamente en las coberturas requeridas y deducibles adecuados." },
  { name: "Tipo de vehículo", icon: Car, summary: "El segmento, año, valor convenido o comercial, disponibilidad de refacciones y características del activo definen los esquemas de reposición o reparación." },
  { name: "Perfil del conductor", icon: Users, summary: "La experiencia al volante, el historial de conducción y la inclusión de conductores habituales permiten dimensionar adecuadamente las condiciones contractuales." },
];

const approachPillars = [
  { icon: Search, title: "Análisis personalizado", description: "Revisamos el uso, tipo de vehículo y entorno de circulación antes de proponer una configuración." },
  { icon: SlidersHorizontal, title: "Evaluación de alternativas", description: "Comparamos deducibles, sumas aseguradas y coberturas para definir una estructura equilibrada." },
  { icon: Handshake, title: "Acompañamiento continuo", description: "Respaldamos la toma de decisión, la gestión ante contingencias y la revisión periódica de la póliza." },
];

const relatedSolutions = [
  {
    id: "gastos-medicos-mayores",
    title: "Gastos Médicos Mayores",
    category: "SALUD & PATRIMONIO",
    description: "Protección médica integral de alto impacto que complementa la seguridad física de los ocupantes ante eventualidades de salud prolongadas.",
    href: "/personas",
    imageUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
    altText: "Familia caminando en calma en un entorno natural al atardecer",
  },
  {
    id: "seguro-de-vida",
    title: "Seguro de Vida",
    category: "RESPALDO FAMILIAR",
    description: "Respaldo patrimonial y certidumbre financiera para garantizar los proyectos y la estabilidad de quienes dependen de ti.",
    href: "/personas",
    imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop",
    altText: "Pareja y familia compartiendo un momento cálido de protección",
  },
  {
    id: "pymes",
    title: "Empresas & PYMES",
    category: "PATRIMONIO EMPRESARIAL",
    description: "Soluciones de aseguramiento para flotillas corporativas, vehículos de reparto y continuidad operativa de tu negocio.",
    href: "/pymes",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    altText: "Edificio corporativo moderno con arquitectura geométrica y cristal",
  },
];

export default function AutosPage() {
  return (
    <div className="flex-1 bg-white">
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="AUTOS"
        title="Protección para cada trayecto."
        supportingCopy="La protección de un vehículo debe considerar no sólo el activo, sino la responsabilidad frente a terceros, la continuidad en el camino y el contexto del conductor. En LEVANTIR estructuramos coberturas con rigor técnico y criterio independiente."
        primaryCtaText="SOLICITAR COTIZACIÓN"
        primaryCtaHref="/?advisory=true"
        secondaryCtaText="CONOCER MÁS"
        secondaryCtaHref="#contexto-riesgo"
        imageUrl="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Vehículo en carretera escénica"
        imagePositionClass="object-[82%_center] sm:object-[86%_center] lg:object-[90%_center] xl:object-[92%_center]"
        trustNote="Asesoría técnica · Estructuración patrimonial · Criterio independiente"
        ariaLabel="Protección para cada trayecto - Seguro de Autos y Movilidad"
      />

      <Section id="contexto-riesgo" className="bg-[#FFFFFF] border-b border-[#E8E8E8] py-24 sm:py-28 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
            <div className="lg:col-span-6 space-y-6 sm:space-y-7">
              <div className="space-y-3.5">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">EL CONTEXTO DEL RIESGO</p>
                <h2 className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.75rem] text-[#0B2D58] leading-[1.16] font-medium" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
                  La movilidad también forma parte de tu patrimonio.
                </h2>
              </div>
              <div className="space-y-4 text-[0.98rem] sm:text-[1.04rem] text-[#2E2E2E]/90 leading-[1.72]">
                <p>A diferencia de otros bienes patrimoniales, un vehículo interactúa diariamente con el entorno vial, condiciones climáticas variables y la conducta de terceros.</p>
                <p>Una eventualidad en el camino no se limita al daño material de la unidad; puede derivar en responsabilidades legales o afectaciones económicas de consideración. Estructurar la póliza con rigor técnico asegura que las variables más determinantes queden debidamente atendidas.</p>
              </div>
              <div className="p-6 sm:p-7 bg-[#F8F5EF] border-l-2 border-[#D4A737] rounded-r-[2px]">
                <p className="text-xs uppercase tracking-[0.16em] font-bold text-[#0B2D58] mb-2">CRITERIO DE GESTIÓN PATRIMONIAL EN MOVILIDAD</p>
                <blockquote className="text-sm sm:text-base italic text-[#0B2D58]/90 font-serif leading-relaxed">&quot;La verdadera protección de un vehículo radica en garantizar la solidez de la respuesta legal y económica cuando surge una eventualidad en el camino.&quot;</blockquote>
              </div>
            </div>
            <div className="lg:col-span-6 space-y-5 lg:pt-2">
              <div className="mb-2">
                <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[#5C626B]">OBJETIVOS CONCEPTUALES DE PROTECCIÓN</p>
              </div>
              <div className="space-y-5 sm:space-y-6">
                {protectionObjectives.map((obj) => {
                  const Icon = obj.icon;
                  return (
                    <div key={obj.title} className="p-5 sm:p-6 bg-[#FFFFFF] border border-[#E8E8E8] rounded-[2px] hover:border-[#D4A737]/60 transition-colors flex items-start gap-4 sm:gap-5 group">
                      <div className="w-10 h-10 rounded-full bg-[#F8F5EF] border border-[#E8E8E8] flex-shrink-0 flex items-center justify-center text-[#0B2D58] group-hover:border-[#D4A737] transition-colors mt-0.5">
                        <Icon className="w-5 h-5 text-[#0B2D58]" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base sm:text-[1.05rem] font-bold text-[#0B2D58] tracking-tight">{obj.title}</h3>
                        <p className="text-xs sm:text-[0.9rem] text-[#2E2E2E]/80 leading-relaxed">{obj.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-[#5C626B] pt-2 italic">* Las coberturas, servicios, sumas aseguradas y condiciones dependen de la póliza contratada y los términos de cada aseguradora.</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="variables-clave" className="bg-[#FFFFFF] border-b border-[#E8E8E8] py-24 sm:py-28 lg:py-32">
        <Container>
          <div className="max-w-3xl mb-14 sm:mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3.5">VARIABLES A CONSIDERAR</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.15] font-medium tracking-tight mb-4" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
              Cada conductor tiene necesidades diferentes.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">Más allá del costo de la prima, una protección eficaz parte de calibrar las condiciones reales bajo las cuales opera el vehículo.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 mb-10">
            {primaryVariables.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.name} className="h-full min-h-[200px] p-6 sm:p-7 bg-[#FFFFFF] border border-[#E8E8E8] rounded-[2px] hover:border-[#D4A737] transition-all flex flex-col justify-between group hover:shadow-xs">
                  <div>
                    <div className="w-11 h-11 rounded-full bg-[#F8F5EF] border border-[#E8E8E8] flex items-center justify-center text-[#0B2D58] mb-5 group-hover:border-[#D4A737] group-hover:text-[#D4A737] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0B2D58] mb-2.5 tracking-tight">{item.name}</h3>
                    <p className="text-[0.92rem] text-[#2E2E2E]/85 leading-[1.62]">{item.summary}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-6 sm:p-7 bg-[#F8F5EF] border border-[#E8E8E8] border-l-4 border-l-[#D4A737] rounded-[2px]">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
              <span className="text-xs uppercase tracking-[0.16em] font-bold text-[#0B2D58] whitespace-nowrap">Otras variables a evaluar:</span>
              <p className="text-sm sm:text-[0.95rem] text-[#2E2E2E]/90 leading-relaxed font-medium">frecuencia de uso, lugar de resguardo o estacionamiento, nivel de deducible óptimo y requerimientos particulares de asistencia legal o auto sustituto.</p>
            </div>
          </div>
        </Container>
      </Section>

      <ApproachSection eyebrow="NUESTRO ENFOQUE" title="Más que un seguro, una estrategia de protección." subheadline="Analizamos alternativas disponibles para estructurar una protección adecuada a tu situación." pillars={approachPillars} />

      <AutoAdvisoryFormSection />

      <ServiceMethodologySection />

      <Section className="bg-[#F8F5EF] border-b border-[#E8E8E8] py-24 sm:py-28 lg:py-32">
        <Container>
          <div className="max-w-3xl mb-14 sm:mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3.5">SOLUCIONES RELACIONADAS</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.15] font-medium tracking-tight mb-4" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
              Protección integral para otras dimensiones patrimoniales.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">La salvaguarda de tu movilidad se complementa de forma natural con la protección de la salud familiar y la continuidad de tus actividades empresariales.</p>
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
        eyebrow="ASESORÍA EN MOVILIDAD"
        title="Estructura la protección de tu vehículo con rigor técnico y criterio independiente."
        supportingCopy="Analizamos las características de tu unidad y tu perfil de conducción para evaluar las alternativas más sólidas del mercado, con absoluta objetividad y sin presiones comerciales."
        primaryCtaText="SOLICITAR COTIZACIÓN"
        primaryCtaHref="/?advisory=true"
        secondaryCtaText="HABLAR CON UN ASESOR"
        secondaryCtaHref="/?advisory=true"
      />
    </div>
  );
}

