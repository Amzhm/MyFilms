import { useSearch } from '@/hooks/useSearch';
import { Search } from 'lucide-react';

export function SearchInput() {
   const { searchQuery, handleSearch } = useSearch();

   return (
       <div className="relative group dark:bg-black w-full lg:w-72">
           <input 
               value={searchQuery}
               onChange={(e) => handleSearch(e.target.value)}
               placeholder="Search movies, series..." 
               className="w-full px-4 py-2 pl-10 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-black text-neutral-900 dark:text-white focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-600 focus:border-transparent transition-all duration-300"
           />
           <Search 
               className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-white" 
               size={20} 
           />
       </div>
   );
}