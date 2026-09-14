import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "alphamarkai_admin_session";
export const ADMIN_SESSION_DURATION_SECONDS = 60 * 60 * 8;

type AdminSession = {
  sub: string;
  role: "admin";
  exp: number;
};

function sessionSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ??
    process.env.ADMIN_PASSWORD ??
    "alphamarkai-demo-session-secret-change-me"
  );
}

function sign(value: string) {
  return createHmac("sha256", sessionSecret()).update(value).digest("base64url");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function adminCredentialsAreValid(username: string, password: string) {
  const configuredUsername = process.env.ADMIN_USERNAME ?? "sasiadmin";
  const configuredPassword = process.env.ADMIN_PASSWORD ?? "password@123";

  return (
    safeEqual(username, configuredUsername) &&
    safeEqual(password, configuredPassword)
  );
}

export function createAdminSessionToken(username: string) {
  const session: AdminSession = {
    sub: username,
    role: "admin",
    exp: Math.floor(Date.now() / 1000) + ADMIN_SESSION_DURATION_SECONDS,
  };
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");

  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSessionToken(token?: string): AdminSession | null {
  if (!token) return null;

  const [payload, signature, ...extraParts] = token.split(".");
  if (!payload || !signature || extraParts.length > 0) return null;
  if (!safeEqual(signature, sign(payload))) return null;

  try {
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as AdminSession;

    if (
      session.role !== "admin" ||
      typeof session.sub !== "string" ||
      typeof session.exp !== "number" ||
      session.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}
