// app/Entities/movie/popular.ts
import { Movie } from "./movie";

export async function fetchPopularMovies(): Promise<Movie[]> {
    const response = await fetch('/api/movies/popular');
    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    }
    const data = await response.json();
    return data.results;
}