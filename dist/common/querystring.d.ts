interface QueryOptions {
    encode?: boolean;
}
interface QueryData {
    [key: string]: string | number | boolean | string[] | number[] | boolean[];
}
export declare const querystring: {
    parse: (string?: string) => QueryData;
    create: (data?: QueryData, opts?: QueryOptions) => string;
};
export {};
