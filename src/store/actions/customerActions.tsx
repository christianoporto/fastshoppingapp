import { ICustomer } from "../types/customerTypes";
import { httpMethod } from ".";
import {  customerEndpoint } from "../../services/apiEndpoint";

export const fetchCusmtomerByEmail = (email: string, onResult: (customer?: ICustomer) => void) => {
    httpMethod.get(
        customerEndpoint.get.byEmail(email),
        (result) => {
            const customer: ICustomer = result.data;
            onResult(customer);
        },
        (err) => {
            onResult(undefined);
        }
    );
};
