import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is an API route
  const isApiRoute = pathname.startsWith("/api")

  // Check if the path is a public route
  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/contact") ||
    pathname.startsWith("/partnerships")

  // Check if the path is an auth route
  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/verify")

  // Simple session check that works in Edge runtime
  // Just check if the session token cookie exists
  const sessionToken =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value

  const isLoggedIn = !!sessionToken

  // If it's an API route, don't do any redirects
  if (isApiRoute) return NextResponse.next()

  // If the user is logged in and trying to access an auth route, redirect them
  // unless they need to verify their email
  if (isLoggedIn && isAuthRoute && pathname !== "/verify") {
    // Allow access to verification page even when logged in
    if (pathname.startsWith("/verify")) {
      return NextResponse.next()
    }

    // We can't determine the role in middleware, so redirect to dashboard
    // The protected layout will handle further role-based redirects
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // If the user is not logged in and trying to access a protected route
  if (!isLoggedIn && !isAuthRoute && !isPublicRoute) {
    // Store the original URL to redirect back after login
    const callbackUrl = encodeURIComponent(request.nextUrl.pathname)
    return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
