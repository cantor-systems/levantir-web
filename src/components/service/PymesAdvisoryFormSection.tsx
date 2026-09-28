"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AdvisoryFormSection, AdvisoryFormConfig, AdvisoryFormSubmitData } from "./AdvisoryFormSection";

const PYMES_PRODUCTS = [
  { id: "property_damage", label: "Daños al inmueble" },
  { id: "contents_equipment", label: "Contenidos / equipo" },
  { id: "business_liability", label: "Responsabilidad civil" },
  { id: "theft", label: "Robo" },
  { id: "electronic_equipment", label: "Equipo electrónico" },
  { id: "consequential_loss", label: "Pérdidas consecuenciales" },
  { id: "personal_accident", label: "Accidentes personales" },
  { id: "other", label: "Otro producto" },
];
const COMPANY_SIZES = ["1–10 personas", "11–50 personas", "51–100 personas", "Más de 100 personas"];
const PROPERTY_TYPES = ["Oficina", "Local comercial", "Bodega", "Planta / taller", "Operación sin inmueble propio", "Otro"];

const CONFIG: AdvisoryFormConfig = {
  sectionId: "solicitar-asesoria-pymes",
  productsBlockId: "seccion-productos-interes-pymes",
  checkboxGroupName: "pymes_product",
  idPrefix: "pymes",
  heading: (<>Cuéntanos sobre<br className="hidden sm:inline" /> tu empresa.</>),
  subheading: "Cada empresa tiene una operación distinta. Comparte algunos datos básicos para conocer mejor los riesgos que necesitas revisar.",
  benefits: [
    { title: "Análisis con criterio técnico", description: "Evaluamos la exposición de tu empresa con una visión integral del riesgo." },
    { title: "Atención especializada", description: "Analizamos los activos, personas y continuidad operativa de tu negocio." },
    { title: "Acompañamiento durante el proceso", description: "Desde la evaluación inicial hasta la implementación de la solución." },
  ],
  products: PYMES_PRODUCTS,
  otherProductPlaceholder: "Ej. Cobertura para maquinaria o riesgos cibernéticos",
  confirmationHeading: "Gracias por compartir la información de tu empresa.",
  confirmationBody: "Un asesor técnico de LEVANTIR revisará las características de tu operación comercial para orientarte sobre los esquemas de cobertura idóneos.",
  messagePlaceholder: "Cuéntanos brevemente sobre la operación de tu empresa, sedes, requerimientos contractuales u otros detalles relevantes.",
};

export function PymesAdvisoryFormSection() {
  const pathname = usePathname();

  const handleSubmitAsync = async (data: AdvisoryFormSubmitData) => {
    // Map visual product IDs to controlled backend IDs
    const PRODUCT_MAP: Record<string, string> = {
      property_damage: "danos-al-inmueble",
      contents_equipment: "contenidos-equipo",
      business_liability: "responsabilidad-civil",
      theft: "robo",
      electronic_equipment: "equipo-electronico",
      consequential_loss: "perdidas-consecuenciales",
      personal_accident: "accidentes-personales",
      other: "otro-producto",
    };

    const mappedProducts = data.selectedProducts.map((id) => PRODUCT_MAP[id] || id);

    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      vertical: "pymes",
      products: mappedProducts,
      sourcePage: pathname || "/pymes",
      formId: "pymes-advisory",
      website: data.website,
    };

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
  };

  return (
    <AdvisoryFormSection
      config={CONFIG}
      contextFields={(idPrefix, onRegisterReset) => (
        <PymesContextFields idPrefix={idPrefix} onRegisterReset={onRegisterReset} />
      )}
      onSubmitAsync={handleSubmitAsync}
    />
  );
}

interface PymesContextFieldsProps { idPrefix: string; onRegisterReset: (fn: () => void) => void; }

function PymesContextFields({ idPrefix, onRegisterReset }: PymesContextFieldsProps) {
  const [businessActivity, setBusinessActivity] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [propertyType, setPropertyType] = useState("");
  useEffect(() => {
    onRegisterReset(() => { setBusinessActivity(""); setCompanySize(""); setPropertyType(""); });
  }, [onRegisterReset]);
  return (
    <div className="space-y-5 pt-2">
      <div className="border-b border-[#E8E8E8] pb-2.5">
        <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-[#0B2D58]">INFORMACIÓN DE LA EMPRESA</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor={`${idPrefix}-giro`} className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">GIRO / ACTIVIDAD <span className="text-[#D4A737] font-bold">*</span></label>
          <input id={`${idPrefix}-giro`} type="text" required value={businessActivity} onChange={(e) => setBusinessActivity(e.target.value)} placeholder="Ej. Restaurante, manufactura, consultoría" className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] placeholder-[#5C626B]/50 focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors" />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-tamanio`} className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">TAMAÑO APROXIMADO <span className="text-[#D4A737] font-bold">*</span></label>
          <select id={`${idPrefix}-tamanio`} required value={companySize} onChange={(e) => setCompanySize(e.target.value)} className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors cursor-pointer">
            <option value="">Selecciona el tamaño de la plantilla</option>
            {COMPANY_SIZES.map((size) => <option key={size} value={size}>{size}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={`${idPrefix}-tipo-inmueble`} className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">TIPO DE INMUEBLE <span className="text-[#5C626B] text-[0.7rem] font-normal lowercase">(opcional)</span></label>
          <select id={`${idPrefix}-tipo-inmueble`} value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors cursor-pointer">
            <option value="">Selecciona el tipo de inmueble principal</option>
            {PROPERTY_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}

