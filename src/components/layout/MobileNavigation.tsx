"use client";

import React, { useEffect, useRef, useState } from 'react';
import { AdvisoryLink as Link } from "@/components/ui/AdvisoryLink";
import { usePathname } from 'next/navigation';
import { X, ArrowRight, Phone, ChevronDown } from 'lucide-react';
import { LevantirLogo } from '../brand/LevantirLogo';

// ─── Navigation data ──────────────────────────────────────────────────────────

interface NavChild {
  label: string;
  href: string;
}

interface AccordionGroup {
  label: string;
  href: string;
  /** Label for the link that navigates to the group's main landing page */
  mainLinkLabel: string;
  children: NavChild[];
}

/** Groups rendered as expandable accordions */
const ACCORDION_GROUPS: AccordionGroup[] = [
  {
    label: 'Autos',
    href: '/autos',
    mainLinkLabel: 'Ver soluciones para Autos',
    children: [
      { label: 'Seguro de Auto', href: '/autos/seguro-de-auto' },
    ],
  },
  {
    label: 'Personas',
    href: '/personas',
    mainLinkLabel: 'Ver todas las soluciones para Personas',
    children: [
      { label: 'Gastos Médicos Mayores', href: '/personas/gastos-medicos-mayores' },
      { label: 'Seguro de Vida', href: '/personas/seguro-de-vida' },
      { label: 'Retiro', href: '/personas/retiro' },
    ],
  },
  {
    label: 'PYMES',
    href: '/pymes',
    mainLinkLabel: 'Ver soluciones para PYMES',
    children: [
      { label: 'Seguro Empresarial', href: '/pymes/seguro-empresarial' },
      { label: 'Responsabilidad Civil', href: '/pymes/responsabilidad-civil' },
      { label: 'Hombre Clave', href: '/pymes/hombre-clave' },
    ],
  },
];

/** Direct links (no sub-items) under the Soluciones section */
const DIRECT_SOLUTION_LINKS: NavChild[] = [
  { label: 'Mercancías', href: '/mercancias' },
  { label: 'Aeronaves', href: '/aeronaves' },
  { label: 'Sectores Especializados', href: '/sectores-especializados' },
];

/** Nosotros accordion — separate section */
const NOSOTROS_GROUP: AccordionGroup = {
  label: 'Nosotros',
  href: '/nosotros',
  mainLinkLabel: 'Quiénes somos',
  children: [
    { label: 'Insights', href: '/insights' },
  ],
};

// ─── Helper ───────────────────────────────────────────────────────────────────

