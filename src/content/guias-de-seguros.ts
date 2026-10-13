/**
 * Guías de seguros — fuente única de datos editoriales.
 *
 * Contenido tomado de: docs/editorial/LEVANTIR_Insights_7_articulos_borrador.docx
 * Los textos son informativos y no sustituyen las condiciones de una póliza ni
 * la atención de un agente de seguros autorizado.
 *
 * Esta colección alimenta:
 *  - /guias-de-seguros (biblioteca)
 *  - /guias-de-seguros/[slug] (artículos individuales)
 *  - la sección editorial de Inicio (vía insightsData en config/site.ts)
 *  - sitemap.ts
 */

export const GUIAS_BASE_PATH = "/guias-de-seguros";

export interface GuiaImage {
  src: string;
  alt: string;
}

export interface GuiaSection {
  heading: string;
  body: string;
}

export interface GuiaCta {
  heading: string;
  text: string;
}

export interface GuiaDeSeguros {
  slug: string;
  /** Etiqueta de categoría visible (tal como figura en el documento editorial). */
  category: string;
  title: string;
  /** Título SEO completo del documento editorial. */
  seoTitle: string;
  /** Meta descripción del documento editorial. */
  metaDescription: string;
  intro: string;
  image: GuiaImage;
  sections: GuiaSection[];
  cta: GuiaCta;
}

/** Texto del botón de los CTA contextuales (idéntico en los siete artículos). */
export const GUIA_CTA_BUTTON = "SOLICITAR ORIENTACIÓN";

/** Nota editorial (idéntica en los siete artículos). */
export const GUIA_EDITORIAL_NOTE =
  "Nota editorial: contenido informativo. La disponibilidad y alcance de coberturas están sujetos a los términos de cada póliza y a la valoración de un agente autorizado.";

/** Criterio de publicación de la colección (documento editorial). */
export const GUIAS_CRITERIO_PUBLICACION =
  "Los artículos informan y orientan; no sustituyen la lectura de las condiciones de una póliza ni la atención de un agente de seguros autorizado. Las coberturas, exclusiones, límites y procedimientos dependen de cada contrato.";

/** Slug de la guía marcada como «DESTACADO» en el documento editorial. */
export const GUIA_DESTACADA_SLUG = "cambios-vida-negocio-revisar-seguros";

/** Slugs que se muestran en la sección editorial de Inicio (en este orden). */
export const GUIAS_INICIO_SLUGS = [
  "senales-revisar-seguros-patrimoniales",
  "seguros-empresa-crecimiento-coberturas",
  "mercancia-perdida-danada-transporte-seguro",
] as const;

