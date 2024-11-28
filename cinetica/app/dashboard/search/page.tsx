// app/dashboard/search/page.tsx
'use client';

import { Suspense } from 'react';
import SearchContent from './SearchContent';

export default function SearchPage() {
    return (
        <Suspense 
            fallback={
                <div className="flex justify-center items-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 dark:border-white" />
                </div>
            }
        >
            <SearchContent />
        </Suspense>
    );
}