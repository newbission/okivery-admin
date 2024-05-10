import axios from 'axios';

const HOST = import.meta.env.OKV_HOST;

export const myaxios = axios.create({
  baseURL: `http://${HOST}/api/v1/`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
