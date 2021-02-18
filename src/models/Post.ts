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
}
