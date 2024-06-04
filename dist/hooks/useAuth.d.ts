type TAuthToken = {
    scope: string;
    app_id: number;
};
export declare const useAuth: ({ scope, app_id }: TAuthToken) => (string | (() => Promise<string>))[];
export {};
