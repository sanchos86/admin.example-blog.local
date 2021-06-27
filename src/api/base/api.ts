import tags from '@/api/base/tags';
import auth from '@/api/base/auth';
import users from '@/api/base/users';
import posts from '@/api/base/posts';
import categories from '@/api/base/categories';

import type { TagsApiUnitFactory } from '@/api/base/tags';
import type { AuthApiUnitFactory } from '@/api/base/auth';
import type { UsersApiUnitFactory } from '@/api/base/users';
import type { PostsApiUnitFactory } from '@/api/base/posts';
import type { CategoriesApiUnitFactory } from '@/api/base/categories';
import type { ApiMap } from '@/typings/misc';

export interface BaseApiMap extends ApiMap {
  tags: TagsApiUnitFactory;
  auth: AuthApiUnitFactory;
  users: UsersApiUnitFactory;
  posts: PostsApiUnitFactory;
  categories: CategoriesApiUnitFactory;
}

const api: BaseApiMap = {
  tags,
  auth,
  users,
  posts,
  categories,
};

export default api;
