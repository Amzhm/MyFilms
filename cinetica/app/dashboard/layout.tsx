'use client';

import { PropsWithChildren, useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Content } from './components/Content';
import { Menu, X } from 'lucide-react';

export default function DashboardLayout({ children }: PropsWithChildren) {
    const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window === 'undefined') return; // Vérifie que `window` est défini

        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsSidebarVisible(true);
            } else {
                setIsSidebarVisible(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const toggleSidebar = () => {
        setIsSidebarVisible(prev => !prev);
    };

    return (
        <div
            className="h-screen w-screen grid"
            style={{
                gridTemplateAreas: `
                    'header header'
                    'divider divider'
                    'sidebar content'
                `,
                gridTemplateColumns: isSidebarVisible ? '300px 1fr' : '0px 1fr',
                gridTemplateRows: '50px 2px 1fr',
            }}
        >
            <Header>
                <div className="flex items-center space-x-2">
                    <span className="text-3xl">🎬</span>
                    <span className="text-2xl font-bold text-black">Cinetica</span>
                </div>
                <input placeholder="search" className="ml-4 p-1 border border-gray-300 rounded" />
            </Header>

            <div
                style={{ gridArea: 'divider' }}
                className="border-b-2 border-gray-300 w-full"
            ></div>

            {/* Sidebar avec affichage conditionnel */}
            <div className={`${isSidebarVisible ? 'block' : 'hidden'} lg:block relative`}>
                <Sidebar />
                {/* Bouton de fermeture de la sidebar en mode mobile */}
                {isSidebarVisible && (
                    <button
                        className="absolute top-2 right-2 p-2 bg-gray-200 text-gray-700 rounded-full z-20 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-200 lg:hidden"
                        onClick={toggleSidebar}
                    >
                        <X className="w-6 h-6" />
                    </button>
                )}
            </div>

            {/* Bouton pour ouvrir la sidebar uniquement sur petits écrans si elle est masquée */}
            {!isSidebarVisible && (
                <button
                    className="fixed top-[60px] left-4 p-2 bg-gray-200 text-gray-700 rounded-full z-10 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-200 lg:hidden"
                    onClick={toggleSidebar}
                >
                    <Menu className="w-6 h-6" />
                </button>
            )}

            <Content>
                <p>Coding in progress ...</p>
                {children}
            </Content>
        </div>
    );
}
