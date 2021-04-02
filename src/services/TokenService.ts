import { Service } from 'typedi';

import tokens from '@/services/tokens';

@Service(tokens.TOKEN_SERVICE)
export default class TokenService {
  private readonly accessTokenKey = 'ACCESS_TOKEN';

  private readonly expirationDateKey = 'EXPIRATION_DATE';

  private readonly timeToRefresh = 1000 * 60; // ms * seconds

  setAccessToken(accessToken: string) {
    localStorage.setItem(this.accessTokenKey, accessToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  removeAccessToken() {
    localStorage.removeItem(this.accessTokenKey);
  }

  setExpirationDate(expirationDate: number) {
    localStorage.setItem(this.expirationDateKey, String(expirationDate));
  }

  getExpirationDate(): number {
    const expirationDate = Number(localStorage.getItem(this.expirationDateKey));
    return Number.isInteger(expirationDate) ? expirationDate : 0;
  }

  removeExpirationDate() {
    localStorage.removeItem(this.expirationDateKey);
  }

  checkAccessTokenValidity(): boolean {
    const expirationDate = this.getExpirationDate();
    const now = Date.now();
    return expirationDate > now;
  }

  checkTokenValidForRefresh(): boolean {
    const expirationDate = this.getExpirationDate();
    const now = Date.now();
    const diff = expirationDate - now;
    return diff > 0 && diff < this.timeToRefresh;
  }
}
