// app/Entities/movie/now-playing.ts
import { Movie } from "./movie";

export async function fetchNowPlayingMovies(): Promise<Movie[]> {
    const response = await fetch('/api/movies/now-playing');
    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    }
    const data = await response.json();
    return data.results;
}