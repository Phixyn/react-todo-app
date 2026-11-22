# AGENTS.md

Agent instructions for the `react-todo-app` repository. Any AI agent or
human collaborator working in this codebase MUST read and follow this file
before making changes.

This is a living document. If the repository's conventions change, update
this file in the same change set.

---

## 1. Project purpose

This is a **React-based task management (to-do) application**. It lets a
single user create, complete, edit, and delete tasks, with a light/dark
theme switcher and an "About" page. Task data is stored locally in the
browser (localStorage); there is no backend or database.

The project is an educational assignment ("Assignment 05") evaluated via
CI and local quality checks. Correctness, accessibility, and a clean
verification trail matter more than feature breadth.

---

## 2. Technology stack

| Concern            | Technology                                   |
|--------------------|----------------------------------------------|
| Language           | TypeScript (~5.8.3)                          |
| UI framework       | React 19 (`react`, `react-dom`)              |
| Build tool / dev   | Vite 7 (`@vitejs/plugin-react`)              |
| Routing            | React Router 7 (`react-router-dom`)          |
| Styling            | Tailwind CSS 4 (`@tailwindcss/vite`) + CSS tokens |
| Icons              | `react-icons`                                |
| IDs                | `uuid`                                       |
| Unit/integration   | Vitest 3 + `@testing-library/react` + `jest-dom` |
| E2E                | Cypress 14 (`cypress-react-selector`, `@faker-js/faker`) |
| Lint               | ESLint 9 flat config + `typescript-eslint` + react-hooks + react-refresh |
| Format             | Prettier 3 (`eslint-config-prettier`)        |
| Coverage           | `@vitest/coverage-v8`                        |

Do **not** assume a library is available without checking `package.json`.

---

## 3. Architecture

### Entry point and root

- **`src/main.tsx`** — Bootstraps the app. Renders `<App />` inside
  `<StrictMode>` into the `#root` element using `createRoot`.
- **`src/App.tsx`** — Root component. Composes `ThemeProvider` →
  `TodoProvider` → `Router`. Defines routes `/` (`TodosList`) and
  `/about` (`About`). Renders `AppFooter`.

### State management — Context + Reducer

- **`src/context/TodoContext.tsx`** — Defines `TodoListState` interface
  and `TodoContext` with the initial (no-op) state.
- **`src/context/TodoProvider.tsx`** — Owns todo state via
  `useReducer(TodoReducer, initialState)`. Persists `todoItems` to
  `localStorage` under key `"todos"` (loads on mount, saves on change
  after a mount guard). Exposes action functions: `addTodo`,
  `toggleTodoComplete`, `deleteTodo`, `updateTodo`, `setEditingId`.
- **`src/context/TodoReducer.ts`** — Pure reducer handling actions:
  `ADD_TODO`, `TOGGLE_TODO_COMPLETE`, `DELETE_TODO`, `UPDATE_TODO`,
  `SET_EDITING_ID`, `LOAD_TODOS`. State mutations are immutable
  (spread + map/filter).

Theme state follows the same pattern:
- **`src/context/ThemeContext.tsx`** — `ThemeState` interface and context.
- **`src/context/ThemeProvider.tsx`** — `useState<Theme>`, persists to
  `localStorage` under key `"theme"`, syncs with OS
  `prefers-color-scheme`, toggles the `dark` class on `<html>`.

Data flow: providers hold state at the top of the tree; leaf components
consume context and dispatch actions upward via the provider's action
callbacks. Presentational components (e.g. `TodosFooter`) receive data
via props.

### Components — `src/components/`

- **`TodosList.tsx`** — Orchestrates header + add form + list + footer.
  Defines the `TodoItemType` (`{ id, title, completed }`).
- **`AddTodo.tsx`** — Controlled input with validation (empty,
  whitespace, 500-char limit). Dispatches `addTodo`.
- **`TodoItem.tsx`** — Single task row; inline edit with focus and
  Enter/Escape keyboard handling; complete toggle; delete.
- **`TodosHeader.tsx`** — Date display and time-of-day header image;
  hosts `ThemeSwitcher`.
- **`TodosFooter.tsx`** — Total / complete / open counts (props-only).
- **`AppFooter.tsx`** — Route-aware footer (About link on `/`,
  attribution on `/about`).
- **`ThemeSwitcher.tsx`** — Light/dark toggle button.
- **`AppHeader.tsx`** — Currently not imported anywhere (dead code).

### Pages — `src/pages/`

- **`About.tsx`** — Static "About" page rendered at `/about`.

### Assets — `src/assets/`

- Header background images (`header-day.jpg`,
  `header-afternoon.jpg`, `header-night.jpg`) and `react.svg`.

### Styles — `src/styles/`

- **`tokens.css`** — CSS design tokens / custom properties used across
  the theme system and component classes.

### End-to-end tests — `cypress/`

- **`cypress/e2e/`** — Cypress specs: `AddTodo`, `TodoItem`,
  `TodosList`, `TodosFooter`, `TodosHeader`, `AppFooter`,
  `ThemeSwitcher`.
