
import { Movie } from '@/app/Entities/Movie/movie';
import { MovieDetails } from '@/app/Entities/Movie/movie-details';

interface TMDBResponse<T> {
    results: T[];
    page: number;
    total_pages: number;
}

export interface IMovies {
    getPopular(page: number): Promise<TMDBResponse<Movie>>;
    getNowPlaying(page: number): Promise<TMDBResponse<Movie>>;
    getTopRated(page: number): Promise<TMDBResponse<Movie>>;
    getDetails(id: string): Promise<MovieDetails>;
}

export class Movies implements IMovies {
    async getPopular(page: number): Promise<TMDBResponse<Movie>> {
        try {
            const response = await fetch(`/api/movies/popular?page=${page}`);
            if (!response.ok) throw new Error('Failed to fetch popular movies');
            return response.json();
        } catch (error) {
            throw new Error('Failed to fetch popular movies');
        }
    }

    async getNowPlaying(page: number): Promise<TMDBResponse<Movie>> {
        try {
            const response = await fetch(`/api/movies/now-playing?page=${page}`);
            if (!response.ok) throw new Error('Failed to fetch now playing movies');
            return response.json();
        } catch (error) {
            throw new Error('Failed to fetch now playing movies');
        }
    }

    async getTopRated(page: number): Promise<TMDBResponse<Movie>> {
        try{
            const response = await fetch(`/api/movies/top-rated?page=${page}`);
            if (!response.ok) throw new Error('Failed to fetch top rated movies');
            return response.json();
        } catch (error) {
            throw new Error('Failed to fetch top rated movies');
        }
    }

    async getDetails(id: string): Promise<MovieDetails> {
        try{
            const response = await fetch(`/api/movies/${id}`);
            if (!response.ok) throw new Error('Failed to fetch movie details');
            return response.json();
        } catch (error) {
            throw new Error('Failed to fetch movie details');
        }
    }

    async getPopularForSlider(): Promise<Movie[]> {
        try{
            const response = await fetch('/api/movies/popular');
            if (!response.ok) throw new Error('Failed to fetch popular movies');
            const data = await response.json();
            return data.results;
        } catch (error) {
            throw new Error('Failed to fetch popular movies');
        }
    }

    async getNowPlayingForSlider(): Promise<Movie[]> {
        try{
            const response = await fetch('/api/movies/now-playing');
            if (!response.ok) throw new Error('Failed to fetch now playing movies');
            const data = await response.json();
            return data.results;
        } catch (error) {
            throw new Error('Failed to fetch now playing movies');
        }
    }

    async getTopRatedForSlider(): Promise<Movie[]> {
        try{
            const response = await fetch('/api/movies/top-rated');
            if (!response.ok) throw new Error('Failed to fetch top rated movies');
            const data = await response.json();
            return data.results;
        } catch (error) {
            throw new Error('Failed to fetch top rated movies');
        }
    }
}