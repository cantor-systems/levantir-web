import { Resend } from "resend";
import type { ValidatedLead } from "./validation";
import { GENERAL_TOPICS } from "./config";

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
  ];

  if (lead.topic) {
    const topicLabel = GENERAL_TOPICS.find((t) => t.id === lead.topic)?.label || lead.topic;
    lines.push(`Tema:          ${topicLabel}`);
  }

  if (lead.otherProduct) {
    lines.push(`Otro producto: ${lead.otherProduct}`);
  }

  lines.push(
    `Página origen: ${lead.sourcePage}`,
    `Form ID:       ${lead.formId}`,
    "",
    "===========================",
  );

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

// ---------------------------------------------------------------------------
// Acknowledgement email helpers
// ---------------------------------------------------------------------------

/**
 * Minimal HTML entity escaping for user-supplied strings inserted into HTML.
 * Used exclusively for the acknowledgement email template.
 * Never logs the raw or escaped value.
 */
function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Builds the HTML body for the prospect acknowledgement email.
 *
 * - Table-based layout for maximum email client compatibility
 *   (Gmail, Outlook, Apple Mail).
 * - All styles inlined; no external CSS, no web fonts, no scripts.
 * - No tracking pixels, no external images, no UTM links.
 * - Only personalisation: the prospect's pre-escaped name.
 * - No other PII is embedded in the HTML.
 */
function buildAcknowledgementHtml(safeName: string): string {
  return (
    '<!DOCTYPE html>' +
    '<html lang="es" xmlns="http://www.w3.org/1999/xhtml">' +
    '<head>' +
    '<meta charset="UTF-8" />' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0" />' +
    '<meta http-equiv="X-UA-Compatible" content="IE=edge" />' +
    '<title>Recibimos tu solicitud | LEVANTIR</title>' +
    '</head>' +
    '<body style="margin:0;padding:0;background-color:#F5F3EE;font-family:Arial,Helvetica,sans-serif;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F5F3EE;">' +
    '<tr><td align="center" style="padding:40px 16px 32px 16px;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;background-color:#FFFFFF;border:1px solid #E2E0DB;">' +
    '<tr><td>' +
    // Header
    '<table width="100%" cellpadding="0" cellspacing="0" border="0">' +
    '<tr><td align="center" style="background-color:#0B2D58;padding:32px 40px 28px 40px;">' +
    '<p style="margin:0;font-family:Georgia,\'Times New Roman\',serif;font-size:22px;font-weight:bold;letter-spacing:0.12em;color:#FFFFFF;text-transform:uppercase;">LEVANTIR</p>' +
    '<p style="margin:8px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:0.18em;color:#D4A737;text-transform:uppercase;">SEGUROS &middot; GESTI&Oacute;N DE RIESGOS &middot; PROTECCI&Oacute;N PATRIMONIAL</p>' +
    '</td></tr>' +
    '</table>' +
    // Confirmation indicator
    '<table width="100%" cellpadding="0" cellspacing="0" border="0">' +
    '<tr><td align="center" style="padding:40px 40px 0 40px;">' +
    '<table cellpadding="0" cellspacing="0" border="0">' +
    '<tr><td align="center" valign="middle" width="56" height="56" style="width:56px;height:56px;border-radius:50%;border:2px solid #D4A737;color:#0B2D58;font-size:26px;font-family:Arial,Helvetica,sans-serif;">&#10003;</td></tr>' +
    '</table>' +
    '<p style="margin:16px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:0.2em;color:#D4A737;text-transform:uppercase;">RECIBIMOS TU SOLICITUD</p>' +
    '</td></tr>' +
    '</table>' +
    // Main content
    '<table width="100%" cellpadding="0" cellspacing="0" border="0">' +
    '<tr><td style="padding:24px 40px 0 40px;">' +
    '<p style="margin:0;font-family:Georgia,\'Times New Roman\',serif;font-size:22px;font-weight:normal;color:#0B2D58;line-height:1.3;">Hola ' + safeName + ',</p>' +
    '</td></tr>' +
    '<tr><td style="padding:20px 40px 0 40px;">' +
    '<p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#3A3A3A;line-height:1.65;">Gracias por contactar a <strong style="color:#0B2D58;">LEVANTIR</strong>.</p>' +
    '</td></tr>' +
    '<tr><td style="padding:12px 40px 0 40px;">' +
    '<p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#3A3A3A;line-height:1.65;">Hemos recibido tu solicitud de asesor&iacute;a. Nuestro equipo revisar&aacute; la informaci&oacute;n que compartiste para dar seguimiento a tu caso.</p>' +
    '</td></tr>' +
    '</table>' +
    // Reply block
    '<table width="100%" cellpadding="0" cellspacing="0" border="0">' +
    '<tr><td style="padding:28px 40px 0 40px;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-left:3px solid #D4A737;background-color:#F9F8F5;">' +
    '<tr><td style="padding:16px 20px;">' +
    '<p style="margin:0 0 4px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;color:#0B2D58;">&iquest;Necesitas agregar informaci&oacute;n?</p>' +
    '<p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#5C5C5C;line-height:1.6;">Puedes responder directamente a este correo y tu mensaje llegar&aacute; a nuestro equipo.</p>' +
    '</td></tr>' +
    '</table>' +
    '</td></tr>' +
    '</table>' +
    // Disclaimer
    '<table width="100%" cellpadding="0" cellspacing="0" border="0">' +
    '<tr><td style="padding:28px 40px 40px 40px;">' +
    '<p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8A8A8A;line-height:1.6;">Este mensaje confirma &uacute;nicamente la recepci&oacute;n de tu solicitud.</p>' +
    '</td></tr>' +
    '</table>' +
    // Divider
    '<table width="100%" cellpadding="0" cellspacing="0" border="0">' +
    '<tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #E2E0DB;margin:0;" /></td></tr>' +
    '</table>' +
    // Footer
    '<table width="100%" cellpadding="0" cellspacing="0" border="0">' +
    '<tr><td align="center" style="padding:24px 40px 32px 40px;">' +
    '<p style="margin:0;font-family:Georgia,\'Times New Roman\',serif;font-size:14px;font-weight:bold;letter-spacing:0.08em;color:#0B2D58;text-transform:uppercase;">LEVANTIR</p>' +
    '<p style="margin:6px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#8A8A8A;letter-spacing:0.05em;">Seguros &middot; Gesti&oacute;n de Riesgos &middot; Protecci&oacute;n Patrimonial</p>' +
    '<p style="margin:8px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#0B2D58;">levantir.com</p>' +
    '</td></tr>' +
    '</table>' +
    '</td></tr>' +
    '</table>' +
    '</td></tr>' +
    '</table>' +
    '</body>' +
    '</html>'
  );
}

