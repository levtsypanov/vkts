import { querystring } from './querystring';

function getXMLHttpRequest(): XMLHttpRequest | undefined {
  if (typeof XMLHttpRequest !== 'undefined') {
    return new XMLHttpRequest();
  }
}

export function request(url: string, { method = 'GET', data = null, timeout, headers }: { method?: string, data?: any, timeout?: number, headers?: Record<string, string> } = {}): { promise: Promise<any>, abort: () => void } {
  let isCanceled: boolean;
  const error: any = new Error('Request was aborted');
  const request: any = getXMLHttpRequest();

  if (data && method.toLowerCase() === 'get') {
    url += `?${querystring.create(data)}`;
  }

  const requestPromise = new Promise<string>((resolve, reject) => {
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
        } else {
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
          } else {
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

/**
 * Конфиг, который заполняется по мере инициализации компонента
 * @property {string} apiVersion
 * @property {number|string} langId
 * @property {string} apiUrl
 * @type {{}}
 */
export let requestConfig: { apiVersion?: string, langId?: number | string, apiUrl?: string, access_token?: string } = {};

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
export function apiRequest(apiMethod: string, requestData: object = {}, { headers = {}, method = 'post' }: { headers?: Record<string, string>, method?: string } = {}): Promise<any> {
  if (!apiMethod) {
    return Promise.reject('apiMethod is not defined');
  }

  const data: any = {
    access_token: requestConfig.access_token,
    v: requestConfig.apiVersion,
    lang: requestConfig.langId,
    ...requestData,
  };

  let requestHeaders = headers;

  if (window.location.hostname === 'static.vk.com') {
    requestHeaders.uikit = '1';
  }

  if (method.toLowerCase() === 'post') {
    requestHeaders['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  return request(requestConfig.apiUrl + '/method/' + apiMethod, {
    data: querystring.create(data),
    method,
    headers: requestHeaders
  }).promise.then((data) => {
    const parsedData = JSON.parse(data);

    if (parsedData.error) {
      return Promise.reject(parsedData.error);
    } else {
      return parsedData.response;
    }
  }).catch((error) => {
    return Promise.reject(error);
  });
}
