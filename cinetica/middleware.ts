// middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        const { pathname } = req.nextUrl;
        const isAuth = !!req.nextauth.token;

        if (isAuth && pathname === '/login') {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        if (isAuth && pathname === '/') {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        if (!isAuth && pathname === '/') {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                const { pathname } = req.nextUrl;
                if (pathname.startsWith('/dashboard') || pathname.startsWith('/api/movies')) {
                    return !!token;
                }
                return true;
            }
        }
    }
);

export const config = {
    matcher: ['/', '/login', '/dashboard/:path*', '/api/:path*']
};