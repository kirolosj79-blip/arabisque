import { NextRequest, NextResponse } from "next/server";

// Routes that require admin authentication
const ADMIN_API_ROUTES = [
  "/api/settings",
  "/api/menu-items",
  "/api/menu-offers",
  "/api/order-links",
  "/api/reviews",
];

// Public GET methods allowed without auth (for the website to read data)
const PUBLIC_GET_ROUTES = [
  "/api/settings",   // website reads settings (phone, hours, socials)
  "/api/menu-offers", // website shows offers
  "/api/order-links", // website shows order buttons
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const reqMethod = req.method;
  // Check if this is an admin API route
  const isAdminRoute = ADMIN_API_ROUTES.some(r => pathname.startsWith(r));
  if (!isAdminRoute) return NextResponse.next();

  // Allow public GET on specific routes (website needs to read them)
  const isPublicGet = reqMethod === "GET" && PUBLIC_GET_ROUTES.some(r => pathname.startsWith(r));
  if (isPublicGet) return NextResponse.next();

  // All other methods (POST, PATCH, DELETE) and reviews GET require auth
  const session = req.cookies.get("admin_session");
  if (session?.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
