import React from "react";

interface IPropsAlert {
    message: string;
    type: "danger" | "warning";
    className?:string;
}
export default function CardAlert({ message, type,className }: IPropsAlert) {
    const myclass = className ? className  :"";
    return (
        <div className={`alert alert-${type} ${myclass}`}>
            <span>{message}</span>
        </div>
    );
}
