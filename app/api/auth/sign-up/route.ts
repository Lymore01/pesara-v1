import { generateSalt, hashPassword } from "@/features/auth/lib/utils";
import { registerSchema } from "@/features/auth/lib/zod/schema";
import { createUser, findUserByEmail } from "@/features/auth/services/user.services";
import { sendError, sendSuccess } from "@/lib/response";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data: userData, success, error } = registerSchema.safeParse(body);

    if (!success) {
      return sendError("Invalid input", 400, error.flatten().fieldErrors);
    }

    const existingUser = await findUserByEmail(userData.email);

    if (existingUser) {
      return sendError("User already exists", 409);
    }

    const salt = generateSalt();
    const hashedPassword = (await hashPassword(userData.password, salt)) as string;

    const user = await createUser(userData.email, hashedPassword, salt);

    if (!user) return sendError("Failed to create user", 500);

    return sendSuccess(
      {
        message: "Account created successfully",
        redirectUrl: "/dashboard",
      },
      201
    );
  } catch (error) {
    console.error("Register Error:", error);
    return sendError("Something went wrong", 500);
  }
}
