import { PropsWithChildren } from "react";

export const Content = ({ children }: PropsWithChildren) => {
    return (
        <div
            className="bg-white dark:bg-black"
            style={{ gridArea: "content" }}
        >
            {children}
        </div>
    );
};
