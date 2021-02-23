import tags, { TagsApiUnitFactory } from '@/api/base/tags';
import auth, { AuthApiUnitFactory } from '@/api/base/auth';
import users, { UsersApiUnitFactory } from '@/api/base/users';
import posts, { PostsApiUnitFactory } from '@/api/base/posts';
import categories, { CategoriesApiUnitFactory } from '@/api/base/categories';

import { ApiMap } from '@/typings/misc';

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
