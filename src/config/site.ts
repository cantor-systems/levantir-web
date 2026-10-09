import { HeroSlide, InsightPreviewItem, MethodologyStepItem, NavigationItem, PrincipleItem, SolutionItem } from '../types';

export const siteConfig = {
  name: "LEVANTIR",
  domain: "levantir.com",
  url: "https://levantir.com",
  locale: "es-MX",
  defaultTitle: "LEVANTIR | Seguros y Gestión de Riesgos",
  defaultDescription:
    "Seguros, gestión de riesgos y protección patrimonial con un enfoque de asesoría, estructura y acompañamiento.",
  descriptor: "SEGUROS · GESTIÓN DE RIESGOS · PROTECCIÓN PATRIMONIAL",
  slogan: "Protegemos lo que has construido.",
  secondarySlogan: "Riesgos hoy. Oportunidades mañana.",
  valueProposition: "No comenzamos por una póliza. Comenzamos por entender qué necesitas proteger.",
  contact: {
    phone: "",
    whatsapp: "",
    email: "",
  },
} as const;

export const mainNavItems: NavigationItem[] = [
  { label: "AUTOS", href: "/autos" },
  { label: "PERSONAS", href: "/personas" },
  { label: "PYMES", href: "/pymes" },
  { label: "MERCANCÍAS", href: "/mercancias" },
  { label: "AERONAVES", href: "/aeronaves" },
  { label: "SECTORES ESPECIALIZADOS", href: "/sectores-especializados" },
  { label: "NOSOTROS", href: "/nosotros" },
  { label: "CONTACTO", href: "/contacto" },
];

export const heroSlides: HeroSlide[] = [
  {
    id: "autos-executive",
    theme: "Autos & Patrimonio",
    // Premium executive vehicle on scenic modern architectural villa terrace overlooking city dusk
    imageUrl: "/images/home/hero/home-hero-autos.webp",
    altText: "Sedán ejecutivo oscuro circulando por una avenida con edificios modernos al atardecer",
    labelCategory: "AUTOS",
    labelTagline: "Tu tranquilidad, siempre protegida.",
  },
  {
    id: "aeronaves",
    theme: "Aeronaves",
    // Executive private jet gleaming on runway at sunrise
    imageUrl: "/images/home/hero/home-hero-aeronaves.webp",
    altText: "Avioneta monomotor volando sobre un paisaje montañoso al atardecer",
    labelCategory: "AERONAVES",
    labelTagline: "Protección para llegar más lejos.",
  },
  {
    id: "embarcaciones",
    theme: "Patrimonio Marítimo",
    // Sophisticated yacht navigating deep waters
    imageUrl: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?q=80&w=2070&auto=format&fit=crop",
    altText: "Embarcación en navegación marítima en aguas abiertas",
    labelCategory: "PATRIMONIO",
    labelTagline: "Visión de largo plazo ante el riesgo.",
  },
  {
    id: "personas-familia",
    theme: "Personas & Familia",
    // Familia de tres personas compartiendo un momento en una terraza residencial moderna, con ciudad y montañas al atardecer
    imageUrl: "/images/home/hero/home-hero-personas.webp",
    altText: "Familia de tres personas compartiendo un momento en una terraza residencial moderna, con ciudad y montañas al atardecer",
    labelCategory: "PERSONAS",
    labelTagline: "Lo más importante, siempre contigo.",
  },
  {
    id: "pymes-corporativo",
    theme: "Empresas & PYMES",
    // Modern architectural corporate headquarters with warm lighting
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    altText: "Edificio corporativo moderno con arquitectura geométrica y cristal",
    labelCategory: "PYMES",
    labelTagline: "Soluciones a la medida de tu negocio.",
  },
  {
    id: "mercancias-logistica",
    theme: "Mercancías & Logística",
    // Precision container terminal and international supply chain
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    altText: "Terminal de carga y contenedores en operación logística continua",
    labelCategory: "MERCANCÍAS",
    labelTagline: "Tu operación, en movimiento seguro.",
  },
];

