export interface IUniqueAttribute {
    id: string;
    value: string;
}

export interface IModelRequest {
    modelId: string;
    value?: string;
}
export interface IPaginationRequest {
    currentPage: number;
    pageSize: number;
    request?: IModelRequest;
    totalPages?: number;
    totalItems?: number;
}
export class PaginationRequest implements IPaginationRequest {
    currentPage: number = 1;
    pageSize: number = 20;
    request?: IModelRequest;
    totalPages?: 0;
    totalItems?: 0;

    constructor(modelId?: string, value?: string) {
        if (modelId) {
            this.request = { modelId: modelId, value };
        }
    }
}
export interface IPaginationList<T> extends IPaginationRequest {
    items: T[];
}
export class PaginationList<T> implements IPaginationList<T> {
    items: T[] = [];
    currentPage: number = 1;
    pageSize: number = 20;
    totalPages?: number = 0;
    totalItems?: number = 0;
    request?: IModelRequest;
}
