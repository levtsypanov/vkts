"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = exports.makeParams = exports.makeUrl = void 0;
function makeUrl(url, params) {
    const paramsString = makeParams(params);
    const hasQuery = url.includes('?');
    url = url + (hasQuery ? '&' : '?') + paramsString;
    return url;
}
exports.makeUrl = makeUrl;
function makeParams(params) {
    const pairs = Object.keys(params).map((key) => {
        let param = params[key];
        key = encodeURIComponent(key);
        param = encodeURIComponent(param);
        return `${key}=${param}`;
    });
    return pairs.join('&');
}
exports.makeParams = makeParams;
function request(url, params) {
    const paramsString = makeParams(params);
    return fetch(url, {
        method: 'POST',
        body: paramsString,
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then((res) => res.json());
}
exports.request = request;
