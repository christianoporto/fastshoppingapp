import fetchApi from "../../services/fetchApi";

export const httpMethod = {
    get: (url: string, onSuccess: (value: any) => void, onError: (value: any) => void) => {
        return fetchApi
            .get(url)
            .then((res: any) => onSuccess(res))
            .catch((error: any) => onError(error));
    },
    put: (url: string, data: any, onSuccess: (value: any) => void, onError: (value: any) => void) => {
        return fetchApi
            .put(url, data)
            .then((response: any) => onSuccess(response))
            .catch((error: any) => onError(error));
    },
    post: (url: string, data: any, onSuccess: (value: any) => void, onError: (value: any) => void) => {
        return fetchApi
            .post(url, data)
            .then((response: any) => onSuccess(response))
            .catch((error: any) => onError(error));
    },
    delete: (url: string, onSuccess: (value: any) => void, onError: (value: any) => void) => {
        return fetchApi
            .delete(url)
            .then((res: any) => onSuccess(res))
            .catch((error: any) => onError(error));
    },
};
