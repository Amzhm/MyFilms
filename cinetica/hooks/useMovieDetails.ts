
// hooks/movie/useMovieDetails.ts
import { useState, useEffect } from 'react';
import { MovieDetails } from '@/app/Entities/Movie/movie-details';
import { useMovieContext } from '@/contexts/MovieContext';

export function useMovieDetails(id: string) {
    const { movieUseCase } = useMovieContext();
    const [state, setState] = useState<{
        movieDetails: MovieDetails | null;
        loading: boolean;
        error: string | null;
    }>({
        movieDetails: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        const loadMovie = async () => {
            try {
                const data = await movieUseCase.getMovieDetails(id);
                setState({
                    movieDetails: data,
                    loading: false,
                    error: null
                });
            } catch {
                setState(prev => ({
                    ...prev,
                    loading: false,
                    error: 'Failed to load movie details'
                }));
            }
        };

        loadMovie();
    }, [id, movieUseCase]);

    return state;
}