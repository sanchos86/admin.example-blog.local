import type {
  ApiUnit,
  ApiUnitFactory,
  HttpClient,
  Payload,
} from '@/typings/misc';
import type { CategoryEntity } from '@/models/Category';

export interface CategoriesApiUnit extends ApiUnit {
  getCategories(): Promise<CategoryEntity[]>;
  addCategory(payload: Payload): Promise<CategoryEntity>;
  editCategory(categoryId: number, payload: Payload): Promise<CategoryEntity>;
  deleteCategory(categoryId: number): Promise<void>;
}

export interface CategoriesApiUnitFactory extends ApiUnitFactory {
  (httpService: HttpClient): CategoriesApiUnit;
}

const categories: CategoriesApiUnitFactory = (httpService: HttpClient): CategoriesApiUnit => ({
  getCategories() {
    const url = 'api/categories';
    return httpService.get(url);
  },
  addCategory(payload: Payload) {
    const url = 'api/categories';
    return httpService.post(url, payload);
  },
  editCategory(categoryId: number, payload: Payload) {
    const url = `api/categories/${categoryId}`;
    return httpService.put(url, payload);
  },
  deleteCategory(categoryId: number) {
    const url = `api/categories/${categoryId}`;
    return httpService.delete(url);
  },
});

export default categories;
