import { AxiosResponse, AxiosError, Method, ResponseType } from 'axios';
import { QueryObject } from './querystring';
declare type Dictionary<T> = {
    [key: string]: T;
};
export declare function isObject(object: any): boolean;
export declare type RequestProps = {
    method?: Method;
    data?: Dictionary<any>;
    query?: QueryObject;
    timeout?: number;
    responseType?: ResponseType;
    headers?: Dictionary<string | number>;
};
export declare type JSONResponse = AxiosResponse<Dictionary<any>>;
export declare type JSONError = AxiosError;
export declare function request(url: string, props?: RequestProps): {
    promise: Promise<JSONResponse>;
    abort: () => void;
};
export {};
