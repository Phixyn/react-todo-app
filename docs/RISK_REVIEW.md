# Task 04 — Read-Only AI Risk Review

Review date: 2026-11-22
Repository: `dauletRy/react-todo-app`
Reviewed branch: `assignment05-work`

## Review method and boundaries

AI assistants used:
- **Bolt.new** — produced the initial read-only repository inspection and proposed candidate weaknesses.
- **ChatGPT (GPT-6)** — independently inspected the current repository files through the connected GitHub repository and evaluated the candidate findings.

For this task, the risk assessment was read-only. No files were changed as part of the risk investigation itself. Task 03 changes already present on the branch (the persistence helper extraction and its tests) are not attributed to this read-only review.

Evidence sources included `src/context/todoStorage.ts`, `src/context/TodoProvider.tsx`, `src/context/TodoReducer.ts`, `src/components/TodosList.tsx`, `src/components/AppHeader.tsx`, `package.json`, `eslint.config.js`, `README.md`, and `.github/workflows/lint.yml` / `.github/workflows/tests.yml`.

Classification:
- **Confirmed:** the stated condition is directly observable in source/configuration or in the recorded command output.
- **Plausible/unverified:** the condition is observable, but the claimed consequence has not been reproduced.
- **Unsupported:** the repository evidence does not support the proposed claim.

## Findings

### RR-01 — Unvalidated localStorage todo shape

- **Category:** Correctness / data integrity
- **Classification:** Confirmed code gap; runtime impact not reproduced
- **Affected component:** `src/context/todoStorage.ts`, `src/context/TodoProvider.tsx`, `src/components/TodosList.tsx`
- **Evidence:** `loadTodos()` parses stored JSON and casts it as `TodoItemType[]` without checking `Array.isArray` or validating each object's `id`, `title`, and `completed` fields. A TypeScript cast does not validate runtime JSON. `TodosList` subsequently calls `.map` and `.filter` on `todoItems`.
- **Cause/event/consequence:** Browser storage contains a syntactically valid but structurally invalid JSON value; the app accepts and dispatches it; list rendering may fail or display malformed task data.
- **What is proven:** runtime shape validation is absent.
- **What is not proven:** a UI crash has not yet been reproduced with a corrupted-storage test.
- **Verification needed:** unit tests for non-array JSON and arrays containing objects with missing or incorrectly typed fields, plus a provider/render-level check where feasible.

### RR-02 — Core todo reducer lacks direct unit tests

- **Category:** Correctness / testability
- **Classification:** Confirmed
- **Affected component:** `src/context/TodoReducer.ts`
- **Evidence:** The initial baseline had 27 Vitest tests across four files, none for the reducer. Direct checks of `src/context/TodoReducer.test.ts` and `src/context/TodoReducer.test.tsx` on the working branch returned 404 (file absent). Baseline coverage recorded `TodoReducer.ts` at 2.17% statements.
- **Cause/event/consequence:** Reducer action behavior can regress without focused unit tests; defects in add, toggle, delete, update, edit-state, or load behavior may be detected late or only by E2E tests.
- **What is proven:** the direct reducer test file is absent and baseline reducer coverage was very low.
- **What is not proven:** a specific reducer defect is currently present.
- **Verification needed:** direct unit tests for all six reducer actions, including immutability and ensuring a toggle affects only the targeted task.

### RR-03 — Orphaned AppHeader component

- **Category:** Maintainability
- **Classification:** Confirmed
- **Affected component:** `src/components/AppHeader.tsx`
- **Evidence:** The component exists and defines Home/About navigation links. The initial repository inspection's source import search found no import/use outside its own file. The active root composition is in `src/App.tsx`; route navigation is currently handled elsewhere.
- **Cause/event/consequence:** Unreferenced component code remains in the repository and may mislead future maintainers or AI agents about the active navigation structure.
- **What is proven:** the component was identified as unreferenced by the source import search.
- **What is not proven:** whether the component is intentionally retained for future work.
- **Verification needed:** repeat a repository-wide reference search before any decision to remove it. Removal is not proposed as a Task 07 mitigation.

