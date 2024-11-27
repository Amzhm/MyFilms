import { PropsWithChildren } from 'react';

export const Header = ({ children }: PropsWithChildren) => {
    return (
        <div
            className="flex justify-between items-center p-4 bg-white text-black dark:bg-black fixed top-0 w-full z-50"
            style={{ gridArea: 'header' }}
        >
            {children}
        </div>
    );
};

export default Header;