import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/service/PageHero";
import { ApproachSection } from "@/components/service/ApproachSection";
import { ServiceMethodologySection } from "@/components/service/ServiceMethodologySection";
import { CTASection } from "@/components/service/CTASection";
import { Scale, Car, ShieldAlert, HeartPulse, Wrench, Gavel, Sliders, MapPin, Users, Search, SlidersHorizontal, Handshake, Info, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Seguro de Auto | Protección Patrimonial en Movilidad | LEVANTIR",
  description: "Un seguro de auto debe proteger más que el vehículo. En LEVANTIR analizamos tu perfil de movilidad, responsabilidad frente a terceros y contexto de uso con rigor técnico.",
  alternates: { canonical: "https://levantir.com/autos/seguro-de-auto" },
};

const breadcrumbs = [
  { label: "Inicio", href: "/" },
  { label: "Autos", href: "/autos" },
  { label: "Seguro de Auto", isCurrent: true },
];

const coverageDimensions = [
  { icon: Scale, title: "Responsabilidad civil", description: "Amparo financiero ante reclamaciones por daños materiales o lesiones corporales a terceros." },
  { icon: Car, title: "Daños materiales", description: "Cobertura ante colisiones, volcaduras, rotura de cristales o eventualidades de la naturaleza." },
  { icon: ShieldAlert, title: "Robo total", description: "Indemnización ante la sustracción del vehículo con esquemas de valor comercial o convenido." },
  { icon: HeartPulse, title: "Gastos médicos a ocupantes", description: "Atención hospitalaria, traslados en ambulancia y medicamentos para conductor y pasajeros." },
  { icon: Wrench, title: "Asistencia", description: "Auxilio vial calificado en ruta y ciudad, grúa, paso de corriente y opciones de movilidad." },
  { icon: Gavel, title: "Defensa legal", description: "Asesoría jurídica especializada, representación legal en el evento y gestión de cauciones." },
];

