import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonFormService } from '../../services/json-form.service';
import { ValidationService } from '../../services/validation.service';
import { JsonField, JsonButton } from '../../../shared/models/json-form.model';
import { DynamicFieldComponent } from '../dynamic-field/dynamic-field.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
	selector: 'app-dynamic-form',
	imports: [ReactiveFormsModule, DynamicFieldComponent, ButtonComponent],
	template: `
		<div class="dynamic-form" role="form" aria-live="polite">

			@if (loadError()) {
				<p class="error" role="alert">Failed to load configuration: {{ loadError() }}</p>
			} @else if (form()) {
				<div class="fields-grid">
					@for (field of visibleFields(); track field.name || field.label) {
						<app-dynamic-field [field]="field" [form]="form()!"></app-dynamic-field>
					}
				</div>
				<div class="buttons" role="group">
					@for (btn of buttons(); track btn.label) {
						<app-button [label]="btn.label" [color]="btn.color || 'primary'" [type]="btn.type" (action)="onButton(btn)"></app-button>
					}
				</div>
			} @else {
				<p>Loading...</p>
			}
		</div>
	`,
	styleUrls: ['./dynamic-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'dynamic-form-host' }
})
export class DynamicFormComponent {
	private readonly jsonForm = inject(JsonFormService) as JsonFormService;
	private readonly validation = inject(ValidationService);

	protected readonly form = computed(() => this.jsonForm.currentFormGroup());
	protected readonly visibleFields = computed<JsonField[]>(() => this.jsonForm.visibleFields());
	protected readonly buttons = computed<JsonButton[]>(() => this.jsonForm.currentJsonModel()?.buttons || []);
	// DynamicForm no longer owns stepper; flow-related signals kept for button behavior only.
	protected readonly currentStepIndex = computed(() => this.jsonForm.currentStepIndex());

	protected readonly loadError = computed(() => this.jsonForm.loadError());
	protected readonly isFlow = computed(() => !!this.jsonForm.flowSteps());
	constructor() {}

	onButton(btn: JsonButton) {
		const handler = btn.onClickHandler || 'onSubmit';
		if (handler === 'handleNext' && this.isFlow()) {
			this.jsonForm.nextStep();
			return;
		}
		if (handler === 'handlePrev' && this.isFlow()) {
			this.jsonForm.prevStep();
			return;
		}
		if (handler === 'onSubmit') {
			const payload = this.jsonForm.submitCurrentModel();
			console.log('Form submit payload', payload);
		}
	}

	// Step change logic now handled in MedispaFlowComponent.
}
