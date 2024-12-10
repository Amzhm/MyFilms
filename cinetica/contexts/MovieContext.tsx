// contexts/MovieContext.tsx
import { createContext, useContext, PropsWithChildren } from 'react';
import { MovieUseCase } from '@/useCases/movie/movieUseCase';
import { Movies } from '@/repository/Movies';

interface MovieProviderProps extends PropsWithChildren {
    moviesRepository: Movies;
}

type MovieContextType = {
    movieUseCase: MovieUseCase;
};

const MovieContext = createContext<MovieContextType | null>(null);

export function MovieProvider({ children, moviesRepository }: MovieProviderProps) {
    const movieUseCase = new MovieUseCase(moviesRepository);
    
    return (
        <MovieContext.Provider value={{ movieUseCase }}>
            {children}
        </MovieContext.Provider>
    );
}

export const useMovieContext = () => {
    const context = useContext(MovieContext);
    if (!context) {
        throw new Error('useMovieContext must be used within MovieProvider');
    }
    return context;
};