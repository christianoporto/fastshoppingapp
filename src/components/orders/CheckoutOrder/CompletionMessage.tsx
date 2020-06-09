import React from "react";
import ViewContainer from "../../../containers/ViewContainer";
import { getFirstWord } from "../../../utils";
import { IOrder } from "../../../store/types/orderType";
import { NavLink } from "react-router-dom";
const ConfettiImage = require("../../../assets/images/confetti.png");

interface IProps {
    order: IOrder;
}

export default function CompletionMessage(props: IProps) {
    const { order } = props;

    let shortName = "";
    if (order.customer) {
        shortName = getFirstWord(order.customer?.fullName) + ", ";
    }
    return (
        <ViewContainer size="md">
            <div>
                <div className="text-center">
                    <img src={ConfettiImage} alt="confetti" />
                    <h1>Thanks for your purchase</h1>
                    <p>
                        {shortName}we hace created your order #{order.number}. Your items will be soon at your door
                    </p>
                    <p>Stay safe</p>
                    <NavLink to="/">
                        <button className="btn btn-primary">Start Again</button>
                    </NavLink>
                </div>
            </div>
        </ViewContainer>
    );
}
