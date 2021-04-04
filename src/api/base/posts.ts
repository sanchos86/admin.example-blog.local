import {
  ApiUnit,
  ApiUnitFactory,
  HttpClient,
  QueryParams,
  Payload,
} from '@/typings/misc';

export interface PostsApiUnit extends ApiUnit {
  getPosts(params: QueryParams): Promise<any>;
  getPost(slug: string): Promise<any>;
  addPost(payload: Payload): Promise<any>;
  editPost(postId: number, payload: Payload): Promise<any>;
  publishPost(postId: number, payload: Payload): Promise<any>;
  deletePost(postId: number): Promise<any>;
}

export interface PostsApiUnitFactory extends ApiUnitFactory {
  (httpService: HttpClient): PostsApiUnit;
}

const posts: PostsApiUnitFactory = (httpService: HttpClient): PostsApiUnit => ({
  getPosts(params: QueryParams): Promise<any> {
    const url = 'api/posts';
    return httpService.get(url, params);
  },
  getPost(slug: string): Promise<any> {
    const url = `api/posts/${slug}`;
    return httpService.get(url);
  },
  addPost(payload: Payload): Promise<any> {
    const url = 'api/posts';
    return httpService.post(url, payload);
  },
  editPost(postId: number, payload: Payload): Promise<any> {
    const url = `api/posts/${postId}`;
    return httpService.post(url, payload);
  },
  publishPost(postId: number, payload: Payload): Promise<any> {
    const url = `api/posts/${postId}/publish`;
    return httpService.patch(url, payload);
  },
  deletePost(postId: number): Promise<any> {
    const url = `api/posts/${postId}`;
    return httpService.delete(url);
  },
});

export default posts;
