import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav aria-label="Migas de pan" className={`py-1 ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[0.72rem] sm:text-[0.78rem] tracking-[0.08em] uppercase text-[#0B2D58]/70 font-semibold">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="inline-flex items-center gap-1.5 sm:gap-2">
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-[#D4A737] flex-shrink-0" aria-hidden="true" />
              )}
              {isLast || !item.href ? (
                <span className="text-[#0B2D58] font-bold tracking-[0.08em]" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-[#D4A737] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4A737] rounded-xs">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
