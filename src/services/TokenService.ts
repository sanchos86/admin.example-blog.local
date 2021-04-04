import { Service } from 'typedi';

import tokens from '@/services/tokens';

@Service(tokens.TOKEN_SERVICE)
export default class TokenService {
  private readonly refreshTokenKey = 'REFRESH_TOKEN';

  setRefreshToken(refreshToken: string) {
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  removeRefreshToken() {
    localStorage.removeItem(this.refreshTokenKey);
  }
}
