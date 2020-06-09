import { IPaginationList, PaginationList } from ".";

export const REQUEST_PRODUCTS = "REQUEST_PRODUCTS";
export const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS";
export const INVALID_REQUEST_PRODUCTS = "INVALID_REQUEST_PRODUCTS";

export interface ICategory {
    id: string;
    name: string;
}

export interface IProductCategory {
    id: string;
    productId: string;
    categoryId: string;
    category?: ICategory;
}
export interface IProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    categories: IProductCategory[];
    dateCreated: Date;
}
export interface IProductState {
    pagination: IPaginationList<IProduct>;
    errorMessage?: string;
    isFetching: boolean;
    isFetchError: boolean;
}
export class ProductInitialState implements IProductState {
    pagination: IPaginationList<IProduct> = new PaginationList<IProduct>();
    errorMessage?: string;
    isFetching: boolean = false;
    isFetchError: boolean = false;
}
export interface IRequestProductsType {
    type: typeof REQUEST_PRODUCTS;
}
export interface IReceiveProductsType {
    type: typeof RECEIVE_PRODUCTS;
    value: IPaginationList<IProduct>;
}
export interface IInvalidRequestProductsType {
    type: typeof INVALID_REQUEST_PRODUCTS;
    message: string;
}
export type ProductTypes = IRequestProductsType | IReceiveProductsType | IInvalidRequestProductsType;
