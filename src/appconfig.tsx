const getApiEndpoint = (name: string) => {
    const value = process.env.REACT_APP_API_ENDPOINT;
    if (value) return value;
    throw new Error(`The API ENDPOINT with the name [${name}] was not found`);
};

export const API_ENDPOINT = getApiEndpoint("API_ENDPOINT");

export default {
    API_ENDPOINT,
};
