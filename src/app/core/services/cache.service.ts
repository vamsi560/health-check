/**
 * File Purpose:
 * Common cache service for storing/retrieving data in memory or localStorage (signals-first)
 */
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CacheService {
  private readonly _cache = signal<Record<string, unknown>>({});
  readonly cache = this._cache.asReadonly();

  set(key: string, value: unknown) {
    this._cache.update(c => ({ ...c, [key]: value }));
    localStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: string): T | null {
    const value = this._cache()[key];
    if (value !== undefined) return value as T;
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : null;
  }

  remove(key: string) {
    this._cache.update(c => {
      const { [key]: _, ...rest } = c;
      return rest;
    });
    localStorage.removeItem(key);
  }

  clear() {
    this._cache.set({});
    localStorage.clear();
  }
}
