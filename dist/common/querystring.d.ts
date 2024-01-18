interface QueryOptions {
    encode?: boolean;
}
interface QueryData {
    [key: string]: string | number | boolean | string[] | number[] | boolean[];
}
declare type Dictionary<T> = {
    [key: string]: T;
};
export declare type QueryItem = string | number | boolean;
export declare type QueryObject = Dictionary<QueryItem | QueryItem[]>;
export declare const querystring: {
    parse: (string?: string) => QueryData;
    create: (data?: QueryData, opts?: QueryOptions) => string;
};
declare function create(data: QueryObject): string;
declare function parse(string: string): QueryObject;
export declare const ObjectString: {
    create: typeof create;
    parse: typeof parse;
};
export {};
