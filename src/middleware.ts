import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // Get locale from path
  const locale =
    routing.locales.find((l) => pathname.startsWith(`/${l}/`)) ||
    routing.defaultLocale;

  // Redirect authenticated users from login/register page to home
  if (token && (pathname.endsWith("/login") || pathname.endsWith("/register"))) {
    return NextResponse.redirect(new URL(`/${locale}/home`, req.url));
  }

  // Expanded public paths based on the project structure
  const publicPaths = [
    "/",
    "/login",
    "/register",
    "/prices",
    "/services",
    "/learn",
    "/products",
  ];

  // Helper function to check if a path is public
  const isPublic = (path: string) => {
    // Check for exact match or if the path starts with a public path followed by a '/'
    return publicPaths.some(
      (publicPath) =>
        path === publicPath || path.startsWith(publicPath + "/")
    );
  };

  // Remove locale from the path to check against publicPaths
  const pathWithoutLocale = pathname.replace(
    new RegExp(`^/(${routing.locales.join("|")})`),
    ""
  );

  // If the path without locale is empty, it's the root, which is public
  if (pathWithoutLocale === "") {
    return intlMiddleware(req);
  }

  // Check if the path without locale is a public page
  if (isPublic(pathWithoutLocale)) {
    return intlMiddleware(req);
  }

  // For all other paths, apply authentication
  return (authMiddleware as any)(req);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};