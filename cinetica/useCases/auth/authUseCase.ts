// useCases/auth/authUseCase.ts
import { Credentials, AuthResult } from '@/domain/auth/types';
import { signIn } from 'next-auth/react';
import { signOut } from 'next-auth/react';

export class AuthUseCase {
    async login(credentials: Credentials): Promise<AuthResult> {
        try {
            const result = await signIn('credentials', {
                ...credentials,
                callbackUrl: '/dashboard',
                redirect: false,
            });

            return {
                success: result?.ok ?? false,
                error: !result?.ok ? 'Identifiants incorrects' : undefined
            };
        } catch (e) {
            console.log("Login error:", e);
            return {
                success: false,
                error: 'Erreur de connexion'
            };
        }
    }
    async logout(): Promise<void> {
        try {
            await signOut({ callbackUrl: '/login' });
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }
}