// app/dashboard/movies/popular/page.tsx
'use client';

import { Film } from 'lucide-react';
import { MovieCard } from '@/app/dashboard/components/MovieCard';
import { useMovies } from '@/hooks/useMovies';

export default function TopRatedMovies() {
    const { movies, loading, error } = useMovies('popular');

    if (loading) {
        return (
            <div className="flex justify-center items-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 dark:border-white" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-12 space-y-4">
                <Film className="w-12 h-12 text-neutral-400" />
                <p className="text-neutral-600 dark:text-neutral-400 text-center">{error}</p>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center space-x-3 mb-6">
                <Film className="w-6 h-6 text-neutral-700 dark:text-white" />
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Top Rated Movies</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}