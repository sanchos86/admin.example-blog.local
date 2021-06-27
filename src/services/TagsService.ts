import { Service, Inject } from 'typedi';

import Tag from '@/models/Tag';
import tokens from '@/services/tokens';
import BaseApiService from '@/services/BaseApiService';
import AlertService from '@/services/AlertService';

import type { AppStore } from '@/typings/store';

@Service(tokens.TAGS_SERVICE)
export default class TagsService {
  @Inject(tokens.BASE_API_SERVICE)
  private readonly baseApiService!: BaseApiService;

  @Inject(tokens.STORE)
  private readonly store!: AppStore;

  @Inject(tokens.ALERTS_SERVICE)
  private readonly alertsService!: AlertService;

  async getTags(): Promise<Tag[]> {
    const entities = await this.baseApiService.tags.getTags();
    const tags = entities.map((el) => new Tag(el));
    this.store.commit('tags/setTags', tags);
    return tags;
  }

  async addTag(data: any): Promise<Tag> {
    const payload = Tag.getPayloadToAddTag(data);
    const entity = await this.baseApiService.tags.addTag(payload);
    return new Tag(entity);
  }

  async editTag(tagId: number, data: any): Promise<Tag> {
    const payload = Tag.getPayloadToEditTag(data);
    const entity = await this.baseApiService.tags.editTag(tagId, payload);
    const tag = new Tag(entity);
    this.store.commit('tags/updateTag', tag);
    return tag;
  }

  async deleteTag(tagId: number): Promise<void> {
    await this.baseApiService.tags.deleteTag(tagId);
    this.store.commit('tags/deleteTag', tagId);
  }
}