### RR-04 — Legacy Jest-related dependency/configuration alongside Vitest and flat ESLint

- **Category:** Dependency / configuration hygiene
- **Classification:** Plausible/unverified
- **Affected component:** `package.json`, `eslint.config.js`, test tooling
- **Evidence:** `package.json` includes `@types/jest` and a legacy `eslintConfig` block extending `react-app` / `react-app/jest`. The actual tests use Vitest, and the repository has a root `eslint.config.js` flat configuration. No Jest test runner is listed in the inspected scripts.
- **Cause/event/consequence:** Stale configuration and typings may confuse contributors or agents about the active test/lint setup.
- **What is proven:** the entries exist and the active project setup uses Vitest and ESLint flat config.
- **What is not proven:** that these entries cause a type error, lint failure, runtime defect, or security issue. Baseline lint and build both passed.
- **Verification needed:** inspect type-resolution behavior and confirm whether any source file relies on Jest globals before proposing dependency/config removal. No dependency change is authorized by this review.

### RR-05 — CI does not run on ordinary pushes to the assignment working branch

- **Category:** Agent operations / release governance
- **Classification:** Confirmed configuration condition
- **Affected component:** `.github/workflows/lint.yml`, `.github/workflows/tests.yml`
- **Evidence:** Both workflows declare push and pull-request triggers targeting `main`. A push to `assignment05-work` alone does not match the configured push branch filter. A pull request targeting `main` is the existing path for CI validation.
- **Cause/event/consequence:** An agent or developer may push commits to the working branch without receiving automated lint/test feedback unless the changes are also submitted in a PR to `main`.
- **What is proven:** the workflow branch filters.
- **What is not proven:** that CI is disabled or that the configured PR workflow itself is broken.
- **Verification needed:** observe actual workflow runs for the draft PR; until runs are visible, post-change CI remains unverified.

### RR-06 — README does not describe the full available verification workflow

- **Category:** Agent readiness / documentation
- **Classification:** Confirmed documentation gap
- **Affected component:** `README.md`, project setup and QA workflow
- **Evidence:** README setup tells contributors to use `npm install`; its Testing section describes Cypress but does not document the existing Vitest, lint, or full build/type-check commands. `package.json` exposes `npm run test`, `npm run lint`, and `npm run build`, and the repository has a lockfile.
- **Cause/event/consequence:** New contributors or coding agents may miss the faster unit tests and quality gates or use a less reproducible install command than `npm ci`.
- **What is proven:** these commands are absent from the README testing/setup instructions.
- **What is not proven:** that a contributor has actually installed incompatible packages or skipped tests because of this omission.
- **Verification needed:** documentation review and confirmation that the documented commands match package scripts.

## Summary

Six candidate findings were investigated across four categories: correctness, maintainability, dependency/configuration, and agent operations/readiness. Five are confirmed conditions or code/documentation gaps; RR-04 is classified plausible/unverified because no concrete tooling failure has been demonstrated. No unsupported AI claim is promoted to a confirmed risk.

The two highest-priority corrective candidates are RR-01 (runtime validation of persisted todo data) and RR-02 (direct reducer tests). See `docs/RISK_REGISTER.md` for scoring, owners, mitigations and residual risks.

## AI evidence record

| Assistant | Prompt/context | Output used | Human/independent verification |
|---|---|---|---|
| Bolt.new | Read-only inspection of repository structure, scripts, tests, and potential weaknesses | Initial candidate findings including missing reducer coverage, unvalidated storage data, AppHeader usage and stale tooling entries | Source and repository files were checked independently; hypotheses remain labelled unverified |
| ChatGPT (GPT-6) | Read-only review of specific source/config files on `assignment05-work`; classify findings and distinguish observed facts from consequences | Six structured findings across four categories | GitHub file contents, branch workflows, package scripts, and prior baseline command output were inspected; no tests were claimed as run in this review |
