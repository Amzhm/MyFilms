// useCases/movie/movieUseCase.ts
import { Movie } from '@/app/Entities/Movie/movie';
import { MovieDetails } from '@/app/Entities/Movie/movie-details';
import { MovieCategory } from '@/domain/movie/types';
import { Movies } from '@/repository/Movies';

export class MovieUseCase {
    constructor(private readonly moviesRepository: Movies) {}

    async getMoviesByCategory(category: MovieCategory, limit: number): Promise<Movie[]> {
        try {
            switch (category) {
                case 'popular':
                    const popularMovies = await this.moviesRepository.getPopularForSlider();
                    return popularMovies.slice(0, limit);
                case 'top-rated':
                    const topRatedMovies = await this.moviesRepository.getTopRatedForSlider();
                    return topRatedMovies.slice(0, limit);
                case 'now-playing':
                    const nowPlayingMovies = await this.moviesRepository.getNowPlayingForSlider();
                    return nowPlayingMovies.slice(0, limit);
                default:
                    throw new Error(`Invalid category: ${category}`);
            }
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error(`Failed to fetch movies for category ${category}`);
        }
    }
    async getMovieDetails(id: string): Promise<MovieDetails> {
        try {
            return await this.moviesRepository.getDetails(id);
        } catch (error) {
            throw new Error(`Failed to fetch movie details: ${error}`);
        }
    }
}