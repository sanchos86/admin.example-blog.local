import Vue from 'vue';
import Vuex, { StoreOptions, ActionTree } from 'vuex';

import tags from '@/store/modules/tags';
import user from '@/store/modules/user';
import alerts from '@/store/modules/alerts';
import categories from '@/store/modules/categories';
import progress from '@/store/modules/progress';

import { RootState, AppStore } from '@/typings/store';

Vue.use(Vuex);

const actions: ActionTree<RootState, RootState> = {
  resetState({ commit }) {
    commit('tags/resetState');
    commit('user/resetState');
    commit('alerts/resetState');
    commit('categories/resetState');
    commit('progress/resetState');
  },
};

const storeOptions: StoreOptions<RootState> = {
  state: {
    language: 'ru',
  },
  mutations: {
  },
  actions,
  modules: {
    tags,
    user,
    alerts,
    categories,
    progress,
  },
};

const store: AppStore = new Vuex.Store<RootState>(storeOptions);

export default store;
