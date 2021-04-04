import {
  ApiUnit,
  ApiUnitFactory,
  HttpClient,
  Payload,
} from '@/typings/misc';

export interface CategoriesApiUnit extends ApiUnit {
  getCategories(): Promise<any>;
  addCategory(payload: Payload): Promise<any>;
  editCategory(categoryId: number, payload: Payload): Promise<any>;
  deleteCategory(categoryId: number): Promise<any>;
}

export interface CategoriesApiUnitFactory extends ApiUnitFactory {
  (httpService: HttpClient): CategoriesApiUnit;
}

const categories: CategoriesApiUnitFactory = (httpService: HttpClient): CategoriesApiUnit => ({
  getCategories(): Promise<any> {
    const url = 'api/categories';
    return httpService.get(url);
  },
  addCategory(payload: Payload): Promise<any> {
    const url = 'api/categories';
    return httpService.post(url, payload);
  },
  editCategory(categoryId: number, payload: Payload): Promise<any> {
    const url = `api/categories/${categoryId}`;
    return httpService.put(url, payload);
  },
  deleteCategory(categoryId: number): Promise<any> {
    const url = `api/categories/${categoryId}`;
    return httpService.delete(url);
  },
});

export default categories;
