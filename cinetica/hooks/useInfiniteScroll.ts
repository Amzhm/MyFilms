// hooks/useInfiniteScroll.ts
import { useEffect, useState, useRef, useCallback } from 'react';

interface TMDBResponse<T> {
    results: T[];
    page: number;
    total_pages: number;
}

export function useInfiniteScroll<T>(fetchFunction: (page: number) => Promise<TMDBResponse<T>>) {
    const [items, setItems] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const loaderRef = useRef(null);

    const loadMore = useCallback(async () => {
        if (loading || (totalPages > 0 && currentPage > totalPages)) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetchFunction(currentPage);
            setItems(prev => [...prev, ...response.results]);
            setTotalPages(response.total_pages);
            setCurrentPage(prev => prev + 1);
            setError(null);
        } catch (error) {
            console.log('Failed to load more items:', error);
        } finally {
            setLoading(false);
        }
    }, [currentPage, loading, totalPages, fetchFunction]);

    useEffect(() => {
        loadMore();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && currentPage <= totalPages) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => observer.disconnect();
    }, [loadMore, loading, currentPage, totalPages]);

    return {
        items,
        loading,
        error,
        hasMore: currentPage <= totalPages,
        loaderRef
    };
}