export const guiasDeSeguros: GuiaDeSeguros[] = [
  {
    slug: "senales-revisar-seguros-patrimoniales",
    category: "PERSONAS · PATRIMONIO",
    title:
      "¿Tu seguro sigue protegiendo todo lo que has construido? Estas 5 señales podrían indicar que no.",
    seoTitle: "5 señales de que necesitas revisar tus seguros patrimoniales | LEVANTIR",
    metaDescription:
      "Descubre cinco cambios que pueden hacer necesario revisar las coberturas de tus seguros de hogar, bienes y patrimonio.",
    intro:
      "Contratar un seguro es una decisión importante, pero no significa que debas olvidarte de él hasta que ocurra un imprevisto. Tu vida puede cambiar más rápido que las condiciones que revisaste al contratarlo: compras una vivienda, haces una remodelación, adquieres equipo o asumes nuevas responsabilidades. La pregunta útil no es solamente si tienes una póliza vigente, sino si lo que ampara sigue correspondiendo con tu situación actual.",
    image: {
      src: "/images/guias-de-seguros/patrimonio-personal.webp",
      alt: "Residencia contemporánea con iluminación cálida y jardín al atardecer, con una ciudad y montañas al fondo",
    },
    sections: [
      {
        heading: "1. Tu patrimonio ha crecido",
        body: "Una nueva propiedad, mejoras relevantes en tu casa, mobiliario de mayor valor o bienes adquiridos recientemente pueden modificar lo que necesitas proteger. Conviene revisar qué bienes están incluidos, cómo se declaran y si existen límites específicos para ciertos objetos.",
      },
      {
        heading: "2. Cambiaste de domicilio o de uso del inmueble",
        body: "No es lo mismo una vivienda habitada permanentemente que un inmueble arrendado, desocupado por periodos prolongados o utilizado parcialmente para una actividad comercial. El uso y la ubicación pueden ser relevantes para la evaluación del riesgo y las condiciones de la póliza.",
      },
      {
        heading: "3. Tus responsabilidades familiares son distintas",
        body: "La llegada de hijos, nuevas personas dependientes o cambios en ingresos y compromisos financieros pueden justificar revisar seguros de vida, salud o protección patrimonial. Cada producto responde a necesidades diferentes; no conviene asumir que una sola póliza resuelve todo.",
      },
      {
        heading: "4. No recuerdas deducibles, exclusiones o límites",
        body: "Conocer el nombre del seguro no equivale a conocer su alcance. Revisa deducibles, coaseguros cuando correspondan, sumas aseguradas, sublímites, exclusiones y procedimientos de aviso. Una cobertura puede ser útil y, al mismo tiempo, tener condiciones importantes.",
      },
      {
        heading: "5. Llevas años sin comparar tu situación con tu póliza",
        body: "Una revisión periódica permite detectar cambios relevantes. No implica que debas contratar más seguros: puede confirmar que tus coberturas siguen siendo adecuadas o revelar preguntas que necesitas aclarar con un agente autorizado.",
      },
      {
        heading: "¿Qué documentos conviene tener a la mano?",
        body: "Prepara tus pólizas vigentes, recibos de pago, un inventario general de bienes relevantes y una lista de cambios ocurridos desde la contratación. Evita compartir información personal o patrimonial sensible por canales no verificados.",
      },
      {
        heading: "La decisión importante",
        body: "No existe una suma asegurada universal ni una póliza ideal para todas las familias. La revisión debe considerar tus bienes, responsabilidades, prioridades y las condiciones específicas de cada contrato.",
      },
    ],
    cta: {
      heading: "¿Hace tiempo que no revisas tus seguros?",
      text: "Cuéntanos qué ha cambiado en tu patrimonio. En LEVANTIR podemos orientarte sobre los aspectos que conviene revisar y facilitar el contacto con un agente autorizado.",
    },
  },
  {
    slug: "seguros-empresa-crecimiento-coberturas",
    category: "PYMES · EMPRESAS",
    title: "Tu empresa está creciendo… ¿pero tus seguros siguen siendo suficientes?",
    seoTitle: "¿Tus seguros empresariales acompañan el crecimiento de tu negocio? | LEVANTIR",
    metaDescription:
      "Conoce los cambios empresariales que justifican revisar seguros de daños, responsabilidad y continuidad operativa.",
    intro:
      "Crecer suele ser una buena noticia: más clientes, nuevas instalaciones, maquinaria, inventario y colaboradores. Pero cada avance puede cambiar la exposición de tu negocio. Una póliza contratada cuando la empresa tenía una operación más pequeña quizá merezca una revisión, aunque continúe vigente y sus pagos estén al corriente.",
    image: {
      src: "/images/guias-de-seguros/empresa-crecimiento.webp",
      alt: "Dos profesionales con lentes de seguridad revisan información en una tableta dentro de una planta industrial",
    },
    sections: [
      {
        heading: "Más activos, más preguntas",
        body: "Si incorporaste maquinaria, vehículos, equipo tecnológico o inventario, comprueba cómo se describen esos bienes y qué límites aplican. También importa dónde se encuentran y bajo qué condiciones se utilizan.",
      },
      {
        heading: "Nuevas ubicaciones y operaciones",
        body: "Abrir una sucursal, rentar una bodega o comenzar a fabricar un producto distinto puede modificar los riesgos. Pregunta si las ubicaciones y actividades actuales aparecen correctamente reflejadas en la documentación del seguro.",
      },
      {
        heading: "Responsabilidades frente a terceros",
        body: "Con más operaciones pueden aparecer nuevas obligaciones contractuales, visitas de clientes, proveedores o trabajos fuera de tus instalaciones. Es conveniente entender qué situaciones contempla la responsabilidad civil contratada y cuáles quedan fuera.",
      },
      {
        heading: "La continuidad del negocio",
        body: "Un daño material puede interrumpir actividades aun cuando los bienes estén asegurados. Algunas pólizas ofrecen coberturas relacionadas con pérdidas por interrupción de negocio bajo condiciones específicas; es importante conocer los supuestos, periodos y requisitos, sin asumir que se incluyen automáticamente.",
      },
      {
        heading: "Personal y personas clave",
        body: "Cuando una operación depende de conocimientos, liderazgo o funciones críticas de determinadas personas, conviene analizar los efectos de una ausencia prolongada. Existen alternativas de aseguramiento que pueden ser pertinentes en ciertos casos, pero su utilidad depende de la estructura y necesidades de cada empresa.",
      },
      {
        heading: "Tres preguntas para una revisión inicial",
        body: "¿Qué cambió desde que contrataste? ¿Qué evento podría detener o afectar gravemente tu operación? ¿Qué dicen realmente las condiciones y exclusiones de tus pólizas? Responderlas ayuda a enfocar una conversación útil con un profesional autorizado.",
      },
    ],
    cta: {
      heading: "¿Tu negocio ya no opera como cuando contrataste sus seguros?",
      text: "Podemos ayudarte a identificar los cambios relevantes y orientarte sobre las alternativas de aseguramiento que conviene conocer para tu empresa.",
    },
  },
  {
    slug: "mercancia-perdida-danada-transporte-seguro",
    category: "MERCANCÍAS · TRANSPORTE",
    title: "¿Qué pasa si tu mercancía se pierde o se daña durante el transporte?",
    seoTitle: "Mercancía perdida o dañada: qué revisar en el seguro de transporte | LEVANTIR",
    metaDescription:
      "Aprende qué riesgos pueden presentarse en un traslado y qué condiciones revisar en un seguro de transporte de mercancías.",
    intro:
      "Una entrega que no llega, una carga dañada o un incidente durante el trayecto puede provocar pérdidas económicas y problemas con clientes. Sin embargo, la existencia de un seguro de transporte no significa que cualquier pérdida esté cubierta. La respuesta depende de la póliza, del tipo de mercancía, del evento ocurrido y de las condiciones del traslado.",
    image: {
      src: "/images/guias-de-seguros/transporte-mercancias.webp",
      alt: "Tractocamión blanco frente a muelles de carga de un centro logístico al atardecer",
    },
    sections: [
      {
        heading: "¿Qué puede suceder durante el traslado?",
        body: "Entre los escenarios que una empresa debe considerar están accidentes, robo, daños durante maniobras, humedad, roturas y eventos asociados al almacenamiento temporal. No todos están amparados en todos los contratos: algunos pueden requerir coberturas adicionales o tener exclusiones.",
      },
      {
        heading: "La mercancía importa",
        body: "El valor, fragilidad, naturaleza y condiciones de conservación de los bienes influyen en las necesidades de protección. Productos perecederos, maquinaria, componentes electrónicos o mercancías de alto valor pueden requerir revisiones distintas.",
      },
      {
        heading: "También importan la ruta y la operación",
        body: "Conviene describir el origen, destino, medios de transporte, transbordos, embalaje, medidas de seguridad y posibles periodos de almacenamiento. Una omisión relevante o el incumplimiento de condiciones contractuales puede afectar la atención de un siniestro, según lo pactado.",
      },
      {
        heading: "¿Quién es responsable si algo sale mal?",
        body: "Las obligaciones del vendedor, comprador, transportista y otros participantes dependen de los contratos aplicables. Antes de asumir que alguien más responderá por la pérdida, revisa quién soporta el riesgo en cada etapa y cómo se relaciona esa responsabilidad con el seguro.",
      },
      {
        heading: "Qué revisar en la póliza",
        body: "Pregunta por riesgos amparados, exclusiones, deducibles, límites, trayectos, medios autorizados, requisitos de embalaje, avisos de siniestro y documentos de soporte. Verifica también si hay condiciones especiales para robo, maniobras o almacenamiento.",
      },
      {
        heading: "Si ocurre un incidente",
        body: "Prioriza la seguridad de las personas. Después, sigue las instrucciones de aviso previstas en la póliza, conserva documentación del transporte y del daño y evita asumir que un procedimiento es idéntico en todas las aseguradoras. La gestión y resolución corresponden a las partes autorizadas según el contrato.",
      },
    ],
    cta: {
      heading: "¿Transportas mercancías y no sabes qué riesgos están cubiertos?",
      text: "Cuéntanos qué tipo de carga manejas y cómo se realiza el traslado. Te orientaremos sobre los aspectos que conviene revisar y, cuando corresponda, te conectaremos con un agente autorizado.",
    },
  },
  {
    slug: "seguro-aeronaves-coberturas-exclusiones",
    category: "AERONAVES · AVIACIÓN",
    title:
      "Tener asegurada una aeronave no significa que todos los riesgos estén cubiertos. ¿Qué debes revisar?",
    seoTitle: "Seguro de aeronaves: coberturas y exclusiones que conviene revisar | LEVANTIR",
    metaDescription:
      "Identifica aspectos clave del aseguramiento aeronáutico: uso, pilotos, rutas, responsabilidad civil y condiciones de operación.",
    intro:
      "El aseguramiento aeronáutico exige prestar atención a algo más que el valor de una aeronave. Las condiciones de uso, la operación, las personas que la pilotan y las responsabilidades frente a terceros pueden influir en el alcance de una póliza. Por eso, una revisión informada comienza con la pregunta: ¿qué operación concreta se busca proteger?",
    image: {
      src: "/images/guias-de-seguros/seguro-aeronaves.webp",
      alt: "Avioneta monomotor blanca con detalles azul marino y dorado dentro de un hangar al atardecer",
    },
    sections: [
      {
        heading: "Casco y responsabilidad: necesidades diferentes",
        body: "La protección frente a daños a la propia aeronave y la responsabilidad por daños a terceros o pasajeros son asuntos distintos. Las coberturas y sus límites deben revisarse por separado; no conviene deducir que una implica la otra.",
      },
      {
        heading: "Uso declarado de la aeronave",
        body: "La operación privada, corporativa, de instrucción o comercial puede presentar exposiciones diferentes. Es importante que el uso real sea compatible con las condiciones pactadas y que cualquier cambio relevante se consulte con el agente autorizado.",
      },
      {
        heading: "Pilotos y requisitos operativos",
        body: "Las pólizas pueden establecer condiciones sobre experiencia, habilitaciones, entrenamiento o personas autorizadas para operar. Conviene revisar los requisitos concretos, sin asumir que cualquier piloto con licencia cumple automáticamente lo contratado.",
      },
      {
        heading: "Rutas, territorio y aeropuertos",
        body: "Las áreas geográficas, destinos internacionales, características de pistas y otros aspectos operativos pueden estar sujetos a condiciones particulares. Antes de cambiar rutas o modalidades de operación, revisa la documentación aplicable.",
      },
      {
        heading: "Periodos en tierra y mantenimiento",
        body: "Una aeronave enfrenta riesgos también cuando está estacionada, en hangar o durante determinadas maniobras. Pregunta qué situaciones están contempladas y cuáles pueden requerir condiciones especiales.",
      },
      {
        heading: "Una lista práctica para la conversación",
        body: "Ten disponible información general sobre tipo de aeronave, uso previsto, rutas habituales, tripulación y coberturas existentes. La evaluación específica debe realizarse con profesionales autorizados y con base en los términos del producto.",
      },
    ],
    cta: {
      heading: "¿Necesitas comprender mejor el seguro de una aeronave?",
      text: "En LEVANTIR podemos orientarte sobre los puntos que conviene revisar y facilitar el contacto con un agente autorizado que atienda riesgos aeronáuticos.",
    },
  },
  {
    slug: "riesgos-empresa-seguro-especializado",
    category: "SECTORES ESPECIALIZADOS",
    title: "¿Tu empresa tiene riesgos que un seguro convencional podría no cubrir?",
    seoTitle: "Riesgos industriales y seguros especializados: qué revisar | LEVANTIR",
    metaDescription:
      "Descubre cuándo una actividad industrial, energética o de construcción requiere revisar condiciones de aseguramiento particulares.",
    intro:
      "No todas las empresas enfrentan los mismos escenarios. Una operación industrial, una obra de construcción o una instalación energética puede combinar equipos costosos, procesos delicados, responsabilidades contractuales y riesgos de interrupción. Por eso, utilizar el nombre de un seguro como única referencia puede ser insuficiente para entender su alcance.",
    image: {
      src: "/images/guias-de-seguros/sectores-especializados.webp",
      alt: "Dos trabajadores con casco observan una instalación industrial con torres y tuberías al atardecer",
    },
    sections: [
      {
        heading: "¿Qué vuelve especializado a un riesgo?",
        body: "No se trata solamente del tamaño de una empresa. La complejidad de los procesos, la concentración de valores, la ubicación, los materiales utilizados o la posible afectación a terceros pueden justificar un análisis más detallado.",
      },
      {
        heading: "Daños a equipos e instalaciones",
        body: "En ciertos negocios, una falla o un daño a un componente crítico puede tener consecuencias que van más allá de su costo de reparación. Conviene revisar cómo se describen los bienes y qué eventos, deducibles, límites o exclusiones se aplican.",
      },
      {
        heading: "Responsabilidad por la actividad",
        body: "Los trabajos en instalaciones de terceros, la construcción, la operación de maquinaria o el manejo de materiales específicos pueden generar obligaciones particulares. Es importante comparar esas obligaciones con los alcances reales de las coberturas disponibles.",
      },
      {
        heading: "Interrupción y dependencias",
        body: "Un incidente puede afectar entregas, producción o acceso a instalaciones. Algunas soluciones contemplan escenarios de interrupción bajo requisitos concretos; otras no. También importa entender la dependencia de proveedores, equipos o ubicaciones críticas.",
      },
      {
        heading: "Por qué las exclusiones merecen atención",
        body: "Una propuesta puede parecer amplia en su resumen comercial, pero el alcance real se define por condiciones, límites y exclusiones. Revisar estos documentos con un agente autorizado permite formular preguntas específicas antes de decidir.",
      },
      {
        heading: "Cómo iniciar la revisión",
        body: "Describe la actividad, los procesos relevantes, los bienes principales, las ubicaciones y los eventos que más preocupan a la empresa. Con esa información es más fácil explorar alternativas pertinentes sin presumir que existe una solución universal.",
      },
    ],
    cta: {
      heading: "¿Tu operación presenta riesgos poco habituales?",
      text: "Te ayudamos a identificar preguntas importantes sobre aseguramiento especializado y a conectar con agentes autorizados que puedan analizar tu caso.",
    },
  },
  {
    slug: "seguro-barato-deducibles-exclusiones",
    category: "EDUCACIÓN · SEGUROS",
    title: "¿Por qué el seguro más barato podría terminar costándote más?",
    seoTitle: "Seguro barato vs cobertura: deducibles y exclusiones | LEVANTIR",
    metaDescription:
      "Aprende por qué comparar solo el precio de una póliza puede ocultar diferencias importantes en coberturas, deducibles y límites.",
    intro:
      "Cuando dos seguros parecen ofrecer lo mismo, elegir el de menor precio resulta tentador. El problema aparece cuando la comparación se limita a la prima y deja fuera condiciones que pueden cambiar cuánto pagas o qué apoyo recibirías ante un evento cubierto. Un seguro de menor costo no es necesariamente una mala elección, pero sí merece una comparación completa.",
    image: {
      src: "/images/guias-de-seguros/comparar-seguros-precio.webp",
      alt: "Manos sobre un escritorio con calculadora, bolígrafo y documentos con gráficas, junto a una laptop",
    },
    sections: [
      {
        heading: "El precio es solo una parte",
        body: "La prima es el costo de contratar la póliza, pero no describe por sí sola los riesgos cubiertos. Dos opciones pueden tener precios distintos porque también difieren en límites, deducibles, servicios, exclusiones o requisitos.",
      },
      {
        heading: "Deducible: lo que puede quedar a tu cargo",
        body: "En términos generales, el deducible es una cantidad o proporción que corresponde asumir al asegurado en ciertos supuestos, conforme al contrato. Un deducible más alto puede acompañarse de una prima menor, pero también cambia el desembolso potencial si ocurre un siniestro cubierto.",
      },
      {
        heading: "Coaseguro y participación en gastos",
        body: "En productos donde exista coaseguro, como algunos seguros médicos, es necesario comprender cómo se calcula y si existen topes o condiciones particulares. No basta con mirar una cifra aislada.",
      },
      {
        heading: "Exclusiones y periodos de espera",
        body: "Algunos eventos, circunstancias o tratamientos pueden estar excluidos o sujetos a periodos de espera. Esas condiciones deben leerse antes de contratar, especialmente si responden a preocupaciones concretas del asegurado.",
      },
      {
        heading: "Suma asegurada y sublímites",
        body: "La cifra principal de cobertura no siempre significa que cualquier gasto o daño esté amparado hasta ese monto. Pueden existir límites por concepto, evento o tipo de bien, además de otras condiciones contractuales.",
      },
      {
        heading: "Cómo comparar de manera útil",
        body: "Pide que las alternativas se expliquen bajo escenarios equivalentes: mismo riesgo, condiciones comparables, deducibles, límites y exclusiones identificadas. Pregunta qué cambia realmente entre una opción y otra y cuáles son las consecuencias de esas diferencias.",
      },
      {
        heading: "¿Entonces conviene el más caro?",
        body: "No necesariamente. La decisión adecuada depende de necesidades, presupuesto, tolerancia al riesgo y condiciones del contrato. El objetivo es elegir con información, no asumir que precio alto o bajo equivale a mejor protección.",
      },
    ],
    cta: {
      heading: "¿Tienes dos cotizaciones y no sabes qué diferencias importan?",
      text: "Podemos ayudarte a identificar qué conceptos conviene comparar y facilitarte orientación con un agente de seguros autorizado.",
    },
  },
  {
    slug: "cambios-vida-negocio-revisar-seguros",
    category: "DESTACADO · PREVENCIÓN",
    title: "Estos cambios en tu vida o negocio podrían dejar desactualizados tus seguros.",
    seoTitle: "Cambios que pueden dejar desactualizados tus seguros | LEVANTIR",
    metaDescription:
      "Conoce qué cambios personales y empresariales pueden justificar una revisión de pólizas y coberturas.",
    intro:
      "La vida y los negocios no permanecen inmóviles. Una mudanza, una nueva responsabilidad familiar, la compra de maquinaria o la apertura de una sucursal pueden modificar los riesgos que enfrentas. Tus seguros, en cambio, se rigen por condiciones contratadas en un momento determinado. Por eso, revisar su vigencia no siempre es suficiente: también importa comprobar si siguen respondiendo a lo que necesitas proteger.",
    image: {
      src: "/images/guias-de-seguros/cambios-proteccion.webp",
      alt: "Dos personas revisan documentos con gráficas en una oficina con ventanales y vista a la ciudad y las montañas",
    },
    sections: [
      {
        heading: "Cuando cambia tu vida personal",
        body: "Comprar una casa, ampliar una propiedad, adquirir bienes importantes o asumir nuevas responsabilidades familiares puede hacer útil una revisión de seguros patrimoniales, de vida o de salud. No significa que automáticamente exista una brecha: significa que conviene comprobarlo.",
      },
      {
        heading: "Cuando crece una empresa",
        body: "Más empleados, nuevas líneas de producción, contratos distintos, sucursales o inventario adicional pueden modificar la exposición. La revisión debe considerar tanto bienes como responsabilidades y posibles interrupciones de la operación.",
      },
      {
        heading: "Cuando cambia la forma de utilizar un bien",
        body: "Un inmueble que pasa de uso habitacional a arrendamiento, un vehículo con un uso distinto o un equipo trasladado a otra ubicación puede requerir atención. Las condiciones aplicables dependen del producto y de lo pactado.",
      },
      {
        heading: "Cuando cambian tus prioridades",
        body: "También hay cambios que no son materiales: un nuevo presupuesto, distintas personas dependientes o mayor preocupación por la continuidad de un negocio. La utilidad de una cobertura se evalúa en relación con tus objetivos actuales.",
      },
      {
        heading: "Una revisión no significa contratar por contratar",
        body: "El propósito de revisar es comprender. A veces bastará con aclarar una exclusión o actualizar información; en otros casos, un agente autorizado podrá explicar alternativas. La decisión debe basarse en necesidades y condiciones reales, no en presión comercial.",
      },
      {
        heading: "Cómo empezar en 15 minutos",
        body: "Haz una lista de tus pólizas, anota qué cambió desde su contratación y escribe tres escenarios que te preocuparía enfrentar. Con eso tendrás una base clara para conversar con un agente autorizado, sin necesidad de compartir documentos sensibles por canales inseguros.",
      },
    ],
    cta: {
      heading: "¿Tu situación cambió desde la última vez que revisaste tus seguros?",
      text: "Cuéntanos qué necesitas proteger hoy. Te ayudamos a reconocer los aspectos relevantes y, cuando corresponda, a contactar con un agente de seguros autorizado.",
    },
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getGuiaBySlug(slug: string): GuiaDeSeguros | undefined {
  return guiasDeSeguros.find((guia) => guia.slug === slug);
}

export function getGuiaHref(slug: string): string {
  return `${GUIAS_BASE_PATH}/${slug}`;
}

/** Hasta `count` guías distintas a la actual, en orden circular estable. */
export function getRelatedGuias(slug: string, count = 3): GuiaDeSeguros[] {
  const index = guiasDeSeguros.findIndex((guia) => guia.slug === slug);
  if (index === -1) return guiasDeSeguros.slice(0, count);
  const related: GuiaDeSeguros[] = [];
  for (let step = 1; step < guiasDeSeguros.length && related.length < count; step += 1) {
    related.push(guiasDeSeguros[(index + step) % guiasDeSeguros.length]);
  }
  return related;
}

export interface GuiaTopic {
  id: string;
  name: string;
  description: string;
  categoryKeyword: string;
}

export const GUIA_TOPICS: readonly GuiaTopic[] = [
  {
    id: "personas",
    name: "PERSONAS",
    description: "Patrimonio, familia y decisiones personales sobre seguros.",
    categoryKeyword: "PERSONAS",
  },
  {
    id: "pymes",
    name: "PYMES",
    description: "Operación, activos y responsabilidades de una empresa.",
    categoryKeyword: "PYMES",
  },
  {
    id: "mercancias",
    name: "MERCANCÍAS",
    description: "Transporte, almacenamiento y traslado de bienes.",
    categoryKeyword: "MERCANCÍAS",
  },
  {
    id: "aeronaves",
    name: "AERONAVES",
    description: "Aspectos clave del aseguramiento de aeronaves.",
    categoryKeyword: "AERONAVES",
  },
  {
    id: "sectores-especializados",
    name: "SECTORES ESPECIALIZADOS",
    description: "Actividades con riesgos particulares.",
    categoryKeyword: "SECTORES ESPECIALIZADOS",
  },
] as const;

export function findGuiaTopicById(id?: string): GuiaTopic | undefined {
  if (!id) return undefined;
  const normalized = id
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
  return GUIA_TOPICS.find((t) => t.id === normalized);
}

export function getGuiasByTopic(topicId: string): GuiaDeSeguros[] {
  const topic = findGuiaTopicById(topicId);
  if (!topic) return [];
  return guiasDeSeguros.filter((g) =>
    g.category.toUpperCase().includes(topic.categoryKeyword.toUpperCase())
  );
}

