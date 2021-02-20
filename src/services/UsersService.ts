import { Service, Inject } from 'typedi';

import tokens from '@/services/tokens';

@Service(tokens.USERS_SERVICE)
export default class UsersService {}
