import Vue from 'vue';
import Vuex, { StoreOptions, ActionTree } from 'vuex';

import tags from '@/store/modules/tags';
import user from '@/store/modules/user';
import alerts from '@/store/modules/alerts';
import categories from '@/store/modules/categories';
import progress from '@/store/modules/progress';
import auth from '@/store/modules/auth';

import { RootState, AppStore, AppConfig } from '@/typings/store';

Vue.use(Vuex);

const actions: ActionTree<RootState, RootState> = {
  resetState({ commit }) {
    commit('tags/resetState');
    commit('user/resetState');
    commit('alerts/resetState');
    commit('categories/resetState');
    commit('progress/resetState');
    commit('auth/resetState');
  },
};

const storeOptions: StoreOptions<RootState> = {
  state: {
    language: 'ru',
    appConfig: {} as AppConfig,
  },
  mutations: {
    setAppConfig(state, appConfig: AppConfig) {
      state.appConfig = appConfig;
    },
  },
  actions,
  modules: {
    tags,
    user,
    alerts,
    categories,
    progress,
    auth,
  },
};

const store: AppStore = new Vuex.Store<RootState>(storeOptions);

export default store;
