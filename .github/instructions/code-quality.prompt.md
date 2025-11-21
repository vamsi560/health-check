# Angular Code Quality Generation Prompt

## Purpose
Prevent common quality violations (empty lifecycle hooks, unused code, weak typing, poor accessibility, lack of reactive patterns).

## Core Directives
1. Angular v20+, standalone components by default (do NOT add standalone: true explicitly if already default).
2. Prefer signals (`input()`, `output()`, `signal()`, `computed()`, `effect()`) over imperative lifecycle hooks.
3. DO NOT leave empty lifecycle methods. If a lifecycle hook is present it MUST contain meaningful logic OR be removed entirely.
4. Only implement `OnInit` / other interfaces if the corresponding method is required. Prefer `effect()` for initialization and reactive side effects.
5. Strict typing: avoid `any`; use precise interfaces or `unknown` if unavoidable. Enable type inference where obvious.
6. Maintain small, single-responsibility components and services.
7. Use `ChangeDetectionStrategy.OnPush` in every component.
8. No `@HostBinding` / `@HostListener`; use `host` metadata object.
9. Accessibility (WCAG AA): semantic markup, proper labels, roles when necessary, focus management, ARIA only when native semantics insufficient.
10. Avoid dead code: remove unused imports, unused variables, commented-out blocks that provide no value.
11. Avoid duplication; refactor shared logic into pure helper functions or utilities.
12. Provide error handling and fallback states for asynchronous / optional data.
13. Do not use magic numbers/strings—extract constants when reused.
14. Keep templates free of complex logic: no inline arrow functions, no regex, minimal expressions.
15. Use native control flow syntax (`@for`, `@if`, `@switch`).
16. Avoid side effects in getters; use computed signals instead.
17. Validation messages must be clear, concise, and avoid duplication.
18. Prefer pure functions for transformations; avoid mutating external state directly.
19. Ensure color contrast and keyboard navigability for UI additions.
20. Avoid excessive coupling; inject dependencies via `inject()` instead of constructors.
21. Provide minimal unit tests for new public logic (happy path + one edge) when substantial logic added.
22. Remove commented-out code blocks unless they are actionable TODOs with owner and date.

## Lifecycle Hook Guidance
- REMOVE: Any empty `ngOnInit`, `ngAfterViewInit`, `ngOnDestroy`, etc.
- REPLACE: Initialization work -> `effect()` or direct property initialization.
- ADD: `ngOnDestroy` only if manual teardown (e.g., subscription outside signals, event listeners) is required.
- COMMENT: If a hook is intentionally omitted due to signals handling, do NOT add a placeholder hook; optionally add a single-line clarifying comment if Sonar false positive occurs.


## Error Handling & Logging
- Use structured logging only for diagnostics (`console.debug` or a logging service); no stray `console.log` in final code.
- Validate external inputs early; fail fast with informative errors.

## SonarQube Hotspots to Avoid
- Empty methods / classes.
- Large cyclomatic complexity (> 10) in a single function—refactor into smaller helpers.
- Functions exceeding ~50 lines—split logically.
- Commented code blocks (dead code) lingering.
- Unused parameters or variables—remove them.
- Inconsistent naming conventions—use camelCase for variables/functions, PascalCase for types/classes, SCREAMING_SNAKE_CASE for readonly constants.

## Accessibility Checklist (quick)
- Form controls: associate `<label>` with `id` or use `aria-label` / `aria-labelledby`.
- Interactive elements: ensure focus outline remains (do not remove it) and keyboard activation works (`Enter`/`Space`).
- Dynamic content updates: manage focus or announce via ARIA live regions when necessary.


## Performance
- Avoid unnecessary recomputation: use `computed()` for derived values and reuse signals.
- Defer heavy work until needed (lazy evaluation via signals/effects).

## Maintenance
Update this file when new quality gates or architectural standards emerge. Keep the prompt concise but comprehensive.
