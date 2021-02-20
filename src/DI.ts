import { Container } from 'typedi';

import store from '@/store';
import i18n from '@/i18n/i18n';
import baseApi from '@/api/base/api';
import tokens from '@/services/tokens';
import baseAxiosInstance from '@/http/base/axiosInstance';

import AxiosService from '@/services/AxiosService';
import BaseApiService from '@/services/BaseApiService';
import TranslationService from '@/services/TranslationService';

import '@/services/AlertService';
import '@/services/AuthService';
import '@/services/CategoriesService';
import '@/services/PostsService';
import '@/services/TagsService';
import '@/services/TokenService';
import '@/services/UsersService';

const httpService = new AxiosService(baseAxiosInstance);

Container.set(tokens.STORE, store);
Container.set(tokens.TRANSLATION_SERVICE, new TranslationService(i18n));
Container.set(tokens.BASE_API_SERVICE, new BaseApiService(baseApi, httpService));
