import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Plane, Compass, Users, Building2, ShieldCheck, Search, SlidersHorizontal, Handshake, Info, Layers, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/service/PageHero";
import { ApproachSection } from "@/components/service/ApproachSection";
import { AviationAdvisoryFormSection } from "@/components/service/AviationAdvisoryFormSection";
import { ServiceMethodologySection } from "@/components/service/ServiceMethodologySection";
import { CTASection } from "@/components/service/CTASection";

export const metadata: Metadata = {
  title: "Seguro de Aeronaves y Riesgos Aeronáuticos | LEVANTIR",
  description: "Asesoría técnica y gestión integral de riesgos para aviación civil, avionetas, helicópteros y operaciones aeronáuticas privadas con LEVANTIR.",
  alternates: { canonical: "https://levantir.com/aeronaves" },
};

const breadcrumbs = [
  { label: "Inicio", href: "/" },
  { label: "Aeronaves", isCurrent: true },
];

const riskModelElements = [
  { title: "Aeronave", subtitle: "Tipo, modelo, antigüedad, uso y valor.", icon: Plane, description: "Evaluación de especificaciones técnicas del fabricante, planta motriz, equipamiento de aviónica instalada, historial de horas de vuelo y valor convenido de reposición." },
  { title: "Operación", subtitle: "Tipo de operación, rutas, frecuencia y condiciones de vuelo.", icon: Compass, description: "Análisis de perfiles de vuelo privado o corporativo, bases de operación habituales, orografía de rutas frecuentes y condiciones diurnas o nocturnas." },
  { title: "Personas", subtitle: "Pilotos, tripulación, personal técnico y de apoyo.", icon: Users, description: "Trayectoria de mando, entrenamiento recurrente en simulador, horas en tipo, habilitaciones de tripulación y personal técnico asignado a tierra." },
  { title: "Infraestructura", subtitle: "Hangar, base de operación, instalaciones y servicios.", icon: Building2, description: "Condiciones de resguardo físico en hangar, seguridad de perímetro aeroportuario, despacho de combustible y servicios de rampa en aeródromos base y alternos." },
  { title: "Responsabilidad", subtitle: "Exposición frente a terceros y a la operación.", icon: ShieldCheck, description: "Exposición jurídica frente a pasajeros a bordo, terceros en superficie, colisión o daños a infraestructura aeroportuaria durante maniobras en tierra y vuelo." },
];

const riskFactors = [
  { id: "factor-aeronave", number: "01", title: "Tipo de aeronave", description: "Configuración monomotor o bimotor, propulsión a pistón o turbopropulsor, complejidad de aviónica integrada y exigencias del programa de mantenimiento del fabricante." },
  { id: "factor-operacion", number: "02", title: "Ámbito de operación", description: "Regiones geográficas de desplazamiento, uso personal vs. traslados de negocios, características de pistas de aterrizaje y altitud de aeródromos de operación habitual." },
  { id: "factor-tripulacion", number: "03", title: "Perfil de pilotos y tripulación", description: "Experiencia total de vuelo, horas registradas en el modelo específico, programas de capacitación continua y esquemas de asignación de piloto al mando." },
  { id: "factor-responsabilidad", number: "04", title: "Exposición y responsabilidad", description: "Naturaleza de los pasajeros transportados, estructura jurídica de propiedad u operación patrimonial y requerimientos de responsabilidad civil frente a terceros." },
];

