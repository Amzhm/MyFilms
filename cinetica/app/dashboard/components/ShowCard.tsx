// app/dashboard/components/ShowCard.tsx
import { Show } from '@/app/Entities/Show/shows';
import { Star } from 'lucide-react';

interface ShowCardProps {
    show: Show;
}

export function ShowCard({ show }: ShowCardProps) {
    return (
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden border border-neutral-200 dark:border-neutral-700 transition-transform duration-300 hover:scale-105">
            <div className="relative pb-[150%]">
                <img
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                    alt={show.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
            <div className="p-4">
                <h2 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white line-clamp-1">
                    {show.title}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-3 line-clamp-2">
                    {show.overview}
                </p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
                            {show.vote_average.toFixed(1)}
                        </span>
                    </div>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                        {new Date(show.first_air_date).getFullYear()}
                    </span>
                </div>
            </div>
        </div>
    );
}