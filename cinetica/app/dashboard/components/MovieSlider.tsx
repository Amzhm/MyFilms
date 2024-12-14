// app/dashboard/components/ShowSlider.tsx

'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMovies } from '@/hooks/useMovies';
import { MovieCard } from '@/app/dashboard/components/MovieCard';
import { useSlider } from '@/hooks/useSlider';
import Link from 'next/link';

type MovieCategory = 'top-rated' | 'popular' | 'now-playing';

interface MovieSliderProps {
  category: MovieCategory;
  title: string;
}

const MovieSlider = ({ category, title }: MovieSliderProps) => {
  const { movies, loading, error } = useMovies(category, 30);
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);
  const { showLeftButton, showRightButton, scroll } = useSlider({ scrollContainerRef });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 w-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-800 dark:border-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 dark:text-red-400 w-full">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-6">
        <Link href={`/dashboard/movies/${category}`} className="text-xl font-bold text-neutral-800 dark:text-white">
          {title}
        </Link>
        <a 
          href={`/dashboard/movies/${category}`} 
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          View All
        </a>
      </div>
      
      <div className="relative group w-full overflow-hidden">
        <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-white dark:from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-white dark:from-black to-transparent z-10" />
        
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide scroll-smooth mx-6"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
          }}
        >
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className="flex-none w-[140px] md:w-[160px] lg:w-[180px] first:ml-0 transition-transform duration-300 hover:scale-105"
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
        
        {showLeftButton && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 z-20"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        
        {showRightButton && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 z-20"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieSlider;