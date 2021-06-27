import { Service, Inject } from 'typedi';

import User from '@/models/User';
import tokens from '@/services/tokens';
import BaseApiService from '@/services/BaseApiService';

import type { AppStore } from '@/typings/store';

@Service(tokens.USERS_SERVICE)
export default class UsersService {
  @Inject(tokens.BASE_API_SERVICE)
  private readonly baseApiService!: BaseApiService;

  @Inject(tokens.STORE)
  private readonly store!: AppStore;

  async getProfile(): Promise<User> {
    const entity = await this.baseApiService.users.getProfile();
    const user = new User(entity);
    this.store.commit('user/setUser', user);
    return user;
  }
}
