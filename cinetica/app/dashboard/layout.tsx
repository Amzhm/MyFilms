'use client';

import { PropsWithChildren, Suspense } from 'react';
import { Header } from '@/app/dashboard/components/Header';
import { Sidebar } from '@/app/dashboard/components/Sidebar';
import { Content } from '@/app/dashboard/components/Content';
import { Menu, X, Bell, User, Clapperboard, LogOut } from 'lucide-react';
import { useDashboardLayout } from '@/hooks/useDashboardLayout';
import { SearchInput } from './components/SearchInput';
import { LayoutProvider } from '@/contexts/LayoutContext';
import { MovieProvider } from '@/contexts/MovieContext';
import { ShowProvider } from '@/contexts/ShowContext';
import { RepositoryProvider } from '@/contexts/Repository';
import { Movies } from '@/repository/Movies';
import { Shows } from '@/repository/Shows';
import Link from 'next/link';

export default function DashboardLayout({ children }: PropsWithChildren) {
    return (
        <RepositoryProvider>
            <LayoutProvider>
                <MovieProvider moviesRepository={new Movies()}>
                    <ShowProvider showsRepository={new Shows()}>
                        <DashboardLayoutContent>{children}</DashboardLayoutContent>
                    </ShowProvider>
                </MovieProvider>
            </LayoutProvider>
        </RepositoryProvider>
    );
}

function DashboardLayoutContent({ children }: PropsWithChildren) {
    const { 
        isCollapsed,
        setIsCollapsed,
        isMobile, 
        toggleSidebar,
        showLogout,
        setShowLogout,
        handleLogout,
        popupRef
    } = useDashboardLayout();

    return (
        <div className="min-h-screen w-screen bg-white dark:bg-black text-neutral-900 dark:text-white overflow-hidden font-sans">
            {isMobile && !isCollapsed && (
                <div 
                    className="fixed inset-0 bg-white dark:bg-black z-40 transition-opacity duration-500 ease-in-out"
                    onClick={toggleSidebar}
                />
            )}
            

            <div
                className="min-h-screen w-full grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] dark:bg-black"
                style={{
                    gridTemplateAreas: "'header header' 'divider divider' 'sidebar content'",
                    gridTemplateColumns: isCollapsed ? (isMobile ? '0px 1fr' : '80px 1fr') : (isMobile ? '1fr 0px ' : '280px 1fr'),
                    gridTemplateRows: isMobile ? '96px 1px 1fr' : '64px 1px 1fr',
                }}
            >
                {/* Header */}
                <Header>
                    <div className="flex flex-col w-full dark:bg-black">
                        <div className="flex justify-between items-center w-full pr-6 pl-1">
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={toggleSidebar}
                                    className="p-2 mr-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300"
                                >
                                    {isCollapsed ? (
                                        <Menu className="w-6 h-6 text-gray-700 dark:text-white"  data-testid="menu"/>
                                    ) : (
                                        <X className="w-6 h-6 text-gray-700 dark:text-white" data-testid="x"/>
                                    )}
                                </button>
                                <Link href="/dashboard" className="flex items-center space-x-2">
                                    <Clapperboard size={28} className="text-neutral-700 dark:text-white" />
                                    <h1 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white">
                                        CINETICA
                                    </h1>
                                </Link>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="hidden lg:block">
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <SearchInput />
                                    </Suspense>
                                </div>

                               
                                <button className="text-neutral-600 dark:text-white hover:text-neutral-900 dark:hover:text-neutral-100 relative">
                                    <Bell size={22} />
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                                        3
                                    </span>
                                </button>

                                
                                <div className="relative z-50 -mt-2" ref={popupRef}>
                                    <button 
                                        onClick={() => setShowLogout(!showLogout)}
                                        className="bg-neutral-200 dark:bg-neutral-700 p-2 rounded-full"
                                    >
                                        <User size={20} className="text-neutral-700 dark:text-white" />
                                    </button>
                                    {showLogout && (
                                        <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-neutral-800 rounded-lg shadow-xl">
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-700"
                                            >
                                                <LogOut className="w-4 h-4 mr-2" />
                                                Log Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {(isCollapsed || !isMobile) && (
                            <div className="lg:hidden px-4 pb-2">
                                <Suspense fallback={<div>Loading...</div>}>
                                    <SearchInput />
                                </Suspense>
                            </div>
                        )}
                    </div>
                </Header>

                {/* Divider */}
                <div
                    style={{ gridArea: 'divider' }}
                    className="bg-neutral-200 dark:bg-neutral-800 fixed top-[96px] lg:top-[65px] w-full z-40"
                />

                {/* Sidebar */}
                <div 
                    className={`
                        transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                        fixed lg:fixed
                        lg:block
                        z-50 lg:z-auto
                        h-full
                        bg-white dark:bg-black
                        lg:shadow-none
                        ${isMobile ? 'top-[97px]' : 'top-[65px]'}
                        ${isMobile && isCollapsed ? '-translate-x-full' : 'translate-x-0'}
                        pointer-events-auto
                    `}
                    style={{ 
                        width: isCollapsed ? '80px' : '280px',
                    }}
                >
                    <Sidebar 
                        isCollapsed={isCollapsed}
                        setIsCollapsed={setIsCollapsed}
                    />
                </div>

                {/* Main Content */}
                <Content>
                    {children}
                </Content>
            </div>
        </div>
    );
}