import { Service, Inject } from 'typedi';

import Category from '@/models/Category';
import tokens from '@/services/tokens';
import BaseApiService from '@/services/BaseApiService';

import { AppStore } from '@/typings/store';

@Service(tokens.CATEGORIES_SERVICE)
export default class CategoriesService {
  @Inject(tokens.BASE_API_SERVICE)
  private readonly baseApiService!: BaseApiService;

  @Inject(tokens.STORE)
  private readonly store!: AppStore;

  async getCategories(): Promise<Category[]> {
    let categories = await this.baseApiService.categories.getCategories();
    categories = categories.map((el: any) => new Category(el));
    this.store.commit('categories/setCategories', categories);
    return categories;
  }

  async addCategory(data: any): Promise<Category> {
    const payload = Category.getPayloadToAddCategory(data);
    return this.baseApiService.categories.addCategory(payload);
  }

  async editCategory(categoryId: number, data: any): Promise<Category> {
    const payload = Category.getPayloadToEditCategory(data);
    let editedCategory = await this.baseApiService.categories.editCategory(categoryId, payload);
    editedCategory = new Category(editedCategory);
    this.store.commit('categories/updateCategory', editedCategory);
    return editedCategory;
  }
}
