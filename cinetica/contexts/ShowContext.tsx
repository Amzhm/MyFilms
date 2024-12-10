// contexts/ShowContext.tsx
import { createContext, useContext, PropsWithChildren } from 'react';
import { ShowUseCase } from '@/useCases/show/showUseCase';
import { Shows } from '@/repository/Shows';

type ShowContextType = {
    showUseCase: ShowUseCase;
};

const ShowContext = createContext<ShowContextType | null>(null);

interface ShowProviderProps extends PropsWithChildren {
    showsRepository: Shows;
}

export function ShowProvider({ children, showsRepository }: ShowProviderProps) {
    const showUseCase = new ShowUseCase(showsRepository);
    
    return (
        <ShowContext.Provider value={{ showUseCase }}>
            {children}
        </ShowContext.Provider>
    );
}

export const useShowContext = () => {
    const context = useContext(ShowContext);
    if (!context) {
        throw new Error('useShowContext must be used within ShowProvider');
    }
    return context;
};