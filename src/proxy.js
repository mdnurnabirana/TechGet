import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;
  const role = token?.role;

  const redirectToLogin = (reason) => {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    if (reason) url.searchParams.set("reason", reason);
    return NextResponse.redirect(url);
  };

  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      return redirectToLogin("unauthenticated");
    }

    if (role !== "admin") {
      return redirectToLogin("permission");
    }
  }

  if (
    pathname.startsWith("/profile") ||
    pathname.startsWith("/user") ||
    pathname.startsWith("/orders") ||
    pathname.startsWith("/cart")
  ) {
    if (!isAuthenticated) {
      return redirectToLogin("unauthenticated");
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/profile/:path*",
    "/user/:path*",
    "/orders/:path*",
    "/cart/:path*",
  ],
};