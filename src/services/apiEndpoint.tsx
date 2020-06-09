import appconfig from "../appconfig";

const api = appconfig.API_ENDPOINT;
export const productEndpoint = {
    get: {
        customersByAccount: `${api}customer/api/customers/account/`,
        customer: `${api}customer/api/customers/`,
    },
    post: {
        getProductsInPages: `${api}products/pages`,
    },
};
export const orderEndpoint = {
    post: {
        createOrder: api + "orders",
    },
};
export const customerEndpoint = {
    get: {
        byEmail: (email: string) => `${api}customers/email/${email}`,
    },
};
