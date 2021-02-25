import { RouteConfig } from 'vue-router';

import { auth } from '@/middleware';

import Internal from '@/layouts/Internal.vue';
import Home from '@/views/internal/Home.vue';
import Tags from '@/views/internal/Tags.vue';
import Posts from '@/views/internal/Posts.vue';
import NewPost from '@/views/internal/NewPost.vue';
import EditPost from '@/views/internal/EditPost.vue';
import Categories from '@/views/internal/Categories.vue';
import Profile from '@/views/internal/Profile.vue';

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
      {
        path: 'tags',
        name: 'tags',
        component: Tags,
        meta: {
          middleware: [auth]
        }
      },
      {
        path: 'posts',
        name: 'posts',
        component: Posts,
        meta: {
          middleware: [auth]
        }
      },
      {
        path: 'posts/new',
        name: 'new-post',
        component: NewPost,
        meta: {
          middleware: [auth]
        }
      },
      {
        path: 'posts/:slug',
        name: 'edit-post',
        component: EditPost,
        meta: {
          middleware: [auth]
        }
      },
      {
        path: 'categories',
        name: 'categories',
        component: Categories,
        meta: {
          middleware: [auth]
        }
      },
      {
        path: 'profile',
        name: 'profile',
        component: Profile,
        meta: {
          middleware: [auth]
        }
      }
    ],
  },
];

export default internal;
