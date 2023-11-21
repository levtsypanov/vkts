export declare let requestConfig: {
    apiVersion?: string;
    langId?: number | string;
    apiUrl?: string;
    access_token?: string;
};
declare function apiRequest(apiMethod: string, requestData?: object): Promise<any>;
export { apiRequest };
