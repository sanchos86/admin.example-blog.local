import { Token } from 'typedi';
import { Store } from 'vuex';

import AuthService from '@/services/AuthService';
import TagsService from '@/services/TagsService';
import TokenService from '@/services/TokenService';
import BaseApiService from '@/services/BaseApiService';
import CategoriesService from '@/services/CategoriesService';

export default {
  STORE: new Token<Store<any>>(),
  TOKEN_SERVICE: new Token<TokenService>(),
  AUTH_SERVICE: new Token<AuthService>(),
  BASE_API_SERVICE: new Token<BaseApiService>(),
  CATEGORIES_SERVICE: new Token<CategoriesService>(),
  TAGS_SERVICE: new Token<TagsService>()
}
