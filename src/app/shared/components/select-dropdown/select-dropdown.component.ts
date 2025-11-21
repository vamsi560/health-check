import { Component, EventEmitter, Output, signal, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select-dropdown',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss']
})
export class SelectDropdownComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) options!: SelectOption[];
  @Input() value: string | null = null;
  @Input() placeholder: string = '';
  @Input() disabled = false;
  @Input() required = false;
  @Input() error: string | null = null;
  @Input() ariaLabel: string | null = null;
  @Output() valueChange = new EventEmitter<string>();

  protected readonly selectValue = signal(this.value);
  protected readonly isDisabled = signal(this.disabled);

  onSelectionChange(event: any) {
    this.valueChange.emit(event.value);
  }
}
