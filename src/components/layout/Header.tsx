"use client";

import React, { useState, useEffect, useRef } from 'react';
import { AdvisoryLink as Link } from "@/components/ui/AdvisoryLink";
import { usePathname } from 'next/navigation';
import { Menu, ArrowRight, ChevronDown } from 'lucide-react';

// ─── Navigation data ──────────────────────────────────────────────────────────

interface NavChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'AUTOS',
    href: '/autos',
    children: [
      { label: 'Seguro de Auto', href: '/autos/seguro-de-auto' },
    ],
  },
  {
    label: 'PERSONAS',
    href: '/personas',
    children: [
      { label: 'Gastos Médicos Mayores', href: '/personas/gastos-medicos-mayores' },
      { label: 'Seguro de Vida', href: '/personas/seguro-de-vida' },
      { label: 'Retiro', href: '/personas/retiro' },
    ],
  },
  {
    label: 'PYMES',
    href: '/pymes',
    children: [
      { label: 'Seguro Empresarial', href: '/pymes/seguro-empresarial' },
      { label: 'Responsabilidad Civil', href: '/pymes/responsabilidad-civil' },
      { label: 'Hombre Clave', href: '/pymes/hombre-clave' },
    ],
  },
  { label: 'MERCANCÍAS', href: '/mercancias' },
  { label: 'AERONAVES', href: '/aeronaves' },
  { label: 'SECTORES ESPECIALIZADOS', href: '/sectores-especializados' },
  {
    label: 'NOSOTROS',
    href: '/nosotros',
    children: [
      { label: 'Insights', href: '/insights' },
    ],
  },
  { label: 'CONTACTO', href: '/contacto' },
];

/**
 * A nav item is considered "active" when:
 * 1. currentPath exactly matches item.href
 * 2. currentPath is a subroute of item.href (e.g. /pymes/hombre-clave → PYMES active)
 * 3. currentPath matches one of item's children (e.g. /insights → NOSOTROS active)
 */
