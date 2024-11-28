'use client';
// app/dashboard/page.tsx

import React from 'react';
import MovieSlider from './components/MovieSlider';
import ShowSlider from './components/ShowSlider';

export default function DashboardPage() {
  return (
    <div className="space-y-8 py-6">
      <MovieSlider category="popular" title="Popular Movies" />
      <MovieSlider category="top-rated" title="Top Rated Movies" />
      <MovieSlider category="now-playing" title="Now Playing Movies" />
      
      <ShowSlider category="popular" title="Popular TV Shows" />
      <ShowSlider category="top-rated" title="Top Rated TV Shows" />
      <ShowSlider category="on-the-air" title="On The Air TV Shows" />
    </div>
  );
}