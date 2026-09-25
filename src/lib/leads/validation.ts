import { PRODUCTS_BY_VERTICAL, LeadVertical, ProductId } from "./config";
import { isLeadVertical, isValidProductId } from "./context";
import { LeadContext, LeadFormId } from "./types";

export interface ValidatedLead extends LeadContext {
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

export type LeadValidationResult =
  | { success: true; spam: false; data: ValidatedLead }
  | { success: true; spam: true }
  | { success: false; error: string };

const VALID_FORM_IDS = new Set<string>([
  "advisory-modal",
  "contact-form",
  "auto-advisory",
  "personal-advisory",
  "pymes-advisory",
  "mercancias-advisory",
  "aviation-advisory",
  "specialized-advisory",
]);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s+\-()]*$/;

function validateProducts(products: unknown, vertical: string): ProductId[] | null {
  if (!Array.isArray(products)) return null;
  
  if (vertical === "general") {
    return products.length === 0 ? [] : null;
  }

  const validProducts: ProductId[] = [];
  const seen = new Set<string>();
  const verticalProducts = PRODUCTS_BY_VERTICAL[vertical as Exclude<LeadVertical, "general">];
  
  if (!verticalProducts) return null;

  for (const p of products) {
    if (typeof p !== "string") return null;
    if (!isValidProductId(p)) return null;

    // Check if it belongs to the vertical
    const belongs = verticalProducts.some((vp: { id: string }) => vp.id === p);
    if (!belongs) return null;

    if (!seen.has(p)) {
      seen.add(p);
      validProducts.push(p as ProductId);
    }
  }

  return validProducts;
}

export function validateLeadSubmission(body: unknown): LeadValidationResult {
  if (typeof body !== "object" || body === null) {
    return { success: false, error: "INVALID_REQUEST" };
  }

  const data = body as Record<string, unknown>;

  // Honeypot
  if (data.website !== undefined && data.website !== null) {
    if (typeof data.website !== "string") {
      return { success: false, error: "INVALID_REQUEST" };
    }
    if (data.website.trim() !== "") {
      return { success: true, spam: true };
    }
  }

  // Name
  if (typeof data.name !== "string") return { success: false, error: "INVALID_REQUEST" };
  const name = data.name.trim();
  if (name.length < 2 || name.length > 100) return { success: false, error: "INVALID_REQUEST" };

  // Email
  if (typeof data.email !== "string") return { success: false, error: "INVALID_REQUEST" };
  const email = data.email.trim().toLowerCase();
  if (email.length === 0 || email.length > 254 || !EMAIL_REGEX.test(email)) return { success: false, error: "INVALID_REQUEST" };

  // Phone
  let phone: string | undefined = undefined;
  if (data.phone !== undefined && data.phone !== null) {
    if (typeof data.phone !== "string") return { success: false, error: "INVALID_REQUEST" };
    const p = data.phone.trim();
    if (p.length > 0) {
      if (p.length > 40 || !PHONE_REGEX.test(p)) return { success: false, error: "INVALID_REQUEST" };
      phone = p;
    }
  }

  // Message
  let message: string | undefined = undefined;
  if (data.message !== undefined && data.message !== null) {
    if (typeof data.message !== "string") return { success: false, error: "INVALID_REQUEST" };
    const m = data.message.trim();
    if (m.length > 0) {
      if (m.length > 3000) return { success: false, error: "INVALID_REQUEST" };
      message = m;
    }
  }

  // Vertical
  if (typeof data.vertical !== "string" || !isLeadVertical(data.vertical)) {
    return { success: false, error: "INVALID_REQUEST" };
  }
  const vertical = data.vertical as LeadVertical;

  // Products
  const products = validateProducts(data.products, vertical);
  if (products === null) return { success: false, error: "INVALID_REQUEST" };

  // SourcePage
  if (typeof data.sourcePage !== "string") return { success: false, error: "INVALID_REQUEST" };
  const sourcePage = data.sourcePage.trim();
  if (
    !sourcePage.startsWith("/") ||
    sourcePage.startsWith("//") ||
    sourcePage.length > 500 ||
    sourcePage.includes("?") ||
    sourcePage.includes("#")
  ) {
    return { success: false, error: "INVALID_REQUEST" };
  }

  // FormId
  if (typeof data.formId !== "string" || !VALID_FORM_IDS.has(data.formId)) {
    return { success: false, error: "INVALID_REQUEST" };
  }
  const formId = data.formId as LeadFormId;

  const validLead: ValidatedLead = {
    name,
    email,
    vertical,
    products,
    sourcePage,
    formId
  };

  if (phone !== undefined) validLead.phone = phone;
  if (message !== undefined) validLead.message = message;

  return { success: true, spam: false, data: validLead };
}
