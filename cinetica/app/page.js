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
        if(errorMessage){}
        if(isAuthenticated){}
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
        <div className="flex justify-center items-center h-full font-sans font-medium bg-[url('./img/backgroud_login.jpg')] dark:bg-[url('./img/background_login_dm.jpg')] bg-cover bg-center dark:bg-gray-900">
            <div className="md:h-3/6 flex flex-col md:rounded-xl justify-center items-center h-full w-[600px] bg-white bg-opacity-80 dark:bg-gray-900 md:dark:bg-[#D1D1D1] shadow md:dark:bg-opacity-80 dark:bg-opacity-80">
                <div className="logo-section mt-5 flex flex-col items-center mb-5 ">
                    <span className="rotate-[-40deg] text-4xl text-black relative top-[15px] right-[7px]">🎬</span>
                    <span className="logo text-7xl font-bold md:dark:text-gray-900 dark:text-white">Cinetica</span>
                </div>
                <div className='w-4/5 mb-2 h-11 rounded-sm border-gray-900 border-2 dark:border-0  relative'>
                    <svg className="absolute bottom-[6px] left-[5px] dark:bottom-[8px] dark:text-white dark:opacity-50" width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM16 12V13.5C16 14.8807 17.1193 16 18.5 16V16C19.8807 16 21 14.8807 21 13.5V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21H16" stroke="CurrentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    <input
                        className="w-[100%] h-full pl-9 rounded-sm"
                        type="email"
                        placeholder="Adresse email"
                        value={loginInput}
                        onChange={(e) => setLoginInput(e.target.value)}
                    ></input>
                </div>
                <div className='w-4/5 mb-6 h-11 rounded-sm border-gray-900 border-2 dark:border-0 relative'>
                    <svg className="absolute bottom-[6px] dark:bottom-[8px]   left-[3px] dark:text-white dark:opacity-50" width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.1819 10.7027H6.00008C5.44781 10.7027 5.0001 11.1485 5.00009 11.7008C5.00005 13.3483 5 16.6772 5.00011 18.9189C5.00023 21.4317 8.88618 22 12 22C15.1139 22 19 21.4317 19 18.9189C19 16.6773 19 13.3483 19 11.7008C19 11.1485 18.5523 10.7027 18 10.7027H15.8182M8.1819 10.7027C8.1819 10.7027 8.18193 8.13514 8.1819 6.59459C8.18186 4.74571 9.70887 3 12 3C14.2912 3 15.8182 4.74571 15.8182 6.59459C15.8182 8.13514 15.8182 10.7027 15.8182 10.7027M8.1819 10.7027H15.8182" stroke="CurrentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M13 16.6181V18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18V16.6181C10.6931 16.3434 10.5 15.9442 10.5 15.5C10.5 14.6716 11.1716 14 12 14C12.8284 14 13.5 14.6716 13.5 15.5C13.5 15.9442 13.3069 16.3434 13 16.6181Z" fill="CurrentColor"></path> </g></svg>
                    <input
                        className="w-full h-full pl-9 rounded-sm "
                        type="password"
                        placeholder="Mot de passe"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                    ></input>
                </div>
                <button
                    className="font-bold bg-gray-900 mb-9 text-white w-4/5 rounded-sm h-10 hover:bg-gray-600 dark:bg-gray-900 dark:hover:bg-gray-500 shadow-[0_5px_15px_rgba(255,255,255)];"
                    onClick={handleLogin}
                >
                    Se connecter
                </button>
            </div>
        </div>
    );
}
