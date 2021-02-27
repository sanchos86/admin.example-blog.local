import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import tags from '@/store/modules/tags';
import user from '@/store/modules/user';
import alerts from '@/store/modules/alerts';
import categories from '@/store/modules/categories';

import { RootState, AppStore } from '@/typings/store';

Vue.use(Vuex);

const storeOptions: StoreOptions<RootState> = {
  state: {
    language: 'ru',
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    tags,
    user,
    alerts,
    categories,
  },
};

const store: AppStore = new Vuex.Store<RootState>(storeOptions);

export default store;
