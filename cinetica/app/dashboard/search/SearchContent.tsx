// app/dashboard/search/SearchContent.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { MovieCard } from '@/app/dashboard/components/MovieCard';
import { ShowCard } from '@/app/dashboard/components/ShowCard';
import { search } from '@/app/Entities/search';
import { Movie } from '@/app/Entities/Movie/movie';
import { Show } from '@/app/Entities/Show/shows';

export default function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query) return;
            
            setIsLoading(true);
            try {
                const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                const data = await response.json();
                setResults(data.results);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 dark:border-white" />
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map((result: search) => (
                    result.media_type === 'movie' ? 
                        <MovieCard key={result.id} movie={result as Movie} /> :
                        <ShowCard key={result.id} show={result as Show} />
                ))}
            </div>
        </div>
    );
}