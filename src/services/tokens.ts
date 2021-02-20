import { Token } from 'typedi';
import { Store } from 'vuex';

import BaseApiService from '@/services/BaseApiService';
import AlertService from '@/services/AlertService';
import AuthService from '@/services/AuthService';
import TagsService from '@/services/TagsService';
import TokenService from '@/services/TokenService';
import CategoriesService from '@/services/CategoriesService';
import UsersService from '@/services/UsersService';
import TranslationService from '@/services/TranslationService';
import PostsService from '@/services/PostsService';

export default {
  STORE: new Token<Store<{}>>(),
  BASE_API_SERVICE: new Token<BaseApiService>(),
  ALERTS_SERVICE: new Token<AlertService>(),
  AUTH_SERVICE: new Token<AuthService>(),
  TAGS_SERVICE: new Token<TagsService>(),
  TOKEN_SERVICE: new Token<TokenService>(),
  CATEGORIES_SERVICE: new Token<CategoriesService>(),
  USERS_SERVICE: new Token<UsersService>(),
  TRANSLATION_SERVICE: new Token<TranslationService>(),
  POSTS_SERVICE: new Token<PostsService>()
}
