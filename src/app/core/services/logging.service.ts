/**
 * File Purpose:
 * Common logging service for Angular 20 (signals-first)
 */
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggingService {
  log(message: string, ...args: unknown[]) {
    console.log('[LOG]', message, ...args);
  }

  warn(message: string, ...args: unknown[]) {
    console.warn('[WARN]', message, ...args);
  }

  error(message: string, ...args: unknown[]) {
    console.error('[ERROR]', message, ...args);
  }

  info(message: string, ...args: unknown[]) {
    console.info('[INFO]', message, ...args);
  }
}
