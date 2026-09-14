import { NextResponse } from "next/server";
import { saveSubscriber } from "@/lib/site-data";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ success: true });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!emailPattern.test(email) || email.length > 254) {
    return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
  }

  try {
    const result = await saveSubscriber({
      email,
      source: typeof body.source === "string" ? body.source : "Direct",
      utmCampaign: typeof body.utmCampaign === "string" ? body.utmCampaign : undefined,
      utmMedium: typeof body.utmMedium === "string" ? body.utmMedium : undefined,
    });

    return NextResponse.json({
      success: true,
      alreadySubscribed: result.alreadySubscribed,
    });
  } catch {
    return NextResponse.json(
      { message: "Email signup is temporarily unavailable." },
      { status: 503 },
    );
  }
}
