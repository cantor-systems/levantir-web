import { NextResponse } from "next/server";
import { validateLeadSubmission } from "@/lib/leads/validation";

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

    // For 5D.1 we stop here, further processing (like emailing) goes in subsequent phases.
    // For now, we return 200 OK.
    
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
