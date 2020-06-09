import appSettings from "./appsettings.json";

const getValue = (name: string) => {
    var result = (appSettings as any)[name];
    if (result) return result;
    throw new Error(`The attribute with the name [${name}] was not found`);
};

export const API_ENDPOINT = getValue("apiEndpoint");

export default {
    API_ENDPOINT,
};
