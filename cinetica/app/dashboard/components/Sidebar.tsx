import { PropsWithChildren, useState } from 'react';
import { Film, Star, Play, Tv, List } from 'lucide-react';

export const Sidebar = ({ children }: PropsWithChildren) => {
    const [activeItem, setActiveItem] = useState<string>(''); // Suivi de l'élément actif

    const handleItemClick = (item: string) => {
        setActiveItem(item);
    };

    return (
        <div className="h-full p-4 bg-white dark:bg-black" style={{ gridArea: 'sidebar' }}>
            <button
                className={`flex items-center p-2 w-full rounded ${
                    activeItem === 'discover'
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-700 dark:text-gray-400'
                } hover:text-black dark:hover:text-white`}
                onClick={() => handleItemClick('discover')}
            >
                <Film className="w-5 h-5 mr-2" /> Discover
            </button>

            <h3 className="mt-4 mb-2 text-gray-700 dark:text-gray-400 font-semibold">Movies</h3>
            <button
                className={`flex items-center p-2 w-full rounded ${
                    activeItem === 'popularMovies'
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-700 dark:text-gray-400'
                } hover:text-black dark:hover:text-white`}
                onClick={() => handleItemClick('popularMovies')}
            >
                <Star className="w-5 h-5 mr-2" /> Popular
            </button>
            <button
                className={`flex items-center p-2 w-full rounded ${
                    activeItem === 'nowPlaying'
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-700 dark:text-gray-400'
                } hover:text-black dark:hover:text-white`}
                onClick={() => handleItemClick('nowPlaying')}
            >
                <Play className="w-5 h-5 mr-2" /> Now Playing
            </button>
            <button
                className={`flex items-center p-2 w-full rounded ${
                    activeItem === 'topRatedMovies'
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-700 dark:text-gray-400'
                } hover:text-black dark:hover:text-white`}
                onClick={() => handleItemClick('topRatedMovies')}
            >
                <Star className="w-5 h-5 mr-2" /> Top Rated
            </button>

            <h3 className="mt-4 mb-2 text-gray-700 dark:text-gray-400 font-semibold">TV Shows</h3>
            <button
                className={`flex items-center p-2 w-full rounded ${
                    activeItem === 'popularTv'
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-700 dark:text-gray-400'
                } hover:text-black dark:hover:text-white`}
                onClick={() => handleItemClick('popularTv')}
            >
                <List className="w-5 h-5 mr-2" /> Popular
            </button>
            <button
                className={`flex items-center p-2 w-full rounded ${
                    activeItem === 'onTheAir'
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-700 dark:text-gray-400'
                } hover:text-black dark:hover:text-white`}
                onClick={() => handleItemClick('onTheAir')}
            >
                <Tv className="w-5 h-5 mr-2" /> On The Air
            </button>
            <button
                className={`flex items-center p-2 w-full rounded ${
                    activeItem === 'topRatedTv'
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-700 dark:text-gray-400'
                } hover:text-black dark:hover:text-white`}
                onClick={() => handleItemClick('topRatedTv')}
            >
                <Star className="w-5 h-5 mr-2" /> Top Rated
            </button>

            {children}
        </div>
    );
};
