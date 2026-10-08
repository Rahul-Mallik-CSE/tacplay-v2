/** @format */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

/**
 * Cookie names — must match what src/lib/auth.ts writes.
 */
const ACCESS_TOKEN = "accessToken";
const AUTH_USER = "tpAuthUser";

/**
 * Public paths that do NOT require authentication.
 * Everything else needs a valid token.
 */
const PUBLIC_PATHS = [
  "/sign-in",
  "/sign-up",
  "/forgot-pass",
  "/verify-otp",
  "/reset-pass",
  "/profile-setup",
  "/verify-email",
  "/create-new-pass",
];

/**
 * Check whether a pathname belongs to a public auth path.
 */
function isPublicPath(pathname: string): boolean {
  const normalised = pathname.endsWith("/") && pathname !== "/"
    ? pathname.slice(0, -1)
    : pathname;

  return PUBLIC_PATHS.some(
    (route) => normalised === route || normalised.startsWith(`${route}/`),
  );
}

/**
 * Read the persisted user object from the `tpAuthUser` cookie.
 * Returns null if missing or unparseable.
 */
function getUserFromCookie(
  request: NextRequest,
): { account_type?: string; role?: string } | null {
  const raw = request.cookies.get(AUTH_USER)?.value;
  if (!raw) return null;

  try {
    return JSON.parse(decodeURIComponent(raw));
  } catch {
    return null;
  }
}

/**
 * Check whether the access token exists and is not expired.
 */
function hasValidToken(request: NextRequest): boolean {
  const token = request.cookies.get(ACCESS_TOKEN)?.value;
  if (!token) return false;

  try {
    const decoded = jwtDecode<{ exp?: number }>(token);
    if (!decoded.exp) return true; // no expiry → treat as valid
    return decoded.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

// ─── Next.js 16 Proxy ────────────────────────────────────────────────────

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── 1. Root path → let client-side handle the redirect ──────────────
  if (pathname === "/") {
    return NextResponse.next();
  }

  // ── 2. Public auth paths ────────────────────────────────────────────
  if (isPublicPath(pathname)) {
    // Flow paths (OTP verification, password reset, etc.) must remain accessible
    // during multi-step auth processes even when temporary tokens are set in cookies.
    const isFlowPath =
      pathname.startsWith("/verify-otp") ||
      pathname.startsWith("/reset-pass") ||
      pathname.startsWith("/verify-email") ||
      pathname.startsWith("/create-new-pass");

    if (!isFlowPath) {
      // For entry auth pages (sign-in, sign-up, forgot-pass), only redirect if
      // the user has BOTH a valid token AND an authenticated user profile cookie.
      const user = getUserFromCookie(request);
      if (hasValidToken(request) && user) {
        const accountType = user.account_type || user.role;
        const isAdminUser = accountType === "admin" || accountType === "admin_staff";

        if (isAdminUser) {
          return NextResponse.redirect(new URL("/admin", request.url));
        }
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    // Otherwise, let them through.
    return NextResponse.next();
  }

  // ── 3. Protected paths → require authentication ─────────────────────
  if (!hasValidToken(request)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // ── 4. Role-based access control ────────────────────────────────────
  const user = getUserFromCookie(request);
  const accountType = user?.account_type || user?.role;
  const isAdminUser = accountType === "admin" || accountType === "admin_staff";

  // Admin / Admin staff trying to access /dashboard/* → send to /admin
  if (pathname.startsWith("/dashboard") && isAdminUser) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Field owner trying to access /admin/* → send to /dashboard
  if (pathname.startsWith("/admin") && !isAdminUser) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

/**
 * Only run the proxy on page requests — skip static assets, images, etc.
 */
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$|.*\\.gif$|.*\\.webp$|.*\\.ico$|manifest.json).*)",
  ],
};
