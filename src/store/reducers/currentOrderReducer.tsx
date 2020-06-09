import { IOrderItem } from "../types/orderType";
import {
    ICurrentOrderState,
    CurrentOrderTypes,
    ADD_PRODUCT_TO_ORDER,
    CLEAR_CURRENT_ORDER,
    UPDATE_ORDER_ITEM,
    REMOVE_ORDER_ITEM_FROM_ORDER,
    UPDATE_ALL_ORDER,
} from "../types/currentOrderTypes";
import { IProduct } from "../types/productTypes";
import { Customer } from "../types/customerTypes";

const getNewItem = (product: IProduct) => {
    const newItem: IOrderItem = { productId: product.id, quantity: 1, product: product };
    return newItem;
};
const addProduct = (state: ICurrentOrderState, product: IProduct) => {
    let copy: IOrderItem[] = [];
    let exists = false;
    state.order.items.forEach((element) => {
        if (element.product?.id === product.id) {
            exists = true;
            copy.push({ ...element, quantity: element.quantity + 1 });
        } else {
            copy.push(element);
        }
    });
    let newItems: IOrderItem[];
    if (exists) {
        newItems = copy;
    } else {
        const newItem: IOrderItem = getNewItem(product);
        newItems = [...state.order.items, newItem];
    }
    state.order.items = newItems;
    return state;
};

const updateOrderItem = (state: ICurrentOrderState, item: IOrderItem, isRemove?: boolean) => {
    let items: IOrderItem[] = [];
    state.order.items.forEach((element) => {
        if (element.productId === item.productId) {
            if (!isRemove) items.push(item);
        } else {
            items.push(element);
        }
    });
    state.order.items = items;
    return state;
};

export const currentOrderReducer = (state: ICurrentOrderState, action: CurrentOrderTypes): ICurrentOrderState => {
    switch (action.type) {
        case ADD_PRODUCT_TO_ORDER:
            return addProduct(state, action.product);
        case UPDATE_ORDER_ITEM:
            return updateOrderItem(state, action.value);
        case REMOVE_ORDER_ITEM_FROM_ORDER:
            return updateOrderItem(state, action.value, true);
        case UPDATE_ALL_ORDER:
            return {
                order: action.value,
            };
        case CLEAR_CURRENT_ORDER:
            return {
                order: {
                    items: [],
                    customerNew: new Customer(),
                },
            };
        default:
            return state;
    }
};
