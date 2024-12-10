// hooks/show/useShowDetails.ts
import { useState, useEffect } from 'react';
import { ShowDetails } from '@/app/Entities/Show/show-details';
import { useShowContext } from '@/contexts/ShowContext';

export function useShowDetails(id: string) {
    const { showUseCase } = useShowContext();
    const [state, setState] = useState<{
        showDetails: ShowDetails | null;
        loading: boolean;
        error: string | null;
    }>({
        showDetails: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        const loadShow = async () => {
            try {
                const data = await showUseCase.getShowDetails(id);
                setState({
                    showDetails: data,
                    loading: false,
                    error: null
                });
            } catch {
                setState(prev => ({
                    ...prev,
                    loading: false,
                    error: 'Failed to load show details'
                }));
            }
        };

        loadShow();
    }, [id, showUseCase]);

    return state;
}