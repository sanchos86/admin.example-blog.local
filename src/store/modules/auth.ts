import { Module, MutationTree } from 'vuex';

import { AuthState, RootState } from '@/typings/store';

const namespaced = true;

const getDefaultState = (): AuthState => ({
  accessToken: null,
  isRefreshingToken: false,
  refreshingTokenPromise: null,
});

const mutations: MutationTree<AuthState> = {
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  setAccessToken(state, accessToken: string | null) {
    state.accessToken = accessToken;
  },
  setIsRefreshingToken(state, isRefreshingToken: boolean) {
    state.isRefreshingToken = isRefreshingToken;
  },
  setRefreshingTokenPromise(state, refreshingTokenPromise: Promise<unknown> | null) {
    state.refreshingTokenPromise = refreshingTokenPromise;
  },
};

const auth: Module<AuthState, RootState> = {
  namespaced,
  state: getDefaultState(),
  mutations,
};

export default auth;