export const solutionsData: SolutionItem[] = [
  {
    id: "autos",
    title: "Autos",
    subtitle: "Tu movilidad, siempre protegida.",
    href: "/autos",
    imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop",
    altText: "Vehículo ejecutivo en carretera con arquitectura de vanguardia",
  },
  {
    id: "personas",
    title: "Personas",
    subtitle: "Lo más importante, siempre contigo.",
    href: "/personas",
    imageUrl: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?q=80&w=800&auto=format&fit=crop",
    altText: "Silueta familiar caminando unida en un paisaje abierto",
  },
  {
    id: "pymes",
    title: "PYMES",
    subtitle: "Soluciones a la medida de tu negocio.",
    href: "/pymes",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    altText: "Sede corporativa contemporánea con fachada de cristal y acero",
  },
  {
    id: "mercancias",
    title: "Mercancías",
    subtitle: "Tu operación, en movimiento seguro.",
    href: "/mercancias",
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop",
    altText: "Contenedores de carga en terminal logística marítima y terrestre",
  },
  {
    id: "aeronaves",
    title: "Aeronaves",
    subtitle: "Protección para llegar más lejos.",
    href: "/aeronaves",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop",
    altText: "Aeronave ejecutiva en plataforma aeroportuaria",
  },
  {
    id: "sectores-especializados",
    title: "Sectores especializados",
    subtitle: "Cobertura para lo extraordinario.",
    href: "/sectores-especializados",
    imageUrl: "/images/sectores-especializados/hangar-hero.webp",
    altText: "Hangar corporativo con aeronaves ejecutivas en entorno técnico especializado",
  },
];

export const methodologySteps: MethodologyStepItem[] = [
  {
    number: "01",
    title: "Comprender",
    description: "Escuchamos tus objetivos y entendemos tu contexto.",
  },
  {
    number: "02",
    title: "Identificar",
    description: "Analizamos tus riesgos actuales y potenciales.",
  },
  {
    number: "03",
    title: "Estructurar",
    description: "Diseñamos la mejor estrategia de protección.",
  },
  {
    number: "04",
    title: "Implementar",
    description: "Acompañamos la gestión y puesta en marcha.",
  },
  {
    number: "05",
    title: "Revisar",
    description: "Evolucionamos la estrategia conforme cambian tus necesidades.",
  },
];

export const principlesData: PrincipleItem[] = [
  {
    id: "analisis",
    title: "Análisis antes que producto",
    description: "Entendemos tu realidad antes de sugerir una solución.",
    iconType: "analysis",
  },
  {
    id: "proteccion",
    title: "Protección integral",
    description: "Conectamos personas, patrimonio y operación.",
    iconType: "protection",
  },
  {
    id: "soluciones",
    title: "Soluciones estructuradas",
    description: "Diseñadas a la medida de tus objetivos.",
    iconType: "solutions",
  },
  {
    id: "acompanamiento",
    title: "Acompañamiento",
    description: "Estamos contigo hoy y en el futuro.",
    iconType: "accompaniment",
  },
];

export const insightsData: InsightPreviewItem[] = [
  {
    id: "gastos-medicos",
    category: "PERSONAS",
    title: "Gastos médicos: una decisión que protege más que tu salud",
    summary: "Un respaldo clave para tu bienestar, tu familia y tu patrimonio.",
    href: "/personas/gastos-medicos-mayores",
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "hombre-clave",
    category: "EMPRESAS",
    title: "El valor de un hombre clave en la continuidad del negocio",
    summary: "Cómo proteger el futuro de tu empresa ante la ausencia de un talento estratégico.",
    href: "#insight-hombre-clave",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "mercancias-resilientes",
    category: "MERCANCÍAS",
    title: "Mercancías en movimiento: riesgos que no se detienen",
    summary: "Soluciones para una cadena de suministro más segura y resiliente.",
    href: "#insight-mercancias",
    imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop",
  },
];
