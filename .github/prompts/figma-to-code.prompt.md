Here is your **Angular-converted prompt** rewritten cleanly, professionally, and aligned with **Angular 20, standalone components, CSS (not Tailwind), your coding standards, and Signals-First architecture**.

# ## **Prompt: Convert Figma Design to Angular (Standalone Components + CSS)**

You are a **senior Angular engineer**. Convert the selected Figma frame into a **production-ready Angular 20 standalone component** using:
 Standalone components
 OnPush change detection
 Signals-first UI state
 Strong TypeScript
 Standard CSS stylesheets (`.css` or `.scss`)
No inline styles unless absolutely required

Follow these requirements:

# ### **1. Angular Architecture Requirements**
* Generate a **standalone component** (`@Component({ standalone: true })`).
* Must use:
  ```ts
  changeDetection: ChangeDetectionStrategy.OnPush
  ```
* Organize the template according to the Figma layout using:
  * `<div>`, `<section>`, `<main>`, `<header>`, `<footer>`
  * Proper semantic HTML5 elements
* Extract repeated UI patterns into **reusable child components** if needed.
* Add strong TypeScript types for all inputs, outputs, and internal state.

# ### **2. Styling Rules**
* Use **CSS or SCSS file** for styling — no inline styles except for rare cases.
* Match the Figma design precisely:
  * spacing
  * padding
  * typography
  * colors
  * layout hierarchy
* Use responsive CSS (`@media`) for desktop, tablet, and mobile.
* Avoid fixed pixel widths/heights except for icons/avatars.
* Prefer:
  * `width: 100%`
  * `max-width`
  * `min-height: 100vh`
  * `flex`, `grid`, `gap`
* Use clean, maintainable CSS classes (BEM naming recommended).

# ### **3. Accessibility Requirements**
* Use semantic HTML structure.
* Provide accessible labels on:
  * buttons
  * inputs
  * interactive elements
* Add ARIA attributes where applicable.
* Ensure keyboard navigability.

# ### **4. Responsiveness Requirements**
* Component **must scale across all breakpoints**.
* Use responsive CSS media queries:
  ```css
  @media (min-width: 640px) { ... }
  @media (min-width: 768px) { ... }
  @media (min-width: 1024px) { ... }
  ```
* Support:
  * Mobile-first layout
  * Tablet optimized layout
  * Desktop structured layout

# ### **5. Data / Props Rules**

* Do **NOT** hardcode any business data (use placeholders if needed).
* Use Inputs for dynamic, design-dependent values.
* When content appears repeated in the design:
  * Convert them into `@Input()`-driven child components.

# ### **6. Signals-First UI Logic**
All internal UI state should use Angular Signals:
* For UI state:
  ```ts
  readonly selectedTab = signal<string>('overview');
  ```
* For derived UI data:
  ```ts
  readonly filteredList = computed(() => ...);
  ```
* For template usage:
  ```html
  {{ filteredList() }}
  ```
* No manual subscriptions in components.

# ### **7. Component Output Requirements**
When generating the component, include:
### **A. Signals Design Section**
Describe:
* Signals needed
* Computed values
* Effects (if required)
* How they connect to template and logic

### **B. Final Files**
* `<component>.ts`
* `<component>.html`
* `<component>.css` or `.scss`

All files must include the required header:
```ts
/**
 * File Purpose:
 * <short description>
 */
```
# ### **8. Code Quality Rules**
* Must follow `.eslintrc.json` and `.prettierrc.json` formatting.
* No unused variables, imports, or unreachable code.
* Strong TypeScript everywhere.
* Clean and readable component API.
* No unnecessary dependencies.