import { IProduct } from "../types/productTypes";
import { Dispatch } from "react";
import {
    CurrentOrderTypes,
    ADD_PRODUCT_TO_ORDER,
    IAddProductToOrderType,
    REMOVE_ORDER_ITEM_FROM_ORDER,
    IRemoveOrderItemype,
    IUpdateOrderItemType,
    UPDATE_ORDER_ITEM,
    IUpdateAllOrder,
    UPDATE_ALL_ORDER,
} from "../types/currentOrderTypes";
import { IOrderItem, IOrder } from "../types/orderType";
import { GLOBAL_HOMEID, GLOBAL_CARTID } from "../../containers/MenuHorizontal";
import { httpMethod } from ".";
import { orderEndpoint } from "../../services/apiEndpoint";
import { getFetchError } from "../../services/fetchApi";

const refreshHome = () => {
    const element = document.getElementById(GLOBAL_HOMEID);
    if (element) element.click();
};
const refreshCart = () => {
    const element = document.getElementById(GLOBAL_CARTID);
    if (element) element.click();
};
const addProduct = (product: IProduct): IAddProductToOrderType => {
    return { type: ADD_PRODUCT_TO_ORDER, product };
};
const removeOrderItem = (orderItem: IOrderItem): IRemoveOrderItemype => {
    return { type: REMOVE_ORDER_ITEM_FROM_ORDER, value: orderItem };
};
const updateOrderItem = (orderItem: IOrderItem): IUpdateOrderItemType => {
    return {
        type: UPDATE_ORDER_ITEM,
        value: orderItem,
    };
};
const updateOrder = (order: IOrder): IUpdateAllOrder => {
    return {
        type: UPDATE_ALL_ORDER,
        value: order,
    };
};
export const removeOrderItemFromOrder = (orderItem: IOrderItem, dispatch: Dispatch<CurrentOrderTypes>) => {
    dispatch(removeOrderItem(orderItem));
    refreshCart();
};
export const updateOrderItemToOrder = (orderItem: IOrderItem, dispatch: Dispatch<CurrentOrderTypes>) => {
    dispatch(updateOrderItem(orderItem));
    refreshCart();
};

export const addProductToOrder = (product: IProduct, dispatch: Dispatch<CurrentOrderTypes>) => {
    dispatch(addProduct(product));
    refreshHome();
};
export const updateAllOrder = (order: IOrder, dispatch: Dispatch<CurrentOrderTypes>, stopRedirect?: boolean) => {
    dispatch(updateOrder(order));
    if (!stopRedirect && order.items.length > 0) refreshCart();
};
export const createOrder = (order: IOrder, onResult: (order: IOrder) => void, onError: (error: any) => void) => {
    if (order.isNewCustomer) {
        order.customerId = undefined;
        order.customer = order.customerNew;
    }
    httpMethod.post(
        orderEndpoint.post.createOrder,
        order,
        (result) => {
            const orderResult: IOrder = result.data;
            onResult(orderResult);
        },
        (err) => {
            onError(getFetchError(err));
        }
    );
};
