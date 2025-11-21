import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export type ButtonAction = (event: Event) => void;

export interface ButtonCustomStyle {
  [klass: string]: any;
}

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input({ required: true }) label!: string;
  @Input() color: 'primary' | 'accent' | 'warn' | undefined = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() customClass: string | string[] | Set<string> | { [klass: string]: any } = '';
  @Input() customStyle: ButtonCustomStyle = {};
  @Input() ariaLabel: string | null = null;
  @Input() icon: string | null = null;
  @Output() action = new EventEmitter<Event>();

  protected readonly isDisabled = signal(this.disabled);
  protected readonly buttonType = signal(this.type);
  protected readonly buttonColor = signal(this.color);

  onClick(event: Event) {
    if (!this.disabled) {
      this.action.emit(event);
    }
  }
}
