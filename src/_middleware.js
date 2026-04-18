import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;

  const isAdminPage = nextUrl.pathname.startsWith("/admin");

  if (isAdminPage) {
    // If not logged in -> go to login
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/home/login", nextUrl));
    }
    // If logged in but NOT an admin -> go to home
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/home", nextUrl));
    }
  }

  // Allow everything else (including /home/login and /home) to load normally
  return NextResponse.next();
});

export const config = {
  // Match everything except static files and api routes
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
