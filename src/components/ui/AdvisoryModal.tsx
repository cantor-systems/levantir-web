"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { X, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';

export function AdvisoryModal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const isOpen = searchParams?.get('advisory') === 'true';
  const defaultTopic = searchParams?.get('topic') || "No estoy seguro / Asesoría integral";

  const onClose = useCallback(() => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.delete('advisory');
    params.delete('topic');
    const newQuery = params.toString();
    const href = `${pathname || '/'}${newQuery ? `?${newQuery}` : ''}`;
    router.push(href, { scroll: false });
  }, [router, pathname, searchParams]);

  const [topic, setTopic] = useState(defaultTopic);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (defaultTopic) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTopic(defaultTopic);
    }
  }, [defaultTopic]);

  useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSubmitted(false);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate pristine submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const protectionOptions = [
    "Auto o movilidad",
    "Salud o familia (Gastos Médicos)",
    "Vida / protección patrimonial",
    "Planes de retiro",
    "Empresa y continuidad (PYMES)",
    "Mercancías y logística",
    "Aeronaves y aviación",
    "Riesgo especializado",
    "No estoy seguro / Asesoría integral",
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="advisory-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#071E3B]/80 backdrop-blur-xs transition-all duration-200"
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-[2px] shadow-2xl border border-[#E8E8E8] overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#0B2D58] px-6 py-4 flex items-center justify-between border-b border-[#071E3B]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-[0.16em] uppercase text-[#D4A737]">
              LEVANTIR ASESORÍA
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-1.5 text-white/70 hover:text-white rounded-[2px] hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A737]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#F8F5EF] text-[#D4A737] mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl text-[#0B2D58]">
                Solicitud recibida
              </h3>
              <p className="text-sm text-[#5C626B] max-w-md mx-auto leading-relaxed">
                Gracias por ponerte en contacto. Un asesor de LEVANTIR analizará tu requerimiento y te contactará a la brevedad para estructurar la conversación inicial.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-[#0B2D58] hover:bg-[#071E3B] text-white px-6 py-2.5 text-xs font-semibold tracking-[0.14em] uppercase rounded-[2px] transition-colors"
                >
                  Entendido
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h2 id="advisory-modal-title" className="font-display text-2xl sm:text-3xl text-[#0B2D58] leading-tight">
                  Hablemos de lo que necesitas proteger.
                </h2>
                <p className="text-xs sm:text-sm text-[#5C626B] mt-2 leading-relaxed">
                  No necesitas saber exactamente qué póliza buscas. Cuéntanos tu situación y podemos comenzar desde ahí.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="modal-name" className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">
                    Nombre completo <span className="text-[#D4A737]">*</span>
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Alejandro Valdés"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F8F5EF] border border-[#E8E8E8] rounded-[2px] text-[#2E2E2E] focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="modal-phone" className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">
                      Teléfono / WhatsApp <span className="text-[#D4A737]">*</span>
                    </label>
                    <input
                      id="modal-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+52 55 ..."
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F8F5EF] border border-[#E8E8E8] rounded-[2px] text-[#2E2E2E] focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-email" className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">
                      Correo electrónico <span className="text-[#D4A737]">*</span>
                    </label>
                    <input
                      id="modal-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nombre@empresa.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F8F5EF] border border-[#E8E8E8] rounded-[2px] text-[#2E2E2E] focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="modal-topic" className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">
                    ¿Qué necesitas proteger?
                  </label>
                  <select
                    id="modal-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F8F5EF] border border-[#E8E8E8] rounded-[2px] text-[#2E2E2E] focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors"
                  >
                    {protectionOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="modal-message" className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">
                    Mensaje o contexto (opcional)
                  </label>
                  <textarea
                    id="modal-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe brevemente los activos, colaboradores o patrimonio que buscas proteger..."
                    className="w-full px-3.5 py-2 text-sm bg-[#F8F5EF] border border-[#E8E8E8] rounded-[2px] text-[#2E2E2E] focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors resize-none"
                  />
                </div>

                <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-[#D4A737] hover:bg-[#C4962B] text-[#0B2D58] px-6 py-3 text-xs font-bold tracking-[0.14em] uppercase rounded-[2px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2D58]"
                  >
                    <span>{isSubmitting ? "Enviando..." : "Solicitar asesoría"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="https://wa.me/5215500000000?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20asesor%C3%ADa%20en%20LEVANTIR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#E8E8E8] hover:bg-[#F8F5EF] text-[#0B2D58] px-4 py-3 text-xs font-semibold tracking-wider uppercase rounded-[2px] transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 text-[#D4A737]" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <p className="text-[0.68rem] text-[#5C626B] text-center pt-2">
                  Tus datos se tratan bajo estricta confidencialidad según nuestro Aviso de Privacidad.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

