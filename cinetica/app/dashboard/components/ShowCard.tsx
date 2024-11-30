// app/dashboard/components/ShowCard.tsx
import { Show } from '@/app/Entities/Show/shows';
import { useRouter } from 'next/navigation';

interface ShowCardProps {
    show: Show;
}

export function ShowCard({ show }: ShowCardProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/dashboard/shows/${show.id}`);
    };

    return (
        <div 
            onClick={handleClick}
            className="bg-white dark:bg-neutral-950 rounded-xl shadow-md overflow-hidden border border-neutral-200 dark:border-neutral-700 transition-transform duration-300 hover:scale-105 cursor-pointer"
        >
            <div className="relative pb-[150%]">
                <img
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                    alt={show.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
        </div>
    );
}