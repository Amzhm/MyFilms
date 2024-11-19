import { PropsWithChildren } from 'react';
import { Film, Star, Play, Tv, List, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps extends PropsWithChildren {
    isCollapsed: boolean;
    onToggle: () => void;
    isMobile?: boolean;
}

export const Sidebar = ({ isCollapsed, onToggle, isMobile = false, children }: SidebarProps) => {
    return (
        <div
            className={`h-full bg-white dark:bg-black transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]`}
            style={{
                gridArea: 'sidebar',
                width: isCollapsed ? '80px' : '280px',
            }}
        >
            {!isMobile && (
                <button
                    className="flex items-center justify-center p-2 w-full bg-gray-200 dark:bg-gray-800 
                    hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
                    onClick={onToggle}
                >
                    {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                </button>
            )}

            <div className="p-4">
                {/* Version collapsed */}
                {isCollapsed && (
                    <div className="flex flex-col items-center space-y-4">
                        <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300">
                            <Film className="w-5 h-5" />
                        </button>
                        <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                        <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300">
                            <Star className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300">
                            <Play className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300">
                            <Star className="w-5 h-5" />
                        </button>
                        <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                        <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300">
                            <List className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300">
                            <Tv className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300">
                            <Star className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Version étendue */}
                {!isCollapsed && (
                    <>
                        <button className="flex items-center p-2 w-full rounded text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300">
                            <Film className="w-5 h-5 mr-2" /> Discover
                        </button>

                        <h3 className="mt-4 mb-2 text-gray-700 dark:text-gray-400 font-semibold">Movies</h3>
                        <button className="flex items-center p-2 w-full rounded text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300">
                            <Star className="w-5 h-5 mr-2" /> Popular
                        </button>
                        <button className="flex items-center p-2 w-full rounded text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300">
                            <Play className="w-5 h-5 mr-2" /> Now Playing
                        </button>
                        <button className="flex items-center p-2 w-full rounded text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300">
                            <Star className="w-5 h-5 mr-2" /> Top Rated
                        </button>

                        <h3 className="mt-4 mb-2 text-gray-700 dark:text-gray-400 font-semibold">TV Shows</h3>
                        <button className="flex items-center p-2 w-full rounded text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300">
                            <List className="w-5 h-5 mr-2" /> Popular
                        </button>
                        <button className="flex items-center p-2 w-full rounded text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300">
                            <Tv className="w-5 h-5 mr-2" /> On The Air
                        </button>
                        <button className="flex items-center p-2 w-full rounded text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300">
                            <Star className="w-5 h-5 mr-2" /> Top Rated
                        </button>
                    </>
                )}
            </div>

            {children}
        </div>
    );
};