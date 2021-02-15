export interface ApiMap {
  [key: string]: Function;
}

export interface HttpClient {
  get(url: string): Promise<any>;
  post(url: string): Promise<any>;
  put(url: string): Promise<any>;
  patch(url: string): Promise<any>;
  delete(url: string): Promise<any>;
}

export interface ApiClient {
  readonly api: ApiMap;
  readonly httpClient: HttpClient;
  init(): void;
}

export interface QueryParams {
  [key: string]: number | string;
}
