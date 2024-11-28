// hooks/useSearch.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useSearch() {
   const [searchQuery, setSearchQuery] = useState('');
   const router = useRouter();

   const handleSearch = (value: string) => {
       setSearchQuery(value);
       if (value.trim()) {
           router.push(`/dashboard/search?q=${encodeURIComponent(value)}`);
       }
   };

   return { searchQuery, handleSearch };
}

