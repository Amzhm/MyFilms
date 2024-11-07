import { PropsWithChildren } from 'react';

export const Header = ({ children }: PropsWithChildren) => {
    return (
        <div
            className="flex justify-between items-center p-3"
            style={{ gridArea: 'header' }}
        >
            {children}
        </div>
    );
};

export default Header;
