import {
  ApiUnit,
  ApiUnitFactory,
  HttpClient,
  Payload,
} from '@/typings/misc';

export interface AuthApiUnit extends ApiUnit {
  login(payload: FormData): Promise<any>;
  refresh(payload: FormData): Promise<any>;
}

export interface AuthApiUnitFactory extends ApiUnitFactory {
  (httpService: HttpClient): AuthApiUnit;
}

const auth: AuthApiUnitFactory = (httpService: HttpClient): AuthApiUnit => ({
  login(payload: FormData): Promise<any> {
    const url = 'api/oauth/token';
    const extraConfig = { secure: false };
    return httpService.post(url, payload, extraConfig);
  },
  refresh(payload: FormData): Promise<any> {
    const url = 'api/oauth/token';
    const extraConfig = { secure: false };
    return httpService.post(url, payload, extraConfig);
  },
});

export default auth;
