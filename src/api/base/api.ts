import tags from '@/api/base/tags';
import auth from '@/api/base/auth';
import users from '@/api/base/users';
import posts from '@/api/base/posts';
import categories from '@/api/base/categories';

import { ApiMap } from '@/typings/misc';

import { TagsApiUnitFactory } from '@/api/base/tags';
import { AuthApiUnitFactory } from '@/api/base/auth';
import { UsersApiUnitFactory } from '@/api/base/users';
import { PostsApiUnitFactory } from '@/api/base/posts';
import { CategoriesApiUnitFactory } from '@/api/base/categories';

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
  categories
};

export default api;
