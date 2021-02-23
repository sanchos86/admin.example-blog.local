import { Module, MutationTree } from 'vuex';

import Category from '@/models/Category';

import { RootState, CategoriesState } from '@/typings/store';

const namespaced = true;

const getDefaultState = (): CategoriesState => ({
  categories: [],
});

const mutations: MutationTree<CategoriesState> = {
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  setCategories(state, categories: Category[]) {
    state.categories = categories;
  },
  updateCategory(state, category: Category) {
    state.categories = state.categories.map((el) => {
      if (el.id === category.id) {
        return category;
      }
      return el;
    });
  },
};

const categories: Module<CategoriesState, RootState> = {
  namespaced,
  state: getDefaultState(),
  mutations,
};

export default categories;
