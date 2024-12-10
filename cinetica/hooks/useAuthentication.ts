// hooks/useAuthentication.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Credentials } from '@/domain/auth/types';
import { useAuthContext } from '@/contexts/AuthContext';
import { signIn } from 'next-auth/react';

export function useAuthentication() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { authUseCase } = useAuthContext();

    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true);
            await signIn('google', { callbackUrl: '/dashboard' });
        } catch (error) {
            setError('Erreur de connexion avec Google');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async (credentials: Credentials) => {
        setIsLoading(true);
        setError('');
        
        const result = await authUseCase.login(credentials);
        
        if (result.success) {
            router.push('/dashboard');
        } else {
            setError(result.error || 'Erreur de connexion');
        }
        
        setIsLoading(false);
    };

    return { handleLogin, handleGoogleLogin, isLoading, error };
}