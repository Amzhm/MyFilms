// hooks/useAuthentication.ts
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Credentials {
    username: string;
    password: string;
}

export function useAuthentication() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (credentials: Credentials) => {
        setIsLoading(true);
        setError('');
        
        try {
            const result = await signIn('credentials', {
                ...credentials,
                callbackUrl: '/dashboard',
                redirect: false,
            });

            console.log("SignIn result:", result);

            if (result?.ok) {
                router.push('/dashboard');
            } else {
                setError('Identifiants incorrects');
            }
        } catch (e) {
            console.error("Login error:", e);
            setError('Erreur de connexion');
        } finally {
            setIsLoading(false);
        }
    };

    return { handleLogin, isLoading, error };
}