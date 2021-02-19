import Vue from 'vue';
import Vuex, {Store, StoreOptions} from 'vuex';

import tags from '@/store/modules/tags';
import common from '@/store/modules/common';
import alerts from '@/store/modules/alerts';
import categories from '@/store/modules/categories';

Vue.use(Vuex);

const storeOptions: StoreOptions<{}> = {
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

const store: Store<{}> = new Vuex.Store<{}>(storeOptions);

export default store;
