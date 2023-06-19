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
  
console.info('window.___APP_CONFIG___', window.___APP_CONFIG___);
  
export function getConfig(): AppConfig {
    if (!window.___APP_CONFIG___) console.error('Provide window.___APP_CONFIG___');
    return window.___APP_CONFIG___;
}
