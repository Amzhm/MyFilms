import { PropsWithChildren } from "react";

export const Content = ({ children }: PropsWithChildren) => {
    return (
        <div style={{ gridArea: "content" }}>

            {children}
        </div>
    );
};