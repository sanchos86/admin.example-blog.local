import {
  ApiUnit,
  ApiUnitFactory,
  HttpClient,
  Payload,
} from '@/typings/misc';

export interface TagsApiUnit extends ApiUnit {
  getTags(): Promise<any>;
  addTag(payload: Payload): Promise<any>;
  editTag(tagId: number, payload: Payload): Promise<any>;
  deleteTag(tagId: number): Promise<any>;
}

export interface TagsApiUnitFactory extends ApiUnitFactory {
  (httpService: HttpClient): TagsApiUnit;
}

const tags: TagsApiUnitFactory = (httpService: HttpClient): TagsApiUnit => ({
  getTags(): Promise<any> {
    const url = 'api/tags';
    return httpService.get(url);
  },
  addTag(payload: Payload): Promise<any> {
    const url = 'api/tags';
    return httpService.post(url, payload);
  },
  editTag(tagId: number, payload: Payload): Promise<any> {
    const url = `api/tags/${tagId}`;
    return httpService.put(url, payload);
  },
  deleteTag(tagId: number): Promise<any> {
    const url = `api/tags/${tagId}`;
    return httpService.delete(url);
  },
});

export default tags;
