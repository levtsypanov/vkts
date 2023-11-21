"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRequest = exports.requestConfig = void 0;
exports.requestConfig = {};
async function apiRequest(apiMethod, requestData = {}) {
    const queryParams = [];
    // Добавление параметра access_token
    if (exports.requestConfig.access_token) {
        queryParams.push(`access_token=${exports.requestConfig.access_token}`);
    }
    // Добавление параметра langId
    if (exports.requestConfig.langId) {
        queryParams.push(`langId=${exports.requestConfig.langId}`);
    }
    // Добавление параметра apiVersion
    if (exports.requestConfig.apiVersion) {
        queryParams.push(`v=${exports.requestConfig.apiVersion}`);
    }
    // Добавление дополнительных параметров из requestData
    Object.entries(requestData).forEach(([key, value]) => {
        queryParams.push(`${key}=${encodeURIComponent(value)}`);
    });
    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    const url = `${exports.requestConfig.apiUrl}/method/${apiMethod}${queryString}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}
exports.apiRequest = apiRequest;
