import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isApiRoute = pathname.startsWith("/api");

  if (
    pathname.startsWith("/profile") ||
    pathname.startsWith("/api/user") ||
    pathname.startsWith("/api/favourites")
  ) {
    if (!token) {
      if (isApiRoute) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (pathname.includes("/users") || pathname.startsWith("/api/admin")) {
    if (!token) {
      if (isApiRoute) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/", req.url));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role !== "admin") {
        if (isApiRoute) {
          return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch {
      if (isApiRoute) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/users/:path*",
    "/api/user/:path*",
    "/api/favourites/:path*",
    "/api/admin/:path*",
  ],
};
