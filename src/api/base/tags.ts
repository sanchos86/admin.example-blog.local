import type {
  ApiUnit,
  ApiUnitFactory,
  HttpClient,
  Payload,
} from '@/typings/misc';
import type { TagEntity } from '@/models/Tag';

export interface TagsApiUnit extends ApiUnit {
  getTags(): Promise<TagEntity[]>;
  addTag(payload: Payload): Promise<TagEntity>;
  editTag(tagId: number, payload: Payload): Promise<TagEntity>;
  deleteTag(tagId: number): Promise<void>;
}

export interface TagsApiUnitFactory extends ApiUnitFactory {
  (httpService: HttpClient): TagsApiUnit;
}

const tags: TagsApiUnitFactory = (httpService: HttpClient): TagsApiUnit => ({
  getTags() {
    const url = 'api/tags';
    return httpService.get(url);
  },
  addTag(payload: Payload) {
    const url = 'api/tags';
    return httpService.post(url, payload);
  },
  editTag(tagId: number, payload: Payload) {
    const url = `api/tags/${tagId}`;
    return httpService.put(url, payload);
  },
  deleteTag(tagId: number) {
    const url = `api/tags/${tagId}`;
    return httpService.delete(url);
  },
});

export default tags;
