import { Payload } from '@/typings/misc';

export default class Tag {
  id: number;

  name: string;

  slug: string;

  constructor(data: any = {}) {
    this.id = data.id;
    this.name = data.name;
    this.slug = data.slug;
  }

  get value(): number {
    return this.id;
  }

  get text(): string {
    return this.name;
  }

  static getPayloadToAddTag(data: any = {}): Payload {
    return {
      name: data.name,
      slug: data.slug,
    };
  }

  static getPayloadToEditTag(data: any = {}): Payload {
    return {
      name: data.name,
      slug: data.slug,
    };
  }
}
