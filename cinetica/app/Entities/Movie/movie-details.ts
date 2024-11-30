// app/Entities/Movie/movie-details.ts

import { Movie } from "./movie";

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
    iso_639_1: string | null;
    vote_average: number;
    vote_count: number;
    width: number;
}

export interface MovieDetails extends Movie {
    genres: { id: number; name: string }[];
    runtime: number;
    status: string;
    tagline: string;
    credits: {
        cast: Cast[];
        crew: CrewMember[];
    };
    videos: Video[];
    images: {
        backdrops: Image[];
        posters: Image[];
        logos: Image[];
    };
}

export async function fetchMovieDetails(movieId: string): Promise<MovieDetails> {
    const response = await fetch(`/api/movies/${movieId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch movie details');
    }
    return response.json();
}