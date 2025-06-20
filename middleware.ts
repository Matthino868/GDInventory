// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_PATHS = ["/login", "/register"];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Allow public routes
    if (PUBLIC_PATHS.includes(pathname)) {
        return NextResponse.next();
    }

    // Get the session token from cookies
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // If no token, redirect to login
    if (!token) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("callbackUrl", req.url); // optional: redirect back after login
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all routes except:
         * - api routes
         * - _next static/image
         * - favicon.ico
         * - login and register pages
         * - all files with an extension (static assets)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|login|register|.*\\..*).*)',
        
    ],
};

