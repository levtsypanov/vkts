"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosRequest = void 0;
const axiosRequestDefault_1 = require("./axiosRequestDefault");
/**
 * Запрос
 * @param {string} url - URL запроса.
 * @param {string} method - HTTP-метод запроса.
 * @param {Object} postData - Передаваемые данные.
 * @param {boolean} isCheckUser - Проверять ли достоверность ВК или ОК пользователя.
 * @param {Object} params - Парметры запроса axios.
 * @param {Object} headers - Заголовки запроса axios.
 * @return {Promise} - Вернется либо фейл в формате
 * { result: 'fail', error: 'error', errorDesc: 'description' }, либо успех в формате
 * { result: success, data: {Array | Object} }
 */
const axiosRequest = (url = axiosRequestDefault_1.axiosRequestConfig.baseURL, method, postData, isCheckUser = true, params = {}, headers = {}) => {
    const checkFunc = (response) => {
        if (response.data.result === 'success') {
            return response.data;
        }
        return {
            result: 'fail',
            error: response.data.error || 'unknown',
            errorDesc: response.data.errorDesc || 'unknown'
        };
    };
    const successFunc = (response) => response.data;
    const failFunc = (err) => {
        return Promise.reject({
            result: 'fail',
            error: err,
            errorDesc: 'unknown'
        });
    };
    const preparedPostData = new FormData();
    Object.keys(postData).forEach((key) => {
        preparedPostData.append(key, postData[key]);
    });
    if (isCheckUser) {
        preparedPostData.append('url', window.location.href);
    }
    return (0, axiosRequestDefault_1.axiosRequestDefault)({
        method,
        url,
        data: preparedPostData,
        headers,
        ...params,
    })
        .then((result) => checkFunc(result))
        .then((result) => successFunc(result))
        .catch((error) => failFunc(error));
};
exports.axiosRequest = axiosRequest;
exports.default = exports.axiosRequest;
