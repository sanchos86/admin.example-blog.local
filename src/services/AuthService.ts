import { Service, Inject } from 'typedi';

import { addExpiresInToCurrentDate } from '@/utils/utils';
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

  async login(credentials: Payload): Promise<void> {
    const { accessToken, expiresIn } = await this.baseApiService.auth.login(credentials);
    const expirationDate = addExpiresInToCurrentDate(expiresIn);
    this.tokenService.setAccessToken(accessToken);
    this.tokenService.setExpirationDate(expirationDate);
  }

  async logout() {
    try {
      await this.baseApiService.auth.logout();
      // eslint-disable-next-line no-empty
    } catch (e) {
    } finally {
      await this.rootService.resetState();
      this.tokenService.removeAccessToken();
      this.tokenService.removeExpirationDate();
    }
  }

  async refresh() {
    const { accessToken, expiresIn } = await this.baseApiService.auth.refresh();
    const expirationDate = addExpiresInToCurrentDate(expiresIn);
    this.tokenService.setAccessToken(accessToken);
    this.tokenService.setExpirationDate(expirationDate);
  }
}
