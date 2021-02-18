import { Service, Inject } from 'typedi';

import tokens from '@/services/tokens';
import BaseApiService from '@/services/BaseApiService';

@Service(tokens.CATEGORIES_SERVICE)
export default class CategoriesService {
  private readonly baseApiService: BaseApiService;

  constructor(@Inject(tokens.BASE_API_SERVICE) baseApiService: BaseApiService) {
    this.baseApiService = baseApiService;
  }

  getCategories(): Promise<any> {
    return this.baseApiService.categories.getCategories();
  }
}
