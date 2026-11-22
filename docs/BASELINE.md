# Baseline Documentation

Inspection date: 2026-11-22

This document records the **actual results** of the initial technical
baseline established for Assignment 05. All results were produced by
executing the listed commands in the project environment. No results
were invented.

---

## Environment

| Tool | Version |
|------|---------|
| Node.js | v22.23.1 |
| npm | 10.9.8 |

---

## Executed checks

### 1. `npm run lint`

| Field | Value |
|-------|-------|
| Command | `npm run lint` |
| Executed | Yes |
| Exit code | 0 |
| Result | **PASS** |
| Output | `eslint . --ext .js,.jsx,.ts,.tsx` — no errors, no warnings printed. |

---

### 2. `npm run test`

| Field | Value |
|-------|-------|
| Command | `npm run test` |
| Executed | Yes |
| Exit code | 0 |
| Result | **PASS** |
| Test runner | Vitest v3.2.4 with v8 coverage |
| Test files | 4 passed (4) |
| Tests | **27 passed / 0 failed** |
| Duration | ~3.65s |
| Statement coverage | **50.86%** |
| Branch coverage | 79.36% |
| Function coverage | 48.48% |
| Line coverage | 50.86% |

Test files and counts:
- `src/context/ThemeContext.test.tsx` — 16 tests
- `src/components/ThemeSwitcher.test.tsx` — 5 tests
- `src/components/AddTodo.test.tsx` — 5 tests
- `src/App.test.tsx` — 1 test

Notable coverage gaps (statement coverage):
- `src/context/TodoReducer.ts` — 2.17%
- `src/components/TodoItem.tsx` — 2.92%
- `src/components/AppHeader.tsx` — 0% (dead code, not imported)
- `src/pages/About.tsx` — 6.66%
- `src/main.tsx` — 0%

---

### 3. `npm run build`

| Field | Value |
|-------|-------|
| Command | `npm run build` |
| Executed | Yes |
| Exit code | 0 |
| Result | **PASS** |
| Build command | `tsc -b && vite build` |
| TypeScript verification | Passed (`tsc -b`, no type errors) |
| Vite production build | Succeeded |
| Modules transformed | 81 |
| Build duration | ~1.40s |
| Output directory | `dist/` |

Build artifacts:
- `dist/index.html` — 0.48 kB (gzip: 0.31 kB)
- `dist/assets/index-Oy_ANFgL.js` — 248.39 kB (gzip: 80.05 kB)
- `dist/assets/index-DQHa-YCv.css` — 24.29 kB (gzip: 5.61 kB)
- `dist/assets/header-day-CxTHJbGr.jpg` — 120.80 kB
- `dist/assets/header-afternoon-D6PPAPaN.jpg` — 103.55 kB
- `dist/assets/header-night-DbpUazMj.jpg` — 69.39 kB

---

## Checks that could NOT be executed

### 4. `npx cypress verify`

| Field | Value |
|-------|-------|
| Command | `npx cypress verify` |
| Executed | Yes (the command ran, but it failed) |
| Exit code | 1 |
| Result | **FAIL** |
| Cause | Missing `Xvfb` system dependency |
| Error message | `Your system is missing the dependency: Xvfb` / `Error: spawn Xvfb ENOENT` |
| Platform | linux-x64 (Debian 12.14) |
| Cypress version | 14.5.4 |
| Impact | Cypress E2E tests **could not be executed** in this environment. |

The E2E suite (7 spec files under `cypress/e2e/`) is only verifiable in
an environment with Xvfb installed (e.g. CI on `ubuntu-latest`, which
provides the required dependencies). This is a verification gap for
the local baseline.

---

### 5. `npm run cypress:run` and `npm run cypress:open`

| Field | Value |
|-------|-------|
| Executed | No |
| Reason | Blocked by the missing Xvfb dependency (see above). `cypress:open` additionally requires an interactive display, which is unavailable. |

---

