import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Truck, Ship, Plane, PackageCheck, RefreshCw, Layers, MapPin, Compass, ShieldCheck, Search, SlidersHorizontal, Handshake, Info } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/service/PageHero";
import { ApproachSection } from "@/components/service/ApproachSection";
import { MercanciasAdvisoryFormSection } from "@/components/service/MercanciasAdvisoryFormSection";
import { ServiceMethodologySection } from "@/components/service/ServiceMethodologySection";
import { CTASection } from "@/components/service/CTASection";

export const metadata: Metadata = {
  title: "Seguro de Transporte de Mercancías y Carga | LEVANTIR",
  description: "Asesoría técnica para evaluar riesgos en tránsito, analizar medios de transporte y estructurar esquemas de seguro para mercancías y carga en movimiento con LEVANTIR.",
  alternates: { canonical: "https://levantir.com/mercancias" },
};

const breadcrumbs = [
  { label: "Inicio", href: "/" },
  { label: "Mercancías", isCurrent: true },
];

const commonOperations = [
  { title: "Embarque único", icon: PackageCheck, description: "Protección puntual estructurada para un traslado específico, extraordinario o un envío unitario de alto valor." },
  { title: "Operación recurrente", icon: RefreshCw, description: "Pólizas continuas o esquemas de declaración periódica para empresas con flujos constantes y programados de mercancía." },
  { title: "Transporte terrestre", icon: Truck, description: "Cobertura para traslados en camión, tractocamión, furgón o ferrocarril sobre corredores carreteros y vías férreas." },
  { title: "Transporte marítimo", icon: Ship, description: "Protección para carga en buques, tráfico de cabotaje, contenedores marítimos y maniobras de carga y descarga en puertos." },
  { title: "Transporte aéreo", icon: Plane, description: "Esquemas para mercancías de alta prioridad, valor o sensibilidad trasladadas a través de infraestructura aeroportuaria." },
];

const riskFactors = [
  { name: "Tipo de mercancía", icon: Layers, summary: "Naturaleza de los bienes (perecederos, maquinaria, materias primas o productos terminados), su fragilidad y susceptibilidad de daño o merma." },
  { name: "Origen y destino", icon: MapPin, summary: "Zonas geográficas de salida, tránsito y entrega, considerando condiciones de infraestructura, distancias, rutas críticas y aduanas." },
  { name: "Medio de transporte", icon: Compass, summary: "Modalidades empleadas (carretera, ferroviaria, marítima o aérea), equipos de arrastre, transbordos y estadías intermedias." },
  { name: "Frecuencia y condiciones", icon: ShieldCheck, summary: "Regularidad de los embarques, estacionalidad del volumen, protocolos de estiba, sujeción y condiciones logísticas pactadas." },
];

const approachPillars = [
  { icon: Search, title: "Análisis personalizado", description: "Identificar características de la carga, medios de transporte, rutas y puntos críticos de la cadena logística." },
  { icon: SlidersHorizontal, title: "Evaluación de alternativas", description: "Comparar esquemas por embarque específico o pólizas anuales según el volumen y frecuencia de tu negocio." },
  { icon: Handshake, title: "Acompañamiento continuo", description: "Asesoría técnica y apoyo antes, durante y después del traslado ante cualquier eventualidad operativa." },
];

const methodologySteps = [
  { number: "01", title: "Comprender", description: "Operación logística, mercancía, rutas y objetivos." },
  { number: "02", title: "Identificar", description: "Riesgos y exposiciones relevantes." },
  { number: "03", title: "Estructurar", description: "Alternativas de protección acordes al perfil logístico." },
  { number: "04", title: "Implementar", description: "Acompañamiento en selección y contratación." },
  { number: "05", title: "Revisar", description: "Actualizar la protección conforme evoluciona la operación." },
];

