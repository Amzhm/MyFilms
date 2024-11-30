// app/Entities/Show/show-details.ts

import { Show } from "./shows";

interface Cast {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

interface CrewMember {
    id: number;
    name: string;
    job: string;
    profile_path: string | null;
    department: string;
}

interface Video {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
}

interface Image {
    aspect_ratio: number;
    file_path: string;
    height: number;
    width: number;
}

export interface ShowDetails extends Show {
    genres: { id: number; name: string }[];
    number_of_episodes: number;
    number_of_seasons: number;
    credits: {
        cast: Cast[];
        crew: CrewMember[];
    };
    videos: Video[];
    images: {
        backdrops: Image[];
        posters: Image[];
    };
}

export async function fetchShowDetails(showId: string): Promise<ShowDetails> {
    const response = await fetch(`/api/shows/${showId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch show details');
    }
    return response.json();
}