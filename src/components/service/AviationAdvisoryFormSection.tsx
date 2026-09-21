"use client";

import { useState, useEffect } from "react";
import { AdvisoryFormSection, AdvisoryFormConfig } from "./AdvisoryFormSection";

const AVIATION_PRODUCTS = [
  { id: "aircraft_hull", label: "Casco / daños a la aeronave" },
  { id: "aircraft_liability", label: "Responsabilidad civil" },
  { id: "passenger_liability", label: "Responsabilidad de pasajeros" },
  { id: "crew_personal_accident", label: "Accidentes personales / tripulación" },
  { id: "loss_of_use", label: "Pérdida de rentas" },
  { id: "war_hijacking_political_risks", label: "Guerra, secuestro y riesgos políticos" },
  { id: "ground_third_party_liability", label: "Responsabilidad en tierra (terceros)" },
  { id: "other", label: "Otro producto" },
];
const AIRCRAFT_TYPES = ["Avioneta", "Helicóptero", "Jet", "Turbohélice", "Otra aeronave"];
const AIRCRAFT_USES = ["Privado", "Ejecutivo / corporativo", "Comercial", "Escuela / entrenamiento", "Trabajo aéreo", "Otro"];

const CONFIG: AdvisoryFormConfig = {
  sectionId: "solicitar-asesoria-aeronaves",
  productsBlockId: "seccion-productos-interes",
  checkboxGroupName: "aviation_product",
  idPrefix: "aeronaves",
  heading: (<>Cuéntanos sobre tu<br className="hidden sm:inline" /> operación aérea.</>),
  subheading: "No necesitas saber exactamente qué póliza necesitas. Cuéntanos qué deseas proteger y un asesor de LEVANTIR podrá conocer mejor tu operación y orientarte sobre las alternativas disponibles.",
  benefits: [
    { title: "Análisis con criterio técnico", description: "Evaluamos tu operación con una visión integral del riesgo." },
    { title: "Atención especializada", description: "Te asesoramos considerando las características particulares de tu operación." },
    { title: "Acompañamiento durante el proceso", description: "Desde la evaluación inicial hasta la implementación de la solución." },
  ],
  products: AVIATION_PRODUCTS,
  otherProductPlaceholder: "Ej. Cobertura para equipo especializado",
  confirmationHeading: "Gracias por compartir los detalles de tu operación.",
  confirmationBody: "Un asesor técnico especializado en aviación de LEVANTIR revisará los requerimientos de tu aeronave para coordinar una conversación consultiva y orientarte sobre las coberturas disponibles.",
  messagePlaceholder: "Cuéntanos brevemente sobre tu operación, rutas, frecuencia de uso u otros detalles relevantes.",
};

export function AviationAdvisoryFormSection() {
  return (
    <AdvisoryFormSection
      config={CONFIG}
      contextFields={(idPrefix, onRegisterReset) => (
        <AviationContextFields idPrefix={idPrefix} onRegisterReset={onRegisterReset} />
      )}
    />
  );
}

interface AviationContextFieldsProps { idPrefix: string; onRegisterReset: (fn: () => void) => void; }

function AviationContextFields({ idPrefix, onRegisterReset }: AviationContextFieldsProps) {
  const [aircraftType, setAircraftType] = useState("");
  const [aircraftMake, setAircraftMake] = useState("");
  const [aircraftModel, setAircraftModel] = useState("");
  const [aircraftYear, setAircraftYear] = useState("");
  const [aircraftUse, setAircraftUse] = useState("");
  useEffect(() => {
    onRegisterReset(() => { setAircraftType(""); setAircraftMake(""); setAircraftModel(""); setAircraftYear(""); setAircraftUse(""); });
  }, [onRegisterReset]);
  return (
    <div className="space-y-5 pt-2">
      <div className="border-b border-[#E8E8E8] pb-2.5">
        <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-[#0B2D58]">INFORMACIÓN DE LA OPERACIÓN</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor={`${idPrefix}-tipo-aeronave`} className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">TIPO DE AERONAVE <span className="text-[#D4A737] font-bold">*</span></label>
          <select id={`${idPrefix}-tipo-aeronave`} required value={aircraftType} onChange={(e) => setAircraftType(e.target.value)} className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors cursor-pointer">
            <option value="">Selecciona una opción</option>
            {AIRCRAFT_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor={`${idPrefix}-marca`} className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">MARCA</label>
            <input id={`${idPrefix}-marca`} type="text" value={aircraftMake} onChange={(e) => setAircraftMake(e.target.value)} placeholder="Ej. Cessna" className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] placeholder-[#5C626B]/50 focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors" />
          </div>
          <div>
            <label htmlFor={`${idPrefix}-modelo`} className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">MODELO</label>
            <input id={`${idPrefix}-modelo`} type="text" value={aircraftModel} onChange={(e) => setAircraftModel(e.target.value)} placeholder="Ej. 206" className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] placeholder-[#5C626B]/50 focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors" />
          </div>
          <div>
            <label htmlFor={`${idPrefix}-anio`} className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">AÑO <span className="text-[#5C626B] text-[0.7rem] font-normal lowercase">(opcional)</span></label>
            <input id={`${idPrefix}-anio`} type="text" value={aircraftYear} onChange={(e) => setAircraftYear(e.target.value)} placeholder="Ej. 2018" className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] placeholder-[#5C626B]/50 focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors" />
          </div>
        </div>
        <div>
          <label htmlFor={`${idPrefix}-uso-aeronave`} className="block text-xs font-semibold uppercase tracking-wider text-[#0B2D58] mb-1.5">USO DE LA AERONAVE <span className="text-[#D4A737] font-bold">*</span></label>
          <select id={`${idPrefix}-uso-aeronave`} required value={aircraftUse} onChange={(e) => setAircraftUse(e.target.value)} className="w-full bg-[#FAF9F5]/60 border border-[#E8E8E8] rounded-[2px] px-4 py-3 text-sm text-[#0B2D58] focus:outline-none focus:border-[#0B2D58] focus:bg-white transition-colors cursor-pointer">
            <option value="">Selecciona el uso principal</option>
            {AIRCRAFT_USES.map((use) => <option key={use} value={use}>{use}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}

