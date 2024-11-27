'use client';

import { PropsWithChildren } from 'react';
import { Header } from '@/app/dashboard/components/Header';
import { Sidebar } from '@/app/dashboard/components/Sidebar';
import { Content } from '@/app/dashboard/components/Content';
import { Menu, X, Search, Bell, User, Clapperboard } from 'lucide-react';
import { useDashboardLayout } from '@/hooks/useDashboardLayout';

export default function DashboardLayout({ children }: PropsWithChildren) {
    const { 
        isCollapsed, 
        isMobile, 
        toggleSidebar 
    } = useDashboardLayout();

    return (
        <div className="min-h-screen w-screen bg-white dark:bg-black text-neutral-900 dark:text-white overflow-hidden font-sans">
            {isMobile && !isCollapsed && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-500 ease-in-out"
                    onClick={toggleSidebar}
                />
            )}

            <div
                className="min-h-screen w-full grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] dark:bg-black"
                style={{
                    gridTemplateAreas: "'header header' 'divider divider' 'sidebar content'",
                    gridTemplateColumns: isCollapsed ? '80px 1fr' : '280px 1fr',
                    gridTemplateRows: '64px 1px 1fr',
                }}
            >
                <Header>
                    <div className="flex justify-between items-center w-full px-6 dark:bg-black">
                        <div className="flex items-center space-x-3 dark:bg-black">
                            {isMobile && (
                                <button
                                    onClick={toggleSidebar}
                                    className="p-2 mr-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300 lg:hidden"
                                >
                                    {isCollapsed ? (
                                        <Menu className="w-6 h-6 text-gray-700 dark:text-white" />
                                    ) : (
                                        <X className="w-6 h-6 text-gray-700 dark:text-white" />
                                    )}
                                </button>
                            )}
                            <Clapperboard size={28} className="text-neutral-700 dark:text-white" />
                            <h1 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white">
                                CINETICA
                            </h1>
                        </div>
                        
                        <div className="flex items-center space-x-4 dark:bg-black">
                            <div className="relative group dark:bg-black hidden sm:block">
                                <input 
                                    placeholder="Search movies, series..." 
                                    className="w-72 px-4 py-2 pl-10 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-black text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-600 focus:border-transparent transition-all duration-300"
                                />
                                <Search 
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-white" 
                                    size={20} 
                                />
                            </div>
                            <button className="text-neutral-600 dark:text-white hover:text-neutral-900 dark:hover:text-neutral-100 relative">
                                <Bell size={22} />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                                    3
                                </span>
                            </button>
                            <button className="bg-neutral-200 dark:bg-neutral-700 p-2 rounded-full">
                                <User size={20} className="text-neutral-700 dark:text-white" />
                            </button>
                        </div>
                    </div>
                </Header>

                <div
                    style={{ gridArea: 'divider' }}
                    className="bg-neutral-200 dark:bg-neutral-800 fixed top-[65px] w-full z-40"
                />

                <div 
                    className={`
                        transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                        fixed lg:fixed
                        lg:block
                        z-50 lg:z-auto
                        h-full
                        bg-white dark:bg-black
                        shadow-lg lg:shadow-none
                        top-[65px]
                        ${isMobile && isCollapsed ? '-translate-x-full' : 'translate-x-0'}
                        pointer-events-auto
                    `}
                    style={{ 
                        width: isCollapsed ? '80px' : '280px',
                    }}
                >
                    <Sidebar 
                        isCollapsed={isCollapsed}
                        onToggle={() => !isMobile && toggleSidebar()}
                        isMobile={isMobile}
                    />
                </div>

                <Content>
                        {children}
                </Content>
            </div>
        </div>
    );
}