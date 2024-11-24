// app/dashboard/components/Content.tsx
import { PropsWithChildren } from 'react';



export const Content = ({ children }: PropsWithChildren) => {
    return (
        <div style={{ gridArea: 'content' }} className="w-full min-h-full bg-white dark:bg-black">
            {children}
        </div>
    );
};