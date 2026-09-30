import type { LeadVertical, ProductId, GeneralTopicId } from "../leads/config";
import type { LeadFormId } from "../leads/types";

export type AnalyticsEventName =
  | "lead_form_view"
  | "lead_form_start"
  | "lead_submit"
  | "lead_submit_success"
  | "lead_submit_error"
  | "lead_product_interest";

export interface LeadAnalyticsBase {
  vertical: LeadVertical;
  form_id: LeadFormId;
  source_path: string;
  topic?: GeneralTopicId;
}

export type LeadAnalyticsErrorType = "network" | "server";

export type LeadFormViewParams = LeadAnalyticsBase;
export type LeadFormStartParams = LeadAnalyticsBase;
export type LeadSubmitParams = LeadAnalyticsBase;
export type LeadSubmitSuccessParams = LeadAnalyticsBase;

export interface LeadSubmitErrorParams extends LeadAnalyticsBase {
  error_type: LeadAnalyticsErrorType;
}

export interface LeadProductInterestParams extends LeadAnalyticsBase {
  product: ProductId;
}

export interface LeadAnalyticsEventMap {
  lead_form_view: LeadFormViewParams;
  lead_form_start: LeadFormStartParams;
  lead_submit: LeadSubmitParams;
  lead_submit_success: LeadSubmitSuccessParams;
  lead_submit_error: LeadSubmitErrorParams;
  lead_product_interest: LeadProductInterestParams;
}

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, eventParams?: Record<string, unknown>) => void;
  }
}
