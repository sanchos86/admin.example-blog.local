import { Service, Inject } from 'typedi';
import { Store } from 'vuex';

import Category from '@/models/Category';
import tokens from '@/services/tokens';
import BaseApiService from '@/services/BaseApiService';

@Service(tokens.CATEGORIES_SERVICE)
export default class CategoriesService {
  private readonly baseApiService: BaseApiService;

  private readonly store: Store<{}>;

  constructor(
    @Inject(tokens.BASE_API_SERVICE) baseApiService: BaseApiService,
    @Inject(tokens.STORE) store: Store<{}>
  ) {
    this.baseApiService = baseApiService;
    this.store = store;
  }

  async getCategories(): Promise<Category[]> {
    let categories = await this.baseApiService.categories.getCategories();
    categories = categories.map((el: any) => new Category(el));
    await this.store.dispatch('categories/setCategories', categories);
    return categories;
  }
}
