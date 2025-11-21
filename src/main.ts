import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Top-level await for bootstrap per ES2022; replaces promise chain for clarity.
try {
  await bootstrapApplication(App, appConfig);
} catch (err) {
  console.error(err);
}
