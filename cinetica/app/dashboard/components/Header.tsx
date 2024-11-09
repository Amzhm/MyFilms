import { PropsWithChildren } from 'react';

export const Header = ({ children }: PropsWithChildren) => {
    return (
        <div
            className="flex justify-between items-center p-4 bg-white text-black"
            style={{ gridArea: 'header' }}
        >
            {children}
        </div>
    );
};

export default Header;
