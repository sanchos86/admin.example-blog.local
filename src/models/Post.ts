import Tag from '@/models/Tag';
import Category from '@/models/Category';

import type { NewPostForm, EditPostForm } from '@/typings/forms';

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

  get tagsIds() {
    return this.tags.map((el) => el.id);
  }

  static getPayload(data: (NewPostForm | EditPostForm) & { plainText: string }) {
    const formData = new FormData();
    formData.append('title', data.title as string);
    formData.append('text', data.text as string);
    formData.append('slug', data.slug as string);
    formData.append('publish', String(Number(data.publish)));
    formData.append('category_id', String(data.category));
    formData.append('plain_text', data.plainText);

    data.tags.forEach((tag: number) => {
      formData.append('tags[]', String(tag));
    });

    return formData;
  }

  static getPayloadToAddPost(data: NewPostForm & { plainText: string }) {
    const formData = this.getPayload(data);
    formData.append('picture', data.picture as File);
    return formData;
  }

  static getPayloadToEditPost(data: EditPostForm & { plainText: string }) {
    const formData = this.getPayload(data);

    formData.append('_method', 'PUT');

    if (data.picture instanceof File) {
      formData.append('picture', data.picture);
    }

    return formData;
  }
}
