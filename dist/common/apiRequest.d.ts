export declare let requestConfig: {
    apiVersion?: string;
    langId?: number | string;
    apiUrl?: string;
    access_token?: string;
};
declare function useApiRequest(apiMethod: string, requestData?: object): any[];
export { useApiRequest };
