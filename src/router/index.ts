import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import auth from '@/router/modules/auth';
import internal from '@/router/modules/internal';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  ...internal,
  ...auth,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
