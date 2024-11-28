'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useShows } from '@/hooks/useShows';
import { ShowCard } from '@/app/dashboard/components/ShowCard';
import { useSlider } from '@/hooks/useSlider';

type ShowCategory = 'top-rated' | 'popular' | 'on-the-air';

interface ShowSliderProps {
  category: ShowCategory;
  title: string;
}

const ShowSlider = ({ category, title }: ShowSliderProps) => {
  const { shows, loading, error } = useShows(category);
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
        <h2 className="text-xl font-bold text-neutral-800 dark:text-white">{title}</h2>
        <a 
          href={`/dashboard/shows/${category}`} 
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
          {shows.slice(0, 30).map((show) => (
            <div 
              key={show.id} 
              className="flex-none w-[140px] md:w-[160px] lg:w-[180px] first:ml-0 transition-transform duration-300 hover:scale-105"
            >
              <ShowCard show={show} />
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

export default ShowSlider;