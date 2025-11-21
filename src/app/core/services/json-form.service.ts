import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { JsonConfigRoot, JsonField, JsonModel, FlowStep, JsonValidationRules } from '../../shared/models/json-form.model';
import { ValidationService } from './validation.service';
import { of } from 'rxjs';
import { MEDISPA_CONFIG } from '../../feature/medispa/medispa.config';

@Injectable({ providedIn: 'root' })
export class JsonFormService {

  // Raw loaded configuration JSON (e.g. medispa.json)
  private readonly config = signal<JsonConfigRoot | null>(null);
  // UI feature flags derived from config
  readonly useStepper = computed(() => !!this.config()?.useStepper);

  // Flow steps (e.g. quoteFlow)
  readonly flowSteps = signal<FlowStep[] | null>(null);
  readonly currentStepIndex = signal(0);
  readonly isLoaded = signal(false);
  readonly loadError = signal<string | null>(null);

  // Current model context
  readonly currentModelKey = signal<string | null>(null);
  readonly currentJsonModel = signal<JsonModel | null>(null);
  readonly currentFormGroup = signal<FormGroup | null>(null);
  // Aggregated values across steps (for cross-step dependency & prefill)
  private readonly aggregatedValues = signal<Record<string, any>>({});

  // Visible fields derived via dependencies
  private readonly formValueVersion = signal(0); // increments on any control value change
  readonly visibleFields = computed(() => {
    // depend on version so recompute after any control change
    this.formValueVersion();
    const model = this.currentJsonModel();
    const form = this.currentFormGroup();
    if (!model || !form) return [] as JsonField[];
    return model.fields.filter(field => this.isFieldVisible(field, form));
  });

  constructor() {
    this.validation = inject(ValidationService);
    // Placeholder for future cross-step prefill logic; remove unused idx variable.
    effect(() => {
      const steps = this.flowSteps();
      this.currentStepIndex(); // establish reactive dependency
      if (!steps || steps.length === 0) return;
    });
  }

  private readonly validation: ValidationService;

  loadConfigFromAsset() {
    // In-memory load (no HTTP). Previously fetched from assets/medispa.json.
    const cfg: JsonConfigRoot = MEDISPA_CONFIG;
    this.config.set(cfg);
    this.isLoaded.set(true);
    this.loadError.set(null);
    return of(cfg);
  }

