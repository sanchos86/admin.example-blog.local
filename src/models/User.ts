export default class User {
  id: number;

  name: string;

  email: string;

  role: string

  constructor(data: any = {}) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.role = data.role;
  }
}
