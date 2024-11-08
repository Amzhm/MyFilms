import { PropsWithChildren } from 'react';

export const Header = ({ children }: PropsWithChildren) => {
    return (
        <div
            className="flex justify-between items-center p-4 bg-gray-900 text-white"
            style={{ gridArea: 'header' }}
        >
            {children}
        </div>
    );
};

export default Header;