const relatedSolutions = [
  {
    id: "seguro-empresarial",
    title: "Seguro Empresarial",
    category: "PROTECCIÓN PATRIMONIAL",
    description: "Estructuración técnica para salvaguardar instalaciones físicas, bodegas, maquinaria e inventarios almacenados dentro de tu empresa.",
    href: "/pymes",
    actionText: "Conocer Seguro Empresarial",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
    altText: "Estudio técnico y espacio de trabajo profesional con proyectos y maquetas",
  },
  {
    id: "responsabilidad-civil",
    title: "Responsabilidad Civil",
    category: "RESPONSABILIDAD OPERATIVA",
    description: "Evaluación técnica y esquemas de protección ante eventuales obligaciones y reclamos derivados de la actividad empresarial frente a terceros.",
    href: "/pymes",
    actionText: "Conocer Responsabilidad Civil",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
    altText: "Equipo directivo revisando procesos operativos y documentación en sala de juntas",
  },
  {
    id: "pymes-hub",
    title: "Empresas & PYMES",
    category: "HUB EMPRESARIAL",
    description: "Visión integral de protección y continuidad para el patrimonio, las personas y las operaciones de tu empresa.",
    href: "/pymes",
    actionText: "Explorar soluciones para PYMES",
    imageUrl: "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=800&auto=format&fit=crop",
    altText: "Operación comercial y servicio en establecimiento de pequeña y mediana empresa",
  },
];

