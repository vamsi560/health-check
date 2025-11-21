# MyApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.9.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## JSON-Driven Dynamic Form Engine (Zoneless + Signals)

This application includes a dynamic rendering engine that consumes JSON models (e.g. `assets/medispa.json`) to build multi-step flows and standalone forms using:

- Angular 20 Standalone APIs (implicit standalone components)
- Zoneless change detection (`provideZonelessChangeDetection`)
- Signals for reactive UI visibility & flow navigation
- Angular Material form controls
- Reusable shared components under `src/app/shared/components`

### How It Works
1. A route such as `/form/customerInformationModel` loads the JSON model key `customerInformationModel`.
2. The `JsonFormService` loads the JSON asset once and builds a `FormGroup` with mapped validators.
3. `DynamicFormComponent` renders each field through `DynamicFieldComponent`, selecting the proper shared component.
4. Field visibility is recomputed via signals based on `dependsOn` / `hideWhenDepNotMet` rules.
5. Multi-step flows (e.g. `quoteFlow`) are exposed at the `/quote` route and use the existing `StepperComponent` for navigation. Buttons with `onClickHandler: "handleNext"` advance the flow.

### Adding a New JSON Model
Add a new model definition to `assets/medispa.json`:
```json
"newModelKey": {
	"fields": [
		{ "label": "Name", "name": "name", "component": "TextInput", "value": "", "validationRules": { "required": { "value": true } } }
	],
	"buttons": [ { "label": "Submit", "type": "submit", "onClickHandler": "onSubmit" } ]
}
```
Then navigate to `/form/newModelKey`.

### Supported Field Component Values
`TextInput`, `Radio`, `Select`, `DatePicker`, `Textarea` (fallback defaults to text input). You can extend mapping in `DynamicFieldComponent`.

### Flow Example
Define a flow array (e.g. `quoteFlow`) with step objects referencing endpoints (`"/customerInformationModel"`). Navigate to `/quote` to start.

### Extending
- Add new shared component and map it inside `DynamicFieldComponent`.
- Introduce custom validators by expanding `JsonFormService.mapValidators`.
- Hook API submission inside `DynamicFormComponent.onButton` where the payload is logged.

### Accessibility
Components rely on Angular Material's accessible primitives. Ensure each JSON field has a `label`; optional `ariaLabel` may be added for further clarity.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
