import { Method } from 'axios';
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
export declare const axiosRequest: <T>(url: string | undefined, method: Method, postData: PostData, isCheckUser?: boolean, params?: Params, headers?: Headers) => Promise<CustomResponse<T>>;
export default axiosRequest;
