import { Token } from 'typedi';

import type BaseApiService from '@/services/BaseApiService';
import type AlertService from '@/services/AlertService';
import type AuthService from '@/services/AuthService';
import type TagsService from '@/services/TagsService';
import type TokenService from '@/services/TokenService';
import type CategoriesService from '@/services/CategoriesService';
import type UsersService from '@/services/UsersService';
import type TranslationService from '@/services/TranslationService';
import type PostsService from '@/services/PostsService';
import type RootService from '@/services/RootService';
import type ProgressService from '@/services/ProgressService';
import type { AppStore } from '@/typings/store';

export default {
  STORE: new Token<AppStore>(),
  BASE_API_SERVICE: new Token<BaseApiService>(),
  ALERTS_SERVICE: new Token<AlertService>(),
  AUTH_SERVICE: new Token<AuthService>(),
  TAGS_SERVICE: new Token<TagsService>(),
  TOKEN_SERVICE: new Token<TokenService>(),
  CATEGORIES_SERVICE: new Token<CategoriesService>(),
  USERS_SERVICE: new Token<UsersService>(),
  TRANSLATION_SERVICE: new Token<TranslationService>(),
  POSTS_SERVICE: new Token<PostsService>(),
  ROOT_SERVICE: new Token<RootService>(),
  PROGRESS_SERVICE: new Token<ProgressService>(),
};
