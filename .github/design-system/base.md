# Hudson Angular Design System Overview

## Foundations

- **Font:** Helvetica Neue
- **Colors:**
  - Primary: `#0079C2`
  - Accent: `#FACC15`
  - Border: `#00000026`
- **Radius:** 4px (`rounded-md`)
- **Spacing:** 4px scale → `p-2`, `m-4`
- **Shadows:** Soft elevation: `shadow-md`

## Components

### Button
- Sizes: `sm`, `md`, `lg`
- Variants: `primary`, `accent`, `warn`
- Props: `label`, `color`, `type`, `disabled`, `icon`, `ariaLabel`, `customClass`, `customStyle`
- Usage: `<app-button [label]="'Submit'" color="primary"></app-button>`

### Input
- Props: `label`, `type`, `value`, `placeholder`, `disabled`, `required`, `error`, `ariaLabel`
- Usage: `<app-input [label]="'Name'" [value]="name"></app-input>`

### Checkbox
- Props: `label`, `checked`, `disabled`, `required`, `error`, `ariaLabel`
- Usage: `<app-checkbox [label]="'Accept'" [checked]="accepted"></app-checkbox>`

### Select Dropdown
- Props: `label`, `options`, `value`, `placeholder`, `disabled`, `required`, `error`, `ariaLabel`
- Usage: `<app-select-dropdown [label]="'Country'" [options]="countryOptions"></app-select-dropdown>`

### Radio Button
- Props: `label`, `options`, `value`, `disabled`, `required`, `error`, `ariaLabel`
- Usage: `<app-radio-button [label]="'Gender'" [options]="genderOptions"></app-radio-button>`

### Textarea
- Props: `label`, `value`, `placeholder`, `rows`, `disabled`, `required`, `error`, `ariaLabel`
- Usage: `<app-textarea [label]="'Message'" [rows]="4"></app-textarea>`

### Date Picker
- Props: `label`, `value`, `placeholder`, `min`, `max`, `disabled`, `required`, `error`, `ariaLabel`
- Usage: `<app-date-picker [label]="'DOB'"></app-date-picker>`

### Dialog (Modal)
- Props: `title`, `content`, `showActions`, `confirmLabel`, `cancelLabel`, `disableClose`
- Usage: `Open via MatDialog service, pass data as needed.`

### Table
- Props: `columns`, `data`, `pageSize`, `pageSizeOptions`, `showPaginator`, `showSort`, `ariaLabel`
- Usage: `<app-table [columns]="cols" [data]="rows"></app-table>`

### Toaster
- Props: `duration`
- Methods: `show(message, action, type)`, `hide()`
- Usage: `Call show/hide methods from component logic.`

### Stepper (Horizontal Progress)
- Props: `steps`, `currentStep`, `linear`, `stepChange`, `completed`
- Supports: icons, labels, linear navigation, emits events on step change/completion
- Usage: `<app-stepper [steps]="steps" [linear]="true"></app-stepper>`

---

- All components use Angular Material, signals for state, and native Angular control flow (`@if`, `@for`).
- Fully accessible (WCAG AA, ARIA), responsive, and themable.
- See each component's folder for detailed API and usage.
