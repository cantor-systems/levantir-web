/**
 * Lead context inference from URL pathname and search params.
 *
 * Pure module — no React, no browser APIs, no external dependencies.
 * All ProductId and GeneralTopicId values are validated against the
 * config before use. No unsafe casts, no invented IDs.
 */

import {
  VERTICALS,
  PRODUCTS_BY_VERTICAL,
  GENERAL_TOPICS,
  type LeadVertical,
  type ProductId,
  type GeneralTopicId,
} from "./config";
import type { LeadContext, LeadFormId } from "./types";

// ---------------------------------------------------------------------------
// Validators
// ---------------------------------------------------------------------------

/**
 * All valid ProductId values as a flat Set for O(1) lookup.
 * Built once at module load.
 */
const ALL_PRODUCT_IDS: ReadonlySet<string> = new Set(
  (
    Object.values(PRODUCTS_BY_VERTICAL) as ReadonlyArray<
      ReadonlyArray<{ readonly id: string }>
    >
  ).flatMap((products) => products.map((p) => p.id))
);

/**
 * All valid GeneralTopicId values as a flat Set for O(1) lookup.
 */
const ALL_GENERAL_TOPIC_IDS: ReadonlySet<string> = new Set(
  GENERAL_TOPICS.map((t) => t.id)
);

/**
 * Checks whether a string is a known LeadVertical.
 * Exported for external callers that need the guard.
 */
export function isLeadVertical(value: string): value is LeadVertical {
  return (VERTICALS as ReadonlyArray<string>).includes(value);
}

/**
 * Returns true only if `value` is a known ProductId.
 * Safe guard — no `as ProductId` without this check.
 */
export function isValidProductId(value: string): value is ProductId {
  return ALL_PRODUCT_IDS.has(value);
}

/**
 * Returns true only if `value` is a known GeneralTopicId.
 */
export function isValidGeneralTopicId(value: string): value is GeneralTopicId {
  return ALL_GENERAL_TOPIC_IDS.has(value);
}

// ---------------------------------------------------------------------------
// Internal: product IDs scoped to a vertical
// ---------------------------------------------------------------------------

function productIdsForVertical(vertical: LeadVertical): ReadonlySet<string> {
  if (vertical === "general") return new Set();
  const list = PRODUCTS_BY_VERTICAL[vertical];
  return new Set((list as ReadonlyArray<{ readonly id: string }>).map((p) => p.id));
}

// ---------------------------------------------------------------------------
// Explicit pathname → (vertical, products[]) map
//
// Mapping rules:
//  • Vertical root pages (/autos, /personas, …) → products = []
//  • Sub-pages are mapped to the REAL ProductId from config.
//    Slug ≠ ProductId cases are handled explicitly (e.g. "retiro" → "retiro-ahorro").
//  • Sub-pages without a matching ProductId → products = []
//  • /, /nosotros, /insights, /contacto, unknown → general, products = []
// ---------------------------------------------------------------------------

interface PathContext {
  vertical: LeadVertical;
  products: ProductId[];
}

/**
 * Maps a normalised pathname to its conservative commercial context.
 * Only real ProductIds from config.ts are used — never invented.
 */
function inferPathContext(pathname: string): PathContext {
  const clean = pathname.replace(/\/$/, "") || "/";

  // ── Autos ──────────────────────────────────────────────────────────────
  if (clean === "/autos") {
    return { vertical: "autos", products: [] };
  }
  // /autos/seguro-de-auto — "seguro-de-auto" is not a ProductId in config
  if (clean.startsWith("/autos/")) {
    return { vertical: "autos", products: [] };
  }

  // ── Personas ────────────────────────────────────────────────────────────
  if (clean === "/personas") {
    return { vertical: "personas", products: [] };
  }
  if (clean === "/personas/gastos-medicos-mayores") {
    // ProductId "gastos-medicos-mayores" ✅ exists in personas
    return { vertical: "personas", products: ["gastos-medicos-mayores"] };
  }
  if (clean === "/personas/seguro-de-vida") {
    // Slug "seguro-de-vida" ≠ ProductId. Real ID = "vida" ✅
    return { vertical: "personas", products: ["vida"] };
  }
  if (clean === "/personas/retiro") {
    // Slug "retiro" ≠ ProductId. Real ID = "retiro-ahorro" ✅
    return { vertical: "personas", products: ["retiro-ahorro"] };
  }
  if (clean.startsWith("/personas/")) {
    return { vertical: "personas", products: [] };
  }

  // ── PYMES ───────────────────────────────────────────────────────────────
  if (clean === "/pymes") {
    return { vertical: "pymes", products: [] };
  }
  if (clean === "/pymes/responsabilidad-civil") {
    // ProductId "responsabilidad-civil" ✅ exists in pymes
    return { vertical: "pymes", products: ["responsabilidad-civil"] };
  }
  // /pymes/seguro-empresarial — no matching ProductId in config
  // /pymes/hombre-clave       — no matching ProductId in config
  if (clean.startsWith("/pymes/")) {
    return { vertical: "pymes", products: [] };
  }

  // ── Mercancías ──────────────────────────────────────────────────────────
  if (clean === "/mercancias" || clean.startsWith("/mercancias/")) {
    return { vertical: "mercancias", products: [] };
  }

  // ── Aeronaves ───────────────────────────────────────────────────────────
  if (clean === "/aeronaves" || clean.startsWith("/aeronaves/")) {
    return { vertical: "aeronaves", products: [] };
  }

  // ── Sectores Especializados ─────────────────────────────────────────────
  if (
    clean === "/sectores-especializados" ||
    clean.startsWith("/sectores-especializados/")
  ) {
    return { vertical: "sectores-especializados", products: [] };
  }

  // ── General (/, /nosotros, /insights, /contacto, unknown) ───────────────
  return { vertical: "general", products: [] };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Derives a complete LeadContext from the current pathname and optional
 * URL search params.
 *
 * Product inference priority:
 *   1. Path-level product (from inferPathContext) — most reliable
 *   2. URL `product` param — accepted only if it is a known ProductId AND
 *      belongs to the inferred vertical. Silently ignored otherwise.
 *      Only used to fill an empty products array (never overrides path-level).
 *
 * sourcePage = the real pathname (never referrer, localStorage, or document).
 * formId     = defaults to "advisory-modal".
 *
 * @example
 *   getLeadContextFromPathname("/pymes/responsabilidad-civil", searchParams)
 *   // → { vertical: "pymes", products: ["responsabilidad-civil"],
 *   //     sourcePage: "/pymes/responsabilidad-civil", formId: "advisory-modal" }
 */
export function getLeadContextFromPathname(
  pathname: string,
  searchParams?: URLSearchParams | null,
  formId: LeadFormId = "advisory-modal"
): LeadContext {
  const pathCtx = inferPathContext(pathname);

  // -- URL-borne product override (only fills an empty path context) --------
  let resolvedProducts: ProductId[] = pathCtx.products;

  if (resolvedProducts.length === 0 && searchParams) {
    const urlProduct = searchParams.get("product") ?? "";
    if (urlProduct) {
      const validForVertical = productIdsForVertical(pathCtx.vertical);
      // Double gate: must be a known ProductId AND belong to this vertical
      if (isValidProductId(urlProduct) && validForVertical.has(urlProduct)) {
        resolvedProducts = [urlProduct]; // safe: isValidProductId confirmed the cast
      }
      // else: unknown/cross-vertical product → silently ignored
    }
  }

  return {
    vertical: pathCtx.vertical,
    products: resolvedProducts,
    sourcePage: pathname || "/",
    formId,
  };
}
