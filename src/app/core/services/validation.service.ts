/**
 * File Purpose:
 * Common validation service for Angular 20 forms (signals-first)
 */
import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ValidationService {
  readonly errors = signal<Record<string, string>>({});

  setError(field: string, message: string) {
    this.errors.update(errors => ({ ...errors, [field]: message }));
  }

  clearError(field: string) {
    this.errors.update(errors => {
      const { [field]: _, ...rest } = errors;
      return rest;
    });
  }

  getError(field: string) {
    return computed(() => this.errors()[field] || '');
  }

  validateRequired(value: unknown, field: string, message = 'Required') {
    if (!value) {
      this.setError(field, message);
      return false;
    }
    this.clearError(field);
    return true;
  }

  validateEmail(value: string, field: string, message = 'Invalid email') {
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(value)) {
      this.setError(field, message);
      return false;
    }
    this.clearError(field);
    return true;
  }

  // Add more validators as needed
}