function isGroupActive(group: AccordionGroup, currentPath: string): boolean {
  if (currentPath === group.href) return true;
  if (group.href !== '/' && currentPath.startsWith(group.href + '/')) return true;
  return group.children.some((child) => currentPath === child.href);
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function MobileNavigation({
  isOpen,
  onClose,
}: MobileNavigationProps) {
  const currentPath = usePathname() || '/';
  const panelRef = useRef<HTMLDivElement>(null);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  // Escape key + scroll lock while open
  useEffect(() => {
    if (!isOpen) return;
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

  // Reset accordion when nav closes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!isOpen) setExpandedGroup(null);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNavigate = () => {
    onClose();
  };

  const toggleGroup = (label: string) => {
    setExpandedGroup((prev) => (prev === label ? null : label));
  };

  // ── Shared accordion renderer ─────────────────────────────────────────────
  const renderAccordion = (group: AccordionGroup) => {
    const isExpanded = expandedGroup === group.label;
    const isActive = isGroupActive(group, currentPath);

    return (
      <li key={group.label}>
        {/* Accordion header row */}
        <div className="flex items-center justify-between">
          {/* Category label → navigates to landing page */}
          <Link
            href={group.href}
            onClick={() => handleNavigate()}
            className={`flex-1 text-base tracking-wide py-2.5 pr-2 focus:outline-none focus-visible:text-[#D4A737] transition-colors ${
              isActive ? 'text-[#D4A737] font-semibold' : 'text-white/90 hover:text-[#D4A737]'
            }`}
          >
            {group.label}
          </Link>

          {/* Expand / collapse toggle */}
          <button
            type="button"
            onClick={() => toggleGroup(group.label)}
            aria-expanded={isExpanded}
            aria-label={`${isExpanded ? 'Colapsar' : 'Expandir'} ${group.label}`}
            className="p-2 text-white/55 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4A737] rounded-sm transition-colors"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Accordion body — animates with CSS grid-template-rows */}
        <div
          className={`grid transition-[grid-template-rows] duration-200 ${
            isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <ul className="border-l border-white/15 pl-4 pb-2.5 mt-0.5 space-y-0.5">
              {/* Link to main landing page */}
              <li>
                <Link
                  href={group.href}
                  onClick={() => handleNavigate()}
                  className={`block text-sm py-1.5 transition-colors focus:outline-none focus-visible:text-[#D4A737] ${
                    currentPath === group.href
                      ? 'text-[#D4A737] font-medium'
                      : 'text-white/55 hover:text-white/90'
                  }`}
                >
                  {group.mainLinkLabel}
                </Link>
              </li>

              {/* Child sub-pages */}
              {group.children.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    onClick={() => handleNavigate()}
                    className={`block text-sm py-1.5 transition-colors focus:outline-none focus-visible:text-[#D4A737] ${
                      currentPath === child.href
                        ? 'text-[#D4A737] font-medium'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </li>
    );
  };

  return (
    <div
      id="mobile-navigation-dialog"
      role="dialog"
      aria-modal="true"
      aria-label="Menú principal de navegación"
      className="fixed inset-0 z-50 flex flex-col bg-[#0B2D58] text-white"
      ref={panelRef}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#071E3B]/80 shrink-0">
        <Link
          href="/"
          onClick={() => onClose()}
          aria-label="LEVANTIR – Ir a inicio"
        >
          <LevantirLogo variant="light" size="sm" showDescriptor={false} />
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center justify-center p-2 rounded text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A737]"
          aria-label="Cerrar menú"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 py-7 space-y-7">

        {/* ── Soluciones ─────────────────────────────────────────────────── */}
        <section aria-labelledby="mobile-nav-soluciones">
          <p
            id="mobile-nav-soluciones"
            className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-[#D4A737] mb-3"
          >
            Soluciones
          </p>

          {/* Accordion groups: Autos, Personas, PYMES */}
          <ul className="space-y-1">
            {ACCORDION_GROUPS.map(renderAccordion)}
          </ul>

          {/* Direct solution links: Mercancías, Aeronaves, Sectores */}
          <ul className="mt-1 space-y-0.5 border-t border-white/10 pt-2">
            {DIRECT_SOLUTION_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => handleNavigate()}
                  className={`block text-base tracking-wide py-2.5 focus:outline-none focus-visible:text-[#D4A737] transition-colors ${
                    currentPath === link.href
                      ? 'text-[#D4A737] font-semibold'
                      : 'text-white/90 hover:text-[#D4A737]'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Nosotros + Contacto ────────────────────────────────────────── */}
        <section
          aria-labelledby="mobile-nav-empresa"
          className="pt-2 border-t border-white/10"
        >
          <p
            id="mobile-nav-empresa"
            className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-[#D4A737] mb-3"
          >
            Empresa
          </p>
          <ul className="space-y-1">
            {renderAccordion(NOSOTROS_GROUP)}
            <li>
              <Link
                href="/contacto"
                onClick={() => handleNavigate()}
                className={`block text-base tracking-wide py-2.5 focus:outline-none focus-visible:text-[#D4A737] transition-colors ${
                  currentPath === '/contacto'
                    ? 'text-[#D4A737] font-semibold'
                    : 'text-white/90 hover:text-[#D4A737]'
                }`}
              >
                Contacto
              </Link>
            </li>
          </ul>
        </section>

        {/* ── CTA Block ─────────────────────────────────────────────────── */}
        <div className="pt-2 space-y-3">
          <Link
            href="?advisory=true"
            scroll={false}
            onClick={() => onClose()}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#D4A737] hover:bg-[#C4962B] text-[#0B2D58] px-5 py-3.5 text-xs font-semibold tracking-[0.16em] uppercase rounded-sm transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Solicitar asesoría</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>

          <a
            href="https://wa.me/5215500000000?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20asesor%C3%ADa%20en%20LEVANTIR"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white/90 hover:text-white px-5 py-3 text-xs font-semibold tracking-[0.12em] uppercase rounded-sm transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#D4A737]" aria-hidden="true" />
            <span>Contactar por WhatsApp</span>
          </a>
        </div>

        {/* ── Brand statement footer ─────────────────────────────────────── */}
        <div className="pt-4 border-t border-white/10">
          <p className="text-xs text-white/50 leading-relaxed">
            Protegemos lo que has construido.
          </p>
          <p className="text-[0.65rem] tracking-wider uppercase text-white/30 mt-1">
            Criterio · Estructura · Protección · Continuidad
          </p>
        </div>

      </div>
    </div>
  );
}

