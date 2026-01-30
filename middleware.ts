import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if accessing admin panel (but not login page)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionCookie = request.cookies.get("admin_session");
    
    // If no session cookie, redirect to login
    if (!sessionCookie || !sessionCookie.value.startsWith("session_")) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }
  
  // Redirect from login page if already authenticated
  if (pathname === "/admin/login") {
    const sessionCookie = request.cookies.get("admin_session");
    if (sessionCookie && sessionCookie.value.startsWith("session_")) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
