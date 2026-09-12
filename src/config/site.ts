export const siteConfig = {
  name: "LEVANTIR",
  domain: "levantir.com",
  url: "https://levantir.com",
  locale: "es-MX",
  defaultTitle: "LEVANTIR | Seguros y Gestión de Riesgos",
  defaultDescription:
    "Seguros, gestión de riesgos y protección patrimonial con un enfoque de asesoría, estructura y acompañamiento.",
} as const;

export type SiteConfig = typeof siteConfig;
