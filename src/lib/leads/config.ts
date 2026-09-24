export const VERTICALS = [
  "autos",
  "personas",
  "pymes",
  "mercancias",
  "aeronaves",
  "sectores-especializados",
  "general"
] as const;

export type LeadVertical = typeof VERTICALS[number];

export const PRODUCTS_BY_VERTICAL = {
  autos: [
    { id: "responsabilidad-civil", label: "Responsabilidad civil" },
    { id: "danos-materiales", label: "Daños materiales" },
    { id: "robo-total", label: "Robo total" },
    { id: "gastos-medicos-ocupantes", label: "Gastos médicos ocupantes" },
    { id: "asistencia-vial", label: "Asistencia vial" },
    { id: "auto-de-alto-valor", label: "Auto de alto valor" },
    { id: "flotilla", label: "Flotilla" },
    { id: "otro-producto", label: "Otro producto" },
  ],
  personas: [
    { id: "vida", label: "Vida" },
    { id: "gastos-medicos-mayores", label: "Gastos médicos mayores" },
    { id: "accidentes-personales", label: "Accidentes personales" },
    { id: "hogar", label: "Hogar" },
    { id: "retiro-ahorro", label: "Retiro / ahorro" },
    { id: "proteccion-familiar", label: "Protección familiar" },
    { id: "otro-producto", label: "Otro producto" },
  ],
  pymes: [
    { id: "danos-al-inmueble", label: "Daños al inmueble" },
    { id: "contenidos-equipo", label: "Contenidos / equipo" },
    { id: "responsabilidad-civil", label: "Responsabilidad civil" },
    { id: "robo", label: "Robo" },
    { id: "equipo-electronico", label: "Equipo electrónico" },
    { id: "perdidas-consecuenciales", label: "Pérdidas consecuenciales" },
    { id: "accidentes-personales", label: "Accidentes personales" },
    { id: "otro-producto", label: "Otro producto" },
  ],
  mercancias: [
    { id: "transporte-terrestre", label: "Transporte terrestre" },
    { id: "transporte-maritimo", label: "Transporte marítimo" },
    { id: "transporte-aereo", label: "Transporte aéreo" },
    { id: "robo-de-mercancia", label: "Robo de mercancía" },
    { id: "danos-a-mercancia", label: "Daños a mercancía" },
    { id: "responsabilidad-asociada-al-transporte", label: "Responsabilidad asociada al transporte" },
    { id: "otro-producto", label: "Otro producto" },
  ],
  aeronaves: [
    { id: "casco-danos-a-la-aeronave", label: "Casco / daños a la aeronave" },
    { id: "responsabilidad-civil", label: "Responsabilidad civil" },
    { id: "responsabilidad-de-pasajeros", label: "Responsabilidad de pasajeros" },
    { id: "accidentes-personales-tripulacion", label: "Accidentes personales / tripulación" },
    { id: "perdida-de-rentas", label: "Pérdida de rentas" },
    { id: "guerra-secuestro-y-riesgos-politicos", label: "Guerra, secuestro y riesgos políticos" },
    { id: "responsabilidad-en-tierra", label: "Responsabilidad en tierra (terceros)" },
    { id: "otro-producto", label: "Otro producto" },
  ],
  "sectores-especializados": [
    { id: "responsabilidad-civil-especializada", label: "Responsabilidad civil especializada" },
    { id: "danos-a-activos-especializados", label: "Daños a activos especializados" },
    { id: "equipo-maquinaria-especializada", label: "Equipo / maquinaria especializada" },
    { id: "mantenimiento-de-aeronaves", label: "Mantenimiento de aeronaves" },
    { id: "responsabilidad-de-talleres-aeronauticos", label: "Responsabilidad de talleres aeronáuticos" },
    { id: "hangares", label: "Hangares" },
    { id: "riesgos-operacionales-especiales", label: "Riesgos operacionales especiales" },
    { id: "otro-producto", label: "Otro producto" },
  ],
} as const;

export type ProductId = typeof PRODUCTS_BY_VERTICAL[Exclude<LeadVertical, "general">][number]["id"];

export const GENERAL_TOPICS = [
  { id: "auto-movilidad", label: "Auto o movilidad" },
  { id: "salud-familia", label: "Salud o familia (Gastos Médicos)" },
  { id: "vida-proteccion", label: "Vida / protección patrimonial" },
  { id: "planes-retiro", label: "Planes de retiro" },
  { id: "empresa-continuidad", label: "Empresa y continuidad (PYMES)" },
  { id: "mercancias-logistica", label: "Mercancías y logística" },
  { id: "aeronaves-aviacion", label: "Aeronaves y aviación" },
  { id: "riesgo-especializado", label: "Riesgo especializado" },
  { id: "asesoria-integral", label: "No estoy seguro / Asesoría integral" },
] as const;

export type GeneralTopicId = typeof GENERAL_TOPICS[number]["id"];
