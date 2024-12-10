// contexts/LayoutContext.tsx
import { createContext, useContext, PropsWithChildren } from 'react';
import { LayoutUseCase } from '@/useCases/layout/layoutUseCase';

type LayoutContextType = {
    layoutUseCase: LayoutUseCase;
};

const LayoutContext = createContext<LayoutContextType | null>(null);

export function LayoutProvider({ children }: PropsWithChildren) {
    const layoutUseCase = new LayoutUseCase();
    
    return (
        <LayoutContext.Provider value={{ layoutUseCase }}>
            {children}
        </LayoutContext.Provider>
    );
}

export const useLayoutContext = () => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error('useLayoutContext must be used within LayoutProvider');
    }
    return context;
};