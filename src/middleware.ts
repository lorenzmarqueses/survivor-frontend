import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: Request) {
  const cookie = (await cookies()).get("token");

  const url = new URL(request.url);

  // Prevent redirect loop by checking if the user is already on the login page
  if (cookie && url.pathname === "/login") {
    // Redirect to the dashboard if the user is authenticated
    return NextResponse.redirect(new URL("/report", url));
  }

  if (!cookie && url.pathname !== "/login" && url.pathname !== "/register") {
    // If the user is not authenticated, redirect to login page
    return NextResponse.redirect(new URL("/login", url));
  }

  // Allow request to continue if the user is on the right page
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/", "/report", "/survivors", "/inventory"],
};
