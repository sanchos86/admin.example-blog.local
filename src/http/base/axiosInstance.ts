import { Container } from 'typedi';
import camelcaseKeys from 'camelcase-keys';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import tokens from '@/services/tokens';

import { MimeType } from '@/typings/enum';

const baseURL = 'http://api.web-artisan.ru/api';

const instance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': MimeType.APPLICATION_JSON,
  },
  secure: true,
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const { secure } = config;
    const accessToken = Container.get(tokens.TOKEN_SERVICE).getAccessToken();
    if (secure && accessToken) {
      // eslint-disable-next-line
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
);

instance.interceptors.response.use(
  (response: AxiosResponse) => camelcaseKeys(response.data, { deep: true }),
  (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401 && !error.config.url.includes('/logout')) {
      return Container.get(tokens.AUTH_SERVICE).logout();
    }
    return Promise.reject(error);
  },
);

export default instance;
