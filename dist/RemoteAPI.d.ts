export declare class RemoteAPI {
    static get(subUrl: string): Promise<Response>;
    static post(subUrl: string, body: any): Promise<Response>;
    static getSearchUrl(searchToken: string): string;
    static openSearchWindow(searchToken: string): void;
}
