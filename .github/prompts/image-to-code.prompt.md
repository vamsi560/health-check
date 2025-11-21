# Image to Angular Component Prompt

You are an expert Angular engineer. When converting a UI design to code, follow these requirements:

## Conversion Instructions
Convert the attached UI design into a pixel-perfect Angular 20 standalone component using:
- **SCSS** for layout and styling (no Tailwind)
- **Common components** from the design system (see `../design-system/base.md` and `../design-system/common-component.prompt.md`)
- **All design principles and tokens** defined in the design system

## Best Practices Checklist
1. **TypeScript**: Use strict typing and signals-first state management.
2. **Component Reuse**: Reference shared components already defined in `src/app/shared/components` where applicable.
3. **Accessibility**: Ensure the HTML is semantic and accessible. Add ARIA attributes to improve screen reader compatibility.
4. **Standalone**: Design the component to be modular, reusable, and standalone (no NgModules).
5. **Styling**: Apply SCSS classes for styling. Avoid inline styles unless absolutely necessary.
6. **Pixel-Perfect**: Ensure UI/UX consistency with the source screenshot. Match layout, spacing, and color pixel-perfectly using SCSS and Material theming.
7. **Responsive**: Implement responsive layout using CSS Flexbox or Grid as appropriate.
8. **Testing**: Structure the component for easy testing with Angular TestBed and Jasmine/Karma.
9. **Naming & Signals**: Use clean, meaningful naming, and apply Angular signals (`signal`, `computed`, `effect`) for all UI state.
10. **Typography**: Follow all text decorations and typography styles visible in the screenshot, using Material typography tokens where possible.
11. **Icons**: Use Angular Material icons (`<mat-icon>`) for all iconography shown in the UI. Import only the icons that are visually relevant to the screenshot.
12. **Completeness**: Do not miss any elements in conversion.
13. **Colors**: Pick background and foreground colors from the design system or the design itself.
14. **Typography Component**: Use `<app-typography>` with inputs: `tag` (h1-h6), `fontWeight` (number), `align` (left, center, right), `color` (hex or Material palette), `size` (e.g., 'text-sm'), `class` for additional SCSS classes.
15. **Button Component**: Use `<app-button>` with inputs: `color` (primary, accent, warn), `type` (button, submit, reset), `disabled` (boolean), `icon` (string), `class` for additional SCSS classes.
16. **Input Component**: Use `<app-input>` with inputs: `type` (text, password, email, number), `placeholder`, `value`, `disabled`, `required`, `ariaLabel`, `class` for additional SCSS classes.
17. **Card Component**: Use `<app-card>` with inputs: `variant` (elevated, outlined, flat), `class` for additional SCSS classes.
18. **Relative Imports**: Use common components from `src/app/shared/components` and update the relative import path.

## Layout Rule
After generating the component, apply this additional layout rule:
- Align menu items, navigation bar, sidebar links (e.g., left, center, right) according to their visual positioning in the screenshot.

## Output Requirements
Always output:
- **Signals Design section** (list signals, computed, effects, and how they bind to UI)
- **Complete Angular files**: `.component.ts`, `.component.html`, `.component.scss` with required header comments and correct folder structure.
