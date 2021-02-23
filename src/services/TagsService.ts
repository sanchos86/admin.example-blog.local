import { Service, Inject } from 'typedi';

import Tag from '@/models/Tag';
import tokens from '@/services/tokens';
import BaseApiService from '@/services/BaseApiService';
import AlertService from '@/services/AlertService';

import { AppStore } from '@/typings/store';

@Service(tokens.TAGS_SERVICE)
export default class TagsService {
  @Inject(tokens.BASE_API_SERVICE)
  private readonly baseApiService!: BaseApiService;

  @Inject(tokens.STORE)
  private readonly store!: AppStore;

  @Inject(tokens.ALERTS_SERVICE)
  private readonly alertsService!: AlertService;

  async getTags(): Promise<Tag[]> {
    let tags = await this.baseApiService.tags.getTags();
    tags = tags.map((el: any) => new Tag(el));
    this.store.commit('tags/setTags', tags);
    return tags;
  }

  async addTag(data: any): Promise<Tag> {
    const payload = Tag.getPayloadToAddTag(data);
    let newTag = await this.baseApiService.tags.addTag(payload);
    newTag = new Tag(newTag);
    this.store.commit('tags/addTag', newTag);
    return newTag;
  }

  async editTag(tagId: number, data: any): Promise<Tag> {
    const payload = Tag.getPayloadToEditTag(data);
    let editedTag = await this.baseApiService.tags.editTag(tagId, payload);
    editedTag = new Tag(editedTag);
    this.store.commit('tags/editTag', editedTag);
    return editedTag;
  }

  async deleteTag(tagId: number): Promise<void> {
    const deletedTagId = await this.baseApiService.tags.deleteTag(tagId);
    this.store.commit('tags/deleteTag', deletedTagId);
  }
}
