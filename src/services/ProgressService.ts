import { Service, Inject } from 'typedi';

import tokens from '@/services/tokens';

import { AppStore } from '@/typings/store';

@Service(tokens.PROGRESS_SERVICE)
export default class ProgressService {
  @Inject(tokens.STORE)
  private readonly store!: AppStore;

  setGlobalProgress(isActiveGlobalProgress: boolean) {
    this.store.commit('progress/setGlobalProgress', isActiveGlobalProgress);
  }

  setProgress(progressCode: string, isActive: boolean) {
    this.store.commit('progress/setProgress', { progressCode, isActive });
  }
}
