import type { Payload } from '@/typings/misc';
import type { NewTagForm, EditTagForm } from '@/typings/forms';

export interface TagEntity {
  id: number;

  name: string;

  slug: string;
}

export default class Tag {
  id: number;

  name: string;

  slug: string;

  constructor(data: TagEntity) {
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

  static getPayloadToAddTag(data: NewTagForm): Payload {
    return {
      name: data.name,
      slug: data.slug,
    };
  }

  static getPayloadToEditTag(data: EditTagForm): Payload {
    return {
      name: data.name,
      slug: data.slug,
    };
  }
}
