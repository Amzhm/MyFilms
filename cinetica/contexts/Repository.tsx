// contexts/Repository.tsx
import { createContext, useContext, PropsWithChildren } from 'react';
import { Movies } from '@/repository/Movies';

import { Shows } from '@/repository/Shows';

type RepositoryContextType = {
    movie: Movies;
    shows: Shows;
};

const RepositoryContext = createContext<RepositoryContextType | null>(null);

export function RepositoryProvider({ children }: PropsWithChildren) {
    const repositories = {
        movie: new Movies(),
        shows: new Shows()
    };
    
    return (
        <RepositoryContext.Provider value={repositories}>
            {children}
        </RepositoryContext.Provider>
    );
}
export const useRepository = () => {
    const context = useContext(RepositoryContext);
    if (!context) {
        throw new Error('useRepository must be used within RepositoryProvider');
    }
    return context;
};