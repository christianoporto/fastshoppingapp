import React from "react";
import DropdownButton from "../controls/DroptownButton";

interface IButtonOrder {
    orderOptions: string[];
    setOrderOption: (value: string) => void;
    title: string;
}
export default function ButtonOrderList({ orderOptions, setOrderOption, title }: IButtonOrder) {
    return (
        <div className="mb-2 display-flex">
            <div className="ml-auto display-flex">
                <p className="m-0 display-center-vertical mr-2">Sort by</p>
                <DropdownButton btnClass="bg-secondary" id="orderbtn" value={title} right={true}>
                    <div className="display-flex flex-direction-column p-2">
                        {orderOptions.map((option, index) => (
                            <button key={index} onClick={() => setOrderOption(option)} className="btn border-0 bg-primary">
                                {option}
                            </button>
                        ))}
                    </div>
                </DropdownButton>
            </div>
        </div>
    );
}
