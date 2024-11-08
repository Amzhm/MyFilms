import { PropsWithChildren, useState } from 'react';
import { Film, Star, Play, Tv, List } from 'lucide-react';

export const Sidebar = ({ children }: PropsWithChildren) => {
    const [activeItem, setActiveItem] = useState<string>('');  // Suivi de l'élément actif

    // Fonction pour définir l'élément actif au clic
    const handleItemClick = (item: string) => {
        setActiveItem(item);
    };

    return (
        <div className="bg-gray-200 h-full p-4" style={{ gridArea: 'sidebar' }}>
            {/* Button with hover and active effects */}
            <button
                className={`flex items-center p-2 w-full hover:bg-gray-500 rounded transition-colors ${activeItem === 'discover' ? 'bg-gray-300' : ''}`}
                onClick={() => handleItemClick('discover')}
            >
                <Film className="w-5 h-5 mr-2" /> Discover
            </button>

            <h3 className="mt-4 mb-2 text-gray-700 font-semibold">Movies</h3>
            <button
                className={`flex items-center p-2 w-full hover:bg-gray-500 rounded transition-colors ${activeItem === 'popularMovies' ? 'bg-gray-300' : ''}`}
                onClick={() => handleItemClick('popularMovies')}
            >
                <Star className="w-5 h-5 mr-2" /> Popular
            </button>
            <button
                className={`flex items-center p-2 w-full hover:bg-gray-500 rounded transition-colors ${activeItem === 'nowPlaying' ? 'bg-gray-300' : ''}`}
                onClick={() => handleItemClick('nowPlaying')}
            >
                <Play className="w-5 h-5 mr-2" /> Now Playing
            </button>
            <button
                className={`flex items-center p-2 w-full hover:bg-gray-500 rounded transition-colors ${activeItem === 'topRatedMovies' ? 'bg-gray-300' : ''}`}
                onClick={() => handleItemClick('topRatedMovies')}
            >
                <Star className="w-5 h-5 mr-2" /> Top Rated
            </button>

            <h3 className="mt-4 mb-2 text-gray-700 font-semibold">TV Shows</h3>
            <button
                className={`flex items-center p-2 w-full hover:bg-gray-500 rounded transition-colors ${activeItem === 'popularTv' ? 'bg-gray-300' : ''}`}
                onClick={() => handleItemClick('popularTv')}
            >
                <List className="w-5 h-5 mr-2" /> Popular
            </button>
            <button
                className={`flex items-center p-2 w-full hover:bg-gray-500 rounded transition-colors ${activeItem === 'onTheAir' ? 'bg-gray-300' : ''}`}
                onClick={() => handleItemClick('onTheAir')}
            >
                <Tv className="w-5 h-5 mr-2" /> On The Air
            </button>
            <button
                className={`flex items-center p-2 w-full hover:bg-gray-500 rounded transition-colors ${activeItem === 'topRatedTv' ? 'bg-gray-300' : ''}`}
                onClick={() => handleItemClick('topRatedTv')}
            >
                <Star className="w-5 h-5 mr-2" /> Top Rated
            </button>

            {children}
        </div>
    );
};
