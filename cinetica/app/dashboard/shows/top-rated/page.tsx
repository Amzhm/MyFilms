// app/dashboard/shows/top-rated/page.tsx
'use client';

import { Film } from 'lucide-react';
import { ShowCard } from '@/app/dashboard/components/ShowCard';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { Show } from '@/app/Entities/Show/shows';
import { useRepository } from '@/contexts/Repository';

export default function TopRatedShows() {
   const { shows } = useRepository();
   const { items: showList, loading, error, loaderRef } = useInfiniteScroll<Show>(
       (page) => shows.getTopRated(page)
   );

   if (loading && !showList.length) {
       return (
           <div className="flex justify-center items-center p-12">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 dark:border-white" />
           </div>
       );
   }

   if (error) {
       return (
           <div className="flex flex-col items-center justify-center p-12 space-y-4">
               <Film className="w-12 h-12 text-neutral-400" />
               <p className="text-neutral-600 dark:text-neutral-400 text-center">{error}</p>
           </div>
       );
   }

   return (
       <div className="p-6 space-y-6">
           <div className="flex items-center space-x-3 mb-6">
               <Film className="w-6 h-6 text-neutral-700 dark:text-white" />
               <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Top Rated Shows</h1>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {showList.map((show) => (
                   <ShowCard key={show.id} show={show} />
               ))}
           </div>
           
           <div ref={loaderRef} className="h-10">
               {loading && (
                   <div className="flex justify-center p-4">
                       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900 dark:border-white" />
                   </div>
               )}
           </div>
       </div>
   );
}