import React from "react";
import { Search, SlidersHorizontal, Handshake } from "lucide-react";
import { Container } from "../layout/Container";
import { Section } from "../layout/Section";

export interface ApproachPillar {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface ApproachSectionProps {
  eyebrow?: string;
  title?: string;
  subheadline?: string;
  pillars?: ApproachPillar[];
}

const defaultPillars: ApproachPillar[] = [
  { icon: Search, title: "Análisis personalizado", description: "Revisamos prioridades, requerimientos familiares y entorno particular antes de proponer una configuración." },
  { icon: SlidersHorizontal, title: "Evaluación de alternativas", description: "Comparamos deducibles, coaseguros y niveles hospitalarios para definir una estructura adecuada a tu patrimonio." },
  { icon: Handshake, title: "Acompañamiento continuo", description: "Respaldamos la toma de decisión, la resolución de dudas operativas y la revisión en cada renovación de póliza." },
];

export function ApproachSection({
  eyebrow = "NUESTRO ENFOQUE",
  title = "Más que un seguro, una estrategia de protección.",
  subheadline = "Analizamos alternativas disponibles para estructurar una protección adecuada a tu situación.",
  pillars = defaultPillars,
}: ApproachSectionProps = {}) {
  return (
    <Section className="bg-[#F8F5EF] border-b border-[#E8E8E8] py-24 sm:py-28 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start mb-16 sm:mb-20">
          <div className="lg:col-span-7 space-y-3.5">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A737]">{eyebrow}</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.85rem] text-[#0B2D58] leading-[1.14] font-medium" style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}>
              {title}
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="text-base sm:text-lg text-[#2E2E2E]/90 leading-relaxed font-medium">{subheadline}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {pillars.map((pillar, index) => {
            const IconComp = pillar.icon || Search;
            return (
              <div key={pillar.title} className="bg-white p-8 sm:p-9 lg:p-10 min-h-[260px] sm:min-h-[280px] rounded-[2px] border border-[#E8E8E8] hover:border-[#D4A737]/60 transition-all flex flex-col justify-between group shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-7">
                    <div className="w-12 h-12 rounded-full bg-[#F8F5EF] border border-[#E8E8E8] flex items-center justify-center text-[#0B2D58] group-hover:border-[#D4A737] transition-colors">
                      <IconComp className="w-5 h-5 text-[#0B2D58]" />
                    </div>
                    <span className="text-xs font-mono font-bold tracking-widest text-[#D4A737]">0{index + 1}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0B2D58] mb-3.5 tracking-tight">{pillar.title}</h3>
                  <p className="text-[0.93rem] text-[#2E2E2E]/85 leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
