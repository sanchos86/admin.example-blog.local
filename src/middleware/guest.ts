import { AppStore } from '@/typings/store';

export default ({ next, store }: { next: Function; store: AppStore }) => {
  if (store.getters['user/isAuthorized']) {
    return next({ name: 'home' });
  }
  return next();
};
