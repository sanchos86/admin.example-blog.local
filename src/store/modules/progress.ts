import { Module, MutationTree, GetterTree } from 'vuex';

import { RootState, ProgressState } from '@/typings/store';

const namespaced = true;

const getDefaultState = () => ({
  isActiveGlobalProgress: false,
  progress: new Map(),
});

const getters: GetterTree<ProgressState, RootState> = {
  // eslint-disable-next-line max-len
  isActiveProgress: (state): Function => (progressCode: string): boolean => Boolean(state.progress.get(progressCode)),
};

const mutations: MutationTree<ProgressState> = {
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  setGlobalProgress(state, isActiveGlobalProgress: boolean) {
    state.isActiveGlobalProgress = isActiveGlobalProgress;
  },
  setProgress(state, { progressCode, isActive }: { progressCode: string; isActive: boolean }) {
    state.progress.set(progressCode, isActive);
  },
};

const progress: Module<ProgressState, RootState> = {
  namespaced,
  state: getDefaultState(),
  getters,
  mutations,
};

export default progress;
