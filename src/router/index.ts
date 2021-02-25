import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import store from '@/store';
import pipeline from '@/middleware/pipeline';
import auth from '@/router/modules/auth';
import internal from '@/router/modules/internal';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  ...internal,
  ...auth,
  {
    path: '*',
    redirect: { name: 'home' }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (!Array.isArray(to.meta && to.meta.middleware)) {
    return next();
  }
  const { middleware } = to.meta;
  const context = {
    to,
    from,
    next,
    store
  };
  return middleware[0]({
    ...context,
    next: pipeline(context, middleware, 1)
  });
});


export default router;
