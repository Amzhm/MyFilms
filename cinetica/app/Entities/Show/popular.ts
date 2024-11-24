// app/Entities/Show/popular.ts
import { Show } from "./shows";

export async function fetchPopularShows(): Promise<Show[]> {
    const response = await fetch('/api/shows/popular');
    if (!response.ok) {
        throw new Error('Failed to fetch shows');
    }
    const data = await response.json();
    return data.results;
}