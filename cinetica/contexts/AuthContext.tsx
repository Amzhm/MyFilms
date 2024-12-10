// contexts/AuthContext.tsx
import { createContext, useContext, PropsWithChildren } from 'react';
import { AuthUseCase } from '@/useCases/auth/authUseCase';

type AuthContextType = {
    authUseCase: AuthUseCase;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
    const authUseCase = new AuthUseCase();
    
    return (
        <AuthContext.Provider value={{ authUseCase }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within AuthProvider');
    }
    return context;
};