- **`cypress/support/commands.ts`** — Custom commands: `getByTestId`,
  `findByTestId`, `addTask`.
- **`cypress/fixtures/`** — Test fixtures.

### CI — `.github/workflows/`

- **`lint.yml`** — Runs `npm run lint` on push/PR to `main`.
- **`tests.yml`** — Runs Vitest (`npm run test`) then Cypress E2E via
  `cypress-io/github-action@v7` (`start: npm run dev`,
  `wait-on: http://localhost:5173`, `browser: chrome`).

---

## 4. Setup instructions

Requires Node.js (CI uses Node 24; locally tested on Node v22.23.1) and
npm.

```bash
# Install dependencies (run only after explicit human approval)
npm ci

# Start the dev server (http://localhost:5173)
npm run dev

# Production build (runs tsc -b type-check, then vite build)
npm run build

# Lint
npm run lint

# Unit and integration tests with coverage
npm run test

# End-to-end tests (requires Xvfb on Linux; CI runs them in Chrome)
npm run cypress:run
```

The commands above are the core workflow, not an exhaustive script
list. Check `package.json` for additional scripts such as `format`,
`test:watch`, `cypress:open`, and `preview`.

Do not invent commands. If a command is not listed in `package.json`,
it does not exist in this project.

---

## 5. Coding conventions

- Use **TypeScript** for all new application components and modules.
- Follow existing **React functional component** conventions (hooks,
  no class components).
- Follow the existing **Context + Reducer** architecture for shared
  state. Do not introduce a new state library without approval.
- Use existing **CSS design tokens** (`src/styles/tokens.css`) and
  Tailwind utility classes. Do not introduce inline color literals
  that bypass the token system.
- Prefer **small, focused changes** that match the surrounding code
  style.
- Avoid **duplicated business logic** — reuse existing helpers and
  context actions.
- Preserve **accessibility**: keep `aria-label`s, `role="alert"`,
  keyboard handlers, and focus management intact.
- Preserve existing **`data-testid`** attributes — E2E and unit tests
  rely on them.
- Follow existing **formatting and naming conventions** (Prettier
  config in `.prettierrc`; named exports for pages, default exports
  for components where the codebase already does so).
- Add TypeScript types to all new function parameters and avoid
  implicit `any`.

---

## 6. Testing requirements

Before accepting or reporting a code change as complete, run and
record the actual results of:

1. `npm run lint`
2. `npm run test`
3. `npm run build`
4. Relevant Cypress specs (`npm run cypress:run` or targeted specs)
   **only when the environment supports them** (Cypress requires Xvfb
   on headless Linux; this is not available in all local
   environments).

For every command, record:
- The exact command run.
- Whether it executed.
- The exit code.
- The actual output (or a faithful summary).
- Pass/fail counts for tests.

**Never claim a test or check passed if it was not executed.** If a
check could not be run (e.g. Cypress in an environment without Xvfb),
state that explicitly as a verification gap.

---

## 7. Security and operating boundaries

### FORBIDDEN

- Reading, exposing, printing, or committing real credentials or
  secrets. Do not open or read `.env`, `.env.*`, private-key files,
  credential stores, or secret-bearing configuration unless a human
  explicitly authorizes that inspection and it is necessary for the task.
  Never commit these files or their contents.
- Introducing secrets, API keys, or tokens into source code.
- Deploying the application to any environment.
- Executing destructive shell commands (`rm -rf`, `git reset --hard`,
  force-push, dropping tables, etc.).
- Deleting files unrelated to the current task.
- Running `git reset --hard` or any force-push operation.
- Installing, removing, or upgrading dependencies without explicit
  human approval.
- Modifying `package.json`, `package-lock.json`, or other package
  manifests without approval.
- Modifying CI workflows (`.github/workflows/`) without approval.
- Making broad refactors unrelated to the assigned task.

### Required

- Treat browser-local data (`localStorage`) as untrusted input.
- Do not log sensitive user data.
- Keep changes within the explicitly approved scope.

---

## 8. Agent permissions and review gates

The agent MAY:
- Inspect and read any file in the repository.
- Propose changes and create documentation files within the approved
  scope.
- Make small, focused code changes within the explicitly approved
  scope.
- Run non-destructive verification commands (`npm run lint`,
  `npm run test`, `npm run build`).

Human approval is REQUIRED before:
- Any dependency change (install, remove, upgrade).
- Any security-sensitive change (auth, secrets, permissions, RLS).
- Any destructive operation (deleting files, dropping data, force
  operations).
- Commits to protected branches (e.g. `main`).
- Merging branches or pull requests.
- Deploying the application.
- Modifying CI workflows or package manifests.
- Broad refactors outside the assigned task scope.

When in doubt, ask before acting. A single prior approval does not
constitute blanket authorization for future actions.

---

## 9. Documentation requirements

- Update relevant documentation (`README.md`, `CHANGELOG.md`,
  `AGENTS.md`, `docs/`) when behavior, architecture, or conventions
  change.
- Provide a plain-language summary of every change made in a turn.
- Record verification results (commands, exit codes, pass/fail)
  honestly. Never fabricate results.
- Flag any verification that could not be performed and explain why.
