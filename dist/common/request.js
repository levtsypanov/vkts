"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRequest = exports.requestConfig = exports.request = void 0;
const querystring_1 = require("./querystring");
function getXMLHttpRequest() {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }
}
function request(url, { method = 'GET', data = null, timeout, headers } = {}) {
    let isCanceled;
    const error = new Error('Request was aborted');
    const request = getXMLHttpRequest();
    if (data && method.toLowerCase() === 'get') {
        url += `?${querystring_1.querystring.create(data)}`;
    }
    const requestPromise = new Promise((resolve, reject) => {
        if (!request) {
            reject(new Error('XMLHttpRequest not supported'));
        }
        if (timeout) {
            request.timeout = timeout;
        }
        request.open(method, url, true);
        if (headers) {
            Object.keys(headers).forEach(key => {
                request.setRequestHeader(key, headers[key]);
            });
        }
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    resolve(request.responseText);
                }
                else {
                    reject(new Error(request.status.toString()));
                }
            }
        };
        request.ontimeout = function () {
            reject(new Error('XMLHttpRequest timeout expires'));
        };
        request.send(data);
    });
    return {
        promise: new Promise((resolve, reject) => {
            requestPromise
                .then(res => isCanceled ? reject(error) : resolve(res))
                .catch(e => {
                if (isCanceled) {
                    console.log(error);
                    reject(error);
                }
                else {
                    reject(e);
                }
            });
        }),
        abort() {
            isCanceled = true;
            if (request) {
                request.abort();
            }
        }
    };
}
exports.request = request;
/**
 * Конфиг, который заполняется по мере инициализации компонента
 * @property {string} apiVersion
 * @property {number|string} langId
 * @property {string} apiUrl
 * @type {{}}
 */
exports.requestConfig = {};
/**
 * Делает запрос к VK Api, инкапсулируя логику передачи служебных полей, вроде access_token, lang и v
 * Предполагается, что метод будет выполняться после того, как завершит инициализацию,
 * заполнив необходимые поля в requestConfig
 * @param {string} apiMethod API метод. Пример: account.getInfo
 * @param {Object} requestData данные в виде JS объекта
 * @param {Object} opts прочие настройки
 * @param {Object} opts.headers заголовки запроса
 * @param {string} opts.method метод запроса
 * @return {Promise<any>}
 */
function apiRequest(apiMethod, requestData = {}, { headers = {}, method = 'post' } = {}) {
    if (!apiMethod) {
        return Promise.reject('apiMethod is not defined');
    }
    const data = {
        access_token: exports.requestConfig.access_token,
        v: exports.requestConfig.apiVersion,
        lang: exports.requestConfig.langId,
        ...requestData,
    };
    let requestHeaders = headers;
    if (window.location.hostname === 'static.vk.com') {
        requestHeaders.uikit = '1';
    }
    if (method.toLowerCase() === 'post') {
        requestHeaders['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    return request(exports.requestConfig.apiUrl + '/method/' + apiMethod, {
        data: querystring_1.querystring.create(data),
        method,
        headers: requestHeaders
    }).promise.then((data) => {
        const parsedData = JSON.parse(data);
        if (parsedData.error) {
            return Promise.reject(parsedData.error);
        }
        else {
            return parsedData.response;
        }
    }).catch((error) => {
        return Promise.reject(error);
    });
}
exports.apiRequest = apiRequest;