/**
 * Sends an acknowledgement email to the prospect confirming receipt of their
 * inquiry. This is a SECONDARY, non-critical send — its failure must never
 * cause a 500 response or block the lead from being processed.
 *
 * Uses the same env vars as sendLeadEmail.
 * Never throws — callers must not rely on its return value for HTTP status.
 */
export async function sendLeadAcknowledgementEmail(
  lead: ValidatedLead
): Promise<{ ok: true } | { ok: false }> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.LEADS_FROM_EMAIL;
  const replyToEmail = process.env.LEADS_TO_EMAIL;

  if (!apiKey || !fromEmail || !replyToEmail) {
    console.error("Missing required email environment variable(s) for acknowledgement sending");
    return { ok: false };
  }

  const resend = new Resend(apiKey);

  const subject = "Recibimos tu solicitud | LEVANTIR";

  // text/plain fallback — name used as-is (validated, no HTML context here)
  const textLines: string[] = [
    `Hola ${lead.name},`,
    "",
    "Gracias por contactar a LEVANTIR.",
    "",
    "Hemos recibido tu solicitud de asesoría. Nuestro equipo revisará la",
    "información que compartiste para dar seguimiento a tu caso.",
    "",
    "¿Necesitas agregar información?",
    "Puedes responder directamente a este correo y tu mensaje llegará a nuestro equipo.",
    "",
    "Este mensaje confirma únicamente la recepción de tu solicitud.",
    "",
    "Saludos,",
    "Equipo LEVANTIR",
    "Seguros · Gestión de Riesgos · Protección Patrimonial",
    "levantir.com",
  ];

  const text = textLines.join("\n");

  // HTML version — name is escaped before being placed inside HTML
  const html = buildAcknowledgementHtml(escapeHtml(lead.name));

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: lead.email,
    replyTo: replyToEmail,
    subject,
    text,
    html,
  });

  if (error) {
    console.error("Failed to send lead acknowledgement email");
    return { ok: false };
  }

  return { ok: true };
}
