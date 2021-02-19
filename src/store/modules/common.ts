import { Module } from 'vuex';

import { CommonState } from '@/typings/store';

const namespaced = true;

const getDefaultState = (): CommonState => ({
  language: 'ru',
});

const common: Module<CommonState, {}> = {
  namespaced,
  state: getDefaultState(),
};

export default common;
