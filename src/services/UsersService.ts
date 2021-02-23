import { Service, Inject } from 'typedi';

import User from '@/models/User';
import tokens from '@/services/tokens';
import BaseApiService from '@/services/BaseApiService';

import { AppStore } from '@/typings/store';

@Service(tokens.USERS_SERVICE)
export default class UsersService {
  @Inject(tokens.BASE_API_SERVICE)
  private readonly baseApiService!: BaseApiService;

  @Inject(tokens.STORE)
  private readonly store!: AppStore;

  async getProfile(): Promise<User> {
    let user = await this.baseApiService.users.getProfile();
    user = new User(user);
    this.store.commit('user/setUser', user);
    return user;
  }
}
