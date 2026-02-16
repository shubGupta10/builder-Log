import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const authToken = request.cookies.get("auth_token");
    const { pathname } = request.nextUrl;

    const isProtectedRoute = pathname.startsWith("/timeline") || pathname.startsWith("/insights") || pathname.startsWith("/projects") || pathname.startsWith("/settings");
    const isAuthRoute = pathname.startsWith("/login");

    if (isAuthRoute && authToken) {
        const timelineUrl = new URL("/timeline", request.url);
        return NextResponse.redirect(timelineUrl);
    }

    const response = NextResponse.next();

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