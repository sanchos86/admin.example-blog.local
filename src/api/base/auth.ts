import {
  ApiUnit,
  ApiUnitFactory,
  HttpClient,
} from '@/typings/misc';

export interface OauthResponse {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  tokenType: string;
}

export interface AuthApiUnit extends ApiUnit {
  login(payload: FormData): Promise<OauthResponse>;
  refresh(payload: FormData): Promise<OauthResponse>;
}

export interface AuthApiUnitFactory extends ApiUnitFactory {
  (httpService: HttpClient): AuthApiUnit;
}

const auth: AuthApiUnitFactory = (httpService: HttpClient): AuthApiUnit => ({
  login(payload: FormData) {
    const url = 'api/oauth/token';
    const extraConfig = { secure: false };
    return httpService.post(url, payload, extraConfig);
  },
  refresh(payload: FormData) {
    const url = 'api/oauth/token';
    const extraConfig = { secure: false };
    return httpService.post(url, payload, extraConfig);
  },
});

export default auth;
