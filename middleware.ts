import { NextRequest, NextResponse } from "next/server";

// Must match TOKEN_COOKIE_NAME in lib/api.ts (middleware runs on the edge, so no shared import)
const TOKEN_COOKIE_NAME = "yuvi_token";

const PROTECTED_PREFIXES = ["/workspace", "/settings", "/image-to-3d"];

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isProtected && !req.cookies.get(TOKEN_COOKIE_NAME)?.value) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", `${pathname}${search}`);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
