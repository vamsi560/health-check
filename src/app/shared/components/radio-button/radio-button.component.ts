import { Component, EventEmitter, Output, signal, Input } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';

export interface RadioOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-radio-button',
  standalone: true,
  imports: [MatRadioModule],
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) options!: RadioOption[];
  @Input() value: string | null = null;
  @Input() disabled = false;
  @Input() required = false;
  @Input() error: string | null = null;
  @Input() ariaLabel: string | null = null;
  @Output() valueChange = new EventEmitter<string>();

  protected readonly radioValue = signal(this.value);
  protected readonly isDisabled = signal(this.disabled);
  labelId = 'radio-label-' + Math.random().toString(36).slice(2);

  onChange(value: string) {
    this.valueChange.emit(value);
  }
}
