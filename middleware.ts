import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest) {
  const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    const token = req.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
    try {
      const payload = await jose.jwtVerify(token, JWT_SECRET);

      if (!payload) {
        return NextResponse.redirect(new URL("/signin", req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
