// /lib/auth.ts
import { DefaultSession, AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

declare module "next-auth" {
    interface User {
        username: string;
        apiKey: string;
    }
    interface Session extends DefaultSession {
        user: {
            username: string;
            apiKey: string;
        } & DefaultSession["user"]
    }
}

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null;
                
                try {
                    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/Authentification`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(credentials),
                    });

                    const data = await response.json();
                    
                    if (data.isAuthenticated) {
                        return {
                            id: '1',
                            username: credentials.username,
                            apiKey: process.env.TMDB_API_KEY || ''
                        };
                    }
                    return null;
                } catch {
                    return null;
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    jwt: {
        maxAge: 30*60,
    },
    session: {
        strategy: 'jwt',
        maxAge: 30*60,
    },
    pages: {
        signIn: '/login',
        error: '/login',
        signOut: '/login'
    },
    callbacks: {
        async jwt({ token, user,account }) {
            if (user) {
                token.username = user.username;
                token.apiKey = user.apiKey;
            }
            if (account?.provider === 'google') {
                token.apiKey = process.env.TMDB_API_KEY;
                token.username = token.email?.split('@')[0];
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.username = token.username as string;
                session.user.apiKey = token.apiKey as string;
            }
            return session;
        }
    }
};