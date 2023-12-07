import axios, { AxiosInstance } from 'axios';

export let axiosRequestConfig: { baseURL: string } = { baseURL: '' }; // Изменили тип на {baseURL: string}
export const axiosRequestDefault: AxiosInstance = axios.create(axiosRequestConfig);
