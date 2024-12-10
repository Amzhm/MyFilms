// domain/show/types.ts
import { Show } from '@/app/Entities/Show/shows';

export type ShowCategory = 'top-rated' | 'popular' | 'on-the-air';

export interface ShowState {
    shows: Show[];
    loading: boolean;
    error: string | null;
}