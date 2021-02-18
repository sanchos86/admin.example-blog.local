export default class Category {
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
}
