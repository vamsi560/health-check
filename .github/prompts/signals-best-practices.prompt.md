# 1 General Output Requirements
*   Every generated file MUST start with the required header comment:

`/**  * File Purpose:  * <short explanation>  */`
*   Use **latest Angular 20 stable APIs** only.
*   Use **standalone components** with `changeDetection: ChangeDetectionStrategy.OnPush`.
*   NEVER introduce unused imports, unused variables, or ESLint violations.
*   Use **strong typing** everywhere (`any` is not allowed unless justified).
*   Do not introduce new dependencies unless explicitly asked.
*   Architecture MUST follow:
    *   **Signals-first design**
    *   **Feature-based folder structure**
    *   **Lean components, logic in services**
*   All code must match formatting defined in `.eslintrc.json` and `.prettierrc.json`.
    
#  2 Folder & Structure Rules
`src/   app/     core/          // app-wide singleton services, interceptors     shared/        // reusable components, directives, pipes, models     features/       <feature-name>/         <feature>.component.ts         <feature>.service.ts         <feature>.model.ts`

#  3 Signals-First Architecture Rules
For **every component, service, feature, or flow you generate**, ALWAYS include a section:
# Signals Design (Mandatory Section)
For every feature, define in advance:1 Signals
*   Use `signal<T>()` for mutable reactive state.
*   Name them clearly:
    *   `userSignal`, `idleTimeSignal`, `formStateSignal`
*   Expose readonly versions via `.asReadonly()`.
    2 Computed Values
*   Use `computed()` for all derived values:
    *   UI formatting
    *   counts/totals
    *   filtering logic
    *   transformations
*   Name like:
    *   `userDisplay`, `filteredItems`, `idleTimeFormatted`
        3 Effects

Use `effect()` ONLY for side-effects:
*   API calls dependent on state
*   Navigation
*   Logging
*   Timers
*   Trigger logic when signals change
    

Effects must NEVER mutate multiple states unpredictably.
Example:
`effect(() => {   if (remainingTimeSignal() === 0) {     this.logout();   } });`4 How These Connect

Document how signals integrate with:
*   Services
*   Components
*   Forms (`FormGroup`, `FormControl`)
*   UI templates (`{{ signal() }}`)
*   External APIs
*   User actions
*   Timers

# 4 When to Prefer Signals (Required)
Always use signals when:
*   State is local
*   UI reacts automatically
*   You don’t need complex RxJS pipelines
    
Use RxJS only when:
*   You need stream composition
*   HTTP polling
*   WebSockets
*   `switchMap`/`combineLatest` logic
All observables exposed to components MUST be converted into signals:
`toSignal(this.api.getData(), { initialValue: [] });`

# 5 Component Rules
*   Use `OnPush` always.
*   Use `inject()` instead of constructor DI.
*   Template must read state via:
`{{ userSignal() }} <div *ngIf="isLoggedIn()">...</div>`
*   No async pipes unless you justify observable usage.
*   No manual subscriptions.

# 6 Service Rules
A service must contain:
*   All feature business logic
*   All signals that store mutable state
*   All derived/computed signals
*   Effects that drive side-effects

Service example structure:
`private readonly _state = signal<MyState>(initialState); readonly state = this._state.asReadonly();  readonly formatted = computed(() => formatState(this._state()));  constructor() {   effect(() => this.handleAutoLogout()); }`

# 7 Error Handling Rules
*   Wrap async/await in try/catch.
*   Transform API errors at the interceptor level.
*   Never expose raw backend errors to UI.
*   Provide meaningful error messages.

#  8 What You Must Output Each Time
Whenever I ask you to build **any Angular feature**, your output must include:
## Section A — Signals Design (Mandatory)
List:
1.  Signals
2.  Computed
3.  Effects
4.  How they bind to:
    *   UI
    *   Forms
    *   Services
    *   API calls
    *   Navigation
    *   Events

##  Section B — Final Code (Following All My Guidelines)
*   File header comments
*   Correct folder structure
*   OnPush
*   Signals-only UI state
*   Strongly typed code
*   No ESLint issues