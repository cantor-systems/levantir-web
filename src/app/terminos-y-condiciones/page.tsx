import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Consulta los términos y condiciones de uso del sitio web de LEVANTIR y el alcance de sus servicios de orientación.",
  alternates: {
    canonical: "https://levantir.com/terminos-y-condiciones",
  },
  openGraph: {
    title: "Términos y condiciones | LEVANTIR",
    description:
      "Consulta los términos y condiciones de uso del sitio web de LEVANTIR y el alcance de sus servicios de orientación.",
    url: "https://levantir.com/terminos-y-condiciones",
    type: "website",
    siteName: "LEVANTIR",
    locale: "es_MX",
  },
};

const displayFont = {
  fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif',
} as const;

export default function TerminosYCondicionesPage() {
  return (
    <div className="bg-[#F8F5EF] min-h-screen py-14 sm:py-16 lg:py-20 text-[#2E2E2E]">
      <Container>
        <article className="max-w-[800px] mx-auto">
          {/* Encabezado Editorial */}
          <header className="border-b border-[#E8E8E8] pb-8 sm:pb-10 mb-10 sm:mb-12">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-6 h-[1.5px] bg-[#D4A737]" aria-hidden="true" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
                DOCUMENTO LEGAL
              </p>
            </div>
            <h1
              className="font-display text-3xl sm:text-4xl md:text-[2.6rem] text-[#0B2D58] font-medium leading-[1.2] mb-3"
              style={displayFont}
            >
              Términos y condiciones
            </h1>
            <p className="text-xs sm:text-sm text-[#5C626B]">
              Última actualización: 10 de octubre de 2026
            </p>
          </header>

          {/* Cuerpo de Términos y Condiciones */}
          <div className="space-y-10 sm:space-y-12 leading-relaxed text-[0.95rem] sm:text-base text-[#2E2E2E]/90">
            {/* Sección 1 */}
            <section className="space-y-3.5">
              <h2
                className="font-display text-xl sm:text-2xl text-[#0B2D58] font-medium leading-snug"
                style={displayFont}
              >
                1. Identificación del sitio
              </h2>
              <p>
                El sitio web <strong className="text-[#0B2D58] font-semibold">levantir.com</strong> es operado bajo el nombre comercial{" "}
                <strong className="text-[#0B2D58] font-semibold">LEVANTIR</strong> por Jesús Omar Fernández González, persona física con domicilio en Clzda nte 7358, Cd granja, Zapopan, Jalisco, 45010.
              </p>
              <p>
                Estos Términos y condiciones regulan el acceso y uso del sitio web, así como de sus contenidos y mecanismos de contacto.
              </p>
            </section>

            {/* Sección 2 */}
            <section className="space-y-3.5">
              <h2
                className="font-display text-xl sm:text-2xl text-[#0B2D58] font-medium leading-snug"
                style={displayFont}
              >
                2. Naturaleza de los servicios
              </h2>
              <p>
                LEVANTIR proporciona información y orientación relacionada con riesgos, necesidades de protección y alternativas de aseguramiento.
              </p>
              <p>
                Según las características de cada solicitud, LEVANTIR podrá facilitar el contacto con agentes de seguros autorizados para que el interesado reciba información adicional sobre productos y opciones disponibles.
              </p>
              <div className="p-4 sm:p-5 bg-white/80 border-l-2 border-[#D4A737] rounded-r-[2px]">
                <p className="font-semibold text-[#0B2D58]">
                  LEVANTIR no actúa como aseguradora, no emite pólizas, no garantiza la aceptación de solicitudes ni asegura la disponibilidad de coberturas o condiciones específicas.
                </p>
              </div>
              <p>
                La contratación de cualquier producto de seguros, cuando proceda, estará sujeta a la intervención de las personas y entidades legalmente autorizadas, así como a las condiciones establecidas por la aseguradora correspondiente.
              </p>
            </section>

            {/* Sección 3 */}
            <section className="space-y-3.5">
              <h2
                className="font-display text-xl sm:text-2xl text-[#0B2D58] font-medium leading-snug"
                style={displayFont}
              >
                3. Carácter informativo de los contenidos
              </h2>
              <p>
                Los contenidos del sitio tienen una finalidad informativa y orientativa.
              </p>
              <p>
                La información publicada no constituye por sí misma una oferta vinculante de seguro, una póliza, una garantía de cobertura ni una recomendación individual definitiva.
              </p>
              <p>
                Las condiciones, exclusiones, requisitos, primas y alcances de cualquier producto deberán confirmarse con el agente autorizado o la aseguradora correspondiente.
              </p>
            </section>

            {/* Sección 4 */}
            <section className="space-y-3.5">
              <h2
                className="font-display text-xl sm:text-2xl text-[#0B2D58] font-medium leading-snug"
                style={displayFont}
              >
                4. Uso adecuado del sitio
              </h2>
              <p>
                El usuario se compromete a utilizar el sitio de manera lícita y a proporcionar información veraz cuando solicite contacto u orientación.
              </p>
              <p>
                No deberá utilizar los formularios o medios de comunicación del sitio para transmitir contenido fraudulento, ilícito o que comprometa la seguridad de los sistemas.
              </p>
            </section>

            {/* Sección 5 */}
            <section className="space-y-3.5">
              <h2
                className="font-display text-xl sm:text-2xl text-[#0B2D58] font-medium leading-snug"
                style={displayFont}
              >
                5. Solicitudes de contacto
              </h2>
              <p>
                El envío de un formulario, mensaje o solicitud no establece automáticamente una relación contractual de aseguramiento ni implica la aceptación de una propuesta por parte de una aseguradora.
              </p>
              <p>
                LEVANTIR podrá contactar al usuario para aclarar su solicitud, proporcionar orientación o facilitar la comunicación con agentes autorizados, de conformidad con el Aviso de privacidad y la legislación aplicable.
              </p>
            </section>

            {/* Sección 6 */}
            <section className="space-y-3.5">
              <h2
                className="font-display text-xl sm:text-2xl text-[#0B2D58] font-medium leading-snug"
                style={displayFont}
              >
                6. Participación de terceros
              </h2>
              <p>
                La información, cotizaciones, propuestas o productos proporcionados por agentes de seguros autorizados o aseguradoras estarán sujetos a sus propios procesos, autorizaciones y condiciones.
              </p>
              <p>
                LEVANTIR no sustituye las obligaciones legales o contractuales que correspondan a dichos terceros.
              </p>
            </section>

            {/* Sección 7 */}
            <section className="space-y-3.5">
              <h2
                className="font-display text-xl sm:text-2xl text-[#0B2D58] font-medium leading-snug"
                style={displayFont}
              >
                7. Propiedad intelectual
              </h2>
              <p>
                Salvo indicación en contrario, los textos, elementos gráficos, identidad visual y demás contenidos originales del sitio pertenecen a sus respectivos titulares y se encuentran protegidos por las disposiciones aplicables en materia de propiedad intelectual.
              </p>
              <p>
                No se autoriza su reproducción, distribución o explotación comercial sin el permiso correspondiente, excepto en los casos permitidos por la ley.
              </p>
            </section>

            {/* Sección 8 */}
            <section className="space-y-3.5">
              <h2
                className="font-display text-xl sm:text-2xl text-[#0B2D58] font-medium leading-snug"
                style={displayFont}
              >
                8. Enlaces a sitios externos
              </h2>
              <p>
                El sitio puede contener enlaces a páginas de terceros.
              </p>
              <p>
                LEVANTIR no controla necesariamente sus contenidos, políticas de privacidad o condiciones de operación. Se recomienda revisar las disposiciones aplicables antes de proporcionar información personal o realizar cualquier contratación en esos sitios.
              </p>
            </section>

            {/* Sección 9 */}
            <section className="space-y-3.5">
              <h2
                className="font-display text-xl sm:text-2xl text-[#0B2D58] font-medium leading-snug"
                style={displayFont}
              >
                9. Disponibilidad e información del sitio
              </h2>
              <p>
                LEVANTIR procura mantener la información del sitio actualizada y sus servicios digitales disponibles.
              </p>
              <p>
                Sin embargo, pueden presentarse interrupciones técnicas, cambios en los contenidos o diferencias entre la información general publicada y las condiciones vigentes de productos ofrecidos por terceros.
              </p>
              <p>
                Nada de lo establecido en estos Términos excluye derechos irrenunciables de los usuarios ni responsabilidades que legalmente correspondan.
              </p>
            </section>

            {/* Sección 10 */}
            <section className="space-y-3.5">
              <h2
                className="font-display text-xl sm:text-2xl text-[#0B2D58] font-medium leading-snug"
                style={displayFont}
              >
                10. Protección de datos personales
              </h2>
              <p>
                El tratamiento de los datos personales proporcionados mediante el sitio se describe en el{" "}
                <strong className="text-[#0B2D58] font-semibold">Aviso de privacidad</strong>, disponible en:
              </p>
              <p>
                <Link
                  href="/aviso-de-privacidad"
                  className="text-[#0B2D58] font-semibold underline underline-offset-2 hover:text-[#D4A737] transition-colors"
                >
                  levantir.com/aviso-de-privacidad
                </Link>
              </p>
            </section>

            {/* Sección 11 */}
            <section className="space-y-3.5">
              <h2
                className="font-display text-xl sm:text-2xl text-[#0B2D58] font-medium leading-snug"
                style={displayFont}
              >
                11. Modificaciones
              </h2>
              <p>
                LEVANTIR podrá actualizar estos Términos y condiciones para reflejar cambios en el sitio, sus servicios o las disposiciones aplicables.
              </p>
              <p>
                La versión vigente estará disponible en{" "}
                <Link
                  href="/terminos-y-condiciones"
                  className="text-[#0B2D58] font-semibold underline underline-offset-2 hover:text-[#D4A737] transition-colors"
                >
                  levantir.com/terminos-y-condiciones
                </Link>, con su fecha de actualización.
              </p>
            </section>

            {/* Sección 12 */}
            <section className="space-y-3.5">
              <h2
                className="font-display text-xl sm:text-2xl text-[#0B2D58] font-medium leading-snug"
                style={displayFont}
              >
                12. Legislación aplicable
              </h2>
              <p>
                Estos Términos se interpretarán conforme a las leyes aplicables de los Estados Unidos Mexicanos, sin perjuicio de las disposiciones imperativas que protejan los derechos de los usuarios y consumidores.
              </p>
            </section>

            {/* Sección 13 */}
            <section className="space-y-3.5">
              <h2
                className="font-display text-xl sm:text-2xl text-[#0B2D58] font-medium leading-snug"
                style={displayFont}
              >
                13. Contacto
              </h2>
              <p>
                Para consultas relacionadas con el sitio y sus condiciones de uso:
              </p>
              <div className="bg-white/80 border border-[#E8E8E8] p-5 sm:p-6 rounded-[2px] space-y-1.5 text-sm sm:text-[0.95rem]">
                <p className="font-semibold text-[#0B2D58]">LEVANTIR</p>
                <p>
                  <span className="text-[#5C626B]">Responsable:</span> Jesús Omar Fernández González
                </p>
                <p>
                  <span className="text-[#5C626B]">Correo:</span>{" "}
                  <a
                    href="mailto:hola@levantir.com"
                    className="text-[#0B2D58] underline underline-offset-2 hover:text-[#D4A737] transition-colors"
                  >
                    hola@levantir.com
                  </a>
                </p>
                <p>
                  <span className="text-[#5C626B]">Domicilio:</span> Clzda nte 7358, Cd granja, Zapopan, Jalisco, 45010
                </p>
              </div>
            </section>
          </div>
        </article>
      </Container>
    </div>
  );
}
