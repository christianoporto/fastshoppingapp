import React, { useContext } from "react";
import CustomerForm from "./CustomerForm";
import ExistingCustomerForm from "./ExistingCustomerForm";
import { IPropsOrder } from ".";
import { updateAllOrder } from "../../../store/actions/currentOrderActions";
import { CurrentOrderContext } from "../../../store/contexts/CurrentOrderContext";

export default function CustomerView(props: IPropsOrder) {
    const { dispatch } = useContext(CurrentOrderContext);
    const { order } = props;

    const setCustomerType = (isNewCustomer: boolean) => {
        updateAllOrder({ ...order, isNewCustomer: isNewCustomer }, dispatch, true);
    };

    const isNew = order.isNewCustomer;
    return (
        <div className="p-3 card-desk-2">
            <h3 className="m-0 mb-2">Customer information</h3>
            <div className="display-flex flex-flow-wrap mb-3">
                <p className="m-1 mr-2 display-center-vertical">Are you?</p>
                <div>
                    <button
                        onClick={() => setCustomerType(true)}
                        className={`btn btn-outline mr-2 rounded-all ${isNew && "style-blue"}`}
                    >
                        {isNew && <span className="wahioicon-check-circle"></span>} New customer
                    </button>
                    <button
                        onClick={() => setCustomerType(false)}
                        className={`btn btn-outline rounded-all ${!isNew && "style-blue"}`}
                    >
                        {!isNew && <span className="wahioicon-check-circle"></span>} Existing customer
                    </button>
                </div>
            </div>
            <div className={`mt-2 ${!isNew && "display-none"}`}>
                <CustomerForm {...props} />
            </div>
            <div className={`mt-2 ${isNew && "display-none"}`}>
                <ExistingCustomerForm order={order} />
            </div>
        </div>
    );
}
