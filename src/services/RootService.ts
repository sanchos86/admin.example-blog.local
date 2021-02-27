import { Service, Inject } from 'typedi';

import { AppStore } from '@/typings/store';
import tokens from '@/services/tokens';

@Service(tokens.ROOT_SERVICE)
export default class RootService {
  @Inject(tokens.STORE)
  private readonly store!: AppStore;

  resetState() {
    return this.store.dispatch('resetState');
  }
}
