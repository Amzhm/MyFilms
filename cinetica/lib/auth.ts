// lib/auth.ts
import { DefaultSession, AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { user } from '@/repository/user';

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
                if (!credentials?.username || !credentials?.password) {
                    console.log("Missing credentials");
                    return null;
                }
                
                try {
                    const { username, password } = credentials;
                    console.log("Auth attempt:", { username });
                    
                    const match = await bcrypt.compare(password, user.password);
                    console.log("Password match:", match);
                    
                    if (username === user.username && match) {
                        const userData = {
                            id: '1',
                            username: credentials.username,
                            apiKey: process.env.TMDB_API_KEY || ''
                        };
                        console.log("Auth successful:", userData);
                        return userData;
                    }
                    
                    console.log("Auth failed");
                    return null;
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            }
        })
    ],
    debug: true,  // Active les logs détaillés
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