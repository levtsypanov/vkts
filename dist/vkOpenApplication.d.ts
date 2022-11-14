interface OpenApplicationOptions {
    groupId?: number;
    hash?: string;
    mVk?: boolean;
}
export declare const openApplication: (appId: number, options?: OpenApplicationOptions) => void;
export {};