export default function MercanciasPage() {
  return (
    <div className="flex-1 bg-white">
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="MERCANCÍAS"
        title="Protección para bienes en movimiento."
        supportingCopy="Una operación logística expone la mercancía y la continuidad del negocio a contingencias en tránsito, maniobras y almacenamiento. En LEVANTIR analizamos tu cadena de suministro con rigor técnico y criterio independiente para estructurar esquemas de protección acordes a la dinámica de tu operación."
        primaryCtaText="REVISAR MI OPERACIÓN LOGÍSTICA"
        primaryCtaHref="?advisory=true"
        secondaryCtaText="CONOCER MÁS"
        secondaryCtaHref="#contexto"
        imageUrl="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Operación logística integral con contenedores de carga y transporte en terminal intermodal"
        imagePositionClass="object-[82%_center] sm:object-[84%_center] lg:object-[86%_center] xl:object-[88%_center]"
        trustNote="Asesoría técnica · Estructuración patrimonial · Criterio independiente"
        cornerDescriptorCategory="MERCANCÍAS & LOGÍSTICA"
        cornerDescriptorText="Criterio técnico para proteger bienes y mercancías a lo largo de su cadena de transporte."
        ariaLabel="Mercancías - Protección para bienes en movimiento"
      />

      <Section id="contexto" className="bg-white border-b border-[#E8E8E8] py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">MÁS QUE UN SEGURO</p>
                <h2 className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.75rem] text-[#0B2D58] leading-[1.16] font-medium" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
                  Tu mercancía, tu operación y tus clientes.
                </h2>
              </div>
              <div className="space-y-4 text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
                <p>El traslado de mercancías implica coordinar múltiples etapas: desde el embalaje y la carga en origen, hasta el tránsito por distintas rutas e infraestructuras, posibles maniobras o estadías intermedias, y la entrega final en destino. Cualquier eventualidad no solo afecta el valor del bien, sino también la disponibilidad de insumos, los compromisos con clientes y el flujo comercial.</p>
                <p>Analizar la logística con criterio técnico permite identificar las etapas de mayor exposición y estructurar alternativas de previsión ordenadas que respalden la estabilidad de tu empresa.</p>
                <p className="text-xs text-[#5C626B] italic pt-1">* La disponibilidad, sumas aseguradas, alcances y condiciones dependen de la póliza contratada y de cada aseguradora.</p>
              </div>
            </div>
            <div className="lg:col-span-6 lg:pt-2">
              <div className="p-7 sm:p-8 bg-[#F8F5EF] border border-[#E8E8E8] border-l-4 border-l-[#0B2D58] rounded-[2px] space-y-4">
                <p className="text-xs uppercase tracking-[0.16em] font-bold text-[#D4A737]">CRITERIO EDITORIAL</p>
                <blockquote className="text-base sm:text-lg italic text-[#0B2D58] font-serif leading-relaxed">&quot;Una cadena de suministro bien protegida impulsa la continuidad del negocio.&quot;</blockquote>
                <p className="text-xs sm:text-sm text-[#5C626B] pt-2 border-t border-[#E8E8E8]/80 leading-relaxed">
                  Evaluamos de forma independiente las características de traslado, almacenamiento y rutas para definir esquemas de protección acordes a la dinámica de tu negocio.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="operaciones" className="bg-[#F8F5EF] border-b border-[#E8E8E8] py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="max-w-3xl mb-12 sm:mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3">¿QUÉ TIPO DE OPERACIONES PUEDES PROTEGER?</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.15] font-medium tracking-tight mb-4" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
              Operaciones logísticas comunes.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">Diferentes esquemas estructurados para responder a la frecuencia, modalidad y alcance de tus traslados.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-6 mb-10">
            {commonOperations.map((item) => {
              const IconComp = item.icon;
              return (
                <div key={item.title} className="bg-white border border-[#E8E8E8] rounded-[2px] p-6 sm:p-7 hover:border-[#D4A737] transition-all flex flex-col justify-between group shadow-xs">
                  <div>
                    <div className="w-11 h-11 rounded-full bg-[#F8F5EF] border border-[#E8E8E8] flex items-center justify-center text-[#0B2D58] mb-5 group-hover:border-[#D4A737] group-hover:text-[#D4A737] transition-colors">
                      <IconComp className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0B2D58] mb-2.5">{item.title}</h3>
                    <p className="text-sm sm:text-[0.92rem] text-[#5C626B] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-5 sm:p-6 bg-white border border-[#E8E8E8] rounded-[2px] flex items-start sm:items-center gap-3.5">
            <Info className="w-5 h-5 text-[#D4A737] flex-shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-xs sm:text-sm text-[#5C626B] font-medium leading-relaxed">Las coberturas, servicios, límites, exclusiones y condiciones dependen de la póliza contratada.</p>
          </div>
        </Container>
      </Section>

      <Section id="factores" className="bg-white border-b border-[#E8E8E8] py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="max-w-3xl mb-12 sm:mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3">FACTORES A CONSIDERAR</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.15] font-medium tracking-tight mb-4" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
              Cada operación tiene un nivel de exposición distinto.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">Estructurar una protección adecuada exige ponderar las variables que determinan el perfil de riesgo de cada traslado.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {riskFactors.map((item) => {
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
              <span className="text-xs uppercase tracking-[0.16em] font-bold text-[#0B2D58] whitespace-nowrap">Variables complementarias a evaluar:</span>
              <p className="text-sm sm:text-[0.95rem] text-[#2E2E2E]/90 leading-relaxed font-medium">valor de reposición o factura comercial, idoneidad técnica del embalaje, control de temperatura o humedad y obligaciones contractuales con compradores.</p>
            </div>
          </div>
        </Container>
      </Section>

      <ApproachSection eyebrow="NUESTRO ENFOQUE" title="Más que un seguro, un aliado para tu empresa." subheadline="Analizamos las variables logísticas de tu operación para estructurar una protección de mercancías acorde a tus rutas y necesidades." pillars={approachPillars} />

      <MercanciasAdvisoryFormSection />

      <ServiceMethodologySection eyebrow="METODOLOGÍA LEVANTIR" title="Un proceso estructurado para proteger tu empresa." subtitle="Rigor consultivo de cinco fases enfocado en la mitigación de contingencias y la estabilidad de tu negocio." steps={methodologySteps} />

      <Section className="bg-[#F8F5EF] border-b border-[#E8E8E8] py-24 sm:py-28 lg:py-32">
        <Container>
          <div className="max-w-3xl mb-14 sm:mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3.5">SOLUCIONES RELACIONADAS</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.15] font-medium tracking-tight mb-4" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
              Protección coordinada para otras dimensiones de tu empresa.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
              La protección de mercancías en tránsito se complementa de forma directa con la salvaguarda de tus instalaciones físicas y la mitigación de responsabilidades operativas frente a terceros.
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
        eyebrow="MERCANCÍAS"
        title="Revisemos tu operación logística y cómo proteger lo que mueve tu negocio."
        supportingCopy="Evaluemos en conjunto los flujos de transporte, tipos de mercancía y rutas para estructurar una protección patrimonial con rigor técnico y criterio independiente."
        primaryCtaText="REVISAR MI OPERACIÓN LOGÍSTICA"
        primaryCtaHref="?advisory=true"
        secondaryCtaText="HABLAR CON UN ASESOR"
        secondaryCtaHref="?advisory=true"
      />
    </div>
  );
}


