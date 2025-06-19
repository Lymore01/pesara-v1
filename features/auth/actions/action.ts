/**
 * Legacy Auth Example
 * This is a reference implementation for custom email/password auth using JWT and cookies.
 * Not used in production (NextAuth handles all active auth).
 */

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { removeSession } from "../lib/session";

export async function logOut() {
  await removeSession(await cookies());
  redirect("/sign-in");
}
