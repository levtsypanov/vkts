interface AppConfig {
    stageBackUrl: string;
    prodBackUrl: string;
    vkAPIV: string;
    countryId: number;
    appShortNames: any;
    exchangeChatLink: string;
    maxTicketsCount: number;
}
declare global {
    interface Window {
        ___APP_CONFIG___: AppConfig;
    }
}
export declare function getConfig(): AppConfig;
export {};
