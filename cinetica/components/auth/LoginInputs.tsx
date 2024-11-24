// components/auth/LoginInputs.tsx
import { useState, FormEvent, ChangeEvent } from 'react';

interface LoginInputsProps {
  onSubmit: (credentials: { username: string; password: string }) => void;
  isLoading: boolean;
}

export function LoginInputs({ onSubmit, isLoading }: LoginInputsProps) {
    const [values, setValues] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(values);
    };

    return (
        <form onSubmit={handleSubmit} className="w-4/5">
            <div className='mb-2 h-11 rounded-sm border-gray-900 border-2 dark:border-0 relative'>
                <input
                    className="w-full h-full pl-9 rounded-sm"
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={values.username}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => 
                        setValues(prev => ({...prev, username: e.target.value}))}
                />
            </div>
            <div className='mb-6 h-11 rounded-sm border-gray-900 border-2 dark:border-0 relative'>
                <input
                    className="w-full h-full pl-9 rounded-sm"
                    type="password"
                    placeholder="Mot de passe"
                    value={values.password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => 
                        setValues(prev => ({...prev, password: e.target.value}))}
                />
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="font-bold bg-gray-900 mb-9 text-white w-full rounded-sm h-10 hover:bg-gray-600 dark:bg-gray-900 dark:hover:bg-gray-500"
            >
                {isLoading ? 'Connexion...' : 'Se connecter'}
            </button>
        </form>
    );
}