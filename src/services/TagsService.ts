import { Service, Inject } from 'typedi';
import { Store } from 'vuex';

import Tag from '@/models/Tag';
import tokens from '@/services/tokens';
import BaseApiService from '@/services/BaseApiService';

@Service(tokens.TAGS_SERVICE)
export default class TagsService {
  private readonly baseApiService: BaseApiService;

  private readonly store: Store<{}>;

  constructor(
    @Inject(tokens.BASE_API_SERVICE) baseApiService: BaseApiService,
    @Inject(tokens.STORE) store: Store<{}>
  ) {
    this.baseApiService = baseApiService;
    this.store = store;
  }

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