const marketScope = [
  {
    id: "aviacion-general",
    title: "Aviación general y privada",
    category: "NÚCLEO OPERATIVO",
    description: "Aeronaves monomotor y bimotor para propietarios-pilotos, enlaces empresariales y vuelos privados con base en aeródromos civiles.",
    imageUrl: "https://images.unsplash.com/photo-1559628233-100c798642d4?q=80&w=800&auto=format&fit=crop",
    altText: "Aeronave monomotor de aviación general en plataforma con luz diurna",
    technicalHighlight: "Monomotor y bimotor · Aviación civil · Vuelo privado",
  },
  {
    id: "helicopteros",
    title: "Helicópteros y operaciones verticales",
    category: "ALCANCE COMPLEMENTARIO",
    description: "Operaciones de ala rotativa para transporte ejecutivo punto a punto, acceso a helipuertos urbanos o predios con infraestructura especializada.",
    imageUrl: "https://images.unsplash.com/photo-1617469165885-0db8294c3232?q=80&w=800&auto=format&fit=crop",
    altText: "Helicóptero civil en operación y entorno de aterrizaje",
    technicalHighlight: "Ala rotativa · Helipuertos · Movilidad punto a punto",
  },
  {
    id: "jets-ejecutivos",
    title: "Jets ejecutivos y corporativos",
    category: "MOVILIDAD CORPORATIVA",
    description: "Aeronaves a turbina destinadas a itinerarios corporativos de mediano y largo alcance con altas exigencias de disponibilidad y cumplimiento.",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop",
    altText: "Aeronave ejecutiva en plataforma aeroportuaria",
    technicalHighlight: "Turbina · Operación ejecutiva · Rutas nacionales e internacionales",
  },
  {
    id: "infraestructura-hangares",
    title: "Hangares e infraestructura técnica",
    category: "INSTALACIONES & BASE",
    description: "Instalaciones fijas de resguardo, hangares privados, talleres certificados y áreas de servicio en plataforma para apoyo en tierra.",
    imageUrl: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=800&auto=format&fit=crop",
    altText: "Instalaciones de hangar y resguardo técnico de aeronaves",
    technicalHighlight: "Resguardo · Mantenimiento · Seguridad en rampa",
  },
];

const approachPillars = [
  { icon: Search, title: "Análisis personalizado", description: "Evaluamos con rigor técnico el perfil de tu aeronave, base de operación, historial de tripulantes y el uso previsto para entender tu exposición real." },
  { icon: SlidersHorizontal, title: "Evaluación de alternativas", description: "Comparamos opciones en el mercado especializado para estructurar esquemas contractuales sólidos, equilibrados y con total claridad en sus alcances." },
  { icon: Handshake, title: "Acompañamiento continuo", description: "Brindamos respaldo consultivo permanente ante renovaciones, cambios de tripulación, ampliación de rutas o actualización de tu base operativa." },
];

const methodologySteps = [
  { number: "01", title: "Comprender", description: "Operación, aeronave, objetivos y contexto." },
  { number: "02", title: "Identificar", description: "Riesgos y exposiciones relevantes." },
  { number: "03", title: "Estructurar", description: "Alternativas de protección acordes al perfil." },
  { number: "04", title: "Implementar", description: "Acompañamiento en selección y contratación." },
  { number: "05", title: "Revisar", description: "Actualizar la protección conforme evoluciona la operación." },
];

const relatedSolutions = [
  {
    id: "seguro-empresarial",
    category: "EMPRESA & PATRIMONIO",
    title: "Seguro Empresarial",
    description: "Protección integral para instalaciones físicas, oficinas corporativas, bodegas y activos productivos ante eventos imprevistos.",
    href: "/pymes",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    altText: "Edificio corporativo con arquitectura de cristal y estructura de acero",
    actionText: "VER SEGURO EMPRESARIAL",
  },
  {
    id: "responsabilidad-civil",
    category: "RESPONSABILIDAD JURÍDICA",
    title: "Responsabilidad Civil",
    description: "Respaldo estructurado frente a reclamaciones de terceros por daños patrimoniales, lesiones o afectaciones derivadas de tu actividad.",
    href: "/pymes",
    imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=800&auto=format&fit=crop",
    altText: "Revisión técnica de documentos y análisis de contratos empresariales",
    actionText: "VER RESPONSABILIDAD CIVIL",
  },
  {
    id: "sectores-especializados",
    category: "RIESGOS SINGULARES",
    title: "Sectores Especializados",
    description: "Asesoría técnica para industrias con exposiciones extraordinarias, activos complejos e ingeniería de alta sofisticación.",
    href: "/sectores-especializados",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    altText: "Instalación industrial e infraestructura técnica de alta ingeniería",
    actionText: "VER SECTORES ESPECIALIZADOS",
  },
];

