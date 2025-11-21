import { FormGroup } from '@angular/forms';

export interface JsonValidationRuleEntry<T = any> { value: T; message?: string; errMessage?: string; }

export interface JsonValidationRules {
  required?: JsonValidationRuleEntry<boolean>;
  minLength?: JsonValidationRuleEntry<number>;
  maxLength?: JsonValidationRuleEntry<number>;
  min?: JsonValidationRuleEntry<number>;
  max?: JsonValidationRuleEntry<number>;
  pattern?: JsonValidationRuleEntry<string>;
}

export interface JsonFieldDependency {
  elementId: string; // refers to another field name
  equals: any;
}

export interface JsonOption { label: string; value: string; }

export interface JsonField {
  label: string;
  name?: string; // optional for summary/display-only blocks
  component: string; // TextInput | Radio | Select | DatePicker | Textarea | CurrencySlider | etc.
  type?: string; // text | number | date | etc.
  value?: any;
  isValid?: boolean;
  placeholder?: string;
  options?: JsonOption[];
  dependsOn?: JsonFieldDependency[];
  hideWhenDepNotMet?: boolean;
  prefillFromStep?: number; // for multi-step flows
  fullRow?: boolean;
  min?: number;
  max?: number;
  step?: number;
  validationRules?: JsonValidationRules;
  // Summary & custom component specific optional properties
  quoteNumber?: string;
  price?: string;
  coverages?: string[];
  details?: string[];
  retroDate?: string;
  additionalCoverages?: Array<{ label: string; value: string; defaultChecked?: boolean; disabled?: boolean }>;
  selectedAdditional?: string[];
  isSummary?: boolean;
  status?: string;
  summaryFields?: Array<{ label: string; value: string }>;
  premiumFields?: Array<{ label: string; value: string }>;
  coverageColumns?: Array<{ label: string; key: string }>;
  coveragesTable?: Array<{ coverage: string; retroDate: string }>;
}

export interface JsonButton {
  label: string;
  type: 'submit' | 'button';
  onClickHandler?: string; // handleNext | onSubmit | custom
  color?: 'primary' | 'accent' | 'warn';
  className?: string;
}

export interface JsonModel {
  fields: JsonField[];
  buttons: JsonButton[];
}

export interface FlowStep {
  id: string; // numeric string
  name: string; // component / step name
  endpoint: string; // /customerInformationModel etc.
  icon?: string;
  layout?: string;
}

export interface JsonConfigRoot {
  [key: string]: any; // generic access; specific keys map to JsonModel or flow arrays
  quoteFlow?: FlowStep[];
  useStepper?: boolean; // UI flag to render stepper navigation for multi-step flows
}

export interface LoadedModelContext {
  modelKey: string;
  formGroup: FormGroup;
  jsonModel: JsonModel;
}
