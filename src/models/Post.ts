import { Payload } from '@/typings/misc';
import Tag from '@/models/Tag';
import Category from '@/models/Category';

export default class Post {
  id: number;

  src: string;

  slug: string;

  title: string;

  text: string;

  publishedAt: string | null;

  postViews: number;

  category: Category;

  tags: Tag[];

  constructor(data: any = {}) {
    this.id = data.id;
    this.src = data.src;
    this.slug = data.slug;
    this.title = data.title;
    this.text = data.text;
    this.publishedAt = data.publishedAt;
    this.postViews = data.postViews;
    this.category = new Category(data.category);
    this.tags = (data.tags || []).map((tag: any) => new Tag(tag));
  }

  get tagsNames() {
    return this.tags.map((el) => el.name);
  }

  static getPayloadToAddPost(data: any = {}): Payload {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('text', data.text);
    formData.append('slug', data.slug);
    formData.append('publish', String(Number(data.publish)));
    formData.append('category_id', String(data.category));
    formData.append('picture', data.picture);
    formData.append('plain_text', data.plainText);

    data.tags.forEach((tag: number) => {
      formData.append('tags[]', String(tag));
    });

    return formData;
  }

  static getPayloadToEditPost(data: any = {}): Payload {
    return {};
  }
}
