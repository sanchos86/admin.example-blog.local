import { Container } from 'typedi';

import store from '@/store';
import baseApi from '@/api/base/api';
import tokens from '@/services/tokens';
import baseAxiosInstance from '@/http/base/axiosInstance';

import AxiosService from '@/services/AxiosService';
import BaseApiService from '@/services/BaseApiService';

import '@/services/CategoriesService';

const httpService = new AxiosService(baseAxiosInstance);

Container.set(tokens.STORE, store);
Container.set(tokens.BASE_API_SERVICE, new BaseApiService(baseApi, httpService));
