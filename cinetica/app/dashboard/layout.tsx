'use client';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './components/AppSidebar';
import { Header } from './components/Header';
import { Content } from './components/Content';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="h-screen w-screen grid"
            style={{
                gridTemplateAreas: `
                    'header header'
                    'divider divider'
                    'sidebar content'
                `,
                gridTemplateColumns: '300px 1fr',
                gridTemplateRows: '50px 2px 1fr',
            }}
        >
            {/* Header */}
            <Header>
                <div className="flex items-center space-x-2">
                    <span className="text-3xl">🎬</span>
                    <span className="text-2xl font-bold text-black">Cinetica</span>
                </div>
                <input
                    placeholder="search"
                    className="ml-4 p-1 border border-gray-300 rounded"
                />
            </Header>

            {/* Ligne de séparation sous le header */}
            <div
                style={{ gridArea: 'divider' }}
                className="border-b-2 border-gray-300 w-full"
            ></div>

            {/* Sidebar et contenu principal */}
            <SidebarProvider>
                {/* Ajout d'une marge en bas pour que la sidebar ne cache pas le header */}
                <div className="h-full">
                    <AppSidebar />
                </div>
                <main >
                    <SidebarTrigger />
                    {children}
                </main>
            </SidebarProvider>

            <Content>
                <p>Coding in progress ...</p>
                {children}
            </Content>
        </div>
    );
}
