/**
 * File Purpose:
 * JSON Page Rendering Engine for dynamic UI (Angular 20, signals-first)
 */
import { Injectable, signal, computed, effect } from '@angular/core';

export interface JsonPageConfig {
  title?: string;
  sections: Array<JsonSectionConfig>;
}

export interface JsonSectionConfig {
  type: 'form' | 'table' | 'list' | 'custom';
  config: Record<string, unknown>;
}

@Injectable({ providedIn: 'root' })
export class JsonPageEngineService {
  private readonly _pageConfig = signal<JsonPageConfig | null>(null);
  readonly pageConfig = this._pageConfig.asReadonly();

  readonly title = computed(() => this._pageConfig()?.title || '');
  readonly sections = computed(() => this._pageConfig()?.sections || []);

  // Effect: log config changes (example side effect)
  constructor() {
    effect(() => {
      if (this._pageConfig()) {
        console.log('Page config updated:', this._pageConfig());
      }
    });
  }

  setPageConfig(config: JsonPageConfig) {
    this._pageConfig.set(config);
  }

  clearPageConfig() {
    this._pageConfig.set(null);
  }

  // API for dynamic section rendering
  getSectionByType(type: string) {
    return computed(() => this.sections().find(sec => sec.type === type));
  }

  // Add more signal-driven rendering logic as needed
}
