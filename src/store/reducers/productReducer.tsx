import { PaginationList } from "../types";
import {
    IProduct,
    REQUEST_PRODUCTS,
    RECEIVE_PRODUCTS,
    ProductTypes,
    INVALID_REQUEST_PRODUCTS,
    IProductState,
} from "../types/productTypes";

export const productReducer = (state: IProductState, action: ProductTypes): IProductState => {
    switch (action.type) {
        case REQUEST_PRODUCTS:
            return {
                ...state,
                isFetching: true,
                isFetchError: false,
                errorMessage: undefined,
            };
        case RECEIVE_PRODUCTS:
            return {
                ...state,
                pagination: action.value,
                isFetchError: false,
                isFetching: false,
            };
        case INVALID_REQUEST_PRODUCTS:
            return {
                ...state,
                pagination: new PaginationList<IProduct>(),
                isFetching: false,
                isFetchError: true,
            };

        default:
            return state;
    }
};
