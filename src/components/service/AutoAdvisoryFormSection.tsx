"use client";

import { useState, useEffect } from "react";
import { AdvisoryFormSection, AdvisoryFormConfig } from "./AdvisoryFormSection";

const AUTO_PRODUCTS = [
  { id: "liability", label: "Responsabilidad civil" },
  { id: "material_damage", label: "Daños materiales" },
  { id: "total_theft", label: "Robo total" },
  { id: "occupant_medical", label: "Gastos médicos ocupantes" },
  { id: "road_assistance", label: "Asistencia vial" },
  { id: "high_value_auto", label: "Auto de alto valor" },
  { id: "fleet", label: "Flotilla" },
  { id: "other", label: "Otro producto" },
];
const VEHICLE_TYPES = ["Automóvil", "SUV", "Pickup", "Vehículo comercial", "Flotilla", "Otro"];
const VEHICLE_USES = ["Particular", "Ejecutivo / empresarial", "Comercial", "Flotilla", "Otro"];

const CONFIG: AdvisoryFormConfig = {
  sectionId: "solicitar-asesoria-autos",
  productsBlockId: "seccion-productos-interes-auto",
  checkboxGroupName: "auto_product",
  idPrefix: "autos",
  heading: (<>Cuéntanos sobre el vehículo<br className="hidden sm:inline" /> que quieres proteger.</>),
  subheading: "Comparte algunos datos básicos y podremos conocer mejor el tipo de protección que estás buscando.",
  benefits: [
    { title: "Análisis con criterio técnico", description: "Evaluamos tu perfil de movilidad con una visión integral del riesgo." },
    { title: "Atención especializada", description: "Te asesoramos considerando las características particulares de tu vehículo u operación." },
    { title: "Acompañamiento durante el proceso", description: "Desde la evaluación inicial hasta la implementación de la solución." },
  ],
  products: AUTO_PRODUCTS,
  otherProductPlaceholder: "Ej. Cobertura para adaptaciones especiales",
  confirmationHeading: "Gracias por compartir los detalles de tu vehículo.",
  confirmationBody: "Un asesor de LEVANTIR revisará los requerimientos de tu unidad para orientarte sobre las alternativas de cobertura más adecuadas.",
  messagePlaceholder: "Cuéntanos brevemente sobre tu vehículo, hábitos de manejo o requerimientos especiales.",
};

export function AutoAdvisoryFormSection() {
  return (
    <AdvisoryFormSection
      config={CONFIG}
      contextFields={(idPrefix, onRegisterReset) => (
        <AutoContextFields idPrefix={idPrefix} onRegisterReset={onRegisterReset} />
      )}
    />
  );
}

interface AutoContextFieldsProps { idPrefix: string; onRegisterReset: (fn: () => void) => void; }

function AutoContextFields({ idPrefix, onRegisterReset }: AutoContextFieldsProps) {
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [vehicleUse, setVehicleUse] = useState("");
  useEffect(() => {
    onRegisterReset(() => { setVehicleType(""); setVehicleMake(""); setVehicleModel(""); setVehicleYear(""); setVehicleUse(""); });
  }, [onRegisterReset]);
  return (
    <div className="space-y-5 pt-2">
      <div className="border-b border-[#E8E8E8] pb-2.5">
        <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-[#0B2D58]">INFORMACIÓN DEL VEHÍCULO</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor={`${idPrefix}-tipo-vehiculo`} className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">TIPO DE VEHÍCULO <span className="text-[#D4A737] font-bold">*</span></label>
          <select id={`${idPrefix}-tipo-vehiculo`} required value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors cursor-pointer">
            <option value="">Selecciona una opción</option>
            {VEHICLE_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor={`${idPrefix}-marca`} className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">MARCA</label>
            <input id={`${idPrefix}-marca`} type="text" value={vehicleMake} onChange={(e) => setVehicleMake(e.target.value)} placeholder="Ej. BMW" className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] placeholder-[#5C626B]/50 focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors" />
          </div>
          <div>
            <label htmlFor={`${idPrefix}-modelo`} className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">MODELO</label>
            <input id={`${idPrefix}-modelo`} type="text" value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} placeholder="Ej. X3" className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] placeholder-[#5C626B]/50 focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors" />
          </div>
          <div>
            <label htmlFor={`${idPrefix}-anio`} className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">AÑO <span className="text-[#5C626B] text-[0.7rem] font-normal lowercase">(opcional)</span></label>
            <input id={`${idPrefix}-anio`} type="text" value={vehicleYear} onChange={(e) => setVehicleYear(e.target.value)} placeholder="Ej. 2024" className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] placeholder-[#5C626B]/50 focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors" />
          </div>
        </div>
        <div>
          <label htmlFor={`${idPrefix}-uso-vehiculo`} className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">USO <span className="text-[#D4A737] font-bold">*</span></label>
          <select id={`${idPrefix}-uso-vehiculo`} required value={vehicleUse} onChange={(e) => setVehicleUse(e.target.value)} className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors cursor-pointer">
            <option value="">Selecciona el uso principal</option>
            {VEHICLE_USES.map((use) => <option key={use} value={use}>{use}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}

