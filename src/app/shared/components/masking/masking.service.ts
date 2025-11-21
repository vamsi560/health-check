/**
 * File Purpose:
 * Common masking service for input fields (signals-first)
 */
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MaskingService {
  maskValue(value: string, mask: string): string {
    // Simple example: mask = 'XXX-XX-####'
    let masked = '';
    let valueIdx = 0;
    for (let i = 0; i < mask.length && valueIdx < value.length; i++) {
      if (mask[i] === '#') {
        masked += value[valueIdx++];
      } else {
        masked += mask[i];
      }
    }
    return masked;
  }
}
