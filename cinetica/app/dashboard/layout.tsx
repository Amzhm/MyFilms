'use client';

import { PropsWithChildren } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Content } from './components/Content';

export default function DashboardLayout({ children }: PropsWithChildren) {
    return (
        <div
            className="h-screen w-screen grid"
            style={{
                gridTemplateAreas: `
          'header header'
          'divider divider'
          'sidebar content'
        `,
                gridTemplateColumns: '300px 1fr', // Sidebar à 200px et le contenu principal prenant le reste
                gridTemplateRows: '50px 2px 1fr', // Header de 40px, ligne de 2px, et le reste pour le contenu
            }}
        >
            <Header>
                {/* Groupe logo + texte placé à gauche */}
                <div className="flex items-center space-x-2">
                    <span className="text-3xl">🎬</span>
                    <span className="text-2xl font-bold text-black">Cinetica</span>
                </div>
                {/* Champ de recherche placé à droite */}
                <input placeholder="search" className="ml-4 p-1 border border-gray-300 rounded" />
            </Header>

            {/* Ligne de séparation sous le header */}
            <div
                style={{ gridArea: 'divider' }}
                className="border-b-2 border-gray-300 w-full"
            ></div>

            <Sidebar></Sidebar>
            <Content>
                <p>Coding in progress ...</p>
                {children}
            </Content>
        </div>
    );
}
