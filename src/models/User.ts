export interface UserEntity {
  id: number;

  name: string;

  email: string;

  role: string;
}

export default class User {
  id: number;

  name: string;

  email: string;

  role: string

  constructor(data: UserEntity) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.role = data.role;
  }
}
