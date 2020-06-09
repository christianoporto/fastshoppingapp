import { ICustomer } from "./customerTypes";
import { IProduct } from "./productTypes";

export interface IOrderItem {
    id?: string;
    orderId?: string;
    productId: string;
    quantity: number;
    product: IProduct;
}
export interface IOrder {
    id?: string;
    number?: string;
    customerId?: string;
    dateCreated?: Date;
    totalAmount?: number;
    customer?: ICustomer;
    customerNew: ICustomer;
    isNewCustomer?: boolean;
    items: IOrderItem[];
}
