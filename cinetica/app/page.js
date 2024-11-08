'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const [loginInput, setLoginInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        const response = await fetch('/api/Authentification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: loginInput,
                password: passwordInput,
            }),
        });

        console.log('Response status:', response.status); // Log du statut de la réponse

        if (response.ok) {
            const data = await response.json();
            console.log('Response data:', data); // Log de la réponse

            if (data.isAuthenticated) {
                setIsAuthenticated(true);
                router.push('/dashboard');
            } else {
                setErrorMessage('Identifiants incorrects');
            }
        } else {
            setErrorMessage('Erreur de connexion');
        }
    };

    return (
        <div className="flex justify-center items-center h-full font-sans font-medium bg-[url('./img/backgroud_login.png')] bg-cover bg-center dark:bg-gray-900">
            <div className="flex flex-col rounded-xl content-center items-center h-3/6 w-1/2 bg-gray-900 bg-opacity-90 shadow dark:bg-opacity-80">
                <div className="logo-section mt-12 flex flex-col items-center mb-5 ">
                    <span className="-rotate-45 text-5xl text-white">🎬</span>
                    <span className="logo text-5xl text-white">Cinetica</span>
                </div>
                <input
                    className="w-4/5 mb-2 mt-5 h-10 rounded-sm pl-8 dark:bg-gray-700 dark:text-white"
                    type="email"
                    placeholder="Adresse email"
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                ></input>
                <input
                    className="w-4/5 mb-8 h-10 rounded-sm pl-8 dark:bg-gray-700 dark:text-white"
                    type="password"
                    placeholder="Mot de passe"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                ></input>
                <button
                    className="bg-gray-600 mb-9 text-white w-4/5 rounded-sm h-10 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-500"
                    onClick={handleLogin}
                >
                    Se connecter
                </button>
            </div>
        </div>
    );
}
