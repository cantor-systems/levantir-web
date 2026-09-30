"use client";

import React, { useEffect, useRef, useState } from 'react';
import { 
  ArrowRight,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { PageHero } from '@/components/service/PageHero';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { siteConfig } from '@/config/site';
import { GENERAL_TOPICS, type GeneralTopicId } from '@/lib/leads/config';

const DEFAULT_TOPIC: GeneralTopicId = "asesoria-integral";

function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<GeneralTopicId>(DEFAULT_TOPIC);
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — must stay empty for humans
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent duplicate concurrent requests
    if (isSubmitting) return;

    setSubmitError(null);
    setIsSubmitting(true);

    const payload = {
      name:       name.trim(),
      email:      email.trim(),
      phone:      phone.trim(),
      message:    message.trim(),
      vertical:   "general" as const,
      products:   [] as const,
      topic,
      sourcePage: "/contacto",
      formId:     "contact-form" as const,
      website,    // honeypot — expected to be "" for real humans
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Success: show confirmation and reset form
        setIsSubmitted(true);
        setName("");
        setPhone("");
        setEmail("");
        setTopic(DEFAULT_TOPIC);
        setMessage("");
        setWebsite("");
      } else {
        // Server returned a non-2xx status: keep form intact, show generic error
        setSubmitError("No pudimos enviar tu solicitud. Inténtalo nuevamente.");
      }
    } catch {
      // Network failure or fetch error: keep form intact, show generic error
      setSubmitError("No pudimos enviar tu solicitud. Inténtalo nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="py-8 space-y-4 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white border border-[#E8E8E8] text-[#D4A737]">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-display text-2xl text-[#0B2D58]" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
          Solicitud recibida
        </h3>
        <p className="text-sm text-[#5C626B] max-w-sm mx-auto leading-relaxed">
          Hemos recibido tu mensaje. Un asesor de LEVANTIR dará seguimiento a tu solicitud.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="inline-flex items-center gap-2 border border-[#0B2D58] text-[#0B2D58] hover:bg-[#0B2D58] hover:text-white px-6 py-2.5 text-xs font-semibold tracking-[0.14em] uppercase rounded-[2px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2D58]"
          >
            Enviar otra solicitud
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot — visually offscreen, not interactable by humans */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="contact-website">Sitio Web</label>
        <input
          id="contact-website"
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">
          Nombre completo <span className="text-[#D4A737]">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej. Alejandro Valdés"
          className="w-full px-3.5 py-3 text-sm bg-white border border-[#E8E8E8] rounded-[2px] text-[#2E2E2E] focus:outline-none focus:border-[#0B2D58] focus:ring-1 focus:ring-[#0B2D58] transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-phone" className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">
            Teléfono / WhatsApp <span className="text-[#D4A737]">*</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+52 ..."
            className="w-full px-3.5 py-3 text-sm bg-white border border-[#E8E8E8] rounded-[2px] text-[#2E2E2E] focus:outline-none focus:border-[#0B2D58] focus:ring-1 focus:ring-[#0B2D58] transition-colors"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">
            Correo electrónico <span className="text-[#D4A737]">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nombre@empresa.com"
            className="w-full px-3.5 py-3 text-sm bg-white border border-[#E8E8E8] rounded-[2px] text-[#2E2E2E] focus:outline-none focus:border-[#0B2D58] focus:ring-1 focus:ring-[#0B2D58] transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-topic" className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">
          ¿Qué necesitas proteger? <span className="text-[#D4A737]">*</span>
        </label>
        <select
          id="contact-topic"
          required
          value={topic}
          onChange={(e) => setTopic(e.target.value as GeneralTopicId)}
          className="w-full px-3.5 py-3 text-sm bg-white border border-[#E8E8E8] rounded-[2px] text-[#2E2E2E] focus:outline-none focus:border-[#0B2D58] focus:ring-1 focus:ring-[#0B2D58] transition-colors"
        >
          {GENERAL_TOPICS.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">
          Mensaje o contexto (opcional)
        </label>
        <textarea
          id="contact-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe brevemente tu situación o requerimiento..."
          className="w-full px-3.5 py-3 text-sm bg-white border border-[#E8E8E8] rounded-[2px] text-[#2E2E2E] focus:outline-none focus:border-[#0B2D58] focus:ring-1 focus:ring-[#0B2D58] transition-colors resize-none"
        />
      </div>

      {/* Error message — only visible when submit fails */}
      {submitError && (
        <p role="alert" className="text-xs text-red-600">
          {submitError}
        </p>
      )}

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D4A737] hover:bg-[#C4962B] text-[#0B2D58] px-8 py-3.5 text-xs font-bold tracking-[0.14em] uppercase rounded-[2px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2D58] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span>{isSubmitting ? "Enviando..." : "Solicitar asesoría"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      
      <p className="text-[0.7rem] text-[#5C626B] mt-4">
        Consulta cómo tratamos tus datos en nuestro <a href="#aviso-de-privacidad" className="underline hover:text-[#0B2D58] transition-colors">Aviso de Privacidad</a>.
      </p>
    </form>
  );
}

export default function ContactoPage() {
  const formSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Contacto | Asesoría en Seguros y Gestión de Riesgos | LEVANTIR";
    
    // Update canonical tag
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = "https://levantir.com/contacto";
    
    return () => {
      document.title = "LEVANTIR | Seguros y Gestión de Riesgos";
    };
  }, []);

  const handleScrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Central contact configuration check
  const phone = siteConfig.contact?.phone?.trim() || "";
  const whatsapp = siteConfig.contact?.whatsapp?.trim() || "";
  const email = siteConfig.contact?.email?.trim() || "";

  const hasPhone = Boolean(phone);
  const hasWhatsapp = Boolean(whatsapp);
  const hasEmail = Boolean(email);
  const hasAnyConfiguredChannel = hasPhone || hasWhatsapp || hasEmail;

  return (
    <div className="bg-white">
      {/* 1. Hero Section - Editorial scene communicating calm, conversation & criteria */}
      <PageHero
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Contacto", href: "/contacto", isCurrent: true }
        ]}
        eyebrow="HABLEMOS"
        title="Hablemos de lo que necesitas proteger."
        supportingCopy="No necesitas saber exactamente qué póliza buscas. Cuéntanos tu situación y podemos empezar desde ahí."
        primaryCtaText="SOLICITAR ASESORÍA"
        primaryCtaHref="#formulario"
        secondaryCtaText={hasWhatsapp ? "HABLAR POR WHATSAPP" : undefined}
        secondaryCtaHref={hasWhatsapp ? `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}` : undefined}
        imageUrl="/images/contacto/hero-contacto.webp"
        imageAlt="Mesa de trabajo luminosa con libreta abierta, pluma y taza de café en ambiente sereno para una conversación con calma"
        imagePositionClass="object-center"
        cornerDescriptorCategory="LEVANTIR"
        cornerDescriptorText="Tu tranquilidad empieza con una conversación."
        ariaLabel="Hero de Contacto"
      />

      {/* 2. Main Contact Section: Context + Form */}
      <div id="formulario" ref={formSectionRef} className="scroll-mt-24">
        <Section className="py-20 sm:py-24 lg:py-32 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20">
              {/* Left Column: Context & Value Prop */}
              <div className="lg:col-span-5 space-y-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-[1.5px] bg-[#D4A737]" aria-hidden="true" />
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
                      CONTÁCTANOS
                    </p>
                  </div>
                  <h2 
                    className="font-display text-3xl sm:text-4xl md:text-[2.5rem] text-[#0B2D58] leading-[1.12] font-medium"
                    style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
                  >
                    Cuéntanos tu situación
                  </h2>
                  <p className="text-base sm:text-[1.05rem] text-[#2E2E2E]/80 leading-relaxed pt-2">
                    Completa el formulario y podremos conocer mejor lo que necesitas. La información que compartas será utilizada únicamente para atender tu solicitud.
                  </p>
                </div>

                <div className="space-y-6 pt-4 border-t border-[#E8E8E8]">
                  <div className="flex gap-4">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-[#F8F5EF] border border-[#E8E8E8] flex items-center justify-center text-[#D4A737]">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[0.95rem] font-bold text-[#0B2D58] mb-1">Conversación sin compromiso</h3>
                      <p className="text-sm text-[#2E2E2E]/70 leading-relaxed">Hablemos sobre tus necesidades y aclaremos tus primeras dudas.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-[#F8F5EF] border border-[#E8E8E8] flex items-center justify-center text-[#D4A737]">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[0.95rem] font-bold text-[#0B2D58] mb-1">Asesoría con criterio</h3>
                      <p className="text-sm text-[#2E2E2E]/70 leading-relaxed">Te ayudamos a entender tus riesgos y evaluar alternativas de protección.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-[#F8F5EF] border border-[#E8E8E8] flex items-center justify-center text-[#D4A737]">
                        <Clock className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[0.95rem] font-bold text-[#0B2D58] mb-1">Acompañamiento continuo</h3>
                      <p className="text-sm text-[#2E2E2E]/70 leading-relaxed">Nuestro trabajo no termina necesariamente en la contratación; buscamos dar seguimiento conforme evoluciona tu situación.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7">
                <div className="bg-[#F8F5EF] p-6 sm:p-8 md:p-10 border border-[#E8E8E8] rounded-[2px] shadow-sm">
                  <ContactForm />
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </div>

      {/* 3. Other Contact Methods - Strictly rendered ONLY if channels are actually configured */}
      {hasAnyConfiguredChannel && (
        <Section className="py-20 sm:py-24 bg-[#0B2D58] text-white">
          <Container>
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
              <div className="flex items-center justify-center gap-2.5">
                <span className="w-6 h-[1.5px] bg-[#D4A737]" aria-hidden="true" />
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
                  OTRAS FORMAS DE CONTACTO
                </p>
                <span className="w-6 h-[1.5px] bg-[#D4A737]" aria-hidden="true" />
              </div>
              <h2 
                className="font-display text-3xl sm:text-4xl text-white leading-[1.12] font-medium"
                style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
              >
                También puedes contactarnos por:
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {/* Phone (Only if configured) */}
              {hasPhone && (
                <a 
                  href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                  className="bg-white/5 border border-white/10 p-8 rounded-[2px] text-center hover:bg-white/10 transition-colors block group"
                >
                  <div className="w-12 h-12 mx-auto bg-white/10 rounded-full flex items-center justify-center text-[#D4A737] mb-5 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold tracking-[0.1em] uppercase text-white mb-2">Teléfono</h3>
                  <p className="text-sm text-white/90 font-medium">{phone}</p>
                </a>
              )}

              {/* WhatsApp (Only if configured) */}
              {hasWhatsapp && (
                <a 
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 border border-white/10 p-8 rounded-[2px] text-center hover:bg-white/10 transition-colors block group"
                >
                  <div className="w-12 h-12 mx-auto bg-white/10 rounded-full flex items-center justify-center text-[#D4A737] mb-5 group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold tracking-[0.1em] uppercase text-white mb-2">WhatsApp</h3>
                  <p className="text-sm text-white/90 font-medium">{whatsapp}</p>
                </a>
              )}

              {/* Email (Only if configured) */}
              {hasEmail && (
                <a 
                  href={`mailto:${email}`}
                  className="bg-white/5 border border-white/10 p-8 rounded-[2px] text-center hover:bg-white/10 transition-colors block group"
                >
                  <div className="w-12 h-12 mx-auto bg-white/10 rounded-full flex items-center justify-center text-[#D4A737] mb-5 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold tracking-[0.1em] uppercase text-white mb-2">Correo electrónico</h3>
                  <p className="text-sm text-white/90 font-medium break-all">{email}</p>
                </a>
              )}
            </div>
          </Container>
        </Section>
      )}

      {/* 4. Neutral Location Section */}
      <Section className="py-20 sm:py-24 bg-[#F8F5EF] border-t border-b border-[#E8E8E8]">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center gap-2.5">
              <span className="w-6 h-[1.5px] bg-[#D4A737]" aria-hidden="true" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
                ATENCIÓN PERSONALIZADA
              </p>
              <span className="w-6 h-[1.5px] bg-[#D4A737]" aria-hidden="true" />
            </div>
            <h2 
              className="font-display text-3xl sm:text-4xl text-[#0B2D58] leading-[1.12] font-medium"
              style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
            >
              Podemos conversar donde estés.
            </h2>
            <p className="text-base sm:text-lg text-[#2E2E2E]/80 leading-relaxed max-w-2xl mx-auto">
              Podemos coordinar una conversación por los canales disponibles y conocer mejor tu situación antes de definir el siguiente paso.
            </p>
          </div>
        </Container>
      </Section>

      {/* 5. Final CTA */}
      <section className="bg-[#0B2D58] text-white py-24 sm:py-28 lg:py-32 xl:py-36 relative overflow-hidden border-t border-[#071E3B] flex items-center">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
            {/* Left Column: Eyebrow + H2 */}
            <div className="lg:col-span-7 space-y-4 min-w-0">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-[1.5px] bg-[#D4A737]" aria-hidden="true" />
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">
                  TU PATRIMONIO MERECE
                </p>
              </div>
              <h2
                className="font-display text-3xl sm:text-4xl md:text-[2.95rem] lg:text-[3.35rem] text-white leading-[1.12] font-medium"
                style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
              >
                Una conversación con criterio.
              </h2>
            </div>
            {/* Right Column: Supporting copy + CTAs */}
            <div className="lg:col-span-5 lg:border-l lg:border-white/15 lg:pl-8 xl:pl-12 flex flex-col justify-center space-y-6 sm:space-y-7 min-w-0">
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                Analicemos juntos cómo proteger lo que has construido y lo que está por venir.
              </p>
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center lg:items-stretch xl:items-center gap-3.5 sm:gap-4 pt-1">
                <button
                  type="button"
                  onClick={handleScrollToForm}
                  className="inline-flex items-center justify-center gap-2.5 bg-[#D4A737] hover:bg-[#C4962B] text-[#0B2D58] px-7 py-4 text-xs sm:text-[0.82rem] font-bold tracking-[0.14em] uppercase rounded-[2px] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap"
                >
                  <span>SOLICITAR ASESORÍA</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                {hasWhatsapp && (
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white text-white px-6 py-4 text-xs sm:text-[0.82rem] font-semibold tracking-[0.12em] uppercase rounded-[2px] transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 text-[#D4A737]" />
                    <span>HABLAR POR WHATSAPP</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
