/**
 * File Purpose:
 * Responsive file upload component with signals
 */
import { Component, Output, EventEmitter, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  template: `<input type='file' (change)='onFileChange($event)' />`,
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadComponent {
  @Output() fileChange = new EventEmitter<File | null>();
  readonly fileSignal = signal<File | null>(null);

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;
    this.fileSignal.set(file);
    this.fileChange.emit(file);
  }
}
