// hooks/useMovies.ts
import { useState, useEffect } from 'react';
import { Movie } from '@/app/Entities/Movie/movie';
import { fetchTopRatedMovies } from '@/app/Entities/Movie/top-rated';
import { fetchPopularMovies } from '@/app/Entities/Movie/popular';
import { fetchNowPlayingMovies } from '@/app/Entities/Movie/now-playing';

type MovieCategory = 'top-rated' | 'popular' | 'now-playing';

const fetchFunctions = {
    'top-rated': fetchTopRatedMovies,
    'popular': fetchPopularMovies,
    'now-playing': fetchNowPlayingMovies
};

export function useMovies(category: MovieCategory) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const fetchFunction = fetchFunctions[category];
                const data = await fetchFunction();
                setMovies(data);
            } catch (err) {
                setError('Failed to load movies. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, [category]);

    return { movies, loading, error };
}