# Project memory

## Product intent & audience

- Todo application with light/dark theme switching — educational assignment ("Assignment 05").
- Features: add/toggle/delete/edit todos, footer counts, about page routing, theme provider/switcher.
- Audience: course grader / instructor; evaluated via CI and local checks.

## Brand personality & voice

- No explicit brand guidance inferred yet; project is a functional academic exercise, not a branded product.

## Visual design & UX direction

- Light/dark theme system via `ThemeContext` / `ThemeProvider`.
- Components: `AppHeader`, `AppFooter`, `AddTodo`, `TodoItem`, `About`, `ThemeSwitcher`.
- Header assets: three JPG images emitted to `dist/`.
- Built CSS bundle ~24 kB (5.6 kB gzip); JS bundle ~248 kB (80 kB gzip).
- Routing includes `/about` route.

## Decisions, constraints & rationale

- **Stack:** Vite 7 + React + TypeScript; ESLint 9 flat config; Vitest 3.2 + v8 coverage; Cypress 14.5 for E2E.
- **Baseline established (read-only, no source changes):**
  - Node v22.23.1, npm 10.9.8.
  - `npm run lint` — exit 0, clean.
  - `npm run test` — exit 0, 27/27 passed across 4 files; coverage 50.86% stmts / 79.36% branches / 48.48% functions.
  - `npm run build` — exit 0; `tsc -b` type-check passes, `vite build` produces `dist/`.
- **CI (`.github/workflows/tests.yml`):** `e2e-tests` job uses `cypress-io/github-action@v7` with `start: npm run dev`, `wait-on: http://localhost:5173`, `browser: chrome`; depends on `component-tests` job; runner `ubuntu-latest`, Node 24, `npm ci`.
- **Constraints:** Do not modify source, package.json/lockfiles, or configs; do not install/remove packages, format, or deploy. Record actual outputs and exit codes; never invent results.
- **Branch:** `assignment05-work` (not git-verifiable in this workspace).

## Open questions & assumptions

- **E2E unverifiable locally:** Cypress requires Xvfb (missing); `npx cypress verify` fails exit 1. E2E only CI-verifiable.
- **Coverage gaps:** `TodoReducer` (2.17%), `TodoItem` (2.92%), `AppHeader` (0%, dead code), `About` (6.66%), `main.tsx` (0%), `TodoProvider` action-dispatch & save-effect lines untested.
- **Git state unknown:** workspace is not a git repo; branch/commit SHA cannot be verified.
- `npm run cypress:open` and `npm run preview` not executed (interactive/headless-incompatible).