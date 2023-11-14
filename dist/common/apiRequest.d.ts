export declare let requestConfig: {
    apiVersion?: string;
    langId?: number | string;
    apiUrl?: string;
    access_token?: string;
};
export declare function apiRequest(apiMethod: string, requestData?: object): any[];
