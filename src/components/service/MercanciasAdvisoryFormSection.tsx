"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AdvisoryFormSection, AdvisoryFormConfig, AdvisoryFormSubmitData, AdvisoryFormAnalyticsConfig } from "./AdvisoryFormSection";

const MERCANCIAS_ANALYTICS: AdvisoryFormAnalyticsConfig = {
  vertical: "mercancias",
  formId: "mercancias-advisory",
};

const MERCANCIAS_PRODUCTS = [
  { id: "land_transport", label: "Transporte terrestre" },
  { id: "maritime_transport", label: "Transporte marítimo" },
  { id: "air_transport", label: "Transporte aéreo" },
  { id: "cargo_theft", label: "Robo de mercancía" },
  { id: "cargo_damage", label: "Daños a mercancía" },
  { id: "transport_liability", label: "Responsabilidad asociada al transporte" },
  { id: "other", label: "Otro producto" },
];
const TRANSPORT_MODALITIES = ["Terrestre", "Marítimo", "Aéreo", "Multimodal"];
const TRANSPORT_SCOPES = ["Nacional", "Internacional", "Ambos"];
const FREQUENCIES = ["Ocasional", "Recurrente", "Operación continua"];

const CONFIG: AdvisoryFormConfig = {
  sectionId: "solicitar-asesoria-mercancias",
  productsBlockId: "seccion-productos-interes-mercancias",
  checkboxGroupName: "mercancias_product",
  idPrefix: "mercancias",
  heading: (<>Cuéntanos sobre<br className="hidden sm:inline" /> tu operación logística.</>),
  subheading: "Comparte qué transportas y cómo se mueve tu mercancía para conocer mejor las exposiciones de tu operación.",
  benefits: [
    { title: "Análisis con criterio técnico", description: "Evaluamos las rutas y tipos de traslado con visión preventiva." },
    { title: "Atención especializada", description: "Te asesoramos según la naturaleza y sensibilidad de tus mercancías." },
    { title: "Acompañamiento durante el proceso", description: "Desde la evaluación inicial hasta la implementación de la solución." },
  ],
  products: MERCANCIAS_PRODUCTS,
  otherProductPlaceholder: "Ej. Cobertura para proyectos de carga sobredimensionada",
  confirmationHeading: "Gracias por compartir los detalles de tu operación logística.",
  confirmationBody: "Un asesor técnico especializado en transporte de carga de LEVANTIR revisará los flujos logísticos para coordinar una conversación consultiva.",
  messagePlaceholder: "Cuéntanos brevemente sobre las rutas de tránsito, requerimientos aduanales, incoterms o condiciones de embalaje.",
};

export function MercanciasAdvisoryFormSection() {
  const pathname = usePathname();

  const handleSubmitAsync = async (data: AdvisoryFormSubmitData): Promise<string[]> => {
    // Map visual product IDs to controlled backend IDs
    const PRODUCT_MAP: Record<string, string> = {
      land_transport: "transporte-terrestre",
      maritime_transport: "transporte-maritimo",
      air_transport: "transporte-aereo",
      cargo_theft: "robo-de-mercancia",
      cargo_damage: "danos-a-mercancia",
      transport_liability: "responsabilidad-asociada-al-transporte",
      other: "otro-producto",
    };

    const mappedProducts = data.selectedProducts.map((id) => PRODUCT_MAP[id] || id);
    const otherProductSelected = mappedProducts.includes("otro-producto");

    const payload: Record<string, unknown> = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      vertical: "mercancias",
      products: mappedProducts,
      sourcePage: pathname || "/mercancias",
      formId: "mercancias-advisory",
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
        <MercanciasContextFields idPrefix={idPrefix} onRegisterReset={onRegisterReset} />
      )}
      onSubmitAsync={handleSubmitAsync}
      analytics={MERCANCIAS_ANALYTICS}
    />
  );
}

interface MercanciasContextFieldsProps { idPrefix: string; onRegisterReset: (fn: () => void) => void; }

function MercanciasContextFields({ idPrefix, onRegisterReset }: MercanciasContextFieldsProps) {
  const [cargoType, setCargoType] = useState("");
  const [transportModality, setTransportModality] = useState("");
  const [transportScope, setTransportScope] = useState("");
  const [frequency, setFrequency] = useState("");
  useEffect(() => {
    onRegisterReset(() => { setCargoType(""); setTransportModality(""); setTransportScope(""); setFrequency(""); });
  }, [onRegisterReset]);
  return (
    <div className="space-y-5 pt-2">
      <div className="border-b border-[#E8E8E8] pb-2.5">
        <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-[#0B2D58]">INFORMACIÓN DE LA OPERACIÓN</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor={`${idPrefix}-tipo-mercancia`} className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">TIPO DE MERCANCÍA <span className="text-[#D4A737] font-bold">*</span></label>
          <input id={`${idPrefix}-tipo-mercancia`} type="text" required value={cargoType} onChange={(e) => setCargoType(e.target.value)} placeholder="Ej. Equipo electrónico, alimentos, maquinaria" className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] placeholder-[#5C626B]/50 focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors" />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-modalidad`} className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">MODALIDAD DE TRANSPORTE <span className="text-[#D4A737] font-bold">*</span></label>
          <select id={`${idPrefix}-modalidad`} required value={transportModality} onChange={(e) => setTransportModality(e.target.value)} className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors cursor-pointer">
            <option value="">Selecciona la modalidad principal</option>
            {TRANSPORT_MODALITIES.map((mod) => <option key={mod} value={mod}>{mod}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${idPrefix}-alcance`} className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">ALCANCE <span className="text-[#D4A737] font-bold">*</span></label>
            <select id={`${idPrefix}-alcance`} required value={transportScope} onChange={(e) => setTransportScope(e.target.value)} className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors cursor-pointer">
              <option value="">Selecciona el alcance geográfico</option>
              {TRANSPORT_SCOPES.map((scope) => <option key={scope} value={scope}>{scope}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor={`${idPrefix}-frecuencia`} className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">FRECUENCIA <span className="text-[#5C626B] text-[0.7rem] font-normal lowercase">(opcional)</span></label>
            <select id={`${idPrefix}-frecuencia`} value={frequency} onChange={(e) => setFrequency(e.target.value)} className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors cursor-pointer">
              <option value="">Selecciona la frecuencia</option>
              {FREQUENCIES.map((freq) => <option key={freq} value={freq}>{freq}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
