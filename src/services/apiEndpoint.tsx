import appconfig from "../appconfig";
import { joinUrl } from "../utils";

const api = appconfig.API_ENDPOINT;
export const productEndpoint = {
    get: {
        customersByAccount: joinUrl(api, "customer/api/customers/account/"),
        customer: joinUrl(api, "customer/api/customers/"),
    },
    post: {
        getProductsInPages: joinUrl(api, "products/pages"),
    },
};
export const orderEndpoint = {
    post: {
        createOrder: joinUrl(api, "orders"),
    },
};
export const customerEndpoint = {
    get: {
        byEmail: (email: string) => joinUrl(api, `customers/email/${email}`),
    },
};
