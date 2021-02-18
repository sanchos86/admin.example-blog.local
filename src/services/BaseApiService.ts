import { BaseApiMap } from '@/api/base/api';
import { ApiClient, HttpClient } from '@/typings/misc';

import { TagsApiUnit } from '@/api/base/tags';
import { AuthApiUnit } from '@/api/base/auth';
import { UsersApiUnit } from '@/api/base/users';
import { PostsApiUnit } from '@/api/base/posts';
import { CategoriesApiUnit } from '@/api/base/categories';

export default class BaseApiService implements ApiClient {
  readonly api: BaseApiMap;

  readonly httpService: HttpClient;

  readonly tags: TagsApiUnit;

  readonly auth: AuthApiUnit;

  readonly users: UsersApiUnit;

  readonly posts: PostsApiUnit;

  readonly categories: CategoriesApiUnit;

  constructor(api: BaseApiMap, httpService: HttpClient) {
    this.api = api;
    this.httpService = httpService;
    this.tags = this.api.tags(this.httpService);
    this.auth = this.api.auth(this.httpService);
    this.users = this.api.users(this.httpService);
    this.posts = this.api.posts(this.httpService);
    this.categories = this.api.categories(this.httpService);
  }
}
