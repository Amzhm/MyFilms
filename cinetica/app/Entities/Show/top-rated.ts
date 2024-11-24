// app/Entities/Show/top-rated.ts
import { Show } from "./shows";

export async function fetchTopRatedShows(): Promise<Show[]> {
    const response = await fetch('/api/shows/top-rated');
    if (!response.ok) {
        throw new Error('Failed to fetch shows');
    }
    const data = await response.json();
    return data.results;
}