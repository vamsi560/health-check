---
mode: 'agent'
tools: ['create_file', 'insert_edit_into_file']
context: ./base.md
description: 'Always ask for fresh componentName, inputs, and styling details.'
---

Create a new **Angular 20 component** named `{{componentName}}` with the following **@Inputs**: `{{inputs}}`.

Follow **Angular 20 best practices**, **standalone architecture**, **zoneless mode**, and **signals-first patterns**:

## Component Requirements

- Always generate a **standalone component** unless the user explicitly requests a feature-level grouping.
- Use `@Input()` with **strict typing** and create an interface for complex input objects.
- Use Angular **Signals** for internal reactive state:
  - Use `signal()` for local state.
  - Use `computed()` for derived UI values.
  - Use `effect()` only when required for side-effects.


## File Structure
Create the component in:
src/app/shared/components/{{componentName}}/
  ├── {{componentName}}.component.ts
  ├── {{componentName}}.component.html
  └── {{componentName}}.component.scss

## Template Syntax Modernization
- Always use native Angular control flow blocks: `@if`, `@for`, `@switch` instead of legacy `*ngIf`, `*ngFor`, `*ngSwitch` in all templates.


## UI & Interaction

- Ask whether the user has a **UI reference (Figma/image)**;  
  - If yes: match layout, spacing, semantics, and appearance.
  - If no: follow clean, modern Angular Material + SCSS patterns.
- Ask whether the user wants **custom styles** such as colors, typography, border radius, or spacing.
  - If yes: request design tokens or ranges (small/medium/large or system-based values).

## Styling Rules

- Use **SCSS** (no TailwindCSS in this project).
- Use **Angular Material components** where appropriate.
- The component must:
  - Use **semantic HTML** and proper **ARIA attributes**.
  - Be fully **responsive** and mobile-friendly.
  - Avoid inline styles unless explicitly required.
  - Follow Angular Material theming if applicable.

## Zoneless + Signals Constraints
- Avoid using Zone.js APIs.
- Do not use `ChangeDetectorRef.detectChanges()`.
- Prefer native event bindings and signal-based state updates.
- Ensure UI refresh is driven by signals, computed values, or Material components.

## Reusability

- Export the component so it can be imported easily elsewhere.
- Use kebab-case selector format:
`selector: 'app-{{componentName | kebab-case}}'`


Before generating the files, **always ask the user** for:
1. The final `componentName`
2. Inputs (confirm format)
3. Styling expectations (Material default or custom theme)
4. Any UI reference (Figma / image / link)
5. Any specific accessibility requirements