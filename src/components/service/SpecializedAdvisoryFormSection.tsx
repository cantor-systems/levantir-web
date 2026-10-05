"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AdvisoryFormSection, AdvisoryFormConfig, AdvisoryFormSubmitData, AdvisoryFormAnalyticsConfig } from "./AdvisoryFormSection";

const SPECIALIZED_ANALYTICS: AdvisoryFormAnalyticsConfig = {
  vertical: "sectores-especializados",
  formId: "specialized-advisory",
};

const SPECIALIZED_PRODUCTS = [
  { id: "specialized_liability", label: "Responsabilidad civil especializada" },
  { id: "specialized_assets", label: "Daños a activos especializados" },
  { id: "specialized_equipment", label: "Equipo / maquinaria especializada" },
  { id: "aircraft_maintenance", label: "Mantenimiento de aeronaves" },
  { id: "aviation_workshop_liability", label: "Responsabilidad de talleres aeronáuticos" },
  { id: "hangars", label: "Hangares" },
  { id: "special_operational_risks", label: "Riesgos operacionales especiales" },
  { id: "other", label: "Otro producto" },
];
const OPERATION_TYPES = ["Aeronáutica", "Industrial", "Tecnología", "Servicios especializados", "Infraestructura", "Otra"];

const CONFIG: AdvisoryFormConfig = {
  sectionId: "solicitar-asesoria-sectores-especializados",
  productsBlockId: "seccion-productos-interes-especializados",
  checkboxGroupName: "specialized_product",
  idPrefix: "especializados",
  heading: (<>Cuéntanos sobre<br className="hidden sm:inline" /> tu operación especializada.</>),
  subheading: "Cuando una actividad no encaja en esquemas convencionales, entender la operación es el primer paso. Comparte el contexto y podremos analizarlo con mayor criterio.",
  benefits: [
    { title: "Análisis con criterio técnico", description: "Evaluamos operaciones no estándar con visión integral del riesgo." },
    { title: "Atención especializada", description: "Analizamos los procesos y responsabilidades particulares de tu actividad." },
    { title: "Acompañamiento durante el proceso", description: "Desde la evaluación inicial hasta la implementación de la solución." },
  ],
  products: SPECIALIZED_PRODUCTS,
  otherProductPlaceholder: "Ej. Cobertura para infraestructura o riesgos tecnológicos únicos",
  confirmationHeading: "Gracias por compartir los detalles de tu operación especializada.",
  confirmationBody: "Un asesor técnico senior de LEVANTIR revisará las variables compartidas para coordinar una sesión de análisis consultivo con criterio institucional.",
  messagePlaceholder: "Cualquier información adicional relevante sobre tu operación o requerimientos técnicos.",
  messageLabel: "MENSAJE O CONTEXTO ADICIONAL",
};

export function SpecializedAdvisoryFormSection() {
  const pathname = usePathname();

  const handleSubmitAsync = async (data: AdvisoryFormSubmitData): Promise<string[]> => {
    // Map visual product IDs to controlled backend IDs
    const PRODUCT_MAP: Record<string, string> = {
      specialized_liability: "responsabilidad-civil-especializada",
      specialized_assets: "danos-a-activos-especializados",
      specialized_equipment: "equipo-maquinaria-especializada",
      aircraft_maintenance: "mantenimiento-de-aeronaves",
      aviation_workshop_liability: "responsabilidad-de-talleres-aeronauticos",
      hangars: "hangares",
      special_operational_risks: "riesgos-operacionales-especiales",
      other: "otro-producto",
    };

    const mappedProducts = data.selectedProducts.map((id) => PRODUCT_MAP[id] || id);
    const otherProductSelected = mappedProducts.includes("otro-producto");

    const payload: Record<string, unknown> = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      vertical: "sectores-especializados",
      products: mappedProducts,
      sourcePage: pathname || "/sectores-especializados",
      formId: "specialized-advisory",
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
        <SpecializedContextFields idPrefix={idPrefix} onRegisterReset={onRegisterReset} />
      )}
      onSubmitAsync={handleSubmitAsync}
      analytics={SPECIALIZED_ANALYTICS}
    />
  );
}

interface SpecializedContextFieldsProps { idPrefix: string; onRegisterReset: (fn: () => void) => void; }

function SpecializedContextFields({ idPrefix, onRegisterReset }: SpecializedContextFieldsProps) {
  const [sectorActivity, setSectorActivity] = useState("");
  const [operationType, setOperationType] = useState("");
  const [operationDescription, setOperationDescription] = useState("");
  useEffect(() => {
    onRegisterReset(() => { setSectorActivity(""); setOperationType(""); setOperationDescription(""); });
  }, [onRegisterReset]);
  return (
    <div className="space-y-5 pt-2">
      <div className="border-b border-[#E8E8E8] pb-2.5">
        <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-[#0B2D58]">INFORMACIÓN DE LA OPERACIÓN</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor={`${idPrefix}-sector`} className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">SECTOR / ACTIVIDAD <span className="text-[#D4A737] font-bold">*</span></label>
          <input id={`${idPrefix}-sector`} type="text" required value={sectorActivity} onChange={(e) => setSectorActivity(e.target.value)} placeholder="Ej. Taller aeronáutico, hangar, tecnología, operación especializada" className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] placeholder-[#5C626B]/50 focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors" />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-tipo-operacion`} className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">TIPO DE OPERACIÓN <span className="text-[#D4A737] font-bold">*</span></label>
          <select id={`${idPrefix}-tipo-operacion`} required value={operationType} onChange={(e) => setOperationType(e.target.value)} className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors cursor-pointer">
            <option value="">Selecciona el tipo de operación</option>
            {OPERATION_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={`${idPrefix}-descripcion-operacion`} className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">BREVE DESCRIPCIÓN DE LA OPERACIÓN</label>
          <textarea id={`${idPrefix}-descripcion-operacion`} rows={2} value={operationDescription} onChange={(e) => setOperationDescription(e.target.value)} placeholder="Describe brevemente las características principales de tu operación, procesos, activos o responsabilidades involucradas." className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] placeholder-[#5C626B]/50 focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors resize-y min-h-[64px]" />
        </div>
      </div>
    </div>
  );
}
