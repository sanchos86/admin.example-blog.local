import { RouteConfig } from 'vue-router';

import { guest } from '@/middleware';

import Auth from '@/layouts/Auth.vue';
import Login from '@/views/auth/Login.vue';

const auth: Array<RouteConfig> = [
  {
    path: '/auth',
    component: Auth,
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login,
        meta: {
          middleware: [guest],
        },
      },
    ],
  },
];

export default auth;
