import { Component, ChangeDetectionStrategy, inject, computed, effect } from '@angular/core';
import { JsonFormService } from '../../core/services/json-form.service';
import { StepperComponent } from '../../shared/components/stepper/stepper.component';
import { DynamicFormComponent } from '../../core/rendering/dynamic-form/dynamic-form.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medispa-flow',
  imports: [StepperComponent, DynamicFormComponent],
  template: `
    <section class="medispa-flow" aria-label="MediSpa Quote Flow">
      @if (showStepper()) {
        <app-stepper [steps]="flowUiSteps()" [currentStep]="currentStepIndex()" (stepChange)="onStepChange($event)"></app-stepper>
      }
      <app-dynamic-form></app-dynamic-form>
    </section>
  `,
  styles: [`
    .medispa-flow { 
      display: flex; 
      flex-direction: column; 
      gap: 1.25rem; 
      width: 100%;
    }
    /* Constrain stepper + form inside container already provided by app shell */
    app-stepper { padding: .25rem 0 .5rem; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MedispaFlowComponent {
  private readonly jsonForm = inject(JsonFormService);
  private readonly route = inject(ActivatedRoute);

  protected readonly flowUiSteps = computed(() => (this.jsonForm.flowSteps() || []).map(s => ({ label: s.name, icon: s.icon })));
  protected readonly currentStepIndex = computed(() => this.jsonForm.currentStepIndex());
  protected readonly showStepper = computed(() => !!this.jsonForm.flowSteps() && this.jsonForm.useStepper());

  constructor() {
    effect(() => {
      const flowKey = this.route.snapshot.data['flowKey'] as string | undefined;
      if (!this.jsonForm.isLoaded()) {
        this.jsonForm.loadConfigFromAsset().subscribe(() => {
          if (flowKey) this.jsonForm.initFlow(flowKey);
        });
      } else if (flowKey && !this.jsonForm.flowSteps()) {
        this.jsonForm.initFlow(flowKey);
      }
    });
  }

  onStepChange(index: number) {
    const steps = this.jsonForm.flowSteps();
    if (!steps) return;
    this.jsonForm.currentStepIndex.set(index);
    this.jsonForm.loadModelByEndpoint(steps[index].endpoint.replace(/^[\\/]/, ''));
  }
}
