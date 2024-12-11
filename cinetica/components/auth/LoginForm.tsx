import { LogoSection } from './LogoSection';
import { LoginInputs } from './LoginInputs';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';

interface LoginFormProps {
    onSubmit: (credentials: { username: string; password: string }) => void;
    onGoogleLogin: () => void;
    isLoading: boolean;
    error?: string;
}

export function LoginForm({ onSubmit, onGoogleLogin, isLoading, error }: LoginFormProps) {
    return (
        <div className="flex justify-center items-center h-full font-sans font-medium bg-[url('./img/backgroud_login.jpg')] dark:bg-[url('./img/background_login_dm.jpg')] bg-cover bg-center dark:bg-gray-900">
            <div className="md:h-3/6 flex flex-col md:rounded-xl justify-center items-center h-full w-[600px] bg-white bg-opacity-80 dark:bg-gray-900 md:dark:bg-[#D1D1D1] shadow md:dark:bg-opacity-80 dark:bg-opacity-80">
                <LogoSection />
                <LoginInputs onSubmit={onSubmit} isLoading={isLoading} />
                {error && <div className="text-red-500 mb-4">{error}</div>}
                
                <div className="w-4/5 flex items-center gap-3 mb-6">
                    <div className="h-px flex-grow bg-gray-300 dark:bg-gray-700"></div>
                    <span className="text-sm text-gray-500 dark:text-gray-700">ou</span>
                    <div className="h-px flex-grow bg-gray-300 dark:bg-gray-700"></div>
                </div>

                <div className="w-4/5 mb-8">
                    <Button
                        onClick={onGoogleLogin}
                        className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-black dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white"
                        variant="outline"
                        type="button"
                    >
                        <FcGoogle className="w-5 h-5" />
                        Google
                    </Button>
                </div>
            </div>
        </div>
    );
}