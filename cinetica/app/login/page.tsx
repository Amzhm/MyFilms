// app/login/page.tsx
'use client';
import { LoginForm } from '../../components/auth/LoginForm';
import { useAuthentication } from '../../hooks/useAuthentication';

export default function LoginPage() {
    const { handleLogin, isLoading, error } = useAuthentication();
    return <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />;
}