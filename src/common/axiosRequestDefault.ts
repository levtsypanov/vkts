import axios, { AxiosInstance } from 'axios';

export let axiosRequestConfig: { baseURL: any } = { baseURL: '' };
export const axiosRequestDefault: AxiosInstance = axios.create(axiosRequestConfig);
