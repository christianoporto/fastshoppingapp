import React, { useState, useEffect } from "react";
import { IPropsOrder } from ".";
import { IOrderItem } from "../../../store/types/orderType";
import { formatMoney } from "../../../utils";
import { getTotalAmount, getContainerWidth, lisetenerContainerResize } from "../utils";
import { ICustomer } from "../../../store/types/customerTypes";

const CONTAINER_ID = "summary_order_table_items";
interface ISummaryRow {
    item: IOrderItem;
    isMobile: boolean;
}
const SummaryRow = ({ item, isMobile }: ISummaryRow) => {
    const { product } = item;
    return (
        <tr>
            <td>
                {product.name}
                <div>
                    {isMobile && (
                        <p className="m-0 font-md text-secondary">
                            {formatMoney(product.price)} x {item.quantity}
                        </p>
                    )}
                </div>
            </td>
            {!isMobile && <td>{formatMoney(product.price)}</td>}
            {!isMobile && <td>{item.quantity}</td>}
            <td className="fitwidth">{formatMoney(product.price * item.quantity)}</td>
        </tr>
    );
};

export const validateNewCustomer = (customer: ICustomer) => {
    const values: string[] = [customer.address, customer.email, customer.fullName, customer.idNumber, customer.phoneNumber];
    const valuesFills = values.filter((x) => x && x.length > 0);
    return values.length === valuesFills.length;
};

export default function OrderSummary({ order, onPlaceOrder }: IPropsOrder) {
    const [tableWidth, setTableWidth] = useState(getContainerWidth("root"));
    const [errorCustomer, setErrorCustomer] = useState(false);
    useEffect(() => {
        lisetenerContainerResize(setTableWidth, CONTAINER_ID);
    }, []);
    useEffect(() => {
        setErrorCustomer(false);
    }, [order]);
    const isMobile = tableWidth < 500;

    const placeOrder = () => {
        if (!order.isNewCustomer && order.customer && order.customerId) onPlaceOrder();
        else if (validateNewCustomer(order.customerNew)) onPlaceOrder();
        else setErrorCustomer(true);
    };

    return (
        <div>
            <div className="p-3 card-desk-2">
                <h3 className="m-0 pb-3">Order summary</h3>
                <div>
                    <table id={CONTAINER_ID} className="wahio-table wahio-table-border-top-desktop">
                        {!isMobile && (
                            <thead>
                                <tr>
                                    <th>Product name</th>
                                    <th>unit price</th>
                                    <th>Units</th>
                                    <th className="fitwidth white-space-nowrap">Total price</th>
                                </tr>
                            </thead>
                        )}
                        <tbody>
                            {order.items.map((item, index) => (
                                <SummaryRow key={index} isMobile={isMobile} item={item} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="pb-3 pr-3 pl-3">
                <div className="display-flex">
                    <h3 className="ml-auto mt-0">Total {formatMoney(getTotalAmount(order))}</h3>
                </div>
                {errorCustomer && (
                    <div className="text-right">
                        <p className="m-0 text-warning font-md mb-2">
                            All customer data is required, please enter the information
                        </p>
                    </div>
                )}
                <div className="display-flex">
                    <button onClick={placeOrder} className="btn btn-primary ml-auto">
                        Place order
                    </button>
                </div>
            </div>
        </div>
    );
}
