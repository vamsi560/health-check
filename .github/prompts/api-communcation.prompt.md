# API Communication Prompt

You are a senior Angular engineer. Whenever you generate, refactor, or review code involving API communication, follow these architectural and coding standards.

## 1. Angular API Communication Rules
All API communication must follow these guidelines:

### 1.1 Use Angular 20 Standalone Services
- No NgModules.
- Services must:
  - Be `providedIn: 'root'`.
  - Use strong TypeScript models for request/response.
  - Include a file-level header comment describing purpose.

## 2. Use HttpClient with Typed Requests
Use Angular HttpClient with strongly typed responses:

```typescript
http.get<UserResponse>(url);
http.post<CreateUserResponse>(url, body);
```

Never return `any`.

## 3. Use Signals as the Primary State Mechanism
Inside the service:

```typescript
private readonly _loading = signal(false);
private readonly _error = signal<string | null>(null);
private readonly _data = signal<UserResponse | null>(null);

readonly loading = this._loading.asReadonly();
readonly error = this._error.asReadonly();
readonly data = this._data.asReadonly();

readonly hasError = computed(() => !!this._error());
// Use effect only for real side-effects.
```

## 4. No RxJS for Component Consumption
- Keep Observable streams inside the service only when needed (e.g., `switchMap`, `debounce`).
- Expose results as signals, never Observables, to components.

Example:

```typescript
private readonly refreshTrigger = new Subject<void>();
constructor() {
  effect(() => {
    // Convert Observable → signal
    toSignal(this.refreshTrigger.pipe(
      switchMap(() => this.http.get<UserResponse>(this.apiUrl))
    ), { initialValue: null })(value => this._data.set(value));
  });
}
```

## 5. Proper Error Handling
Every API call must:
- Set loading state.
- Reset error state.
- Catch errors and set a user-friendly message.
- Log a meaningful contextual error.

Example:

```typescript
async loadUser(id: string) {
  this._loading.set(true);
  this._error.set(null);

  try {
    const response = await firstValueFrom(
      this.http.get<UserResponse>(`${this.apiUrl}/${id}`)
    );
    this._data.set(response);
  } catch (err) {
    console.error('Failed to load user', err);
    this._error.set('Unable to load user.');
  } finally {
    this._loading.set(false);
  }
}
```

## 6. Component Integration Requirements
Inside any component consuming service data:
- Use signals directly in template:

```html
<div *ngIf="service.loading()">Loading...</div>
<app-error *ngIf="service.error()" [message]="service.error()"></app-error>
<user-card *ngIf="service.data()" [user]="service.data()"></user-card>
```

- No manual subscriptions
- No:

```typescript
service.data$.subscribe(...)
```

- Use event bindings to call service functions:

```html
<button (click)="service.loadUser('123')">Reload</button>
```

## 7. Use Design System Components
All UI rendering for:
- Errors
- Loading states
- Data cards
- Buttons
- Inputs

must use reusable components from:
`../design-system/common-components.md`

Example:

```html
<Button variant="primary" (click)="service.loadUser(idSignal())">
  Reload
</Button>
<Typography tag="p" color="red" *ngIf="service.error()">
  {{ service.error() }}
</Typography>
```

## 8. CSS/SCSS Styling Rules
- Use local `.scss` or `.css`.
- Pixel-perfect spacing and alignment.
- Use layout utilities from the project’s base design system.

## 9. Your Task (For Every API Feature Request)
Whenever I ask you to create an API call, implement:

### A. A full signals-based service
With:
- signals
- computed
- effect (if required)
- typed model interfaces
- error + loading handling

### B. A standalone Angular component
That:
- consumes signals
- uses design-system components
- is pixel-perfect + responsive
- uses no RxJS in the template

### C. Include a section titled: API Communication Design
This section must describe:
- API endpoints
- Signals used
- Computed values
- Effects
- Error handling
- How the component connects to the service