import React, { useState, useEffect, useContext } from "react";
import ViewContainer from "../../../containers/ViewContainer";
import OrderItemViewRow from "./OrderItemViewRow";
import { CurrentOrderContext } from "../../../store/contexts/CurrentOrderContext";
import { IOrderItem } from "../../../store/types/orderType";
import { removeOrderItemFromOrder, updateOrderItemToOrder } from "../../../store/actions/currentOrderActions";
import { NavLink } from "react-router-dom";
import { formatMoney } from "../../../utils";
import { getTotalAmount, getContainerWidth, lisetenerContainerResize } from "../utils";

const CONTAINER_ID = "ordertableview";

const GoToCheckout = () => {
    return (
        <NavLink to="checkout">
            <button className="btn btn-primary">Check out</button>
        </NavLink>
    );
};
const OrderContainer = ({ children, showButton }: any) => {
    return (
        <ViewContainer size="md">
            <div className="pl-3 pr-3 pt-2 pb-2 card-desk-2">
                <div className="display-flex mt-2 mb-2">
                    <h3 className="m-0">Shopping cart</h3>
                    {showButton && (
                        <div className="ml-auto display-center-vertical">
                            <GoToCheckout />
                        </div>
                    )}
                </div>
                {children}
            </div>
        </ViewContainer>
    );
};
const CurrentOrderView = () => {
    const { currentOrderState, dispatch } = useContext(CurrentOrderContext);

    const [tableWidth, setTableWidth] = useState(getContainerWidth("root"));
    useEffect(() => {
        lisetenerContainerResize(setTableWidth, CONTAINER_ID);
         document.title = "Fast shopping | My Order";
    }, []);

    if (!currentOrderState.order || currentOrderState.order.items.length === 0) {
        return (
            <OrderContainer>
                <h3>Aún no tienes nada en el carrito de compras</h3>
            </OrderContainer>
        );
    }

    const onRemoveItem = (value: IOrderItem) => {
        removeOrderItemFromOrder(value, dispatch);
    };
    const onOrderItemChange = (value: IOrderItem, sum: number) => {
        const newQuantity = value.quantity + sum;
        if (newQuantity <= 0) return;
        value.quantity = newQuantity;
        updateOrderItemToOrder(value, dispatch);
    };

    const { order } = currentOrderState;
    return (
        <OrderContainer showButton={true}>
            <div id={CONTAINER_ID}>
                <table id="purchase-table-items" className="wahio-table wahio-table-border-top-desktop">
                    <tbody>
                        {order.items.map((item, index) => (
                            <OrderItemViewRow
                                key={index}
                                index={index + 1}
                                onRemove={onRemoveItem}
                                onQuantityChange={onOrderItemChange}
                                orderItem={item}
                                tableWidth={tableWidth}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mb-3 border-top">
                <div className="display-flex">
                    <div className="display-center-vertical">
                        <NavLink to="/" className="font-md">
                            <span className="wahioicon-arrow-left-chevron mr-2"></span>
                            <span className="text-secondary font-bold-normal ">Continue shopping</span>
                        </NavLink>
                    </div>
                    <h3 className="ml-auto">Total {formatMoney(getTotalAmount(order))}</h3>
                </div>
                <div className="text-right">
                    <GoToCheckout />
                </div>
            </div>
        </OrderContainer>
    );
};

export default CurrentOrderView;
