import React, { createContext, useReducer, Dispatch } from "react";
import { IProductState, ProductTypes, ProductInitialState } from "../types/productTypes";
import { productReducer } from "../reducers/productReducer";

export interface IContextProps {
    productState: IProductState;
    dispatch: Dispatch<ProductTypes>;
}

export const ProductContext = createContext({} as IContextProps);

const ProductContextProvider = (props: any) => {
    const [productState, dispatch] = useReducer(productReducer, new ProductInitialState());
    return <ProductContext.Provider value={{ productState, dispatch }}>{props.children}</ProductContext.Provider>;
};

export default ProductContextProvider;
