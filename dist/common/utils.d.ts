import { AxiosResponse, AxiosError, Method, ResponseType } from 'axios';
import { QueryObject } from './querystring';
type Dictionary<T> = {
    [key: string]: T;
};
export declare function isObject(object: any): boolean;
export type RequestProps = {
    method?: Method;
    data?: Dictionary<any>;
    query?: QueryObject;
    timeout?: number;
    responseType?: ResponseType;
    headers?: Dictionary<string | number>;
};
export type JSONResponse = AxiosResponse<Dictionary<any>>;
export type JSONError = AxiosError;
export declare function request(url: string, props?: RequestProps): {
    promise: Promise<JSONResponse>;
    abort: () => void;
};
export {};
