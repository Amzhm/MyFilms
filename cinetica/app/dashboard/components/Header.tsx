import { PropsWithChildren } from 'react';

export const Header = ({ children }: PropsWithChildren) => {
    return (
        <div
            className="flex justify-between items-center p-4 bg-white text-black dark:bg-black"
            style={{ gridArea: 'header' }}
        >
            {children}
        </div>
    );
};

export default Header;
