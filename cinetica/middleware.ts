// middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        const { pathname } = req.nextUrl;
        const isAuth = !!req.nextauth.token;
        console.log('Middleware - Path:', pathname, 'Auth:', isAuth); // Debug

        // Si authentifié, rediriger /login vers /dashboard
        if (isAuth && pathname === '/login') {
            console.log('Redirect authenticated user from /login to /dashboard');
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        // Si authentifié, rediriger / vers /dashboard
        if (isAuth && pathname === '/') {
            console.log('Redirect authenticated user from / to /dashboard');
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        // Si non authentifié, rediriger / vers /login
        if (!isAuth && pathname === '/') {
            console.log('Redirect unauthenticated user to /login');
            return NextResponse.redirect(new URL('/login', req.url));
        }

        // Si non authentifié et essaie d'accéder à une route protégée
        if (!isAuth && (pathname.startsWith('/dashboard') || pathname.startsWith('/api'))) {
            console.log('Redirect unauthenticated user from protected route to /login');
            return NextResponse.redirect(new URL('/login', req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                const { pathname } = req.nextUrl;
                console.log('Authorization check - Path:', pathname, 'Token exists:', !!token); // Debug

                // Protection des routes /dashboard et /api
                if (pathname.startsWith('/dashboard') || pathname.startsWith('/api')) {
                    return !!token;
                }

                // Autres routes sont accessibles
                return true;
            }
        }
    }
);

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (public folder)
         */
        '/((?!_next/static|_next/image|favicon.ico|public).*)',
        '/',
        '/login',
        '/dashboard/:path*',
        '/api/:path*'
    ]
};