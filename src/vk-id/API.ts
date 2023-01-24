import { makeParams } from './UrlUtils';

export interface ApiConfig {
  domain: string;
  accessToken: string;
  appId: number;
  onCaptcha: CaptchaCallback;
}

type CaptchaCallback = (data: CaptchaData, callback: (result: CaptchaResult) => void) => void;

export interface CaptchaData {
  captcha_sid: string;
  captcha_img: string;
}

export interface CaptchaResult {
  captcha_sid: string;
  captcha_key: string;
}

const ERROR_CAPTCHA = 14;

const VERSION = '5.118';

let apiDomain: string;
let apiParams: string;
let onCaptcha: CaptchaCallback;

export function setApiConfig(config: ApiConfig) {
  onCaptcha = config.onCaptcha;
  apiDomain = config.domain;
  apiParams = makeParams({
    access_token: config.accessToken,
    v: VERSION,
    client_id: config.appId,
  });
}

export function api(method: string, params: any) {
  const url = `https://${apiDomain}/method/${method}?${apiParams}`;
  const paramsString = makeParams(params);

  return fetch(url, {
    method: 'POST',
    body: paramsString,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((res) => res.json()).then((data: any) => {
    if (data.error && data.error.error_code === ERROR_CAPTCHA) {
      const { captcha_sid, captcha_img } = data.error;

      return new window.Promise((resolve) => {
        onCaptcha({ captcha_sid, captcha_img }, (result: CaptchaResult) => {
          const newParams = Object.assign({}, params, result);

          resolve(api(method, newParams));
        });
      });
    }

    return data;
  });
}
