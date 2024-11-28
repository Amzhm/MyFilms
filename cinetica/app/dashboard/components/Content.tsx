// app/dashboard/components/Content.tsx
import { PropsWithChildren } from 'react';

export const Content = ({ children }: PropsWithChildren) => {
    return (
        <div 
            style={{ gridArea: 'content' }} 
            className="w-full h-full bg-white dark:bg-black overflow-y-auto"
        >
            {children}
        </div>
    );
};