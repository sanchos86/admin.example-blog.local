import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import tags from '@/store/modules/tags';
import common from '@/store/modules/common';
import alerts from '@/store/modules/alerts';
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
    tags,
    common,
    alerts,
    categories,
  },
};

export default new Vuex.Store<{}>(store);
