import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "it"] as const;

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const lang = req.headers
    .get("accept-language")
    ?.toLowerCase()
    .startsWith("en")
    ? "en"
    : "it";
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return;
  req.nextUrl.pathname = `/${lang}${pathname}`;
  return NextResponse.redirect(req.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
