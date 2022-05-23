interface VkClientOptions {
    scope?: string[];
    appId: number;
    v: string;
}
export declare function createVkClientInstance(options: VkClientOptions): {
    call(method: any, params: any): Promise<any>;
};
export {};
