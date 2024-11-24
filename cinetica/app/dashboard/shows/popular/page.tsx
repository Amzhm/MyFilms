// app/dashboard/shows/popular/page.tsx
'use client';

import { Tv } from 'lucide-react';
import { ShowCard } from '@/app/dashboard/components/ShowCard';
import { useShows } from '@/hooks/useShows';

export default function PopularShows() {
    const { shows, loading, error } = useShows('popular');

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
                <Tv className="w-12 h-12 text-neutral-400" />
                <p className="text-neutral-600 dark:text-neutral-400 text-center">{error}</p>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center space-x-3 mb-6">
                <Tv className="w-6 h-6 text-neutral-700 dark:text-white" />
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Popular TV Shows</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {shows.map((show) => (
                    <ShowCard key={show.id} show={show} />
                ))}
            </div>
        </div>
    );
}
