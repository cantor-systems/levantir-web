import React from "react";
import { Container } from "../layout/Container";
import { Section } from "../layout/Section";

export interface ServiceMethodologyStep {
  number: string;
  title: string;
  description: string;
}

interface ServiceMethodologySectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  steps?: ServiceMethodologyStep[];
}

const defaultSteps: ServiceMethodologyStep[] = [
  { number: "01", title: "Comprender", description: "Analizamos tu contexto familiar, prioridades y objetivos de protección." },
  { number: "02", title: "Identificar", description: "Detectamos variables críticas, coberturas requeridas y riesgos a mitigar." },
  { number: "03", title: "Estructurar", description: "Diseñamos la combinación idónea de deducibles, coaseguro y red hospitalaria." },
  { number: "04", title: "Implementar", description: "Acompañamos la selección formal y aclaramos cada aspecto de la póliza." },
  { number: "05", title: "Revisar", description: "Evaluamos periódicamente tu cobertura ante los cambios en tus etapas de vida." },
];

export function ServiceMethodologySection({
  eyebrow = "¿CÓMO TE APOYAMOS?",
  title = "Un proceso claro y sin complicaciones.",
  subtitle = "Metodología institucional estructurada con rigor técnico y total transparencia.",
  steps = defaultSteps,
}: ServiceMethodologySectionProps = {}) {
  return (
    <Section className="bg-[#FFFFFF] border-b border-[#E8E8E8] py-28 sm:py-32 lg:py-36">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start mb-16 sm:mb-20">
          <div className="lg:col-span-7 space-y-3.5">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">{eyebrow}</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.14] font-medium" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
              {title}
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="text-base sm:text-lg text-[#2E2E2E]/85 leading-relaxed">{subtitle}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12 lg:gap-12 xl:gap-14 relative">
          {steps.map((step, index) => (
            <div key={step.number} className={`relative flex flex-col group min-w-0 pt-9 sm:pt-10 lg:pt-12 border-t-2 border-[#D4A737]/50 group-hover:border-[#D4A737] transition-all duration-300 pr-1 lg:pr-2 ${index === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
              <span className="font-display text-[2.85rem] sm:text-[3.3rem] xl:text-[3.6rem] text-[#D4A737] font-normal tracking-tight block mb-3 sm:mb-4 leading-none" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
                {step.number}
              </span>
              <h3 className="text-xl sm:text-[1.28rem] font-bold text-[#0B2D58] tracking-tight mb-2.5">{step.title}</h3>
              <p className="text-[0.94rem] sm:text-[0.98rem] text-[#2E2E2E]/90 leading-[1.62]">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
