export type { LeadVertical, ProductId, GeneralTopicId } from "./config";

export type LeadFormId =
  | "advisory-modal"
  | "contact-form"
  | "auto-advisory"
  | "personal-advisory"
  | "pymes-advisory"
  | "mercancias-advisory"
  | "aviation-advisory"
  | "specialized-advisory";

/**
 * Represents the contextual business information of a lead, identifying
 * where the user was and what they intend to protect.
 */
export interface LeadContext {
  vertical: import("./config").LeadVertical;
  products: import("./config").ProductId[];
  sourcePage: string;
  formId: LeadFormId;
}

/**
 * Standardized lead structure for the future pipeline.
 * Note: Specialized fields (vehicleMake, companySize, etc.) are currently omitted
 * pending a unified serialization strategy.
 */
export interface NormalizedLead extends LeadContext {
  name: string;
  phone: string;
  email: string;
  message?: string;
}
