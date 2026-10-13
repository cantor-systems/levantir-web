import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getGuiaHref, type GuiaDeSeguros } from "@/content/guias-de-seguros";

interface GuiaCardProps {
  guia: GuiaDeSeguros;
}

/**
 * Tarjeta de guía reutilizable (biblioteca y «Sigue leyendo»).
 * Toda la tarjeta es un enlace a la página individual del artículo.
 */
export function GuiaCard({ guia }: GuiaCardProps) {
  return (
    <Link
      href={getGuiaHref(guia.slug)}
      className="group bg-white rounded-[2px] border border-[#E8E8E8] hover:border-[#0B2D58]/40 hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden min-w-0 h-full focus-visible:ring-2 focus-visible:ring-[#D4A737] outline-none"
    >
      <div className="aspect-[16/10] overflow-hidden bg-[#E8E8E8] relative">
        <img
          src={guia.image.src}
          alt={guia.image.alt}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute top-3 left-3 bg-[#0B2D58]/90 text-[#D4A737] text-[0.7rem] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-[2px] backdrop-blur-xs">
          {guia.category}
        </div>
      </div>

      <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 gap-5">
        <div className="space-y-3">
          <h3
            className="font-display text-xl sm:text-[1.3rem] text-[#0B2D58] leading-[1.28] font-medium"
            style={{ fontFamily: 'var(--font-display), "Playfair Display", Georgia, serif' }}
          >
            {guia.title}
          </h3>
          <p className="text-sm text-[#2E2E2E]/75 leading-relaxed">{guia.metaDescription}</p>
        </div>

        <div className="pt-4 border-t border-[#E8E8E8] inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase text-[#0B2D58] group-hover:text-[#D4A737] transition-colors">
          <span>LEER GUÍA</span>
          <ArrowRight
            className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
