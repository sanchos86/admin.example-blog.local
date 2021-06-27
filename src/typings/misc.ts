import { AxiosRequestConfig } from 'axios';

export interface ApiUnit {
  [key: string]: (...args: any[]) => Promise<any>;
}

export interface ApiUnitFactory {
  (httpService: HttpClient): ApiUnit;
}

export interface ApiMap {
  [key: string]: ApiUnitFactory;
}

export interface ApiClient {
  readonly api: ApiMap;
  readonly httpService: HttpClient;
}

export interface QueryParams {
  [key: string]: number | string;
}

export interface Payload {
  [key: string]: unknown;
}

export interface HttpClient {
  get(url: string, params?: QueryParams, extraConfig?: Partial<AxiosRequestConfig>): Promise<any>;
  post(url: string, payload?: Payload | FormData, extraConfig?: Partial<AxiosRequestConfig>): Promise<any>;
  put(url: string, payload?: Payload, extraConfig?: Partial<AxiosRequestConfig>): Promise<any>;
  patch(url: string, payload?: Payload, extraConfig?: Partial<AxiosRequestConfig>): Promise<any>;
  delete(url: string, params?: QueryParams, extraConfig?: Partial<AxiosRequestConfig>): Promise<any>;
}

export type Loading = {
  [key: string]: boolean;
};