const primaryVariables = [
  { name: "Uso del vehículo", icon: Sliders, summary: "Definir si la unidad se destina a traslados cotidianos, trayectos laborales o fines comerciales garantiza la validez contractual de la póliza ante cualquier siniestro." },
  { name: "Zona de circulación", icon: MapPin, summary: "Las vialidades habituales, la entidad de residencia y las rutas de traslado determinan la exposición vial y orientan las sumas aseguradas necesarias." },
  { name: "Tipo de vehículo", icon: Car, summary: "El modelo, antigüedad, valor convenido o comercial, disponibilidad de refacciones y convenios de taller o agencia condicionan los esquemas de reposición." },
  { name: "Perfil del conductor", icon: Users, summary: "La edad, experiencia de manejo y la inclusión de conductores habituales permiten calibrar adecuadamente deducibles y coberturas accesorias pertinentes." },
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
    href: "/personas/gastos-medicos-mayores",
    imageUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
    altText: "Familia caminando en calma en un entorno natural al atardecer",
  },
  {
    id: "seguro-de-vida",
    title: "Seguro de Vida",
    category: "RESPALDO FAMILIAR",
    description: "Respaldo patrimonial y certidumbre financiera para garantizar los proyectos y la estabilidad de quienes dependen de ti.",
    href: "/personas/seguro-de-vida",
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

export default function SeguroDeAutoPage() {
  return (
    <div className="flex-1 bg-white">
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="SEGURO DE AUTO"
        title="Un seguro de auto debe proteger más que el vehículo."
        supportingCopy="Una adecuada protección de auto debe analizar integralmente el vehículo, la responsabilidad frente a terceros, la continuidad de tu movilidad y el contexto real de uso para evitar brechas patrimoniales."
        primaryCtaText="SOLICITAR COTIZACIÓN"
        primaryCtaHref="/?advisory=true"
        secondaryCtaText="CONOCER MÁS"
        secondaryCtaHref="#contexto"
        imageUrl="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Vehículo en carretera escénica"
        imagePositionClass="object-[90%_center] sm:object-[93%_center] lg:object-[96%_center] xl:object-[98%_center]"
        trustNote="Asesoría técnica · Estructuración patrimonial · Criterio independiente"
        cornerDescriptorCategory="SEGURO DE AUTO & MOVILIDAD"
        cornerDescriptorText="Estructuración técnica para proteger tu patrimonio y tu tranquilidad en cada trayecto."
        ariaLabel="Seguro de Auto - Protección patrimonial y de movilidad"
      />

      <Section id="contexto" className="bg-white border-b border-[#E8E8E8] py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">MÁS QUE UN VEHÍCULO</p>
                <h2 className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.75rem] text-[#0B2D58] leading-[1.16] font-medium" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
                  Protección para tu movilidad y tu tranquilidad.
                </h2>
              </div>
              <div className="space-y-4 text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
                <p>Estructurar un seguro de auto va más allá de responder por daños mecánicos o de carrocería. La circulación cotidiana expone a conductores y familias a contingencias complejas que comprometen la certidumbre económica.</p>
                <p>Una solución integral de Seguro de Auto puede analizar de forma coordinada la responsabilidad frente a terceros, los daños que sufra la unidad, el riesgo de robo, las necesidades inmediatas de asistencia vial, la protección médica de ocupantes y el respaldo legal ante las autoridades.</p>
                <p className="text-sm text-[#5C626B] italic pt-1">* La disponibilidad, sumas aseguradas, alcances y condiciones de estos conceptos dependen de la póliza contratada y los términos específicos de cada aseguradora.</p>
              </div>
            </div>
            <div className="lg:col-span-6 lg:pt-2">
              <div className="p-7 sm:p-8 bg-[#F8F5EF] border border-[#E8E8E8] border-l-4 border-l-[#0B2D58] rounded-[2px] space-y-4">
                <p className="text-xs uppercase tracking-[0.16em] font-bold text-[#D4A737]">CRITERIO EDITORIAL</p>
                <blockquote className="text-base sm:text-lg italic text-[#0B2D58] font-serif leading-relaxed">
                  &quot;Una póliza adecuada no se define por el menor costo inmediato, sino por la certidumbre de responder con solvencia jurídica y financiera ante cualquier imprevisto en el camino.&quot;
                </blockquote>
                <p className="text-xs sm:text-sm text-[#5C626B] pt-2 border-t border-[#E8E8E8]/80 leading-relaxed">
                  Ponderamos esquemas de valor convenido, límites de responsabilidad civil y asistencias resolutivas para evitar brechas patrimoniales.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="dimensiones-de-cobertura" className="bg-[#F8F5EF] border-b border-[#E8E8E8] py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="max-w-3xl mb-12 sm:mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3">DIMENSIONES DE COBERTURA</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.15] font-medium tracking-tight mb-4" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
              Qué puede analizarse en un seguro de auto.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
              Exploramos los componentes conceptuales esenciales para configurar una protección adecuada a tus necesidades particulares.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
            {coverageDimensions.map((item) => {
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
            <p className="text-xs sm:text-sm text-[#5C626B] font-medium leading-relaxed">Las coberturas, límites, exclusiones, servicios y condiciones dependen de la póliza contratada.</p>
          </div>
        </Container>
      </Section>

      <Section id="variables-a-considerar" className="bg-white border-b border-[#E8E8E8] py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="max-w-3xl mb-12 sm:mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3">VARIABLES A CONSIDERAR</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.15] font-medium tracking-tight mb-4" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
              Factores clave para estructurar tu seguro de auto.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
              Una configuración adecuada parte de entender el contexto operativo real en el que circula la unidad.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {primaryVariables.map((item) => {
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
              <p className="text-sm sm:text-[0.95rem] text-[#2E2E2E]/90 leading-relaxed font-medium">frecuencia de uso, estacionamiento, deducible, necesidades de asistencia y otras variables relevantes del entorno de movilidad.</p>
            </div>
          </div>
        </Container>
      </Section>

      <ApproachSection eyebrow="NUESTRO ENFOQUE" title="Más que un seguro, una estrategia de protección." subheadline="Analizamos alternativas disponibles para estructurar una protección adecuada a tu situación." pillars={approachPillars} />

      <ServiceMethodologySection />

      <Section className="bg-[#F8F5EF] border-b border-[#E8E8E8] py-24 sm:py-28 lg:py-32">
        <Container>
          <div className="max-w-3xl mb-14 sm:mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737] mb-3.5">SOLUCIONES RELACIONADAS</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.15] font-medium tracking-tight mb-4" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
              Protección integral para otras dimensiones patrimoniales.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">
              La salvaguarda de tu movilidad se complementa de forma natural con la protección de la salud familiar y la continuidad de tus actividades empresariales.
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
                      <span>{service.href.startsWith('/#') ? "Solicitar información" : "Conocer solución"}</span>
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
        eyebrow="ASESORÍA EN SEGURO DE AUTO"
        title="Hablemos sobre la protección que necesitas."
        supportingCopy="Analizamos tu perfil de movilidad y las alternativas disponibles en las aseguradoras más sólidas del mercado, con criterio técnico independiente y sin compromisos comerciales."
        primaryCtaText="SOLICITAR COTIZACIÓN"
        primaryCtaHref="/?advisory=true"
        secondaryCtaText="HABLAR CON UN ASESOR"
        secondaryCtaHref="/?advisory=true"
      />
    </div>
  );
}
