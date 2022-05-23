export interface AppToggles {
    toggleShowFeed: boolean;
}
export declare function getDefaultToggles(): Promise<AppToggles>;
export declare const loadAppToggles: (vkClient: any) => Promise<AppToggles>;
