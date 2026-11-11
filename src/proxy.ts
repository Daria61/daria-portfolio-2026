import { NextResponse, type NextRequest } from "next/server";
import {
  defaultLocale,
  hasLocale,
  LOCALE_COOKIE,
  type Locale,
} from "@/i18n/config";

const ONE_YEAR = 60 * 60 * 24 * 365;

/** Saved choice first, then the browser's Accept-Language, then the default. */
function preferredLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (hasLocale(saved)) return saved;

  const ranked = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((entry) => {
      const [tag, ...params] = entry.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return {
        language: tag.toLowerCase().split("-")[0],
        weight: q ? Number(q.trim().slice(2)) : 1,
      };
    })
    .sort((a, b) => b.weight - a.weight);

  for (const { language } of ranked) {
    if (hasLocale(language)) return language;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segment = pathname.split("/")[1];

  if (hasLocale(segment)) {
    const response = NextResponse.next();
    if (request.cookies.get(LOCALE_COOKIE)?.value !== segment) {
      response.cookies.set(LOCALE_COOKIE, segment, {
        path: "/",
        maxAge: ONE_YEAR,
        sameSite: "lax",
      });
    }
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next.js internals, API routes and files with an extension (public assets).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
