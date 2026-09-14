import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { recordPageView } from "@/lib/site-data";

const visitorCookie = "alphamarkai_visitor_id";

function safeText(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ message: "Invalid origin." }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Invalid event." }, { status: 400 });
  }

  const existingId = request.headers
    .get("cookie")
    ?.match(/(?:^|;\s*)alphamarkai_visitor_id=([^;]+)/)?.[1];
  const visitorId =
    existingId && /^[a-zA-Z0-9_-]{10,80}$/.test(existingId)
      ? existingId
      : randomUUID();

  try {
    await recordPageView({
      visitorId,
      path: safeText(body.path, "/"),
      source: safeText(body.source, "Direct"),
      referrer: safeText(body.referrer),
    });

    const response = NextResponse.json({ success: true });
    if (!existingId) {
      response.cookies.set(visitorCookie, visitorId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });
    }
    return response;
  } catch {
    return NextResponse.json({ message: "Analytics unavailable." }, { status: 503 });
  }
}
