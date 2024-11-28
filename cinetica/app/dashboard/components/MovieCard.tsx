// app/dashboard/components/movies/MovieCard.tsx
import { Movie } from '@/app/Entities/Movie/movie';
import { Star } from 'lucide-react';

interface MovieCardProps {
    movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
    return (
        <div className="bg-white dark:bg-neutral-800 w-[100%] lg:w-full rounded-xl shadow-md overflow-hidden border border-neutral-200 dark:border-neutral-700 transition-transform duration-300 hover:scale-105">
            <div className="relative pb-[150%]">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
            <div className="p-4 hidden lg:block">
                <h2 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white line-clamp-1">
                    {movie.title}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-3 line-clamp-2">
                    {movie.overview}
                </p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
                            {movie.vote_average.toFixed(1)}
                        </span>
                    </div>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                        {new Date(movie.release_date).getFullYear()}
                    </span>
                </div>
            </div>
        </div>
    );
}