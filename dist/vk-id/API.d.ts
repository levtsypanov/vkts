export interface ApiConfig {
    domain: string;
    accessToken: string;
    appId: number;
    onCaptcha: CaptchaCallback;
}
declare type CaptchaCallback = (data: CaptchaData, callback: (result: CaptchaResult) => void) => void;
export interface CaptchaData {
    captcha_sid: string;
    captcha_img: string;
}
export interface CaptchaResult {
    captcha_sid: string;
    captcha_key: string;
}
export declare function setApiConfig(config: ApiConfig): void;
export declare function api(method: string, params: any): Promise<any>;
export {};
