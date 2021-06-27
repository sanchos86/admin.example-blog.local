import { Container } from 'typedi';
import camelcaseKeys from 'camelcase-keys';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import tokens from '@/services/tokens';
import refreshToken from '@/utils/refreshToken';
import { MimeType } from '@/typings/enum';

const instance: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_AXIOS_BASE_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': MimeType.APPLICATION_JSON,
  },
  secure: true,
  isRequestRetry: false,
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const { secure } = config;
    const accessToken = Container.get(tokens.STORE).state.auth?.accessToken;
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
    const originalConfig = error.config;
    const status = error.response ? error.response.status : null;
    const store = Container.get(tokens.STORE);
    const authService = Container.get(tokens.AUTH_SERVICE);
    const isAuthorized = store.getters['user/isAuthorized'];
    const token = Container.get(tokens.TOKEN_SERVICE).getRefreshToken();
    if (status === 401) {
      if (!originalConfig.isRequestRetry && !error.config.url.includes('/oauth/token') && typeof token === 'string') {
        return refreshToken(token, store, authService, () => {
          originalConfig.isRequestRetry = true;
          return instance.request(originalConfig);
        });
      }
      if (isAuthorized) {
        return Container.get(tokens.AUTH_SERVICE).logout().then(() => Promise.reject(error));
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
