import { Routes } from '@angular/router';
import { MedispaFlowComponent } from './feature/medispa/medispa-flow.component';

// Single MediSpa feature route initializes the quoteFlow multi-step form.
export const routes: Routes = [
  { path: 'medispa', component: MedispaFlowComponent, data: { flowKey: 'quoteFlow' } },
  { path: '', pathMatch: 'full', redirectTo: 'medispa' }
];
