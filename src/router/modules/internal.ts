import { RouteConfig } from 'vue-router';

import { auth } from '@/middleware';

import Internal from '@/layouts/Internal.vue';
import Home from '@/views/internal/Home.vue';

const internal: Array<RouteConfig> = [
  {
    path: '/',
    component: Internal,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
        meta: {
          middleware: [auth],
        },
      },
    ],
  },
];

export default internal;
