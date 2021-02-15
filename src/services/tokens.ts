import { Token } from 'typedi';

import AuthService from '@/services/AuthService';
import TokenService from '@/services/TokenService';

export default {
  TOKEN_SERVICE: new Token<TokenService>(),
  AUTH_SERVICE: new Token<AuthService>()
}
