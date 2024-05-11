import axios, { AxiosError, Method } from 'axios';
import { APIPurpose, SessionData } from './custom_constant';
import { SessionStorage } from './storage';

const HOST = import.meta.env.OKV_HOST;

const refreshAxios = axios.create({
  baseURL: `http://${HOST}/api/v1/token/refresh/`,
  timeout: 5000,
});

refreshAxios.interceptors.request.use(async (config) => {
  const refreshToken = SessionStorage.getInstance().get(SessionData.REFRESH);
  if (refreshToken) {
    config.data = {
      ...config.data,
      refresh: refreshToken,
    };
  }
  return config;
});

const myaxios = axios.create({
  baseURL: `http://${HOST}/api/v1/admin/`,
  timeout: 5000,
});

myaxios.interceptors.request.use((config) => {
  const accessToken = SessionStorage.getInstance().get(SessionData.ACCESS);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

myaxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const ss = SessionStorage.getInstance();
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = ss.get(SessionData.REFRESH);
      if (refreshToken) {
        try {
          const response = await axios.post('');
          const newAccessToken = response.data.access;
          ss.set(SessionData.ACCESS, newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          console.error('Failed to refresh access token: ', refreshError);
        }
      } else {
        console.error('Refresh token not found.');
      }
    }
    if (error instanceof AxiosError) {
    }
  }
);

export const getResponseData = async (
  url: string,
  method: Method,
  data?: any
) => {
  try {
    const response = await myaxios(url, { method, data });
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
  }
};
