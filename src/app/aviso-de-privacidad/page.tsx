import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description:
    "Consulta el Aviso de privacidad de LEVANTIR y conoce cómo tratamos y protegemos los datos personales.",
  alternates: {
    canonical: "https://levantir.com/aviso-de-privacidad",
  },
  openGraph: {
    title: "Aviso de privacidad | LEVANTIR",
    description:
      "Consulta el Aviso de privacidad de LEVANTIR y conoce cómo tratamos y protegemos los datos personales.",
    url: "https://levantir.com/aviso-de-privacidad",
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

const displayFont = {
  fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif',
} as const;

export default function AvisoDePrivacidadPage() {
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
              Aviso de privacidad
            </h1>
            <p className="text-xs sm:text-sm text-[#5C626B]">
              Última actualización: 10 de octubre de 2026
            </p>
          </header>

          {/* Cuerpo del Aviso */}
          <div className="space-y-10 sm:space-y-12 leading-relaxed text-[0.95rem] sm:text-base text-[#2E2E2E]/90">
            {/* Sección 1 */}
            <section className="space-y-3.5">
              <h2
                className="font-display text-xl sm:text-2xl text-[#0B2D58] font-medium leading-snug"
                style={displayFont}
              >
                1. Identidad y domicilio del responsable
              </h2>
              <p>
                Jesús Omar Fernández González, persona física que opera bajo el nombre comercial{" "}
                <strong className="text-[#0B2D58] font-semibold">LEVANTIR</strong>, con domicilio en Clzda nte 7358, Cd granja, Zapopan, Jalisco, 45010, es responsable del tratamiento de los datos personales que se recaben a través del sitio web{" "}
                <strong className="text-[#0B2D58] font-semibold">levantir.com</strong> y de los canales de contacto asociados a sus servicios.
              </p>
              <p>
                Para cualquier asunto relacionado con la protección de datos personales, puede escribir a{" "}
                <a
                  href="mailto:hola@levantir.com"
                  className="text-[#0B2D58] underline underline-offset-2 hover:text-[#D4A737] transition-colors"
                >
                  hola@levantir.com
                </a>.
              </p>
            </section>

            {/* Sección 2 */}
            <section className="space-y-3.5">
              <h2
                className="font-display text-xl sm:text-2xl text-[#0B2D58] font-medium leading-snug"
                style={displayFont}
              >
                2. Datos personales que recopilamos
              </h2>
              <p>
                LEVANTIR podrá recopilar los datos personales que el titular proporcione voluntariamente mediante formularios de contacto, correo electrónico u otros canales de comunicación habilitados, incluyendo, según corresponda:
              </p>
              <ul className="space-y-2 pl-5 list-disc marker:text-[#D4A737]">
                <li>Nombre.</li>
                <li>Correo electrónico.</li>
                <li>Número telefónico.</li>
                <li>Empresa u organización a la que pertenece.</li>
                <li>Tipo de orientación o información solicitada.</li>
                <li>Información que el titular incluya voluntariamente en su mensaje.</li>
              </ul>
              <p>
                LEVANTIR no solicita ni almacena actualmente información médica o de salud mediante sus procesos de captación de prospectos.
              </p>
              <p>
                Se recomienda no incluir datos personales sensibles en los campos de mensaje o en las comunicaciones iniciales.
              </p>
            </section>

            {/* Sección 3 */}
            <section className="space-y-3.5">
              <h2
                className="font-display text-xl sm:text-2xl text-[#0B2D58] font-medium leading-snug"
                style={displayFont}
              >
                3. Finalidades del tratamiento
              </h2>
              <p>
                Los datos personales se utilizan para las siguientes finalidades relacionadas con la solicitud del titular:
              </p>
              <ul className="space-y-2 pl-5 list-disc marker:text-[#D4A737]">
                <li>Recibir, identificar y atender solicitudes de información u orientación.</li>
                <li>Establecer contacto con el prospecto.</li>
                <li>Dar seguimiento a las conversaciones y solicitudes recibidas.</li>
                <li>Registrar y administrar la información en el sistema interno de gestión de prospectos y clientes.</li>
                <li>Facilitar, cuando resulte necesario, el contacto con agentes de seguros autorizados para atender la solicitud.</li>
                <li>Mantener registros de atención y cumplir las obligaciones legales aplicables.</li>
              </ul>
              <p>
                Cualquier finalidad adicional, como el envío de comunicaciones promocionales no relacionadas con una solicitud, deberá informarse de manera específica y contar con el mecanismo de consentimiento u oposición que corresponda.
              </p>
            </section>

            {/* Sección 4 */}
            <section className="space-y-3.5">
              <h2
                className="font-display text-xl sm:text-2xl text-[#0B2D58] font-medium leading-snug"
                style={displayFont}
              >
                4. Tratamiento de datos y proveedores tecnológicos
              </h2>
              <p>
                La información recibida a través de los formularios y canales de contacto del sitio web se transmite de forma segura para la recepción, canalización y seguimiento de las solicitudes de orientación y servicios.
              </p>
              <p>
                Para la operación continua del sitio, la transmisión de mensajes y el envío de notificaciones y confirmaciones por correo electrónico, LEVANTIR utiliza servicios de infraestructura tecnológica y plataformas de comunicación electrónica que operan bajo estándares de confidencialidad y medidas de seguridad adecuadas.
              </p>
              <p>
                Los proveedores tecnológicos que intervengan en el tratamiento de datos personales estarán sujetos a las condiciones de privacidad, confidencialidad y protección de datos que correspondan, conforme a los servicios prestados y a la legislación aplicable.
              </p>
            </section>

            {/* Sección 5 */}
            <section className="space-y-3.5">
              <h2
                className="font-display text-xl sm:text-2xl text-[#0B2D58] font-medium leading-snug"
                style={displayFont}
              >
                5. Transferencias de datos personales
              </h2>
              <p>
                Para atender determinadas solicitudes, LEVANTIR podrá compartir los datos personales estrictamente necesarios con agentes de seguros autorizados, con la finalidad de facilitar el contacto, la evaluación de alternativas y la atención del requerimiento formulado por el titular.
              </p>
              <p>
                Cuando la transferencia requiera consentimiento conforme a la legislación aplicable, LEVANTIR deberá obtenerlo mediante un mecanismo adecuado antes de realizarla.
              </p>
              <p>
                Los agentes que reciban información y determinen sus propias finalidades o medios de tratamiento serán responsables de cumplir las obligaciones de protección de datos que les correspondan.
              </p>
            </section>

            {/* Sección 6 */}
            <section className="space-y-3.5">
              <h2
                className="font-display text-xl sm:text-2xl text-[#0B2D58] font-medium leading-snug"
                style={displayFont}
              >
                6. Derechos ARCO
              </h2>
              <p>
                El titular podrá solicitar el{" "}
                <strong className="text-[#0B2D58] font-semibold">
                  acceso, rectificación, cancelación u oposición
                </strong>{" "}
                respecto del tratamiento de sus datos personales, conforme a la legislación mexicana aplicable.
              </p>
              <p>
                Para presentar una solicitud, deberá comunicarse a{" "}
                <a
                  href="mailto:hola@levantir.com"
                  className="text-[#0B2D58] underline underline-offset-2 hover:text-[#D4A737] transition-colors"
                >
                  hola@levantir.com
                </a>{" "}
                e incluir información suficiente para identificar al titular, el derecho que desea ejercer y los datos relacionados con su solicitud.
              </p>
              <p>
                LEVANTIR atenderá las solicitudes conforme a los requisitos, procedimientos y plazos legales aplicables.
              </p>
            </section>

            {/* Sección 7 */}
            <section className="space-y-3.5">
              <h2
                className="font-display text-xl sm:text-2xl text-[#0B2D58] font-medium leading-snug"
                style={displayFont}
              >
                7. Revocación del consentimiento y limitación del uso
              </h2>
              <p>
                Cuando legalmente proceda, el titular podrá solicitar la revocación de su consentimiento o la limitación del uso o divulgación de sus datos personales a través de{" "}
                <a
                  href="mailto:hola@levantir.com"
                  className="text-[#0B2D58] underline underline-offset-2 hover:text-[#D4A737] transition-colors"
                >
                  hola@levantir.com
                </a>.
              </p>
              <p>
                La revocación no tendrá efectos retroactivos y estará sujeta a las obligaciones legales que correspondan.
              </p>
            </section>

            {/* Sección 8 */}
            <section className="space-y-3.5">
              <h2
                className="font-display text-xl sm:text-2xl text-[#0B2D58] font-medium leading-snug"
                style={displayFont}
              >
                8. Conservación y seguridad de los datos
              </h2>
              <p>
                LEVANTIR conservará los datos personales únicamente durante el tiempo necesario para cumplir las finalidades informadas y las obligaciones legales aplicables.
              </p>
              <p>
                Se implementarán medidas administrativas, técnicas y físicas apropiadas para proteger la información contra acceso, uso, pérdida, alteración o divulgación no autorizados.
              </p>
              <p>
                Los periodos específicos de conservación y las medidas efectivamente implementadas deberán documentarse conforme a la operación real.
              </p>
            </section>

            {/* Sección 9 */}
            <section className="space-y-3.5">
              <h2
                className="font-display text-xl sm:text-2xl text-[#0B2D58] font-medium leading-snug"
                style={displayFont}
              >
                9. Cookies y tecnologías de medición
              </h2>
              <p>
                Este sitio web utiliza cookies y tecnologías de medición para garantizar su correcto funcionamiento, comprender la navegación de los visitantes y optimizar la comunicación de sus servicios. Estas tecnologías se dividen en las siguientes categorías:
              </p>
              <ul className="space-y-2 pl-5 list-disc marker:text-[#D4A737]">
                <li>
                  <strong className="text-[#0B2D58] font-semibold">Técnicas o necesarias:</strong> indispensables para permitir la navegación básica, la seguridad del sitio y recordar las preferencias de privacidad del usuario. No requieren consentimiento y no pueden desactivarse.
                </li>
                <li>
                  <strong className="text-[#0B2D58] font-semibold">Analítica y rendimiento:</strong> permiten conocer de forma agregada cómo interactúan los usuarios con el sitio, qué secciones resultan de mayor interés y detectar posibles mejoras en la experiencia de navegación.
                </li>
                <li>
                  <strong className="text-[#0B2D58] font-semibold">Marketing y publicidad:</strong> permiten evaluar la efectividad de campañas informativas y comerciales, facilitando que los mensajes relevantes se dirijan a personas con interés en los servicios ofrecidos.
                </li>
              </ul>
              <p>
                Las herramientas en las categorías de analítica y marketing son enteramente opcionales y solo se activan cuando el usuario otorga su consentimiento previo e informado a través del panel de configuración.
              </p>
              <p>
                Los usuarios pueden consultar, ajustar o revocar su consentimiento en cualquier momento mediante la opción{" "}
                <strong className="text-[#0B2D58] font-semibold">«Preferencias de privacidad»</strong>{" "}
                ubicada en el pie de página de este sitio web.
              </p>
            </section>

            {/* Sección 10 */}
            <section className="space-y-3.5">
              <h2
                className="font-display text-xl sm:text-2xl text-[#0B2D58] font-medium leading-snug"
                style={displayFont}
              >
                10. Cambios al Aviso de privacidad
              </h2>
              <p>
                LEVANTIR podrá actualizar este Aviso de privacidad cuando existan modificaciones en sus procesos, proveedores, finalidades de tratamiento o condiciones legales.
              </p>
              <p>
                Las versiones actualizadas estarán disponibles en{" "}
                <Link
                  href="/aviso-de-privacidad"
                  className="text-[#0B2D58] font-semibold underline underline-offset-2 hover:text-[#D4A737] transition-colors"
                >
                  levantir.com/aviso-de-privacidad
                </Link>, indicando la fecha de su última actualización.
              </p>
            </section>

            {/* Sección 11 */}
            <section className="space-y-3.5">
              <h2
                className="font-display text-xl sm:text-2xl text-[#0B2D58] font-medium leading-snug"
                style={displayFont}
              >
                11. Contacto
              </h2>
              <p>
                Para consultas relacionadas con este Aviso de privacidad:
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
