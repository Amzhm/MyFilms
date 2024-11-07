import { PropsWithChildren } from "react";

export const DashboardLayout = (props: PropsWithChildren) => {
    return (
        <div
            className="bg-blue-400 h-screen w-screen grid"
            style={{
                gridTemplateAreas: `'header header' 'sidebar content'`,
                gridTemplateColumns: "200px 1fr",
                gridTemplateRows: "40px 1fr",
            }}
        >
            {props.children}
        </div>
    );
};