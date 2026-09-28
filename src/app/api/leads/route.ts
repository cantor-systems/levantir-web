import { NextResponse } from "next/server";
import { validateLeadSubmission } from "@/lib/leads/validation";
import { sendLeadEmail, sendLeadAcknowledgementEmail } from "@/lib/leads/email";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { ok: false, error: "UNSUPPORTED_MEDIA_TYPE" },
        { status: 415 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "INVALID_REQUEST" },
        { status: 400 }
      );
    }

    const result = validateLeadSubmission(body);

    if (!result.success) {
      return NextResponse.json(
        { ok: false, error: "INVALID_REQUEST" },
        { status: 400 }
      );
    }

    if (result.spam) {
      // It's a bot, act like it succeeded
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // 1. CRITICAL: Send internal notification to LEVANTIR.
    //    If this fails, we must return 500 — the lead was not received.
    const emailResult = await sendLeadEmail(result.data);

    if (!emailResult.ok) {
      return NextResponse.json(
        { ok: false, error: "INTERNAL_ERROR" },
        { status: 500 }
      );
    }

    // 2. SECONDARY: Send acknowledgement email to the prospect.
    //    The lead is already in LEVANTIR's hands at this point.
    //    A failure here must NOT surface as an error to the prospect
    //    (which would cause duplicate submissions).
    const ackResult = await sendLeadAcknowledgementEmail(result.data);
    if (!ackResult.ok) {
      console.error("Lead acknowledgement email failed; internal notification was already sent successfully");
    }

    return NextResponse.json({ ok: true }, { status: 200 });

  } catch {
    // Return generic internal error without leaking details
    console.error("Internal Server Error in /api/leads");
    return NextResponse.json(
      { ok: false, error: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
