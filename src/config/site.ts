import { HeroSlide, InsightPreviewItem, MethodologyStepItem, NavigationItem, PrincipleItem, SolutionItem } from '../types';
import { GUIAS_INICIO_SLUGS, getGuiaBySlug, getGuiaHref } from '../content/guias-de-seguros';

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
    labelTagline: "Conoce opciones para asegurar tu vehículo.",
  },
  {
    id: "aeronaves",
    theme: "Aeronaves",
    // Executive private jet gleaming on runway at sunrise
    imageUrl: "/images/home/hero/home-hero-aeronaves.webp",
    altText: "Avioneta monomotor volando sobre un paisaje montañoso al atardecer",
    labelCategory: "AERONAVES",
    labelTagline: "Explora opciones de aseguramiento para aeronaves.",
  },
  {
    id: "patrimonio",
    theme: "Patrimonio",
    // Residencia contemporánea de arquitectura elegante, situada sobre una zona elevada con vista urbana y montañosa al atardecer
    imageUrl: "/images/home/hero/home-hero-patrimonio.webp",
    altText: "Residencia contemporánea de arquitectura elegante, situada sobre una zona elevada con vista urbana y montañosa al atardecer",
    labelCategory: "PATRIMONIO",
    labelTagline: "Identifica alternativas para proteger tu patrimonio.",
  },
  {
    id: "personas-familia",
    theme: "Personas & Familia",
    // Familia de tres personas compartiendo un momento en una terraza residencial moderna, con ciudad y montañas al atardecer
    imageUrl: "/images/home/hero/home-hero-personas.webp",
    altText: "Familia de tres personas compartiendo un momento en una terraza residencial moderna, con ciudad y montañas al atardecer",
    labelCategory: "PERSONAS",
    labelTagline: "Conoce opciones para protegerte a ti y a tu familia.",
  },
  {
    id: "pymes-corporativo",
    theme: "Empresas & PYMES",
    // Responsables de una empresa supervisando maquinaria y procesos de producción en una instalación industrial moderna.
    imageUrl: "/images/home/hero/home-hero-pymes.webp",
    altText: "Responsables de una empresa supervisando maquinaria y procesos de producción en una instalación industrial moderna.",
    labelCategory: "PYMES",
    labelTagline: "Identifica los riesgos que pueden afectar tu negocio.",
  },
  {
    id: "mercancias-logistica",
    theme: "Mercancías & Logística",
    // Tractocamión blanco transportando mercancías por una autopista con paisaje montañoso al atardecer.
    imageUrl: "/images/home/hero/home-hero-mercancias.webp",
    altText: "Tractocamión blanco transportando mercancías por una autopista con paisaje montañoso al atardecer.",
    labelCategory: "MERCANCÍAS",
    labelTagline: "Conoce coberturas para el transporte de mercancías.",
  },
];

export const solutionsData: SolutionItem[] = [
  {
    id: "autos",
    title: "Autos",
    subtitle: "Conoce opciones de aseguramiento para tu vehículo y los riesgos asociados a su uso.",
    href: "/autos",
    imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop",
    altText: "Vehículo ejecutivo en carretera con arquitectura de vanguardia",
  },
  {
    id: "personas",
    title: "Personas",
    subtitle: "Explora alternativas para proteger tu salud, tu familia y tu estabilidad económica.",
    href: "/personas",
    imageUrl: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?q=80&w=800&auto=format&fit=crop",
    altText: "Silueta familiar caminando unida en un paisaje abierto",
  },
  {
    id: "pymes",
    title: "PYMES",
    subtitle: "Identifica riesgos que pueden afectar los bienes, la operación y la continuidad de tu negocio.",
    href: "/pymes",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    altText: "Sede corporativa contemporánea con fachada de cristal y acero",
  },
  {
    id: "mercancias",
    title: "Mercancías",
    subtitle: "Comprende las opciones de cobertura para mercancías durante su transporte.",
    href: "/mercancias",
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop",
    altText: "Contenedores de carga en terminal logística marítima y terrestre",
  },
  {
    id: "aeronaves",
    title: "Aeronaves",
    subtitle: "Conoce aspectos clave del aseguramiento de aeronaves y sus operaciones.",
    href: "/aeronaves",
    imageUrl: "/images/home/hero/home-hero-aeronaves.webp",
    altText: "Aeronave ejecutiva en vuelo sobre un paisaje montañoso",
  },
  {
    id: "sectores-especializados",
    title: "Sectores especializados",
    subtitle: "Explora alternativas de protección para actividades con riesgos particulares.",
    href: "/sectores-especializados",
    imageUrl: "/images/sectores-especializados/hangar-hero.webp",
    altText: "Hangar corporativo con aeronaves ejecutivas en entorno técnico especializado",
  },
];

export const methodologySteps: MethodologyStepItem[] = [
  {
    number: "01",
    title: "Comprender",
    description: "Conocemos tus necesidades, objetivos y situación actual.",
  },
  {
    number: "02",
    title: "Identificar",
    description: "Te ayudamos a reconocer los riesgos que pueden afectar tu patrimonio o actividad.",
  },
  {
    number: "03",
    title: "Orientar",
    description: "Explicamos alternativas de aseguramiento y aspectos importantes de sus coberturas.",
  },
  {
    number: "04",
    title: "Conectar",
    description: "Facilitamos el contacto con un agente de seguros autorizado que pueda atenderte.",
  },
  {
    number: "05",
    title: "Dar seguimiento",
    description: "Apoyamos la comunicación y el seguimiento de la atención relacionada con tus seguros.",
  },
];

export const principlesData: PrincipleItem[] = [
  {
    id: "analisis",
    title: "Conocemos tus necesidades",
    description: "Escuchamos tu situación y lo que necesitas proteger antes de explorar alternativas.",
    iconType: "analysis",
  },
  {
    id: "proteccion",
    title: "Consideramos distintos riesgos",
    description: "Te ayudamos a identificar riesgos relacionados con tu familia, patrimonio o actividad empresarial.",
    iconType: "protection",
  },
  {
    id: "soluciones",
    title: "Explicamos tus opciones",
    description: "Te orientamos para comprender coberturas y aspectos importantes de las alternativas disponibles.",
    iconType: "solutions",
  },
  {
    id: "acompanamiento",
    title: "Apoyamos el seguimiento",
    description: "Facilitamos la comunicación y el seguimiento de la atención relacionada con tus seguros.",
    iconType: "accompaniment",
  },
];

// Guías mostradas en Inicio: derivadas de la fuente editorial única.
export const insightsData: InsightPreviewItem[] = GUIAS_INICIO_SLUGS.flatMap((slug) => {
  const guia = getGuiaBySlug(slug);
  if (!guia) return [];
  return [
    {
      id: guia.slug,
      category: guia.category,
      title: guia.title,
      summary: guia.metaDescription,
      href: getGuiaHref(guia.slug),
      imageUrl: guia.image.src,
    },
  ];
});
