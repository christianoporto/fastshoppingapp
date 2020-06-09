const wahioFetchApi = require("axios");

wahioFetchApi.default.headers = {
    "content-type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
};

wahioFetchApi.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export const getFetchError = (e: any) => {
    if (e.response) return e.response;
    return {
        status: 500,
        message: e.error,
    };
};

export default wahioFetchApi;
