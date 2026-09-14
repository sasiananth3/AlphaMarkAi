import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_DURATION_SECONDS,
  adminCredentialsAreValid,
  createAdminSessionToken,
} from "@/lib/admin-session";

type LoginBody = {
  username?: unknown;
  password?: unknown;
};

export async function POST(request: Request) {
  let body: LoginBody;

  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json(
      { message: "Enter a valid username and password." },
      { status: 400 },
    );
  }

  const username = typeof body.username === "string" ? body.username.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (
    username.length === 0 ||
    password.length === 0 ||
    username.length > 80 ||
    password.length > 200
  ) {
    return NextResponse.json(
      { message: "Enter a valid username and password." },
      { status: 400 },
    );
  }

  if (!adminCredentialsAreValid(username, password)) {
    return NextResponse.json(
      { message: "Incorrect username or password." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSessionToken(username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: ADMIN_SESSION_DURATION_SECONDS,
    path: "/",
    priority: "high",
  });

  return response;
}
