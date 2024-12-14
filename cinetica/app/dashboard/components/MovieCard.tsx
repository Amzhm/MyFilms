// app/dashboard/components/MovieCard.tsx
import { Movie } from '@/app/Entities/Movie/movie';
import { useRouter } from 'next/navigation';

interface MovieCardProps {
    movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/dashboard/movies/${movie.id}`);
    };

    return (
        <div 
            data-testid="movie-card"
            onClick={handleClick}
            className="bg-white dark:bg-neutral-800 w-[100%] lg:w-full rounded-xl shadow-md overflow-hidden border border-neutral-200 dark:border-neutral-700 transition-transform duration-300 hover:scale-105 cursor-pointer"
        >
            <div className="relative pb-[150%]">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
        </div>
    );
}