export default function AeronavesPage() {
  return (
    <div className="bg-[#FAF9F5] text-[#2E2E2E] min-h-screen">
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="AERONÁUTICA"
        title="Seguros y gestión de riesgos para operaciones aeronáuticas."
        supportingCopy="Cada operación aeronáutica presenta riesgos particulares relacionados con la aeronave, el perfil de vuelo, la tripulación, la infraestructura y la responsabilidad frente a terceros. En LEVANTIR analizamos tu entorno operativo con rigor técnico y criterio independiente para estructurar esquemas de aseguramiento acordes a las exigencias reales de tu vuelo."
        primaryCtaText="SOLICITAR ASESORÍA ESPECIALIZADA"
        primaryCtaHref="?advisory=true"
        secondaryCtaText="CONOCER MÁS"
        secondaryCtaHref="#contexto"
        imageUrl="https://images.unsplash.com/photo-1559628233-100c798642d4?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Aeronave civil en plataforma de aeródromo civil con luz natural"
        imagePositionClass="object-[82%_center] sm:object-[84%_center] lg:object-[85%_center]"
        trustNote="Asesoría técnica · Aviación civil y privada · Criterio independiente"
        cornerDescriptorCategory="AERONAVES & RIESGOS AÉREOS"
        cornerDescriptorText="Criterio técnico e independiente para salvaguardar aeronaves, tripulaciones y responsabilidades operacionales."
        ariaLabel="Aeronaves - Seguros y gestión de riesgos para operaciones aeronáuticas"
      />

      <Section id="contexto" className="bg-[#FAF9F5] border-b border-[#E8E8E8] py-24 sm:py-28 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-6 space-y-4 sm:space-y-5">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">UNA OPERACIÓN DE ALTO NIVEL</p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.14] font-medium tracking-tight" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
                Más que una aeronave, una operación completa.
              </h2>
              <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed pt-2">
                Una operación aeronáutica articula de manera indisociable la aeronave, las personas a bordo y en tierra, los procedimientos de vuelo, las instalaciones de resguardo y la responsabilidad legal frente al entorno.
              </p>
              <p className="text-sm sm:text-base text-[#5C626B] leading-relaxed">
                Abordar el aseguramiento aeronáutico bajo una perspectiva convencional de póliza genérica desconoce las variables operativas que definen la exposición real. En LEVANTIR analizamos cada elemento de manera conjunta para que la protección responda con solidez técnica en el momento en que sea requerida.
              </p>
            </div>
            <div className="lg:col-span-6 bg-white border border-[#E8E8E8] p-8 sm:p-10 rounded-[2px] shadow-xs">
              <div className="flex items-center gap-3 pb-6 border-b border-[#E8E8E8] mb-6">
                <div className="w-9 h-9 rounded-[2px] bg-[#0B2D58]/5 flex items-center justify-center text-[#0B2D58]">
                  <Layers className="w-5 h-5 text-[#D4A737]" />
                </div>
                <div>
                  <h3 className="font-display text-lg sm:text-xl text-[#0B2D58] font-medium">Articulación del Entorno Operativo</h3>
                  <p className="text-xs text-[#5C626B] tracking-wide">Cinco factores integrados en cada despegue</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Aeronave", focus: "Fuselaje, motores, aviónica y valor técnico convenido." },
                  { name: "Personas", focus: "Pilotos, copilotos, tripulantes y personal técnico de apoyo." },
                  { name: "Operación", focus: "Perfil de vuelo, orografía de rutas y frecuencia de traslados." },
                  { name: "Infraestructura", focus: "Hangar base, pernocta, seguridad y servicios en rampa." },
                  { name: "Responsabilidad", focus: "Exposición ante pasajeros, terceros en tierra y bienes ajenos." },
                ].map((item, idx) => (
                  <div key={item.name} className="flex items-start gap-3.5 p-3 rounded-[2px] hover:bg-[#F8F5EF] transition-colors">
                    <span className="text-[0.72rem] font-mono font-bold text-[#D4A737] bg-[#F8F5EF] border border-[#D4A737]/30 px-2 py-0.5 rounded-[2px] mt-0.5">0{idx + 1}</span>
                    <div>
                      <h4 className="text-sm font-bold text-[#0B2D58]">{item.name}</h4>
                      <p className="text-xs text-[#5C626B] leading-relaxed mt-0.5">{item.focus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#F8F5EF] border-b border-[#E8E8E8] py-24 sm:py-28 lg:py-32">
        <Container>
          <div className="max-w-3xl mb-14 sm:mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3.5">¿QUÉ ELEMENTOS CONFORMAN EL RIESGO?</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.14] font-medium tracking-tight mb-4" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
              Una visión integral de la operación aeronáutica.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
              El análisis de riesgo en aviación requiere descomponer la operación en sus componentes esenciales para estructurar una protección patrimonial equilibrada y técnicamente fundada.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {riskModelElements.map((elem, idx) => {
              const IconComp = elem.icon;
              return (
                <div key={elem.title} className={`bg-white border border-[#E8E8E8] p-7 sm:p-8 rounded-[2px] flex flex-col justify-between hover:border-[#D4A737] transition-all duration-300 shadow-xs group ${idx === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-[2px] bg-[#0B2D58]/5 flex items-center justify-center text-[#0B2D58] group-hover:bg-[#0B2D58] group-hover:text-white transition-colors">
                        <IconComp className="w-5 h-5 text-[#D4A737] group-hover:text-[#D4A737] transition-colors" />
                      </div>
                      <span className="text-xs font-mono font-bold tracking-wider text-[#5C626B]/60">0{idx + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl text-[#0B2D58] font-medium mb-1.5 group-hover:text-[#D4A737] transition-colors">{elem.title}</h3>
                      <p className="text-xs font-bold text-[#D4A737] tracking-wider uppercase mb-3">{elem.subtitle}</p>
                      <p className="text-sm text-[#5C626B] leading-relaxed">{elem.description}</p>
                    </div>
                  </div>
                  <div className="pt-5 mt-5 border-t border-[#E8E8E8]/70 flex items-center gap-2 text-xs font-medium text-[#0B2D58]/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A737] shrink-0" />
                    <span>Factor analítico de evaluación técnica</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-12 p-5 sm:p-6 bg-white border-l-2 border-[#D4A737] border-y border-r border-[#E8E8E8] rounded-[2px] flex items-start gap-4">
            <Info className="w-5 h-5 text-[#0B2D58] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#0B2D58]">CRITERIO DE ANÁLISIS CONSULTIVO</p>
              <p className="text-xs sm:text-sm text-[#5C626B] leading-relaxed">
                Estos elementos corresponden a factores técnicos de análisis para la estructuración y valoración del riesgo, no a coberturas automáticas o universales. Las coberturas, servicios, límites, exclusiones y condiciones dependen de la póliza contratada.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#FAF9F5] border-b border-[#E8E8E8] py-24 sm:py-28 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">FACTORES A CONSIDERAR</p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.14] font-medium tracking-tight" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
                Cada operación tiene un perfil de riesgo distinto.
              </h2>
              <p className="text-base text-[#2E2E2E]/85 leading-relaxed pt-2">
                No existen dos operaciones aeronáuticas idénticas. Las características de la máquina, el historial del mando, las bases habituales y la naturaleza de los traslados definen exigencias únicas que deben plasmarse con precisión en el contrato de seguro.
              </p>
              <div className="pt-4">
                <Link href="?advisory=true" className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.16em] uppercase text-[#0B2D58] hover:text-[#D4A737] transition-colors py-2 group focus:outline-none focus-visible:underline">
                  <span>EVALUAR MI PERFIL OPERATIVO</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {riskFactors.map((factor) => (
                <div key={factor.id} className="bg-white border border-[#E8E8E8] p-6 sm:p-7 rounded-[2px] shadow-xs hover:border-[#D4A737] transition-colors">
                  <span className="text-xs font-mono font-bold text-[#D4A737] tracking-wider block mb-2">{factor.number}</span>
                  <h3 className="font-display text-lg sm:text-xl text-[#0B2D58] font-medium mb-2.5">{factor.title}</h3>
                  <p className="text-sm text-[#5C626B] leading-relaxed">{factor.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#F8F5EF] border-b border-[#E8E8E8] py-24 sm:py-28 lg:py-32">
        <Container>
          <div className="max-w-3xl mb-14 sm:mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3.5">ALCANCE Y CAPACIDAD TÉCNICA</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.14] font-medium tracking-tight mb-4" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
              Capacidad de análisis para diversas configuraciones aeronáuticas.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
              Aunque la aviación general y privada constituye el núcleo de nuestra asesoría recurrente, en LEVANTIR contamos con la capacidad técnica para evaluar y estructurar esquemas de gestión de riesgos en diversas modalidades del ámbito civil y corporativo.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {marketScope.map((item) => (
              <div key={item.id} className="bg-white border border-[#E8E8E8] rounded-[2px] overflow-hidden flex flex-col group hover:border-[#D4A737] transition-all duration-300 shadow-xs">
                <div className="relative h-48 overflow-hidden bg-[#0B2D58]/10">
                  <img src={item.imageUrl} alt={item.altText} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2D58]/70 via-[#0B2D58]/15 to-transparent" />
                  <span className="absolute top-3.5 left-3.5 bg-white/95 text-[#0B2D58] text-[0.65rem] font-bold tracking-[0.16em] uppercase px-2.5 py-1 rounded-[2px] shadow-xs">{item.category}</span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl text-[#0B2D58] font-medium mb-2 group-hover:text-[#D4A737] transition-colors">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-[#5C626B] leading-relaxed">{item.description}</p>
                  </div>
                  <div className="pt-3 border-t border-[#E8E8E8]/70">
                    <span className="text-[0.7rem] font-mono text-[#D4A737] font-semibold tracking-wide block">{item.technicalHighlight}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <ApproachSection eyebrow="NUESTRO ENFOQUE" title="Más que un seguro, un aliado para tu operación." subheadline="Rigor técnico, criterio independiente y asesoría continua para salvaguardar tu patrimonio aeronáutico y la tranquilidad de cada vuelo." pillars={approachPillars} />

      <AviationAdvisoryFormSection />

      <ServiceMethodologySection eyebrow="METODOLOGÍA LEVANTIR" title="Un proceso estructurado para proteger tu operación aérea." subtitle="Rigor consultivo de cinco fases enfocado en la mitigación técnica de contingencias y el resguardo de tu patrimonio." steps={methodologySteps} />

      <Section className="bg-[#F8F5EF] border-b border-[#E8E8E8] py-24 sm:py-28 lg:py-32">
        <Container>
          <div className="max-w-3xl mb-14 sm:mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3.5">SOLUCIONES RELACIONADAS</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.14] font-medium tracking-tight mb-4" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
              Protección coordinada para otras dimensiones patrimoniales.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
              La gestión del riesgo aeronáutico se complementa con esquemas de protección patrimonial empresarial y cobertura de responsabilidades generales frente a terceros.
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
        eyebrow="AERONÁUTICA"
        title="Hablemos de tu operación aeronáutica y las soluciones que pueden protegerla."
        supportingCopy="Agenda una conversación técnica y confidencial para evaluar tu aeronave, bases operativas, perfiles de tripulación y requerimientos de responsabilidad civil."
        primaryCtaText="SOLICITAR ASESORÍA ESPECIALIZADA"
        primaryCtaHref="?advisory=true"
        secondaryCtaText="HABLAR CON UN ASESOR"
        secondaryCtaHref="?advisory=true"
      />
    </div>
  );
}

