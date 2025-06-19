/**
 * Legacy Auth Example
 * This is a reference implementation for custom email/password auth using JWT and cookies.
 * Not used in production (NextAuth handles all active auth).
 */

import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { UserType } from "./types";

const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7; //7 days
const COOKIE_SESSION_KEY = process.env.COOKIE_SESSION_KEY;
const encodedKey = new TextEncoder().encode(COOKIE_SESSION_KEY);

type Cookie = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean;
      httpOnly?: boolean;
      sameSite?: "strict" | "lax" | "none" | false;
      expires?: number;
    }
  ) => void;
  get: (key: string) =>
    | {
        name: string;
        value: string;
      }
    | undefined;
  delete: (key: string) => void;
};

type SessionPayload = {
  user: UserType;
  expiresAt: Date;
};

export async function createSession(user: UserType, cookies: Cookie) {
  const session = await encrypt({
    user,
    expiresAt: new Date(Date.now() + SESSION_EXPIRATION_SECONDS * 1000),
  });

  setCookie(session, cookies);
}

export function setCookie(sessionId: string, cookies: Pick<Cookie, "set">) {
  cookies.set(COOKIE_SESSION_KEY as string, sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
  });
}

export async function removeSession(cookies: Pick<Cookie, "get" | "delete">) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY as string)?.value;
  if (!sessionId) return null;

  cookies.delete(COOKIE_SESSION_KEY as string);
}

export async function getUserFromSession(cookies: Pick<Cookie, "get">): Promise<UserType | null> {
  const sessionId = cookies.get(COOKIE_SESSION_KEY as string)?.value;

  if (!sessionId) return null;

  return await decrypt(sessionId);
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = ""): Promise<UserType | null> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as UserType;
  } catch (error) {
    console.log("Failed to verify session");
    return null;
  }
}
