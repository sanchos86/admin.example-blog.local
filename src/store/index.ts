import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import common from '@/store/modules/common';
import categories from '@/store/modules/categories';

Vue.use(Vuex);

const store: StoreOptions<{}> = {
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    common,
    categories,
  },
};

export default new Vuex.Store<{}>(store);
