import { Service, Inject } from 'typedi';

import Category from '@/models/Category';
import tokens from '@/services/tokens';
import BaseApiService from '@/services/BaseApiService';

import type { AppStore } from '@/typings/store';
import type { NewCategoryForm, EditCategoryForm } from '@/typings/forms';

@Service(tokens.CATEGORIES_SERVICE)
export default class CategoriesService {
  @Inject(tokens.BASE_API_SERVICE)
  private readonly baseApiService!: BaseApiService;

  @Inject(tokens.STORE)
  private readonly store!: AppStore;

  async getCategories(): Promise<Category[]> {
    const entities = await this.baseApiService.categories.getCategories();
    const categories = entities.map((el) => new Category(el));
    this.store.commit('categories/setCategories', categories);
    return categories;
  }

  async addCategory(data: NewCategoryForm): Promise<Category> {
    const payload = Category.getPayloadToAddCategory(data);
    const entity = await this.baseApiService.categories.addCategory(payload);
    return new Category(entity);
  }

  async editCategory(categoryId: number, data: EditCategoryForm): Promise<Category> {
    const payload = Category.getPayloadToEditCategory(data);
    const entity = await this.baseApiService.categories.editCategory(categoryId, payload);
    const category = new Category(entity);
    this.store.commit('categories/updateCategory', category);
    return category;
  }

  async deleteCategory(categoryId: number): Promise<void> {
    await this.baseApiService.categories.deleteCategory(categoryId);
    this.store.commit('categories/deleteCategory', categoryId);
  }
}
