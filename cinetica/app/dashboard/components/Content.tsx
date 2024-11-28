// app/dashboard/components/Content.tsx
import { PropsWithChildren } from 'react';

export const Content = ({ children }: PropsWithChildren) => {
    return (
        <div 
            style={{ gridArea: 'content' }} 
            className="w-full h-[calc(100vh-65px)] bg-white dark:bg-black overflow-y-auto mt-[65px]"
        >
            {children}
        </div>
    );
};