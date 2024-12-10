// hooks/useMovies.ts
'use client';

import { useState, useEffect } from 'react';
import { MovieCategory, MovieState } from '@/domain/movie/types';
import { useMovieContext } from '@/contexts/MovieContext';

export function useMovies(category: MovieCategory, limit: number = 30) {
    const [state, setState] = useState<MovieState>({
        movies: [],
        loading: true,
        error: null
    });

    const { movieUseCase } = useMovieContext();

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const movies = await movieUseCase.getMoviesByCategory(category, limit);
                setState({ movies, loading: false, error: null });
            } catch (err) {
                setState(prev => ({
                    ...prev,
                    loading: false,
                    error: 'Failed to load movies. Please try again later.'
                }));
                console.error(err);
            }
        };

        loadMovies();
    }, [category, limit, movieUseCase]);

    return state;
}