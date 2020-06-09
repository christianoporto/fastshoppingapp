import React, { createContext, useReducer, Dispatch } from "react";
import { CurrentOrderTypes, ICurrentOrderState } from "../types/currentOrderTypes";
import { currentOrderReducer } from "../reducers/currentOrderReducer";
import { Customer } from "../types/customerTypes";

export interface IContextProps {
    currentOrderState: ICurrentOrderState;
    dispatch: Dispatch<CurrentOrderTypes>;
}

export const CurrentOrderContext = createContext({} as IContextProps);

const CurrentOrderContextProvider = (props: any) => {
    const [currentOrderState, dispatch] = useReducer(currentOrderReducer, {
        order: { items: [], customerNew: new Customer(), isNewCustomer: true },
    });

    return <CurrentOrderContext.Provider value={{ currentOrderState, dispatch }}>{props.children}</CurrentOrderContext.Provider>;
};

export default CurrentOrderContextProvider;
