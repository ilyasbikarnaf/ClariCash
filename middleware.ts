import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest) {
  const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("auth_token")?.value;

  if (pathname === "/") {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    try {
      await jose.jwtVerify(token, JWT_SECRET);
    } catch {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  if (pathname === "/signin" || pathname === "/signup") {
    if (token) {
      try {
        await jose.jwtVerify(token, JWT_SECRET);
        return NextResponse.redirect(new URL("/", req.url));
      } catch {
        return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signin", "/signup"],
};
