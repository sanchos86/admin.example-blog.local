import { Service, Inject } from 'typedi';

import tokens from '@/services/tokens';
import BaseApiService from '@/services/BaseApiService';

@Service(tokens.TAGS_SERVICE)
export default class TagsService {
  private readonly baseApiService: BaseApiService;

  constructor(@Inject(tokens.BASE_API_SERVICE) baseApiService: BaseApiService) {
    this.baseApiService = baseApiService;
  }

  getTags() {
    return this.baseApiService.tags.getTags();
  }
}
