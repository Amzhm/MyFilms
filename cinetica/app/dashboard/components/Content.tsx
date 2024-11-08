import { PropsWithChildren } from "react";

export const Content = ({ children }: PropsWithChildren) => {
    return (
        <div
            className="bg-white"
            style={{ gridArea: "content" }}
        >
            {children}
        </div>
    );
};
