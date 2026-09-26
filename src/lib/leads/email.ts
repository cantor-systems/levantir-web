import { Resend } from "resend";
import type { ValidatedLead } from "./validation";

/**
 * Sends a lead notification email via Resend.
 *
 * Validates required env vars at call time (runtime), not at module load,
 * so that `next build` does not fail when variables are absent in CI/deploy.
 *
 * Returns { ok: true } on success, { ok: false } on any failure.
 * Never throws — callers should check the return value.
 */
export async function sendLeadEmail(
  lead: ValidatedLead
): Promise<{ ok: true } | { ok: false }> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.LEADS_FROM_EMAIL;
  const toEmail = process.env.LEADS_TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    console.error("Missing required email environment variable(s) for lead sending");
    return { ok: false };
  }

  const resend = new Resend(apiKey);

  const subject = `Nuevo lead LEVANTIR — ${lead.vertical}`;

  const productsText =
    lead.products.length > 0
      ? lead.products.join(", ")
      : "No especificados";

  const lines: string[] = [
    "=== Nuevo lead LEVANTIR ===",
    "",
    `Nombre:        ${lead.name}`,
    `Email:         ${lead.email}`,
    `Teléfono:      ${lead.phone ?? "No proporcionado"}`,
    `Mensaje:       ${lead.message ?? "No proporcionado"}`,
    "",
    `Vertical:      ${lead.vertical}`,
    `Productos:     ${productsText}`,
    `Página origen: ${lead.sourcePage}`,
    `Form ID:       ${lead.formId}`,
    "",
    "===========================",
  ];

  const text = lines.join("\n");

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: lead.email,
    subject,
    text,
  });

  if (error) {
    console.error("Failed to send lead email");
    return { ok: false };
  }

  return { ok: true };
}
