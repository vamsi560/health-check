import { Component, EventEmitter, Output, signal, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {
  @Input({ required: true }) label!: string;
  @Input() value: Date | null = null;
  @Input() placeholder: string = '';
  @Input() disabled = false;
  @Input() required = false;
  @Input() min: Date | null = null;
  @Input() max: Date | null = null;
  @Input() error: string | null = null;
  @Input() ariaLabel: string | null = null;
  @Output() valueChange = new EventEmitter<Date | null>();

  protected readonly dateValue = signal(this.value);
  protected readonly isDisabled = signal(this.disabled);

  onDateChange(event: any) {
    this.valueChange.emit(event.value);
  }
}
