import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const privateRoutePattern = /^\/dashboard(\/|$)/;
const publicRoutePattern = /^\/(sign-in|sign-up|forgot-password|reset-password)(\/|$)/;

export async function middleware(req: NextRequest) {
  const response = (await middlewareAuth(req)) ?? NextResponse.next();
  return response;
}

export async function middlewareAuth(request: NextRequest) {
  if (privateRoutePattern.test(request.nextUrl.pathname)) {
    return handlePrivateRoutes(request);
  }
  if (publicRoutePattern.test(request.nextUrl.pathname)) {
    return handlePublicRoutes(request);
  }
}

export async function handlePrivateRoutes(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(
      new URL(`/sign-in?callbackUrl=${encodeURIComponent(request.nextUrl.pathname)}`, request.url)
    );
  }
}

export async function handlePublicRoutes(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and static assets, unless found in search params
    "/((?!_next|api/auth|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Optionally include trpc if you're using it
    "/(api|trpc)(.*)",
  ],
};
