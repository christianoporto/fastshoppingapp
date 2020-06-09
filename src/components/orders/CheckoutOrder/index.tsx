import React, { useContext, useState, useEffect } from "react";
import ViewContainer from "../../../containers/ViewContainer";
import { CurrentOrderContext } from "../../../store/contexts/CurrentOrderContext";
import CustomerView from "./CustomerView";
import OrderSummary from "./OrderSummary";
import { IOrder } from "../../../store/types/orderType";
import { createOrder, updateAllOrder } from "../../../store/actions/currentOrderActions";
import { Customer } from "../../../store/types/customerTypes";
import CompletionMessage from "./CompletionMessage";
import LoadingDualRing from "../../../animations/LoadingDualRing";
import { Redirect } from "react-router-dom";

export interface IPropsOrder {
    order: IOrder;
    onPlaceOrder: () => void;
}

const initStateCreation = {
    isFetching: false,
    isError: false,
    error: "",
};
export default function CheckoutPage() {
    const { currentOrderState, dispatch } = useContext(CurrentOrderContext);
    const [orderResult, setOrderResult] = useState<IOrder | undefined>(undefined);
    const [isEmpty, setIsEmpty] = useState(false);

    const [currentCreation, setCurrentCreation] = useState(initStateCreation);
    const { order } = currentOrderState;

    useEffect(() => {
        setOrderResult(undefined);
        document.title = "Fast shopping | Checkout";
        setIsEmpty(order.items.length === 0 && !orderResult && !currentCreation.isFetching);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onPlaceOrder = () => {
        setCurrentCreation({ ...initStateCreation, isFetching: true });
        createOrder(
            order,
            (result) => {
                localStorage.removeItem("order");
                updateAllOrder({ items: [], customerNew: new Customer(), isNewCustomer: true }, dispatch, true);
                setCurrentCreation({ isFetching: false, isError: false, error: "" });
                setOrderResult(result);
            },
            (err) => {
                setCurrentCreation({ isFetching: false, isError: true, error: err.message });
                setOrderResult(undefined);
            }
        );
    };

    if (currentCreation.isError) {
        return (
            <ViewContainer size="md">
                <div className="alert alert-danger mt-4">
                    <div className="p-4">
                        <p className="m-0">An error occurred while trying to create the purchase: </p>
                        <button className="btn btn-danger mt-2">Okay</button>
                    </div>
                </div>
            </ViewContainer>
        );
    }
    if (currentCreation.isFetching) {
        return <LoadingDualRing center={true} className="mt-3" />;
    }
    if (orderResult) {
        return <CompletionMessage order={orderResult} />;
    }

    if (isEmpty) {
        return <Redirect to="/" />;
    }

    return (
        <ViewContainer>
            <div className="order-view-container">
                <div className="view-md">
                    <CustomerView onPlaceOrder={onPlaceOrder} order={order} />
                </div>
                <div className="w-100">
                    <OrderSummary onPlaceOrder={onPlaceOrder} order={order} />
                </div>
            </div>
        </ViewContainer>
    );
}
