import type { Payload } from '@/typings/misc';
import type { NewCategoryForm, EditCategoryForm } from '@/typings/forms';

export interface CategoryEntity {
  id: number;

  name: string;

  slug: string;
}

export default class Category {
  id: number;

  name: string;

  slug: string;

  constructor(data: CategoryEntity) {
    this.id = data.id;
    this.name = data.name;
    this.slug = data.slug;
  }

  get value() {
    return this.id;
  }

  get text() {
    return this.name;
  }

  static getPayloadToAddCategory(data: NewCategoryForm): Payload {
    return {
      name: data.name,
      slug: data.slug,
    };
  }

  static getPayloadToEditCategory(data: EditCategoryForm): Payload {
    return {
      name: data.name,
      slug: data.slug,
    };
  }
}
