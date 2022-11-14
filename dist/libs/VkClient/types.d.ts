export declare enum VkClientType {
    Navgo = "type_navgo",
    View = "type_view",
    Click = "type_click"
}
export declare type VkClientData = {
    res?: Record<string, any>;
    type: VkClientType;
    e: VkClientType;
};
export interface VkClientInstance<T extends Record<string, VkClientData>> {
    call<K extends keyof T>(event: K, payload: T[K]['res']): void;
    then<K extends keyof T>(event: K, payload: T[K]['res']): void;
    catch<K extends keyof T>(event: K, payload: T[K]['e']): void;
    destroy(): void;
}
