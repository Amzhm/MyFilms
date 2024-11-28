// components/dashboard/Sidebar.tsx
'use client';

import { PropsWithChildren } from 'react';
import { Film, Star, Play, Tv, List } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDashboardLayout } from '@/hooks/useDashboardLayout';

interface SidebarProps extends PropsWithChildren {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
}

export const Sidebar = ({ isCollapsed, setIsCollapsed, children }: SidebarProps) => {
    const router = useRouter();
    const { isMobile } = useDashboardLayout();

    const navigate = (path: string) => {
        router.push(path);
        if (isMobile) {
            setIsCollapsed(true);
        }
    };

    return (
        <div
            className={`h-full bg-white dark:bg-black transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]`}
            style={{
                gridArea: 'sidebar',
                width: isCollapsed ? '80px' : '280px',
            }}
        >
            <div className="p-4">
                {isCollapsed && (
                    <div className="flex flex-col items-center space-y-4">
                        <button onClick={() => navigate('/dashboard')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300">
                            <Film className="w-5 h-5" />
                        </button>
                        <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                        <button onClick={() => navigate('/dashboard/movies/popular')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300">
                            <Star className="w-5 h-5" />
                        </button>
                        <button onClick={() => navigate('/dashboard/movies/now-playing')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300">
                            <Play className="w-5 h-5" />
                        </button>
                        <button onClick={() => navigate('/dashboard/movies/top-rated')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300">
                            <Star className="w-5 h-5" />
                        </button>
                        <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                        <button onClick={() => navigate('/dashboard/shows/popular')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300">
                            <List className="w-5 h-5" />
                        </button>
                        <button onClick={() => navigate('/dashboard/shows/on-the-air')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300">
                            <Tv className="w-5 h-5" />
                        </button>
                        <button onClick={() => navigate('/dashboard/shows/top-rated')} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300">
                            <Star className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {!isCollapsed && (
                    <>
                        <button onClick={() => navigate('/dashboard')} className="flex items-center p-2 w-full rounded text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300">
                            <Film className="w-5 h-5 mr-2" /> Discover
                        </button>

                        <h3 className="mt-4 mb-2 text-gray-700 dark:text-gray-400 font-semibold">Movies</h3>
                        <button onClick={() => navigate('/dashboard/movies/popular')} className="flex items-center p-2 w-full rounded text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300">
                            <Star className="w-5 h-5 mr-2" /> Popular
                        </button>
                        <button onClick={() => navigate('/dashboard/movies/now-playing')} className="flex items-center p-2 w-full rounded text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300">
                            <Play className="w-5 h-5 mr-2" /> Now Playing
                        </button>
                        <button onClick={() => navigate('/dashboard/movies/top-rated')} className="flex items-center p-2 w-full rounded text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300">
                            <Star className="w-5 h-5 mr-2" /> Top Rated
                        </button>

                        <h3 className="mt-4 mb-2 text-gray-700 dark:text-gray-400 font-semibold">TV Shows</h3>
                        <button onClick={() => navigate('/dashboard/shows/popular')} className="flex items-center p-2 w-full rounded text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300">
                            <List className="w-5 h-5 mr-2" /> Popular
                        </button>
                        <button onClick={() => navigate('/dashboard/shows/on-the-air')} className="flex items-center p-2 w-full rounded text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300">
                            <Tv className="w-5 h-5 mr-2" /> On The Air
                        </button>
                        <button onClick={() => navigate('/dashboard/shows/top-rated')} className="flex items-center p-2 w-full rounded text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300">
                            <Star className="w-5 h-5 mr-2" /> Top Rated
                        </button>
                    </>
                )}
            </div>

            {children}
        </div>
    );
};