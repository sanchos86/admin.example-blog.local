import deepmerge from 'deepmerge';
import { AxiosInstance, AxiosRequestConfig } from 'axios';

import type { HttpClient, QueryParams } from '@/typings/misc';

export default class AxiosService implements HttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  get(url: string, params: QueryParams = {}, extraConfig: Partial<AxiosRequestConfig> = {}) {
    const defaultConfig: Partial<AxiosRequestConfig> = { params };
    const config = deepmerge(defaultConfig, extraConfig);
    return this.axiosInstance.get(url, config);
  }

  post(url: string, payload = {}, extraConfig: Partial<AxiosRequestConfig> = {}) {
    const defaultConfig: Partial<AxiosRequestConfig> = {};
    const config = deepmerge(defaultConfig, extraConfig);
    return this.axiosInstance.post(url, payload, config);
  }

  put(url: string, payload = {}, extraConfig: Partial<AxiosRequestConfig> = {}) {
    const defaultConfig: Partial<AxiosRequestConfig> = {};
    const config = deepmerge(defaultConfig, extraConfig);
    return this.axiosInstance.put(url, payload, config);
  }

  patch(url: string, payload = {}, extraConfig: Partial<AxiosRequestConfig> = {}) {
    const defaultConfig: Partial<AxiosRequestConfig> = {};
    const config = deepmerge(defaultConfig, extraConfig);
    return this.axiosInstance.patch(url, payload, config);
  }

  // eslint-disable-next-line max-len
  delete(url: string, params: QueryParams = {}, extraConfig: Partial<AxiosRequestConfig> = {}) {
    const defaultConfig: Partial<AxiosRequestConfig> = { params };
    const config = deepmerge(defaultConfig, extraConfig);
    return this.axiosInstance.delete(url, config);
  }
}
