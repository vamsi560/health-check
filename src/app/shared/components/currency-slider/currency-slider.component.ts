import { Component, Input, Output, EventEmitter, signal, effect } from '@angular/core';

@Component({
		selector: 'app-currency-slider',
		template: `
			<div class="currency-slider" role="group" [attr.aria-label]="label" style="display:flex;flex-direction:column;gap:0.5rem;">
				<label class="currency-slider__label" [attr.for]="rangeId">{{ label }}</label>
				<input
					type="range"
					[id]="rangeId"
					class="currency-slider__range"
					[min]="min"
					[max]="max"
					[step]="step"
					[disabled]="disabled"
					[value]="valueSignal()"
					(input)="onInput($event)"
					[attr.aria-valuemin]="min"
					[attr.aria-valuemax]="max"
					[attr.aria-valuenow]="valueSignal()"
					[attr.aria-label]="label" />
				<div class="currency-slider__value" aria-live="polite">{{ formattedValue() }}</div>
			</div>
		`
})
export class CurrencySliderComponent {
	@Input() label: string = 'Amount';
	@Input() min = 0;
	@Input() max = 100000;
	@Input() step = 1000;
	@Input() disabled = false;
	@Input() value = 0;
	@Output() valueChange = new EventEmitter<number>();

		protected readonly valueSignal = signal(this.value);
	protected readonly formattedValue = signal(this.format(this.value));

	// Sync if parent changes the value input after initial render
		private readonly syncEffect = effect(() => {
		const incoming = this.value;
		if (incoming !== this.valueSignal()) {
			this.valueSignal.set(incoming);
			this.formattedValue.set(this.format(incoming));
		}
	});

		rangeId = 'range-' + Math.random().toString(36).slice(2);

		onInput(event: any) {
			const newVal = Number(event.target?.value ?? this.value);
		this.valueSignal.set(newVal);
		this.formattedValue.set(this.format(newVal));
		this.valueChange.emit(newVal);
	}

	private format(val: number): string {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
	}
}
