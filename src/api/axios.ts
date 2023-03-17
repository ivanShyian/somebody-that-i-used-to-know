import axiosOriginal from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { getLocalAccessToken } from './auth';

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/${import.meta.env.VITE_API_VERSION}`

export const axiosOptions: AxiosRequestConfig = {
  withCredentials: true,
  baseURL
};

const axiosWithoutRequestInterceptor = axiosOriginal.create(axiosOptions);
const axios: AxiosInstance = axiosOriginal.create(axiosOptions);

axios.interceptors.request.use(
  async config => {
    if (config.headers) config.headers.Authorization = 'Bearer ' + getLocalAccessToken()
    return config;
  },
  error => {
    throw new Error(error);
  },
);

const responseInterceptor = (error: AxiosError) => {
  if (error.response?.status === 401) {}

  return error.response;
};

axios.interceptors.response.use(response => response, responseInterceptor);

axiosWithoutRequestInterceptor.interceptors.response.use(
  response => response,
  responseInterceptor,
);

export { axios, axiosWithoutRequestInterceptor };
