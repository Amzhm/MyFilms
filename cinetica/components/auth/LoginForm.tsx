// components/auth/LoginForm.tsx
import { LogoSection } from './LogoSection';
import { LoginInputs } from './LoginInputs';

interface LoginFormProps {
    onSubmit: (credentials: { username: string; password: string }) => void;
    isLoading: boolean;
    error?: string;
}

export function LoginForm({ onSubmit, isLoading, error }: LoginFormProps) {
    return (
        <div className="flex justify-center items-center h-full font-sans font-medium bg-[url('./img/backgroud_login.jpg')] dark:bg-[url('./img/background_login_dm.jpg')] bg-cover bg-center dark:bg-gray-900">
            <div className="md:h-3/6 flex flex-col md:rounded-xl justify-center items-center h-full w-[600px] bg-white bg-opacity-80 dark:bg-gray-900 md:dark:bg-[#D1D1D1] shadow md:dark:bg-opacity-80">
                <LogoSection />
                <LoginInputs onSubmit={onSubmit} isLoading={isLoading} />
                {error && <div className="text-red-500 mb-4">{error}</div>}
            </div>
        </div>
    );
}