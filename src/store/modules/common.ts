import { Module } from 'vuex';

import { CommonState } from '@/typings/store';

const namespaced = true;

const state: CommonState = {
  language: 'ru',
};

const common: Module<CommonState, {}> = {
  namespaced,
  state,
};

export default common;
