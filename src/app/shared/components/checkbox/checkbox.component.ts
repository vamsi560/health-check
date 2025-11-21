import { Component, EventEmitter, Output, signal, Input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [MatCheckboxModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  @Input({ required: true }) label!: string;
  @Input() checked = false;
  @Input() disabled = false;
  @Input() required = false;
  @Input() ariaLabel: string | null = null;
  @Input() error: string | null = null;
  @Output() checkedChange = new EventEmitter<boolean>();

  protected readonly isChecked = signal(this.checked);
  protected readonly isDisabled = signal(this.disabled);

  onChange(event: any) {
    this.checkedChange.emit(event.checked);
  }
}
