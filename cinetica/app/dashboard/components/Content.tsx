import { PropsWithChildren } from "react";

export const Content = ({ children }: PropsWithChildren) => {
    return (
        <div className="bg-green-400" style={{ gridArea: "content" }}>
            {children}
        </div>
    );
};