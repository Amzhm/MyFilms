// hooks/useShows.ts
import { useState, useEffect } from 'react';
import { Show } from '@/app/Entities/Show/shows';
import { fetchTopRatedShows } from '@/app/Entities/Show/top-rated';
import { fetchPopularShows } from '@/app/Entities/Show/popular';
import { fetchOnTheAirShows } from '@/app/Entities/Show/on-the-air';

type ShowCategory = 'top-rated' | 'popular' | 'on-the-air';

const fetchFunctions = {
    'top-rated': fetchTopRatedShows,
    'popular': fetchPopularShows,
    'on-the-air': fetchOnTheAirShows
};

export function useShows(category: ShowCategory) {
    const [shows, setShows] = useState<Show[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadShows = async () => {
            try {
                const fetchFunction = fetchFunctions[category];
                const data = await fetchFunction();
                setShows(data);
            } catch (err) {
                setError('Failed to load shows. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadShows();
    }, [category]);

    return { shows, loading, error };
}