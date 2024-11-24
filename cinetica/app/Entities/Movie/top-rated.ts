// app/Entities/movie/top-rated.ts
import { Movie } from "./movie";

export async function fetchTopRatedMovies(): Promise<Movie[]> {
    const response = await fetch('/api/movies/top-rated');
    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    }
    const data = await response.json();
    return data.results;
}