import { Service, Inject } from 'typedi';

import tokens from '@/services/tokens';
import BaseApiService from '@/services/BaseApiService';
import TokenService from '@/services/TokenService';
import RootService from '@/services/RootService';

import { Payload } from '@/typings/misc';
import { AppStore } from '@/typings/store';

@Service(tokens.AUTH_SERVICE)
export default class AuthService {
  @Inject(tokens.BASE_API_SERVICE)
  private readonly baseApiService!: BaseApiService;

  @Inject(tokens.STORE)
  private readonly store!: AppStore;

  @Inject(tokens.TOKEN_SERVICE)
  private readonly tokenService!: TokenService;

  @Inject(tokens.ROOT_SERVICE)
  private readonly rootService!: RootService;

  private readonly clientId = 2;

  private readonly clientSecret = 'zfjpd3dMiCOcy5Knm73LlAf6wNUQA02BOewX9WWb';

  private readonly scope = '';

  private preparePayload(params: { [key: string]: any }): FormData {
    const payload = new FormData();

    payload.append('client_id', String(this.clientId));
    payload.append('client_secret', this.clientSecret);
    payload.append('scope', this.scope);

    Object.keys(params).forEach((key) => {
      payload.append(key, params[key]);
    });

    return payload;
  }

  async login(credentials: Payload): Promise<void> {
    const grantType = 'password';
    const payload = this.preparePayload({
      username: credentials.email,
      password: credentials.password,
      // eslint-disable-next-line @typescript-eslint/camelcase
      grant_type: grantType,
    });
    const { accessToken, refreshToken } = await this.baseApiService.auth.login(payload);
    this.store.commit('auth/setAccessToken', accessToken);
    this.tokenService.setRefreshToken(refreshToken);
  }

  async logout() {
    await this.rootService.resetState();
    this.tokenService.removeRefreshToken();
  }

  async refresh(token: string) {
    const grantType = 'refresh_token';
    // eslint-disable-next-line @typescript-eslint/camelcase
    const payload = this.preparePayload({ grant_type: grantType, refresh_token: token });
    const { accessToken, refreshToken } = await this.baseApiService.auth.refresh(payload);
    this.store.commit('auth/setAccessToken', accessToken);
    this.tokenService.setRefreshToken(refreshToken);
  }
}
