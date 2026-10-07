import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | Asesoría en Seguros y Gestión de Riesgos | LEVANTIR",
  description:
    "Contáctanos para estructurar la mejor estrategia de protección. Hablemos sobre tus necesidades de seguros y gestión de riesgos sin compromiso.",
  alternates: {
    canonical: "https://levantir.com/contacto",
  },
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
