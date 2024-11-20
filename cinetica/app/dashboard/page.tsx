// app/dashboard/page.tsx
import { Film, Tv, Star } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 dark:bg-black">
      <div className="grid grid-cols-1 gap-8 dark:bg-black">
        <div className="bg-white dark:bg-black rounded-xl shadow-md p-6 border border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center mb-4 space-x-3">
            <Film className="text-neutral-700 dark:text-white" />
            <h2 className="text-xl font-bold text-neutral-800 dark:text-white">Box Office Movies</h2>
          </div>
        </div>

        <div className="bg-white dark:bg-black rounded-xl shadow-md p-6 border border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center mb-4 space-x-3">
            <Tv className="text-neutral-700 dark:text-white" />
            <h2 className="text-xl font-bold text-neutral-800 dark:text-white">Popular TV Series</h2>
          </div>
        </div>

        <div className="bg-white dark:bg-black rounded-xl shadow-md p-6 border border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center mb-4 space-x-3">
            <Star className="text-neutral-700 dark:text-white" />
            <h2 className="text-xl font-bold text-neutral-800 dark:text-white">Recommended for You</h2>
          </div>
        </div>
      </div>
    </div>
  );
}