import { PropsWithChildren } from "react";

export const Sidebar = ({ children }: PropsWithChildren) => {
    return (
        <div className="bg-white h-full" style={{ gridArea: "sidebar" }}>
            {children}
        </div>
    );
};