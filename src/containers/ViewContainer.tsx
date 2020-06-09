import React from "react";

interface Iprops {
    children: JSX.Element;
    size?: "lg" | "md" | "sm";
}
export default function ViewContainer({ children, size }: Iprops) {
    const sizeClass = size ? size : "lg";
    return <div className={`view-container-${sizeClass} m-auto `}>{children}</div>;
}
