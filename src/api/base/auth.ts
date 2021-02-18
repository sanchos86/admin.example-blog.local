import { ApiUnit, ApiUnitFactory, HttpClient, Payload } from '@/typings/misc';

export interface AuthApiUnit extends ApiUnit {
  login(credentials: Payload): Promise<any>;
  logout(): Promise<any>;
  refresh(): Promise<any>;
}

export interface AuthApiUnitFactory extends ApiUnitFactory {
  (httpService: HttpClient): AuthApiUnit;
}

const auth: AuthApiUnitFactory = (httpService: HttpClient): AuthApiUnit => ({
  login(credentials: Payload): Promise<any> {
    const url = 'login';
    const extraConfig = { secure: false };
    return httpService.post(url, credentials, extraConfig);
  },
  logout(): Promise<void> {
    const url = 'logout';
    return httpService.post(url);
  },
  refresh(): Promise<any> {
    const url = 'refresh';
    return httpService.post(url);
  }
});

export default auth;
