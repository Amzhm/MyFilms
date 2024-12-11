import { PropsWithChildren } from 'react';

export const Header = ({ children }: PropsWithChildren) => {
    return (
        <div
            className="flex flex-col bg-white text-black dark:bg-black fixed top-0 w-full z-50"
            style={{ gridArea: 'header' }}
        >
            <div className="flex justify-between items-center p-4">
                {children}
            </div>
            
        </div>
    );
};

export default Header;