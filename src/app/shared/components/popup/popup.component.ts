/**
 * File Purpose:
 * Responsive popup/modal component using Angular Material Dialog and signals
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [MatDialogModule],
  template: `@if (openSignal()) {
    <div class="popup-content"><ng-content></ng-content></div>
  }`,
  styleUrls: ['./popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupComponent {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();
  readonly openSignal = signal(this.open);

  close() {
    this.openSignal.set(false);
    this.openChange.emit(false);
  }
}
