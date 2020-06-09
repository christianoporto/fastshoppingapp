import React from "react";
import "./style.css";

interface IProps {
    className?: string;
    center?: boolean;
}

export default function LoadingDualRing(props: IProps) {
    return (
        <div className={`${props.center ? "w-100 text-center" : ""} ${props.className ? props.className : ""}`}>
            <div className="lds-dual-ring"></div>
        </div>
    );
}
