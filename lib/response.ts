import { NextResponse } from "next/server";

export function sendError(message: string, status: number = 400, details?: any) {
  return NextResponse.json({ success: false, message, details }, { status });
}

export function sendSuccess(data: any, status: number = 200) {
  return NextResponse.json({ success: true, ...data }, { status });
}
