// hooks/useShows.ts
'use client';

import { useState, useEffect } from 'react';
import { ShowCategory, ShowState } from '@/domain/show/types';
import { useShowContext } from '@/contexts/ShowContext';

export function useShows(category: ShowCategory) {
    const [state, setState] = useState<ShowState>({
        shows: [],
        loading: true,
        error: null
    });

    const { showUseCase } = useShowContext();

    useEffect(() => {
        const loadShows = async () => {
            try {
                const shows = await showUseCase.getShowsByCategory(category);
                setState({ shows, loading: false, error: null });
            } catch (err) {
                setState(prev => ({
                    ...prev,
                    loading: false,
                    error: 'Failed to load shows. Please try again later.'
                }));
                console.error(err);
            }
        };

        loadShows();
    }, [category, showUseCase]);

    return state;
}