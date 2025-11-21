import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';

export interface StepperStep {
  label: string;
  icon?: string;
  completed?: boolean;
  optional?: boolean;
  error?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [MatStepperModule, MatIconModule],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {
  @Input({ required: true }) steps!: StepperStep[];
  // Driven entirely by parent; we don't keep an internal divergent copy.
  @Input() currentStep = 0;
  // External navigation logic controls progression; keep non-linear to prevent Material auto-skips.
  @Input() linear = false;
  @Output() stepChange = new EventEmitter<number>();
  @Output() completed = new EventEmitter<void>();

  // No lifecycle hook needed: parent drives currentStep and steps; avoids empty ngOnChanges.

  onStepChange(index: number) {
    this.stepChange.emit(index);
  }

  onComplete() { this.completed.emit(); }
}
