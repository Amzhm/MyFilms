// app/dashboard/movies/[id]/page.tsx
'use client';

import { Star, Clock, Calendar, Film, Music, Camera, X } from 'lucide-react';
import { useMovieDetails } from '@/hooks/useMovieDetails';
import { useImageSelection } from '@/hooks/useImageSelection';

export default function MoviePage({ params }: { params: { id: string } }) {
    const { movieDetails, loading, error } = useMovieDetails(params.id);
    const { selectedImage, selectImage, clearSelection } = useImageSelection();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
            </div>
        );
    }

    if (error || !movieDetails) {
        return (
            <div className="flex justify-center items-center min-h-screen text-red-500">
                {error || 'Movie not found'}
            </div>
        );
    }

    const director = movieDetails.credits.crew.find(person => person.job === 'Director');
    const composer = movieDetails.credits.crew.find(person => person.job === 'Original Music Composer');
    const cinematographer = movieDetails.credits.crew.find(person => person.job === 'Director of Photography');
    const trailer = movieDetails.videos?.find(video => video.type === 'Trailer');

    return (
        <div className="container mx-auto py-8 px-4">
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
                    <button 
                        className="absolute top-4 right-4 text-white"
                        onClick={clearSelection}
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <img
                        src={`https://image.tmdb.org/t/p/original${selectedImage}`}
                        alt="Full size"
                        className="max-w-full max-h-[90vh] object-contain"
                    />
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-4">
                    <div className="sticky top-24">
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                                alt={movieDetails.title}
                                className="w-full h-auto"
                            />
                        </div>

                        <div className="mt-6 bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-lg">
                            <div className="space-y-4">
                                {director && (
                                    <div className="flex items-center gap-3">
                                        <Film className="w-5 h-5 text-neutral-500" />
                                        <div>
                                            <p className="text-sm text-neutral-500">Director</p>
                                            <p className="font-medium dark:text-white">{director.name}</p>
                                        </div>
                                    </div>
                                )}

                                {composer && (
                                    <div className="flex items-center gap-3">
                                        <Music className="w-5 h-5 text-neutral-500" />
                                        <div>
                                            <p className="text-sm text-neutral-500">Composer</p>
                                            <p className="font-medium dark:text-white">{composer.name}</p>
                                        </div>
                                    </div>
                                )}

                                {cinematographer && (
                                    <div className="flex items-center gap-3">
                                        <Camera className="w-5 h-5 text-neutral-500" />
                                        <div>
                                            <p className="text-sm text-neutral-500">Cinematographer</p>
                                            <p className="font-medium dark:text-white">{cinematographer.name}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-4 border-t dark:border-neutral-700">
                                    <p className="text-sm text-neutral-500 mb-2">Genres</p>
                                    <div className="flex flex-wrap gap-2">
                                        {movieDetails.genres.map(genre => (
                                            <span
                                                key={genre.id}
                                                className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-full text-sm"
                                            >
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-8">
                    <h1 className="text-4xl font-bold mb-4 dark:text-white">{movieDetails.title}</h1>
                    
                    <div className="flex items-center mb-6 gap-4">
                        <div className="flex items-center">
                            <Star className="w-5 h-5 text-yellow-400 mr-1" />
                            <span className="dark:text-white">{movieDetails.vote_average.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-5 h-5 mr-1" />
                            <span className="dark:text-white">{movieDetails.runtime} min</span>
                        </div>
                        <div className="flex items-center">
                            <Calendar className="w-5 h-5 mr-1" />
                            <span className="dark:text-white">{new Date(movieDetails.release_date).getFullYear()}</span>
                        </div>
                    </div>

                    {trailer && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Trailer</h2>
                            <div className="aspect-video">
                                <iframe
                                    className="w-full h-full rounded-lg"
                                    src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`}
                                    title="Trailer"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    )}

                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Synopsis</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{movieDetails.overview}</p>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Cast Principal</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {movieDetails.credits.cast.slice(0, 8).map((actor) => (
                                <div key={actor.id} className="text-center">
                                    <div className="aspect-[2/3] mb-2">
                                        {actor.profile_path ? (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                                alt={actor.name}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="w-full h-full rounded-lg bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                                                No Image
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="font-medium dark:text-white">{actor.name}</h3>
                                    <p className="text-sm text-neutral-500">{actor.character}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Images Principales</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {movieDetails.images.backdrops.map((image, index) => (
                                <div 
                                    key={index} 
                                    className="cursor-pointer aspect-video rounded-lg overflow-hidden"
                                    onClick={() => selectImage(image.file_path)}
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                                        alt={`Scene ${index + 1}`}
                                        className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}