  initFlow(flowKey: string) {
    const cfg = this.config();
    if (!cfg) throw new Error('Configuration not loaded');
    const steps = cfg[flowKey] as FlowStep[] | undefined;
    if (!steps) throw new Error(`Flow ${flowKey} not found in config`);
    this.flowSteps.set(steps);
    this.currentStepIndex.set(0);
    // Load first step's model
    if (steps.length) this.loadModelByEndpoint(steps[0].endpoint.replace(/^\//, ''));
  }

  nextStep() {
    const steps = this.flowSteps();
    if (!steps) return;
    // Validate current step before advancing
    if (!this.validateCurrentStep()) {
      console.debug('[JsonFormService] Validation failed; staying on step', this.currentStepIndex());
      return;
    }
    const next = this.currentStepIndex() + 1;
    if (next < steps.length) {
      this.captureAggregatedValues();
      // Debug: ensure we only advance one step at a time
      console.debug('[JsonFormService] Advancing from step', this.currentStepIndex(), 'to', next, 'endpoint', steps[next].endpoint);
      this.currentStepIndex.set(next);
      this.loadModelByEndpoint(steps[next].endpoint.replace(/^\//, ''));
    }
  }

  prevStep() {
    const steps = this.flowSteps();
    if (!steps) return;
    const prev = this.currentStepIndex() - 1;
    if (prev >= 0) {
      this.captureAggregatedValues();
      console.debug('[JsonFormService] Moving back from step', this.currentStepIndex(), 'to', prev, 'endpoint', steps[prev].endpoint);
      this.currentStepIndex.set(prev);
      this.loadModelByEndpoint(steps[prev].endpoint.replace(/^\//, ''));
    }
  }

  loadModelByEndpoint(endpoint: string) {
    const cfg = this.config();
    if (!cfg) throw new Error('Configuration not loaded');
    const model = cfg[endpoint] as JsonModel | undefined;
    if (!model) throw new Error(`Model ${endpoint} not found in config`);
    this.currentModelKey.set(endpoint);
    this.currentJsonModel.set(model);
    const formGroup = this.buildFormGroup(model);
    // Subscribe to value changes to trigger visibility recomputation
    formGroup.valueChanges.subscribe(() => {
      this.formValueVersion.update(v => v + 1);
    });
    // Prefill from aggregated values if requested
    model.fields.forEach(f => {
      if (f.name && f.prefillFromStep && formGroup.get(f.name)) {
        const aggVal = this.aggregatedValues()[f.name];
        if (aggVal !== undefined && (formGroup.get(f.name)!.value == null || formGroup.get(f.name)!.value === '')) {
          formGroup.get(f.name)!.setValue(aggVal);
        }
      }
    });
    this.currentFormGroup.set(formGroup);
  }

  private buildFormGroup(model: JsonModel): FormGroup {
    const group: { [key: string]: FormControl } = {};
      model.fields.forEach(field => {
        if (!field.name) return; // skip display-only/summary fields
        group[field.name] = new FormControl(field.value ?? null, this.mapValidators(field.validationRules));
      });
    return new FormGroup(group);
  }

  private mapValidators(rules?: JsonValidationRules): ValidatorFn[] {
    if (!rules) return [];
    const fns: ValidatorFn[] = [];
    if (rules.required?.value) fns.push(Validators.required);
    if (rules.minLength?.value != null) fns.push(Validators.minLength(rules.minLength.value));
    if (rules.maxLength?.value != null) fns.push(Validators.maxLength(rules.maxLength.value));
    if (rules.min?.value != null) fns.push(Validators.min(rules.min.value));
    if (rules.max?.value != null) fns.push(Validators.max(rules.max.value));
    if (rules.pattern?.value) fns.push(Validators.pattern(rules.pattern.value));
    return fns;
  }

  private isFieldVisible(field: JsonField, form: FormGroup): boolean {
    if (!field.dependsOn || field.dependsOn.length === 0) return true;
    const satisfied = field.dependsOn.every(dep => {
      const ctrl = form.get(dep.elementId);
      const value = ctrl?.value ?? this.aggregatedValues()[dep.elementId];
      return value === dep.equals;
    });
    return satisfied || !field.hideWhenDepNotMet;
  }

  submitCurrentModel(): { modelKey: string | null; value: any } {
    const form = this.currentFormGroup();
    if (!this.validateCurrentStep()) {
      console.debug('[JsonFormService] Submit blocked due to validation errors');
      return { modelKey: this.currentModelKey(), value: form?.getRawValue() };
    }
    this.captureAggregatedValues();
    return { modelKey: this.currentModelKey(), value: form?.getRawValue() };
  }

  private captureAggregatedValues() {
    const form = this.currentFormGroup();
    if (!form) return;
    const current = this.aggregatedValues();
    this.aggregatedValues.set({ ...current, ...form.getRawValue() });
  }

  private validateCurrentStep(): boolean {
    const form = this.currentFormGroup();
    const model = this.currentJsonModel();
    if (!form || !model) return true;
    let valid = true;
    model.fields.forEach(field => {
      if (!field.name) return; // skip display-only
      // Skip hidden fields (dependency not satisfied and hideWhenDepNotMet true)
      if (!this.isFieldVisible(field, form)) return;
      const ctrl = form.get(field.name);
      const required = field.validationRules?.required?.value;
      if (required) {
        const value = ctrl?.value;
        const empty = value === null || value === undefined || value === '';
        if (empty) {
          valid = false;
          // Support both message and legacy errMessage keys for config
          const msg = field.validationRules?.required?.message || field.validationRules?.required?.errMessage || 'This field is required';
          this.validation.setError(field.name, msg);
          if (ctrl) {
            ctrl.markAsTouched();
            ctrl.markAsDirty();
          }
        } else {
          this.validation.clearError(field.name);
        }
      }
    });
    return valid;
  }
}
