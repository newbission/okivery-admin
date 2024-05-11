import axios, { AxiosError, Method } from 'axios';
import { APIPurpose, SessionData } from './custom_constant';
import { SessionStorage } from './storage';

const HOST = import.meta.env.OKV_HOST;

export const myaxios = axios.create({
  baseURL: `http://${HOST}/api/v1/`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

myaxios.interceptors.request.use((config) => {
  const accessToken = SessionStorage.getInstance().get(SessionData.ACCESS);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config
});

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
