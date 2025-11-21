/**
 * File Purpose:
 * Common authentication and session management service (signals-first)
 */
import { Injectable, signal, computed, effect } from '@angular/core';

export interface UserSession {
  token: string;
  userId: string;
  expiresAt: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _session = signal<UserSession | null>(null);
  readonly session = this._session.asReadonly();
  readonly isAuthenticated = computed(() => !!this._session());

  constructor() {
    effect(() => {
      // Example: auto-logout when session expires
      const session = this._session();
      if (session && Date.now() > session.expiresAt) {
        this.logout();
      }
    });
  }

  login(token: string, userId: string, expiresIn: number) {
    this._session.set({
      token,
      userId,
      expiresAt: Date.now() + expiresIn * 1000,
    });
  }

  logout() {
    this._session.set(null);
  }

  getToken() {
    return computed(() => this._session()?.token || '');
  }

  // Add more authentication/session logic as needed
}
