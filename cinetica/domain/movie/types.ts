// domain/movie/types.ts
import { Movie } from '@/app/Entities/Movie/movie';

export type MovieCategory = 'top-rated' | 'popular' | 'now-playing';

export interface MovieState {
    movies: Movie[];
    loading: boolean;
    error: string | null;
}