import { Module, MutationTree } from 'vuex';

import Tag from '@/models/Tag';
import { TagsState } from '@/typings/store';

const namespaced = true;

const getDefaultState = (): TagsState => ({
  tags: [],
});

const mutations: MutationTree<TagsState> = {
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  setTags(state, tags: Tag[]) {
    state.tags = tags;
  },
  updateTag(state, tag: Tag) {
    state.tags = state.tags.map(el => {
      if (el.id === tag.id) {
        return tag;
      }
      return el;
    });
  },
  deleteTag(state, tagId: number) {
    state.tags = state.tags.filter(el => el.id !== tagId);
  }
};

const tags: Module<TagsState, {}> = {
  namespaced,
  state: getDefaultState(),
  mutations,
};

export default tags;
