
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
        const response = await fetch(`/api/movies/popular?page=${page}`);
        if (!response.ok) throw new Error('Failed to fetch popular movies');
        return response.json();
    }

    async getNowPlaying(page: number): Promise<TMDBResponse<Movie>> {
        const response = await fetch(`/api/movies/now-playing?page=${page}`);
        if (!response.ok) throw new Error('Failed to fetch now playing movies');
        return response.json();
    }

    async getTopRated(page: number): Promise<TMDBResponse<Movie>> {
        const response = await fetch(`/api/movies/top-rated?page=${page}`);
        if (!response.ok) throw new Error('Failed to fetch top rated movies');
        return response.json();
    }

    async getDetails(id: string): Promise<MovieDetails> {
        const response = await fetch(`/api/movies/${id}`);
        if (!response.ok) throw new Error('Failed to fetch movie details');
        return response.json();
    }

    async getPopularForSlider(): Promise<Movie[]> {
        const response = await fetch('/api/movies/popular');
        if (!response.ok) throw new Error('Failed to fetch popular movies');
        const data = await response.json();
        return data.results;
    }

    async getNowPlayingForSlider(): Promise<Movie[]> {
        const response = await fetch('/api/movies/now-playing');
        if (!response.ok) throw new Error('Failed to fetch popular movies');
        const data = await response.json();
        return data.results;
    }

    async getTopRatedForSlider(): Promise<Movie[]> {
        const response = await fetch('/api/movies/top-rated');
        if (!response.ok) throw new Error('Failed to fetch popular movies');
        const data = await response.json();
        return data.results;
    }
}