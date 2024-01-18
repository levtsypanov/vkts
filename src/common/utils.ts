import axios, { AxiosResponse, AxiosError, Method, ResponseType } from 'axios';
import { QueryObject, ObjectString } from './querystring';

type Dictionary<T> = {
    [key: string]: T;
};

export function isObject(object: any): boolean {
    return Object.prototype.toString.call(object) === '[object Object]';
}

export type RequestProps = {
  method?: Method;
  data?: Dictionary<any>;
  query?: QueryObject;
  timeout?: number;
  responseType?: ResponseType;
  headers?: Dictionary<string | number>;
};

export type JSONResponse = AxiosResponse<Dictionary<any>>;

export type JSONError = AxiosError;

const ERROR_TIMEOUT = 'Request timeout expores';
const ERROR_ABORTED = 'Request was aborted';

function appendToUrl(url: string, data: string): string {
  if (!data) {
    return url;
  }

  return url + (url.includes('?') ? '&' : '?') + data;
}

const CancelToken = axios.CancelToken;

export function request(url: string, props: RequestProps = {}) {
  const {
    method = 'GET',
    data,
    query,
    timeout,
    responseType = 'json',
    headers = {},
  } = props;

  if (query && isObject(query)) {
    url = appendToUrl(url, ObjectString.create(query));
  }

  const source = CancelToken.source();
  const requestPromise = axios({
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
    promise: new Promise<JSONResponse>((resolve, reject) => {
      requestPromise
        .then(resolve)
        .catch((error: AxiosError) => {
          if (axios.isCancel(error)) {
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
