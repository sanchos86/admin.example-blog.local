import { AppStore } from '@/typings/store';
import AuthService from '@/services/AuthService';

export default (
  refreshToken: string,
  store: AppStore,
  authService: AuthService,
  callback: (value: unknown) => unknown,
) => {
  if (store.state.auth?.isRefreshingToken && store.state.auth.refreshingTokenPromise instanceof Promise) {
    const chained = store.state.auth.refreshingTokenPromise.then(callback);
    store.commit('auth/setRefreshingTokenPromise', chained);
    return chained;
  }
  store.commit('auth/setIsRefreshingToken', true);
  const refreshingTokenPromise = authService.refresh(refreshToken)
    .then(() => {
      store.commit('auth/setIsRefreshingToken', false);
      store.commit('auth/setRefreshingTokenPromise', null);
    })
    .then(callback);
  store.commit('auth/setRefreshingTokenPromise', refreshingTokenPromise);
  return refreshingTokenPromise;
};
