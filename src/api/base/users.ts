import type {
  ApiUnit,
  ApiUnitFactory,
  HttpClient,
} from '@/typings/misc';
import type { UserEntity } from '@/models/User';

export interface UsersApiUnit extends ApiUnit {
  getProfile(): Promise<UserEntity>;
}

export interface UsersApiUnitFactory extends ApiUnitFactory {
  (httpService: HttpClient): UsersApiUnit;
}

const users: UsersApiUnitFactory = (httpService: HttpClient): UsersApiUnit => ({
  getProfile() {
    const url = 'api/users/me';
    return httpService.get(url);
  },
});

export default users;
