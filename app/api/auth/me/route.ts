// Todo: [Deprecated] migrate to next auth

import { getUserFromSession } from "@/features/auth/lib/session";
import { sendError, sendSuccess } from "@/lib/response";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cookies = req.cookies;
    const userData = await getUserFromSession(cookies);

    if (!userData) {
      return sendError("User not found or session expired", 404);
    }
    return sendSuccess(
      {
        message: "Current user fetched Successfully",
        userData,
      },
      200
    );
  } catch (error) {
    console.error("Fetch Error:", error);
    return sendError("Something went wrong", 500);
  }
}
