import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | Asesoría en Seguros y Gestión de Riesgos",
  description:
    "Contáctanos para estructurar la mejor estrategia de protección. Hablemos sobre tus necesidades de seguros y gestión de riesgos sin compromiso.",
  alternates: {
    canonical: "https://levantir.com/contacto",
  },
  openGraph: {
    title: "Contacto | Asesoría en Seguros y Gestión de Riesgos | LEVANTIR",
    description:
      "Contáctanos para estructurar la mejor estrategia de protección. Hablemos sobre tus necesidades de seguros y gestión de riesgos sin compromiso.",
    url: "https://levantir.com/contacto",
    type: "website",
    siteName: "LEVANTIR",
    locale: "es_MX",
    images: [
      {
        url: "https://levantir.com/images/brand/levantir-open-graph.png",
        width: 1200,
        height: 630,
        alt: "LEVANTIR | Seguros y Gestión de Riesgos",
      },
    ],
  },
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
