import { Service, Inject } from 'typedi';

import Post from '@/models/Post';
import tokens from '@/services/tokens';
import BaseApiService from '@/services/BaseApiService';

import { QueryParams } from '@/typings/misc';

@Service(tokens.POSTS_SERVICE)
export default class PostsService {
  @Inject(tokens.BASE_API_SERVICE)
  private readonly baseApiService!: BaseApiService;

  async getPosts(params: QueryParams = {}): Promise<{ entities: Post[]; meta: any}> {
    const { data, meta } = await this.baseApiService.posts.getPosts(params);
    const posts = data.map((el: any) => new Post(el));
    return { entities: posts, meta };
  }

  async getPost(slug: string): Promise<Post> {
    const post = await this.baseApiService.posts.getPost(slug);
    return new Post(post);
  }

  async addPost(data: any): Promise<Post> {
    const payload = Post.getPayloadToAddPost(data);
    const post = await this.baseApiService.posts.createPost(payload);
    return new Post(post);
  }

  async editPost(postId: number, data: any): Promise<Post> {
    const payload = Post.getPayloadToEditPost(data);
    const editedPost = await this.baseApiService.posts.editPost(postId, payload);
    return new Post(editedPost);
  }

  async publishPost(postId: number, publish: boolean): Promise<Post> {
    const payload = { publish };
    const post = await this.baseApiService.posts.publishPost(postId, payload);
    return new Post(post);
  }

  async deletePost(postId: number): Promise<number> {
    return this.baseApiService.posts.deletePost(postId);
  }
}
