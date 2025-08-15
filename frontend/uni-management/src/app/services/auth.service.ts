import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';

  constructor() {}

  // Save JWT token to localStorage
  login(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Remove JWT token on logout
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Check if user is authenticated (token exists)
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  // Get token for use in HTTP requests
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
