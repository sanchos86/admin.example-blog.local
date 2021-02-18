import { Module, MutationTree } from 'vuex';

import { CategoriesState } from '@/typings/store';

const namespaced = true;

const state: CategoriesState = {
  categories: [],
};

const mutations: MutationTree<CategoriesState> = {};

const categories: Module<CategoriesState, {}> = {
  namespaced,
  state,
  mutations,
};

export default categories;
