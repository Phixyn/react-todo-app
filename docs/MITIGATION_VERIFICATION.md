# Task 07 — Mitigation and Verification Record

Date: 2026-11-22  
Branch: `assignment05-work`

## Mitigation 1 — Validate persisted todo records (R-01)

**Files changed**
- `src/context/todoStorage.ts`
- `src/context/todoStorage.test.ts`

**Implementation**
- Added an `isTodoItem` runtime type guard.
- Requires a non-empty string `id`, a non-blank string `title`, and a boolean `completed`.
- `loadTodos()` rejects non-array JSON and arrays containing invalid items, warns, and returns `null`.
- The existing `"todos"` key, valid JSON representation, load/save error handling and provider mount-guard timing remain in place.

**Tests added and executed**
- Missing key, valid JSON, malformed JSON, non-array data, invalid object shape, blank title/wrong field types, storage read failure, JSON save and storage write failure.
- All **9 todo-storage tests passed** as part of the full Vitest run.

## Mitigation 2 — Add direct reducer tests (R-02)

**File created**
- `src/context/TodoReducer.test.ts`

Six action tests cover ADD_TODO (including immutability), TOGGLE_TODO_COMPLETE (target isolation), DELETE_TODO, UPDATE_TODO, SET_EDITING_ID and LOAD_TODOS.

All **6 reducer tests passed** as part of the full Vitest run. The reducer implementation itself was not changed.

## Post-mitigation verification — local Windows environment

Commands were run from the repository root on branch `assignment05-work`. PowerShell blocks the `npm.ps1` shim under the current execution policy, so the equivalent Windows command shim `npm.cmd` was used; no execution-policy change was made.

Environment: Node.js v24.13.1; npm 11.8.0; Vitest 3.2.4; Vite 7.3.2; Cypress 14.5.4; Electron 130.

| Command | Result |
|---|---|
| `npm.cmd run lint` | **PASS** — ESLint completed without diagnostics. |
| `npm.cmd run test` | **PASS** — 6 files, 42 tests passed, 0 failed. |
| `npm.cmd run build` | **PASS** — `tsc -b` and Vite production build passed; 82 modules transformed. |
| `npm.cmd run cypress:run` | **PASS** — 7 specs, 47 tests passed, 0 failed, pending or skipped. |
| `git status --short --branch` | **CLEAN** — `## assignment05-work...origin/assignment05-work`. |

Vitest coverage: statements 60.05%, branches 84.94%, functions 55.55%, lines 60.05%. The warning logged by the invalid-data test is expected: that test deliberately verifies rejection of invalid localStorage content.

Cypress ran headlessly in Electron 130 on the local Windows machine. The repository workflow is configured for Chrome on `ubuntu-latest`; local Electron success is not evidence that the GitHub Actions Chrome job passed.

## Dependency audit and remaining risk

`npm.cmd ci` installed dependencies successfully (529 packages added; 530 audited), but reported 34 vulnerabilities overall: 2 low, 14 moderate, 15 high and 3 critical.

A separate `npm.cmd audit --omit=dev` reported 8 findings in its resulting dependency tree: 1 low, 1 moderate and 6 high. Named packages include esbuild, nanoid, postcss, react-router/react-router-dom, source-map-js, uuid and vite. npm reported fixes available via `npm audit fix`.

No audit fix, forced fix, dependency upgrade, package manifest change or lockfile change was performed. These dependency findings require review and remediation or explicit risk acceptance by the repository owner.

## GitHub Actions status

Draft PR #1 remains open. The GitHub workflow-run query for the PR head returned an empty list. This is **no CI evidence**, not a pass or failure. The configured GitHub Actions checks, especially Chrome E2E, remain unconfirmed.

## Residual limitations

- Invalid persisted data is rejected as a whole rather than partially recovered; the malformed stored value is not automatically removed.
- Unit and E2E tests cover specified paths but do not prove absence of all defects.
- Local Cypress used Electron rather than the Chrome CI target.
- Dependency audit findings and missing CI evidence remain release blockers.

**Status:** Both code mitigations are implemented and their local tests pass. The local lint, unit, build and E2E gates pass. Overall release approval remains blocked by dependency findings, missing confirmed CI results and required human review of the full PR diff.
