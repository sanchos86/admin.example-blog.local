import { ApiUnit, ApiUnitFactory, HttpClient } from '@/typings/misc';

export interface UsersApiUnit extends ApiUnit {
  getProfile(): Promise<any>;
}

export interface UsersApiUnitFactory extends ApiUnitFactory {
  (httpService: HttpClient): UsersApiUnit;
}

const users: UsersApiUnitFactory = (httpService: HttpClient): UsersApiUnit => ({
  getProfile(): Promise<any> {
    const url = 'users/me';
    return httpService.get(url);
  },
});

export default users;
