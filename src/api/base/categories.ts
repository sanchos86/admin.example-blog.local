import { ApiUnit, ApiUnitFactory, HttpClient, Payload } from '@/typings/misc';

export interface CategoriesApiUnit extends ApiUnit {
  getCategories(): Promise<any>;
  addCategory(payload: Payload): Promise<any>;
  editCategory(categoryId: number, payload: Payload): Promise<any>;
}

export interface CategoriesApiUnitFactory extends ApiUnitFactory {
  (httpService: HttpClient): CategoriesApiUnit;
}

const categories: CategoriesApiUnitFactory = (httpService: HttpClient): CategoriesApiUnit => ({
  getCategories(): Promise<any> {
    const url = 'categories';
    return httpService.get(url);
  },
  addCategory(payload: Payload): Promise<any> {
    const url = 'categories';
    return httpService.post(url, payload);
  },
  editCategory(categoryId: number, payload: Payload): Promise<any> {
    const url = `categories/${categoryId}`;
    return httpService.put(url, payload);
  }
});

export default categories;
