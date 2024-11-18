'use client';

import { PropsWithChildren, useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Content } from './components/Content';
import { Menu, X, Search, Bell, User, Film, Tv, Star, Clapperboard } from 'lucide-react';

export default function DashboardLayout({ children }: PropsWithChildren) {
    const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);
    const [isClient, setIsClient] = useState<boolean>(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

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
    }, [isClient]);

    const toggleSidebar = () => {
        setIsSidebarVisible(prev => !prev);
    };

    return (
        <div className="h-screen w-screen bg-white dark:bg-black text-neutral-900 dark:text-white overflow-hidden font-sans">
            <div
                className="h-full w-full grid transition-all duration-300 ease-in-out dark:bg-black"
                style={{
                    gridTemplateAreas: `
                        'header header'
                        'divider divider'
                        'sidebar content'
                    `,
                    gridTemplateColumns: isSidebarVisible ? '280px 1fr' : '0px 1fr',
                    gridTemplateRows: '64px 1px 1fr',
                }}
            >
                {/* Header */}
                <Header >
                    <div className="flex justify-between items-center w-full px-6 dark:bg-black">
                        <div className="flex items-center space-x-3 dark:bg-blackw">
                            <Clapperboard size={28} className="text-neutral-700 dark:text-white" />
                            <h1 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white">
                                CINETICA
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4 dark:bg-black">
                            <div className="relative group dark:bg-black">
                                <input 
                                    placeholder="Search movies, series..." 
                                    className="w-72 px-4 py-2 pl-10 rounded-xl 
                                    border border-neutral-200 dark:border-neutral-700 
                                    bg-white dark:bg-black 
                                    text-neutral-900 dark:text-white
                                    focus:ring-2 focus:ring-neutral-300 
                                    dark:focus:ring-neutral-600
                                    focus:border-transparent 
                                    transition-all duration-200"
                                />
                                <Search 
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 
                                    text-neutral-400 dark:text-white" 
                                    size={20} 
                                />
                            </div>
                            <button className="text-neutral-600 dark:text-white hover:text-neutral-900 dark:hover:text-neutral-100 relative">
                                <Bell size={22} />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white 
                                rounded-full w-4 h-4 flex items-center justify-center text-xs">
                                    3
                                </span>
                            </button>
                            <button className="bg-neutral-200 dark:bg-neutral-700 p-2 rounded-full">
                                <User size={20} className="text-neutral-700 dark:text-white" />
                            </button>
                        </div>
                    </div>
                </Header>

                {/* Divider */}
                <div
                    style={{ gridArea: 'divider' }}
                    className="bg-neutral-200 dark:bg-black"
                />

                {/* Sidebar */}
                <div 
                    className={`
                        transition-all duration-300 transform
                        ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                        fixed lg:relative
                        lg:block
                        z-50 lg:z-auto
                        h-full
                        bg-white dark:bg-black
                        shadow-lg
                    `}
                    style={{ width: '280px' }}
                >
                    <Sidebar />
                    {isSidebarVisible && (
                        <button
                            className="absolute top-4 right-4 p-2 rounded-full 
                            bg-neutral-100 dark:bg-neutral-800 
                            hover:bg-neutral-200 dark:hover:bg-neutral-700 
                            text-neutral-600 dark:text-white 
                            hover:text-neutral-900 dark:hover:text-white 
                            transition-all duration-200 lg:hidden"
                            onClick={toggleSidebar}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {!isSidebarVisible && (
                    <button
                        className="fixed top-[80px] left-4 p-3 bg-white dark:bg-neutral-800 shadow-md 
                        text-neutral-700 dark:text-white rounded-full z-40 
                        hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all duration-200 lg:hidden"
                        onClick={toggleSidebar}
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                )}

                {/* Content */}
                <Content>
                    <div className="p-6 max-w-7xl mx-auto space-y-8 dark:bg-black">
                        <div className="grid grid-cols-1 gap-8 dark:bg-black">
                            <div className="bg-white dark:bg-black rounded-xl shadow-md p-6 border border-neutral-100 dark:border-neutral-800">
                                <div className="flex items-center mb-4 space-x-3">
                                    <Film className="text-neutral-700 dark:text-white" />
                                    <h2 className="text-xl font-bold text-neutral-800 dark:text-white">Box Office Movies</h2>
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-300">Top trending and highest-grossing movies</p>
                            </div>

                            <div className="bg-white dark:bg-black rounded-xl shadow-md p-6 border border-neutral-100 dark:border-neutral-800">
                                <div className="flex items-center mb-4 space-x-3">
                                    <Tv className="text-neutral-700 dark:text-white" />
                                    <h2 className="text-xl font-bold text-neutral-800 dark:text-white">Popular TV Series</h2>
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-300">Currently trending TV shows and series</p>
                            </div>

                            <div className="bg-white dark:bg-black rounded-xl shadow-md p-6 border border-neutral-100 dark:border-neutral-800">
                                <div className="flex items-center mb-4 space-x-3">
                                    <Star className="text-neutral-700 dark:text-white" />
                                    <h2 className="text-xl font-bold text-neutral-800 dark:text-white">Recommended for You</h2>
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-300">Personalized movie and series recommendations</p>
                            </div>
                        </div>

                        {children}
                    </div>
                </Content>
            </div>
        </div>
    );
}
