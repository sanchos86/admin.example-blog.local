import { Service, Inject } from 'typedi';

import tokens from '@/services/tokens';
import BaseApiService from '@/services/BaseApiService';
import TokenService from '@/services/TokenService';
import RootService from '@/services/RootService';

import type { AppStore } from '@/typings/store';
import type { LoginForm } from '@/typings/forms';

interface LoginPayloadParams {
  username: string;
  password: string;
  grant_type: string;
}

interface RefreshPayloadParams {
  grant_type: string;
  refresh_token: string;
}

type PayloadParams = LoginPayloadParams | RefreshPayloadParams;

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

  private readonly scope = '';

  private preparePayload(params: PayloadParams): FormData {
    const payload = new FormData();

    payload.append('client_id', String(this.store.state.appConfig.clientId));
    payload.append('client_secret', this.store.state.appConfig.clientSecret);
    payload.append('scope', this.scope);

    Object.keys(params).forEach((key) => {
      payload.append(key, params[key as keyof PayloadParams]);
    });

    return payload;
  }

  async login(credentials: LoginForm): Promise<void> {
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
    /* eslint-disable @typescript-eslint/camelcase */
    const payload = this.preparePayload({
      grant_type: grantType,
      refresh_token: token,
    });
    /* eslint-disable @typescript-eslint/camelcase */
    const { accessToken, refreshToken } = await this.baseApiService.auth.refresh(payload);
    this.store.commit('auth/setAccessToken', accessToken);
    this.tokenService.setRefreshToken(refreshToken);
  }
}
