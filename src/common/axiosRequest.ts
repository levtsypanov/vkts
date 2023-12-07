import axios, { Method } from 'axios';
import { axiosRequestConfig, axiosRequestDefault } from './axiosRequestDefault';

type SuccessResponse<T> = {
    result: 'success';
    data: T;
};

type FailResponse = {
    result: 'fail';
    error: string;
    errorDesc: string;
};

type CustomResponse<T> = SuccessResponse<T> | FailResponse;

type PostData = {
    [key: string]: string | Blob;
};

type Params = {
    [key: string]: any;
};

type Headers = {
    [key: string]: string;
};

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
export const axiosRequest = <T>(
    url: string = axiosRequestConfig.baseURL,
    method: Method,
    postData: PostData,
    isCheckUser: boolean = true,
    params: Params = {},
    headers: Headers = {}
): Promise<CustomResponse<T>> => {
    const checkFunc = (response: any): CustomResponse<T> => {
        if (response.data.result === 'success') {
            return response.data;
        }
        return {
            result: 'fail',
            error: response.data.error || 'unknown',
            errorDesc: response.data.errorDesc || 'unknown'
        };
    };

    const successFunc = (response: any): T => response.data;

    const failFunc = (err: string): Promise<FailResponse> => {
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

    return axiosRequestDefault({
        method,
        url,
        data: preparedPostData,
        headers,
        ...params,
    })
        .then((result) => checkFunc(result))
        .then((result) => successFunc(result))
        .catch((error) => failFunc(error)) as Promise<CustomResponse<T>>;
};

export default axiosRequest;
