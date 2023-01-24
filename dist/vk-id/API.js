"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = exports.setApiConfig = void 0;
const UrlUtils_1 = require("./UrlUtils");
const ERROR_CAPTCHA = 14;
const VERSION = '5.118';
let apiDomain;
let apiParams;
let onCaptcha;
function setApiConfig(config) {
    onCaptcha = config.onCaptcha;
    apiDomain = config.domain;
    apiParams = (0, UrlUtils_1.makeParams)({
        access_token: config.accessToken,
        v: VERSION,
        client_id: config.appId,
    });
}
exports.setApiConfig = setApiConfig;
function api(method, params) {
    const url = `https://${apiDomain}/method/${method}?${apiParams}`;
    const paramsString = (0, UrlUtils_1.makeParams)(params);
    return fetch(url, {
        method: 'POST',
        body: paramsString,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then((res) => res.json()).then((data) => {
        if (data.error && data.error.error_code === ERROR_CAPTCHA) {
            const { captcha_sid, captcha_img } = data.error;
            return new window.Promise((resolve) => {
                onCaptcha({ captcha_sid, captcha_img }, (result) => {
                    const newParams = Object.assign({}, params, result);
                    resolve(api(method, newParams));
                });
            });
        }
        return data;
    });
}
exports.api = api;