### 6. `npm run preview`

| Field | Value |
|-------|-------|
| Executed | No |
| Reason | Not part of the requested baseline checks; requires serving the built bundle, which is non-essential to the baseline. |

---

## Git state

| Field | Value |
|-------|-------|
| Git branch | **Not accessible** |
| Git commit SHA | **Not accessible** |
| Working-tree status | **Not accessible** |

This Bolt workspace is **not a git repository** and git commands are
blocked by the environment. The intended working branch
(`assignment05-work`) and any commit SHA still require confirmation
through GitHub once the repository is available outside this
environment.

### Follow-up GitHub verification (2026-11-22)

After the GitHub repository connection became available, the branch
references were checked directly:

| Field | Verified value |
|-------|----------------|
| Repository | `dauletRy/react-todo-app` |
| Preserved baseline branch | `baseline-assignment05` |
| Baseline branch commit at comparison | `1c80da0d01b779b1f2aff4be42ee77dfc72ec0f0` |
| Working branch | `assignment05-work` |
| Working branch commit at comparison | `ca9b4839f263178318189e0a0fa52c4030fc1055` |
| Comparison | Working branch ahead by 9 commits, 0 commits behind |

The initial Bolt inspection's statement that Git was unavailable remains
accurate for that environment at that time. The later GitHub connection
resolved the repository branch/commit visibility limitation. The GitHub
comparison does not establish the local workspace's uncommitted working-tree
status.

The comparison also showed two earlier Bolt-generated branch differences
outside the assignment code changes: `.bolt/memory.md` was added and
`index.html` received three Open Graph/Twitter metadata lines. They are
not part of the Task 03 persistence refactoring and are retained as
observed branch-scope differences; they should not be misattributed to
the refactoring.

---

## Summary table

| # | Check | Executed | Exit code | Result |
|---|-------|----------|-----------|--------|
| 1 | `node --version` | Yes | 0 | v22.23.1 |
| 2 | `npm --version` | Yes | 0 | 10.9.8 |
| 3 | `npm run lint` | Yes | 0 | PASS — no errors or warnings |
| 4 | `npm run test` | Yes | 0 | PASS — 27/27 tests, 50.86% statement coverage |
| 5 | `npm run build` | Yes | 0 | PASS — tsc type-check + Vite build, 81 modules |
| 6 | `npx cypress verify` | Yes (ran) | 1 | FAIL — missing Xvfb; E2E not runnable locally |
| 7 | `npm run cypress:run` | No | — | Not executed (blocked by missing Xvfb) |
| 8 | `npm run preview` | No | — | Not executed (not requested for baseline) |
| 9 | Git branch / commit / status | No | — | Not accessible (not a git repository) |

---

## Conclusion

The project's toolchain is healthy at baseline: lint, unit/integration
tests, and the production build all pass with exit code 0. The only
unverifiable area is the Cypress E2E suite, which requires Xvfb and
is therefore a local verification gap (CI is expected to cover it).
Git state could not be confirmed in this environment and must be
verified through GitHub.

### Final branch snapshot for Assignment 05 (2026-11-22)

A later comparison after the Assignment 05 work confirmed:

| Field | Value |
|-------|-------|
| Baseline ref | `baseline-assignment05` |
| Baseline SHA | `1c80da0d01b779b1f2aff4be42ee77dfc72ec0f0` |
| Working ref | `assignment05-work` |
| Working HEAD at snapshot | `cb517179a775226dd5650c1bd282c3127cedfd5b` |
| Comparison | 28 commits ahead; 0 behind |
| Draft review PR | [#1](https://github.com/dauletRy/react-todo-app/pull/1), base `main`, not merged |

The latest commit's GitHub combined-status and PR-workflow-run queries returned no status entries or runs. This means post-change CI was not confirmed; it does **not** mean the checks passed. See `docs/MITIGATION_VERIFICATION.md` and `docs/RELEASE_DECISION.md`.
