"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AdvisoryFormSection, AdvisoryFormConfig, AdvisoryFormSubmitData, AdvisoryFormAnalyticsConfig } from "./AdvisoryFormSection";

const PERSONAL_ANALYTICS: AdvisoryFormAnalyticsConfig = {
  vertical: "personas",
  formId: "personal-advisory",
};

const PERSONAL_PRODUCTS = [
  { id: "life", label: "Vida" },
  { id: "major_medical", label: "Gastos médicos mayores" },
  { id: "personal_accidents", label: "Accidentes personales" },
  { id: "home", label: "Hogar" },
  { id: "retirement_savings", label: "Retiro / ahorro" },
  { id: "family_protection", label: "Protección familiar" },
  { id: "other", label: "Otro producto" },
];
const MAIN_INTERESTS = ["Protección personal", "Protección familiar", "Salud", "Patrimonio", "Retiro / futuro", "Otro"];
const LIFE_STAGES = ["Individual", "Pareja", "Familia", "Empresario / socio", "Otro"];

const CONFIG: AdvisoryFormConfig = {
  sectionId: "solicitar-asesoria-personas",
  productsBlockId: "seccion-productos-interes-personas",
  checkboxGroupName: "personal_product",
  idPrefix: "personas",
  heading: (<>Cuéntanos qué quieres<br className="hidden sm:inline" /> proteger.</>),
  subheading: "Cada etapa personal y familiar presenta necesidades distintas. Comparte lo esencial y podremos orientarte sobre alternativas de protección.",
  benefits: [
    { title: "Análisis con criterio técnico", description: "Evaluamos tus prioridades patrimoniales con rigor e independencia." },
    { title: "Atención personalizada", description: "Te orientamos considerando la etapa y necesidades de tu núcleo familiar." },
    { title: "Acompañamiento durante el proceso", description: "Desde la evaluación inicial hasta la implementación de la solución." },
  ],
  products: PERSONAL_PRODUCTS,
  otherProductPlaceholder: "Ej. Plan educativo o protección internacional",
  confirmationHeading: "Gracias por compartir tus prioridades de protección.",
  confirmationBody: "Un asesor de LEVANTIR revisará los aspectos clave compartidos para coordinar una conversación consultiva y orientarte sobre los esquemas de protección más adecuados.",
  messagePlaceholder: "Cuéntanos brevemente sobre tus metas de protección, dependientes económicos u otros aspectos a considerar.",
};

export function PersonalAdvisoryFormSection() {
  const pathname = usePathname();

  const handleSubmitAsync = async (data: AdvisoryFormSubmitData): Promise<string[]> => {
    // Map visual product IDs to controlled backend IDs
    const PRODUCT_MAP: Record<string, string> = {
      life: "vida",
      major_medical: "gastos-medicos-mayores",
      personal_accidents: "accidentes-personales",
      home: "hogar",
      retirement_savings: "retiro-ahorro",
      family_protection: "proteccion-familiar",
      other: "otro-producto",
    };

    const mappedProducts = data.selectedProducts.map((id) => PRODUCT_MAP[id] || id);
    const otherProductSelected = mappedProducts.includes("otro-producto");

    const payload: Record<string, unknown> = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      vertical: "personas",
      products: mappedProducts,
      sourcePage: pathname || "/personas",
      formId: "personal-advisory",
      website: data.website,
    };

    // Only send the free-text detail when the backend ID is present and the
    // field was provided (already trimmed and guarded upstream in AdvisoryFormSection)
    if (otherProductSelected && data.otherProduct && data.otherProduct.trim().length > 0) {
      payload.otherProduct = data.otherProduct.trim();
    }

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("HTTP error from endpoint");
    }

    const result = await response.json();
    if (result.ok !== true) {
      throw new Error("Endpoint logic error");
    }

    // Controlled backend ProductIds, used by the shared form for analytics only.
    return mappedProducts;
  };

  return (
    <AdvisoryFormSection
      config={CONFIG}
      contextFields={(idPrefix, onRegisterReset) => (
        <PersonalContextFields idPrefix={idPrefix} onRegisterReset={onRegisterReset} />
      )}
      onSubmitAsync={handleSubmitAsync}
      analytics={PERSONAL_ANALYTICS}
    />
  );
}

interface PersonalContextFieldsProps { idPrefix: string; onRegisterReset: (fn: () => void) => void; }

function PersonalContextFields({ idPrefix, onRegisterReset }: PersonalContextFieldsProps) {
  const [mainInterest, setMainInterest] = useState("");
  const [lifeStage, setLifeStage] = useState("");
  useEffect(() => {
    onRegisterReset(() => { setMainInterest(""); setLifeStage(""); });
  }, [onRegisterReset]);
  return (
    <div className="space-y-5 pt-2">
      <div className="border-b border-[#E8E8E8] pb-2.5">
        <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-[#0B2D58]">INFORMACIÓN DE CONTEXTO</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor={`${idPrefix}-interes-principal`} className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">INTERÉS PRINCIPAL <span className="text-[#D4A737] font-bold">*</span></label>
          <select id={`${idPrefix}-interes-principal`} required value={mainInterest} onChange={(e) => setMainInterest(e.target.value)} className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors cursor-pointer">
            <option value="">Selecciona tu interés principal</option>
            {MAIN_INTERESTS.map((interest) => <option key={interest} value={interest}>{interest}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={`${idPrefix}-etapa-contexto`} className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">ETAPA O CONTEXTO <span className="text-[#5C626B] text-[0.7rem] font-normal lowercase">(opcional)</span></label>
          <select id={`${idPrefix}-etapa-contexto`} value={lifeStage} onChange={(e) => setLifeStage(e.target.value)} className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors cursor-pointer">
            <option value="">Selecciona tu etapa o contexto</option>
            {LIFE_STAGES.map((stage) => <option key={stage} value={stage}>{stage}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
