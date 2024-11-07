'use client';

import { PropsWithChildren } from 'react';
import {Header} from './components/Header';
import {Sidebar} from './components/Sidebar';
import {Content} from './components/Content';

export default function DashboardLayout({ children }: PropsWithChildren) {
    return (
        <div
            className="h-screen w-screen grid bg-blue-400"
            style={{
                gridTemplateAreas: `
          'header header'
          'sidebar content'
        `,
                gridTemplateColumns: '200px 1fr', // Sidebar à 200px et le contenu principal prenant le reste
                gridTemplateRows: '40px 1fr', // Header de 40px et le reste pour le contenu
            }}
        >
            <Header>
                <span className="text-3xl">🎬</span>
                <span className="text-5xl">Cinetica</span>
                <input placeholder="search" className="ml-4 p-1 border border-gray-300 rounded"/>
            </Header>
            <Sidebar>Sidebar</Sidebar>
            <Content>{children}</Content>
        </div>
    );
}
