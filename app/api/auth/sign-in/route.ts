/**
 * Legacy Auth Example
 * This is a reference implementation for custom email/password auth using JWT and cookies.
 * Not used in production (NextAuth handles all active auth).
 */

import { createSession } from "@/features/auth/lib/session";
import { comparePassword } from "@/features/auth/lib/utils";
import { loginSchema } from "@/features/auth/lib/zod/schema";
import { findUserByEmail } from "@/features/auth/services/user.services";
import { sendError, sendSuccess } from "@/lib/response";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data: userData, success, error } = loginSchema.safeParse(body);

    if (!success) {
      return sendError("Invalid input", 400, error.flatten().fieldErrors);
    }

    const user = await findUserByEmail(userData.email);

    if (!user) {
      return sendError("Invalid Email or Password", 400);
    }

    const isCorrectPassword = await comparePassword({
      password: userData.password,
      hashedPassword: user.password ?? "",
      salt: user.salt ?? "",
    });

    if (!isCorrectPassword) {
      return sendError("Invalid Email or Password", 400);
    }

    await createSession(
      {
        email: user.email ?? "",
        id: user.id,
      },
      await cookies()
    );

    return sendSuccess(
      {
        message: "Logged in Successful",
        redirectUrl: "/dashboard",
      },
      201
    );
  } catch (error) {
    console.error("Login Error:", error);
    return sendError("Something went wrong", 500);
  }
}
