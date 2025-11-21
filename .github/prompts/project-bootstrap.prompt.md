# Angular 20 Project Setup Prompt (Zoneless + Signals + Angular Material)

Create an Angular **20** application using the latest recommended standards, standalone APIs, and zoneless architecture with the following setup and guidelines:

## Core Framework Requirements
- The project must run in **Zoneless Angular mode** (no Zone.js).  
  Use Angular 20’s built-in **signal-based change detection**.
- Use **Angular Signals** everywhere for component state, shared state, and reactive UI flows.
- Use **Angular Material (latest)** for UI components, theming, typography, and layouts.
- TypeScript should be configured with **non-strict type checking**.
- Include the default **Karma & Jasmine** testing environment.
- Register all global providers (router, material, animations, ngrx, http, environments, etc.) inside a single unified `app.config.ts`.

## State Management Guidelines
- Use **NgRx (latest)** for global application state or complex domains.
- All NgRx selectors should expose **signals** for easier consumption by Angular 20 components.
- Use Angular `effect()` for reacting to async store updates where necessary.
- Keep side effects clearly separated inside NgRx Effects.

## Project Styling
- Use **SCSS** as the styling format.
- Centralize global styles, mixins, and theme variables under `src/styles/` or `src/theme/`.
- Use **Angular Material's official theming system** (no TailwindCSS, no Bootstrap).

## Folder Structure Standards
Organize your Angular 20 application using the following clean architecture:
src/
├── app/
│   ├── core/
│   │   ├── services/        # global singleton services
│   │   ├── interceptors/
│   │   ├── guards/
│   │   └── layout/
│   │
│   ├── shared/
│   │   ├── components/
│   │   ├── directives/
│   │   ├── pipes/
│   │   └── services/       # reusable shared services
│   │
│   ├── features/
│   │   ├── feature-a/
│   │   │     ├── feature-a.component.ts
│   │   │     ├── feature-a.routes.ts
│   │   │     └── feature-a.service.ts   # feature-scoped service
│   │   └── feature-b/
│   │
│   ├── state/               # NgRx store (signals enabled)
│   ├── app.config.ts
│   └── app.routes.ts
│
├── styles/
├── assets/
└── main.ts

## Angular Material Requirements
- Use the **latest Angular Material (v20+)** component set.
- Enable Material **async animations** (Angular 20 default supports zone-free animations).
- Use Material’s **theming API** for light/dark modes and palette customization.
- Use Material typography presets for consistent text appearance.

## Additional Best Practices
- Use **standalone components** across the entire project.
- Avoid NgModules except for special compatibility cases.
- Minimize services that expose RxJS Subjects—prefer **signals**.
- Use `computed()` and `effect()` to derive UI state efficiently.
- Follow Angular 20’s recommended accessibility patterns for Material components.

## Final Goal
A **modern Angular 20 application** that is:
- Fully **zoneless**
- Signal-driven
- Material-themed
- SCSS-based
- Organized with clean architecture
- Using latest NgRx with signal interoperability


