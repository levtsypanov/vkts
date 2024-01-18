"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = exports.isObject = void 0;
const axios_1 = __importDefault(require("axios"));
const querystring_1 = require("./querystring");
function isObject(object) {
    return Object.prototype.toString.call(object) === '[object Object]';
}
exports.isObject = isObject;
const ERROR_TIMEOUT = 'Request timeout expores';
const ERROR_ABORTED = 'Request was aborted';
function appendToUrl(url, data) {
    if (!data) {
        return url;
    }
    return url + (url.includes('?') ? '&' : '?') + data;
}
const CancelToken = axios_1.default.CancelToken;
function request(url, props = {}) {
    const { method = 'GET', data, query, timeout, responseType = 'json', headers = {}, } = props;
    if (query && isObject(query)) {
        url = appendToUrl(url, querystring_1.ObjectString.create(query));
    }
    const source = CancelToken.source();
    const requestPromise = (0, axios_1.default)({
        url,
        method,
        data,
        headers,
        responseType,
        timeout,
        timeoutErrorMessage: ERROR_TIMEOUT,
        cancelToken: source.token,
    });
    return {
        promise: new Promise((resolve, reject) => {
            requestPromise
                .then(resolve)
                .catch((error) => {
                if (axios_1.default.isCancel(error)) {
                    reject(new Error(ERROR_ABORTED));
                    return;
                }
                reject(error);
            });
        }),
        abort: () => {
            source.cancel(ERROR_ABORTED);
        },
    };
}
exports.request = request;
