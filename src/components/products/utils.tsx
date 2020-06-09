import { IProduct } from "../../store/types/productTypes";

export const orderByPrice = (a: IProduct, b: IProduct, desc: boolean) => {
    if (desc) return b.price - a.price;
    return a.price - b.price;
};
export const orderByName = (a: IProduct, b: IProduct) => {
    var productNameA = a.name.toUpperCase();
    var productNameB = b.name.toUpperCase();
    if (productNameA < productNameB) {
        return -1;
    }
    if (productNameA > productNameB) {
        return 1;
    }
    return 0;
};
export const orderItems = (items: IProduct[], option: string) => {
    if (option === "Alphabetical") {
        return items.sort((a, b) => orderByName(a, b));
    } else if (option === "Higher price") {
        return items.sort((a, b) => orderByPrice(a, b, true));
    } else {
        return items.sort((a, b) => orderByPrice(a, b, false));
    }
};
