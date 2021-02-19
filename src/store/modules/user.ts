import { Module, GetterTree, MutationTree } from 'vuex';

import User from '@/models/User';
import { UserState } from '@/typings/store';

const namespaced = true;

const getDefaultState = (): UserState => ({
  user: null,
});

const getters: GetterTree<UserState, {}> = {
  isAuthorized(state): boolean {
    return Boolean(state.user && state.user.id);
  },
};

const mutations: MutationTree<UserState> = {
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  setUser(state, user: User) {
    state.user = user;
  },
};

const user: Module<UserState, {}> = {
  namespaced,
  state: getDefaultState(),
  getters,
  mutations,
};

export default user;
