import { Dispatch } from "react";
import {
    ProductTypes,
    IRequestProductsType,
    REQUEST_PRODUCTS,
    IReceiveProductsType,
    RECEIVE_PRODUCTS,
    IProduct,
    IInvalidRequestProductsType,
    INVALID_REQUEST_PRODUCTS,
} from "../types/productTypes";
import { httpMethod } from ".";
import { IPaginationRequest, IPaginationList } from "../types";
import { productEndpoint } from "../../services/apiEndpoint";
import { getFetchError } from "../../services/fetchApi";

const requestProducts = (): IRequestProductsType => {
    return { type: REQUEST_PRODUCTS };
};
const receiveProducts = (data: IPaginationList<IProduct>): IReceiveProductsType => {
    return { type: RECEIVE_PRODUCTS, value: data };
};
const invalidRequest = (message: string): IInvalidRequestProductsType => {
    return {
        type: INVALID_REQUEST_PRODUCTS,
        message,
    };
};
export const fetchProductsInPages = (pagReq: IPaginationRequest, dispatch: Dispatch<ProductTypes>) => {
    dispatch(requestProducts());
    httpMethod.post(
        productEndpoint.post.getProductsInPages,
        pagReq,
        (result) => {
            dispatch(receiveProducts(result.data));
        },
        (err) => {
            const error = getFetchError(err);
            dispatch(invalidRequest(error.message));
        }
    );
};
