import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

export const locales = ["en", "fa"];

const intlMiddleware = createMiddleware({
  locales: locales,
  defaultLocale: "fa",
  localePrefix: "as-needed",
  localeDetection: false,
});
export default function middleware(req: NextRequest) {
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
