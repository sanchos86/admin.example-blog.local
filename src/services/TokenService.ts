import { Service } from 'typedi';

import tokens from '@/services/tokens';

@Service(tokens.TOKEN_SERVICE)
export default class TokenService {
  getAccessToken() {}
}
