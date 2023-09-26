export declare function request(url: string, { method, data, timeout, headers }?: {
    method?: string;
    data?: any;
    timeout?: number;
    headers?: Record<string, string>;
}): {
    promise: Promise<any>;
    abort: () => void;
};
/**
 * Конфиг, который заполняется по мере инициализации компонента
 * @property {string} apiVersion
 * @property {number|string} langId
 * @property {string} apiUrl
 * @type {{}}
 */
export declare let requestConfig: {
    apiVersion?: string;
    langId?: number | string;
    apiUrl?: string;
    access_token?: string;
};
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
export declare function apiRequest(apiMethod: string, requestData?: object, { headers, method }?: {
    headers?: Record<string, string>;
    method?: string;
}): Promise<any>;
