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
        try {
            const result = await signIn('credentials', {
                ...credentials,
                redirect: false
            });

            if (result?.ok) {
                router.push('/dashboard');
            } else {
                setError('Identifiants incorrects');
            }
        } catch (e) {
            console.error(e);
            setError('Erreur de connexion');
        } finally {
            setIsLoading(false);
        }
    };

    return { handleLogin, isLoading, error };
}