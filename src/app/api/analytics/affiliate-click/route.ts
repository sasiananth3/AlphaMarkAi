import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { recordAffiliateClick } from "@/lib/site-data";

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

  const affiliate = typeof body.affiliate === "string" ? body.affiliate : "";
  const placement = typeof body.placement === "string" ? body.placement : "";
  if (!affiliate || !placement) {
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
    await recordAffiliateClick({ visitorId, affiliate, placement });
    const response = NextResponse.json({ success: true });
    if (!existingId) {
      response.cookies.set("alphamarkai_visitor_id", visitorId, {
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
