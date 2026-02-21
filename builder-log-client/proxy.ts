import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isProtectedRoute = pathname.startsWith("/timeline") || pathname.startsWith("/insights") || pathname.startsWith("/projects") || pathname.startsWith("/settings");

    const response = NextResponse.next();

    // Set no-cache headers for protected routes
    if (isProtectedRoute) {
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.headers.set('Pragma', 'no-cache');
    }

    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)",
    ],
};