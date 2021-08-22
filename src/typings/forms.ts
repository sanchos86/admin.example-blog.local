import { Nullable } from '@/typings/misc';

export interface LoginForm {
  email: string;
  password: string;
}

export interface NewCategoryForm {
  name: string;
  slug: string;
}

export interface EditCategoryForm {
  name: string;
  slug: string;
}

export interface NewTagForm {
  name: string;
  slug: string;
}

export interface EditTagForm {
  name: string;
  slug: string;
}

export interface NewPostForm {
  title: Nullable<string>;
  text: Nullable<string>;
  slug: Nullable<string>;
  publish: boolean;
  category: Nullable<number>;
  tags: number[];
  picture: Nullable<File>;
}

export interface EditPostForm {
  id: Nullable<number>;
  title: Nullable<string>;
  text: Nullable<string>;
  slug: Nullable<string>;
  publish: boolean;
  category: Nullable<number>;
  tags: number[];
  picture: Nullable<File>;
  src: Nullable<string>;
}
