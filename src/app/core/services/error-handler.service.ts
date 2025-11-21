/**
 * File Purpose:
 * Common error handling service for Angular 20 (signals-first)
 */
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  private readonly _errors = signal<string[]>([]);
  readonly errors = this._errors.asReadonly();

  handleError(error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    this._errors.update(errs => [...errs, message]);
    // Optionally log to external service
    console.error('[Handled Error]', message);
  }

  clearErrors() {
    this._errors.set([]);
  }
}
