import { Component, ChangeDetectionStrategy, input, output, computed, inject, signal, effect } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input.component';
import { RadioButtonComponent } from '../../../shared/components/radio-button/radio-button.component';
import { SelectDropdownComponent } from '../../../shared/components/select-dropdown/select-dropdown.component';
import { DatePickerComponent } from '../../../shared/components/date-picker/date-picker.component';
import { TextareaComponent } from '../../../shared/components/textarea/textarea.component';
import { CurrencySliderComponent } from '../../../shared/components/currency-slider/currency-slider.component';
import { JsonField } from '../../../shared/models/json-form.model';
import { ValidationService } from '../../services/validation.service';

@Component({
	selector: 'app-dynamic-field',
	imports: [ReactiveFormsModule, InputComponent, RadioButtonComponent, SelectDropdownComponent, DatePickerComponent, TextareaComponent, CurrencySliderComponent],
	template: `
		@if (field()) {
			@switch (field().component) {
				@case ('TextInput') {
					<app-input [label]="field().label" [type]="field().type || 'text'" [value]="control()?.value" [placeholder]="field().placeholder || ''" (valueChange)="onValue($event)"></app-input>
				}
				@case ('Radio') {
					<app-radio-button [label]="field().label" [options]="field().options || []" [value]="control()?.value" (valueChange)="onValue($event)"></app-radio-button>
				}
				@case ('Select') {
					<app-select-dropdown [label]="field().label" [options]="field().options || []" [value]="control()?.value" [placeholder]="field().placeholder || ''" (valueChange)="onValue($event)"></app-select-dropdown>
				}
				@case ('DatePicker') {
					<app-date-picker [label]="field().label" [value]="control()?.value" [placeholder]="field().placeholder || ''" (valueChange)="onValue($event)"></app-date-picker>
				}
				@case ('Textarea') {
					<app-textarea [label]="field().label" [value]="control()?.value" [placeholder]="field().placeholder || ''" (valueChange)="onValue($event)"></app-textarea>
				}
				@case ('CurrencySlider') {
					<app-currency-slider [label]="field().label" [min]="field().min || 0" [max]="field().max || 100" [step]="field().step || 1" [value]="control()?.value || (field().value || 0)" (valueChange)="onValue($event)"></app-currency-slider>
				}
				@case ('QuoteSummary') {
					<div class="quote-summary" role="region" aria-label="Quote Summary">
						<h3>Quick Quote Summary</h3>
						<p class="price">{{ field().price }}</p>
						<ul class="details">
							@for (d of field().details || []; track d) { <li>{{ d }}</li> }
						</ul>
					</div>
				}
				@case ('FullQuoteSummary') {
					<div class="full-quote-summary" role="region" aria-label="Full Quote Summary">
						<h3>Full Quote Summary</h3>
						<ul class="summary-fields">
							@for (sf of field().summaryFields || []; track sf.label) { <li><strong>{{ sf.label }}:</strong> {{ sf.value }}</li> }
						</ul>
					</div>
				}
				@default {
					<app-input [label]="field().label" [type]="field().type || 'text'" [value]="control()?.value" [placeholder]="field().placeholder || ''" (valueChange)="onValue($event)"></app-input>
				}
			}
			@if (showError()) { <div class="field-error" role="alert">{{ firstError() }}</div> }
		}
	`,
	styleUrls: ['./dynamic-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { '[class.full-row]': 'field()?.fullRow === true' }
})
export class DynamicFieldComponent {
	field = input.required<JsonField>();
	form = input.required<FormGroup>();
	valueChange = output<any>();

	private readonly validation = inject(ValidationService);
	private readonly statusVersion = signal(0);

	protected readonly control = computed(() => {
		const f = this.field();
		const name = f.name;
		if (!name) return null;
		return this.form().get(name);
	});
  protected readonly serviceError = computed(() => {
    const f = this.field();
    return f.name ? this.validation.getError(f.name)() : '';
  });

	protected readonly showError = computed(() => {
		this.statusVersion(); // depend on version signal
		const svcErr = this.serviceError();
		const ctrl = this.control();
		return !!svcErr || (ctrl?.invalid && (ctrl?.dirty || ctrl?.touched));
	});
	protected readonly firstError = computed(() => {
		const svcErr = this.serviceError();
		if (svcErr) return svcErr;
		const errors = this.control()?.errors as Record<string, any> | null;
		const f = this.field();
		if (!errors) return '';
		if (errors['required']) return f.validationRules?.required?.errMessage ?? f.validationRules?.required?.message ?? 'This field is required';
		if (errors['min']) return f.validationRules?.min?.message ?? 'Value is below minimum';
		if (errors['max']) return f.validationRules?.max?.message ?? 'Value exceeds maximum';
		if (errors['minlength']) return f.validationRules?.minLength?.message ?? `Minimum length is ${errors['minlength'].requiredLength}`;
		if (errors['maxlength']) return f.validationRules?.maxLength?.message ?? `Maximum length is ${errors['maxlength'].requiredLength}`;
		if (errors['pattern']) return f.validationRules?.pattern?.message ?? 'Invalid format';
		return 'Invalid value';
	});

	constructor() {
		effect(() => {
			const ctrl = this.control();
			if (!ctrl) return;
			// Subscribe once to value + status changes to trigger recompute
			const sub1 = ctrl.valueChanges.subscribe(() => this.statusVersion.update(v => v + 1));
			const sub2 = ctrl.statusChanges.subscribe(() => this.statusVersion.update(v => v + 1));
			// Cleanup when control instance changes
			return () => { sub1.unsubscribe(); sub2.unsubscribe(); };
		});
	}

	onValue(val: any) {
		const ctrl = this.control();
		if (ctrl) {
			ctrl.setValue(val);
			ctrl.markAsDirty();
			ctrl.markAsTouched();
			this.statusVersion.update(v => v + 1);
		}
		this.valueChange.emit(val);
	}
}
