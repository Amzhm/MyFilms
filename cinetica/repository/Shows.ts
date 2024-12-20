import { Show } from '@/app/Entities/Show/shows';
import { ShowDetails } from '@/app/Entities/Show/show-details';

interface TMDBResponse<T> {
    results: T[];
    page: number;
    total_pages: number;
}

export interface IShows {
    getPopular(page: number): Promise<TMDBResponse<Show>>;
    getOnTheAir(page: number): Promise<TMDBResponse<Show>>;
    getTopRated(page: number): Promise<TMDBResponse<Show>>;
    getDetails(id: string): Promise<ShowDetails>;
}

export class Shows implements IShows {
    async getPopular(page: number): Promise<TMDBResponse<Show>> {
        try{
            const response = await fetch(`/api/shows/popular?page=${page}`);
            if (!response.ok) throw new Error('Failed to fetch popular shows');
            return response.json();
        } catch (error) {
            throw new Error('Failed to fetch popular shows');
        }
    }

    async getOnTheAir(page: number): Promise<TMDBResponse<Show>> {
        try{
            const response = await fetch(`/api/shows/on-the-air?page=${page}`);
            if (!response.ok) throw new Error('Failed to fetch on the air shows');
            return response.json();
        } catch (error) {
            throw new Error('Failed to fetch on the air shows');
        }
    }

    async getTopRated(page: number): Promise<TMDBResponse<Show>> {
        try{
            const response = await fetch(`/api/shows/top-rated?page=${page}`);
            if (!response.ok) throw new Error('Failed to fetch top rated shows');
            return response.json();
        } catch (error) {
            throw new Error('Failed to fetch top rated shows');
        }
    }

    async getDetails(id: string): Promise<ShowDetails> {
        try{
            const response = await fetch(`/api/shows/${id}`);
            if (!response.ok) throw new Error('Failed to fetch show details');
            return response.json();
        } catch (error) {
            throw new Error('Failed to fetch show details');
        }
    }
    async getPopularForSlider(): Promise<Show[]> {
        try{
            const response = await fetch('/api/shows/popular');
            if (!response.ok) throw new Error('Failed to fetch popular shows');
            const data = await response.json();
            return data.results;
        } catch (error) {
            throw new Error('Failed to fetch popular shows');
        }
    }

    async getOnTheAirForSlider(): Promise<Show[]> {
        try{
            const response = await fetch('/api/shows/on-the-air');
            if (!response.ok) throw new Error('Failed to fetch on the air shows');
            const data = await response.json();
            return data.results;
        } catch (error) {
            throw new Error('Failed to fetch on the air shows');
        }
    }

    async getTopRatedForSlider(): Promise<Show[]> {
        try{
            const response = await fetch('/api/shows/top-rated');
            if (!response.ok) throw new Error('Failed to fetch top rated shows');
            const data = await response.json();
            return data.results;
        } catch (error) {
            throw new Error('Failed to fetch top rated shows');
        }
    }
}