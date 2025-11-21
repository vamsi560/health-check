import { Component, EventEmitter, Output, signal, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent {
  @Input({ required: true }) label!: string;
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() rows: number = 3;
  @Input() disabled = false;
  @Input() required = false;
  @Input() error: string | null = null;
  @Input() ariaLabel: string | null = null;
  @Output() valueChange = new EventEmitter<string>();

  protected readonly textareaValue = signal(this.value);
  protected readonly isDisabled = signal(this.disabled);

  onInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.valueChange.emit(target.value);
  }
}
