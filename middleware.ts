import { NextRequest, NextResponse } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/locales";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return NextResponse.next();

  const acceptLanguage = request.headers.get("accept-language") || "";
  const preferredLocale =
    LOCALES.find((l) => l !== DEFAULT_LOCALE && acceptLanguage.toLowerCase().includes(l)) ??
    DEFAULT_LOCALE;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
