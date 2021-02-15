import deepmerge from 'deepmerge';
import { AxiosInstance, AxiosRequestConfig } from 'axios';

import * as misc from '@/typings/misc';

export default class AxiosService implements misc.HttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  get(url: string, params: misc.QueryParams = {}, extraConfig: Partial<AxiosRequestConfig> = {}) {
    const defaultConfig: Partial<AxiosRequestConfig> = { params };
    const config = deepmerge(defaultConfig, extraConfig);
    return this.axiosInstance.get(url, config);
  }

  post(url: string, data = {}, extraConfig: Partial<AxiosRequestConfig> = {}) {
    const defaultConfig: Partial<AxiosRequestConfig> = {};
    const config = deepmerge(defaultConfig, extraConfig);
    return this.axiosInstance.post(url, data, config);
  }

  put(url: string, data = {}, extraConfig: Partial<AxiosRequestConfig> = {}) {
    const defaultConfig: Partial<AxiosRequestConfig> = {};
    const config = deepmerge(defaultConfig, extraConfig);
    return this.axiosInstance.put(url, data, config);
  }

  patch(url: string, data = {}, extraConfig: Partial<AxiosRequestConfig> = {}) {
    const defaultConfig: Partial<AxiosRequestConfig> = {};
    const config = deepmerge(defaultConfig, extraConfig);
    return this.axiosInstance.patch(url, data, config);
  }

  // eslint-disable-next-line max-len
  delete(url: string, params: misc.QueryParams = {}, extraConfig: Partial<AxiosRequestConfig> = {}) {
    const defaultConfig: Partial<AxiosRequestConfig> = { params };
    const config = deepmerge(defaultConfig, extraConfig);
    return this.axiosInstance.delete(url, config);
  }
}
