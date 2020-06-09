import { IOrder, IOrderItem } from "./orderType";
import { IProduct } from "./productTypes";

export const ADD_PRODUCT_TO_ORDER = "ADD_PRODUCT_TO_ORDER";
export const CLEAR_CURRENT_ORDER = "CLEAR_CURRENT_ORDER";
export const REMOVE_ORDER_ITEM_FROM_ORDER = "REMOVE_PRODUCT_FROM_ORDER";
export const UPDATE_ORDER_ITEM = "UPDATE_ORDER_ITEM";
export const UPDATE_ALL_ORDER = "UPDATE_ALL_ORDER";

export interface ICurrentOrderState {
    order: IOrder;
}
export interface IRemoveOrderItemype {
    type: typeof REMOVE_ORDER_ITEM_FROM_ORDER;
    value: IOrderItem;
}
export interface IUpdateOrderItemType {
    type: typeof UPDATE_ORDER_ITEM;
    value: IOrderItem;
}
export interface IAddProductToOrderType {
    type: typeof ADD_PRODUCT_TO_ORDER;
    product: IProduct;
}
export interface IClearOrderType {
    type: typeof CLEAR_CURRENT_ORDER;
}
export interface IUpdateAllOrder {
    type: typeof UPDATE_ALL_ORDER;
    value: IOrder;
}
export type CurrentOrderTypes =
    | IAddProductToOrderType
    | IClearOrderType
    | IRemoveOrderItemype
    | IUpdateOrderItemType
    | IUpdateAllOrder;
