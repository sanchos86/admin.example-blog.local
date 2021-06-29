import { Module, MutationTree } from 'vuex';

import Alert from '@/models/Alert';

import type { RootState, AlertsState } from '@/typings/store';

const namespaced = true;

const getDefaultState = () => ({
  alerts: [],
});

const mutations: MutationTree<AlertsState> = {
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  addAlert(state, alert: Alert) {
    state.alerts = state.alerts.filter(
      (el) => JSON.stringify(el.data) !== JSON.stringify(alert.data),
    );
    state.alerts.push(alert);
  },
  removeAlert(state, alert: Alert) {
    state.alerts = state.alerts.filter((el) => alert.created !== el.created);
  },
};

const alerts: Module<AlertsState, RootState> = {
  namespaced,
  state: getDefaultState(),
  mutations,
};

export default alerts;
