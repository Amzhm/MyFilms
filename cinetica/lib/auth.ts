// lib/auth.ts
import { DefaultSession, AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
                    // Pas besoin de faire un fetch, on peut directement vérifier
                    const { username, password } = credentials;
                    
                    // Import direct du user et bcrypt
                    const bcrypt = require('bcryptjs');
                    const { user } = require('@/repository/user');

                    if (username === user.username && bcrypt.compareSync(password, user.password)) {
                        return {
                            id: '1',
                            username: credentials.username,
                            apiKey: process.env.TMDB_API_KEY || ''
                        };
                    }
                    return null;
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 2 * 60 * 60,
    },
    pages: {
        signIn: '/login',
        error: '/login',
        signOut: '/login'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.username = user.username;
                token.apiKey = user.apiKey;
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