function isItemActive(item: NavItem, currentPath: string): boolean {
  if (currentPath === item.href) return true;
  if (item.href !== '/' && currentPath.startsWith(item.href + '/')) return true;
  if (item.children?.some((child) => currentPath === child.href)) return true;
  return false;
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface HeaderProps {
  onOpenMobileNav: () => void;
  isMobileNavOpen: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Header({
  onOpenMobileNav,
  isMobileNavOpen,
}: HeaderProps) {
  const currentPath = usePathname() || '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click / pointer outside nav → close dropdown
  useEffect(() => {
    if (!openDropdown) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [openDropdown]);

  // Escape key → close dropdown
  useEffect(() => {
    if (!openDropdown) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenDropdown(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [openDropdown]);

  // Route change → close dropdown
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpenDropdown(null);
  }, [currentPath]);

  const handleNavigate = () => {
    setOpenDropdown(null);
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 bg-[#FFFFFF] ${
        isScrolled
          ? 'border-b border-[#E8E8E8] shadow-[0_2px_12px_rgba(11,45,88,0.04)]'
          : 'border-b border-[#E8E8E8]/80 shadow-[0_1px_4px_rgba(11,45,88,0.02)]'
      }`}
    >
      {/* Header Container: wide layout, max-width 1760px, safe horizontal padding */}
      <div className="w-full max-w-[1760px] mx-auto px-5 sm:px-8 lg:px-12 2xl:px-16">
        <div
          className={`flex items-center justify-between w-full min-[1440px]:grid min-[1440px]:grid-cols-[auto_minmax(0,1fr)_auto] min-[1440px]:gap-x-10 min-[1650px]:gap-x-14 transition-[height] duration-200 ${
            isScrolled
              ? 'h-[80px] lg:h-[86px]'
              : 'h-[88px] lg:h-[94px] 2xl:h-[98px]'
          }`}
        >
          {/* Column 1: Logo */}
          <div className="header-logo flex items-center flex-shrink-0 min-[1440px]:justify-self-start">
            <Link
              id="header-logo-link"
              href="/"
              onClick={() => handleNavigate()}
              aria-label="LEVANTIR – Ir a inicio"
              className="flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A737] rounded-sm transition-opacity hover:opacity-95 flex items-center"
            >
              <img
                src="/LEVANTIR_Logo_Reference.webp"
                alt="LEVANTIR"
                width={1060}
                height={250}
                className="h-8 sm:h-9 md:h-10 lg:h-[50px] xl:h-[52px] 2xl:h-[54px] w-auto object-contain select-none"
                loading="eager"
                decoding="async"
              />
            </Link>
          </div>

          {/* Column 2: Navigation */}
          <nav
            id="desktop-navigation"
            ref={navRef}
            aria-label="Navegación principal"
            className="header-nav hidden min-[1440px]:flex items-center justify-center min-w-0 w-full"
          >
            <div className="flex items-center justify-center gap-4 min-[1520px]:gap-5 min-[1660px]:gap-6 min-[1760px]:gap-7 flex-nowrap">
              {NAV_ITEMS.map((item) => {
                const hasChildren = Boolean(item.children?.length);
                const isActive = isItemActive(item, currentPath);
                const isOpen = openDropdown === item.label;

                const linkCls = [
                  'text-[0.67rem] min-[1500px]:text-[0.70rem] min-[1620px]:text-[0.73rem] 2xl:text-[0.77rem]',
                  'font-semibold tracking-[0.05em] py-2 border-b-2 transition-all whitespace-nowrap',
                  'focus:outline-none focus-visible:text-[#0B2D58] focus-visible:border-[#D4A737]',
                  isActive
                    ? 'text-[#0B2D58] border-[#D4A737]'
                    : 'text-[#0B2D58]/85 hover:text-[#0B2D58] hover:border-[#D4A737] border-transparent',
                ].join(' ');

                return (
                  <div
                    key={item.label}
                    className="relative flex items-center"
                    // Close this dropdown when focus leaves the entire group subtree
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                        if (openDropdown === item.label) setOpenDropdown(null);
                      }
                    }}
                  >
                    {/* Main category link — always navigates to landing page */}
                    <Link
                      id={`nav-link-${item.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      href={item.href}
                      onClick={() => handleNavigate()}
                      className={linkCls}
                    >
                      {item.label}
                    </Link>

                    {/* Chevron button — toggles dropdown, only where children exist */}
                    {hasChildren && (
                      <button
                        type="button"
                        onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                        aria-expanded={isOpen}
                        aria-haspopup="menu"
                        aria-label={`${isOpen ? 'Cerrar' : 'Abrir'} submenú de ${item.label}`}
                        className={`ml-0.5 p-0.5 rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4A737] transition-colors ${
                          isActive
                            ? 'text-[#0B2D58]/65'
                            : 'text-[#0B2D58]/45 hover:text-[#0B2D58]/80'
                        }`}
                      >
                        <ChevronDown
                          className={`w-2.5 h-2.5 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    )}

                    {/* Dropdown panel */}
                    {hasChildren && isOpen && (
                      <div className="absolute top-full left-0 pt-[6px] z-50">
                        <div
                          role="menu"
                          aria-label={`Submenú de ${item.label}`}
                          className="min-w-[220px] bg-white border border-[#E8E8E8] rounded-[2px] shadow-[0_6px_24px_rgba(11,45,88,0.12),0_1px_4px_rgba(11,45,88,0.05)] py-1.5"
                        >
                          {item.children!.map((child) => {
                            const isChildActive = currentPath === child.href;
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                role="menuitem"
                                onClick={() => handleNavigate()}
                                className={[
                                  'flex items-center gap-2.5 px-4 py-2.5',
                                  'text-[0.775rem] font-medium tracking-wide whitespace-nowrap',
                                  'transition-colors focus:outline-none',
                                  isChildActive
                                    ? 'text-[#0B2D58] bg-[#FAF9F5] focus-visible:bg-[#FAF9F5]'
                                    : 'text-[#0B2D58]/75 hover:text-[#0B2D58] hover:bg-[#FAF9F5] focus-visible:bg-[#FAF9F5] focus-visible:text-[#0B2D58]',
                                ].join(' ')}
                              >
                                <span
                                  className={`w-1 h-1 rounded-full shrink-0 ${
                                    isChildActive ? 'bg-[#D4A737]' : 'bg-[#0B2D58]/20'
                                  }`}
                                  aria-hidden="true"
                                />
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Column 3: CTA & Mobile Menu Trigger */}
          <div className="header-cta flex items-center justify-end gap-3.5 flex-shrink-0 min-[1440px]:justify-self-end">
            <Link
              href="?advisory=true"
              scroll={false}
              className="hidden md:inline-flex items-center gap-2 bg-[#D4A737] hover:bg-[#C4962B] text-[#0B2D58] px-5 py-3 text-xs font-bold tracking-[0.14em] uppercase rounded-[2px] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2D58]"
            >
              <span>SOLICITAR ASESORÍA</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Mobile menu button (switches before 1440px to protect spacious nav breathing) */}
            <button
              id="header-mobile-menu-trigger"
              type="button"
              onClick={onOpenMobileNav}
              aria-label="Abrir menú de navegación"
              aria-expanded={isMobileNavOpen}
              aria-controls="mobile-navigation-dialog"
              className="min-[1440px]:hidden inline-flex items-center justify-center h-11 w-11 rounded-[2px] text-[#0B2D58] hover:bg-[#F8F5EF] border border-[#E8E8E8] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A737]"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

