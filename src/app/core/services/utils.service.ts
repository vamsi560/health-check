/**
 * File Purpose:
 * Common utility service for helper functions (signals-first)
 */
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilsService {
  // Example: debounce function
  debounce<T extends (...args: any[]) => void>(fn: T, wait: number) {
    let timeout: any;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), wait);
    };
  }

  // Example: deep clone using structuredClone with JSON fallback for very old environments
  deepClone<T>(obj: T): T {
    try {
      return structuredClone(obj);
    } catch {
      return JSON.parse(JSON.stringify(obj));
    }
  }

  // Add more utility functions as needed
}
