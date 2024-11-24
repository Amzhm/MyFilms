// app/Entities/Show/on-the-air.ts
import { Show } from "./shows";

export async function fetchOnTheAirShows(): Promise<Show[]> {
    const response = await fetch('/api/shows/on-the-air');
    if (!response.ok) {
        throw new Error('Failed to fetch shows');
    }
    const data = await response.json();
    return data.results;
}