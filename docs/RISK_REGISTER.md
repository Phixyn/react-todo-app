# Task 05 — Software Risk Register

Review date: 2026-11-22
Repository: `dauletRy/react-todo-app`
Working branch: `assignment05-work`

## Scoring scale

**Likelihood**
- 1 — Unlikely: requires an unusual condition.
- 2 — Possible: a realistic condition, but not expected on every run.
- 3 — Likely: expected to occur repeatedly under normal use.

**Impact**
- 1 — Minor: limited maintenance or documentation friction.
- 2 — Moderate: feature regression or meaningful delay in diagnosis/review.
- 3 — Major: core application behavior can become unavailable or user data can be mishandled.

**Risk score = Likelihood × Impact** (range 1–9).

Scores are reasoned estimates, not measured probabilities.

## Register

| ID | Category / status | Cause → event → consequence | Affected component / evidence | L | I | Score | Mitigation | Owner | Verification plan | Residual risk |
|---|---|---|---|---:|---:|---:|---|---|---|---|
| R-01 | Correctness — confirmed code gap; impact not reproduced | Stored JSON has an unexpected shape → provider dispatches it as todo array → list rendering may fail or render invalid records | `todoStorage.ts` parses/casts without runtime validation; `TodosList.tsx` uses `.map` and `.filter` | 2 | 3 | **6** | Task 07: validate that loaded data is an array of todo objects with string `id`, string `title`, and boolean `completed`; reject invalid payload and preserve safe empty state | Student / repository maintainer | Unit tests for non-array JSON, missing fields and wrong field types; run full Vitest, lint and build; add provider-level check if feasible | Invalid data may still be present in a user's browser; rejection can discard that malformed saved value from active state. Valid records should continue to load. |
| R-02 | Correctness / testability — confirmed | Reducer action behavior lacks direct unit tests → a future change regresses an action or immutability → defect is detected late or only by broad E2E | `TodoReducer.ts`; no `TodoReducer.test.ts(x)` exists; baseline reducer coverage 2.17% | 2 | 2 | **4** | Task 07: add direct tests for add, toggle, delete, update, set-editing-id and load actions, including immutability and target isolation | Student / repository maintainer | Run the new reducer test file and full Vitest suite; inspect assertions against each reducer branch | Tests prove specified cases only; untested edge cases and UI integration gaps remain. |
| R-03 | Maintainability — confirmed | Unreferenced component remains → future contributor assumes it is active → unnecessary investigation or inconsistent UI edits | `src/components/AppHeader.tsx`; earlier repository-wide import search found no use outside its own file | 1 | 1 | **1** | Keep it documented as unused; remove only after confirming no planned use and obtaining review | Student / repository maintainer | Repeat full source reference search before any removal | Low impact while it remains untouched; future intent is unknown. |
| R-04 | Dependency/configuration — plausible/unverified | Legacy Jest typings/config coexist with Vitest/flat ESLint → contributor follows stale setup → confusion or unnecessary tooling changes | `package.json` has `@types/jest` and legacy `eslintConfig`; tests use Vitest; `eslint.config.js` is present | 1 | 2 | **2** | Do not remove dependencies based on appearance alone; inspect actual type/config resolution and get approval before changing manifests | Student / repository maintainer | Check source for Jest globals and verify lint/type/build after any separately approved cleanup | No concrete failure has been shown; current baseline lint/build passed. |
| R-05 | Agent operations / release governance — confirmed configuration condition | Changes are pushed only to working branch → workflow branch filter does not match → no automatic CI feedback until PR targets `main` | `.github/workflows/lint.yml` and `tests.yml` filter push/PR to `main` | 2 | 2 | **4** | Keep an open PR targeting `main` as the validation gate; do not merge until required checks have completed and a human has reviewed them | Student / repository maintainer | Verify PR check runs and job results; confirm lint and tests jobs and inspect Cypress result | Branch-only pushes remain unchecked; PR checks may still be unavailable or fail. |
| R-06 | Agent readiness / documentation — mitigation implemented | The previous README omitted unit test/lint/type-check instructions and recommended `npm install` → the updated README now documents `npm ci`, lint, Vitest, build/type-check, and Cypress environment constraints | `README.md` and scripts in `package.json` | 1 | 2 | **2** | README setup/quality-check sections updated in commit `aa7e01480bcfd7fca529b048aa9584e2bcc419fd` | Student / repository maintainer | Compare documented commands with `package.json`; final human review | Documentation can become stale as scripts evolve; no runtime verification is implied by this documentation change. |

## Priority ranking for corrective action

1. **R-01 — Score 6:** Highest impact because malformed persisted data can reach the component tree without runtime validation. This is the first Task 07 mitigation.
2. **R-02 — Score 4:** Direct reducer coverage is missing for the application's core state transitions. This is the second Task 07 mitigation.

R-05 and R-06 also score 4, but the existing PR-to-main workflow provides a process control for R-05 and R-06 is a documentation issue rather than a direct runtime correctness defect. They remain tracked and should not be described as resolved.

## Risk review limitations

- The likelihood and impact values are qualitative estimates.
- R-01's missing validation is confirmed, but a user-visible crash from a malformed payload has not been reproduced yet.
- R-04 is intentionally marked plausible/unverified; no current lint or build failure is attributed to the stale entries.
- The initial baseline results are pre-refactoring. Post-refactoring checks must be separately executed and recorded.
- No risk is marked resolved merely because a mitigation has been proposed.

## Task 07 — Mitigation status and residual scores

| ID | Initial score | Mitigation implementation | Verification status | Residual score now | Reason |
|---|---:|---|---|---:|---|
| R-01 | 6 | Runtime data-shape validation added to `todoStorage.ts`; invalid payloads are rejected; negative/invalid cases added to storage tests | All 9 storage tests passed within the full 42-test Vitest run | **2 (reduced after successful local verification)** | Runtime validation is covered by passing invalid-shape tests and the full unit suite. Residual risk remains because invalid data is rejected as a whole rather than partially recovered, and malformed stored data is not automatically removed. |
| R-02 | 4 | Six direct reducer action tests added in `TodoReducer.test.ts` | All 6 reducer tests passed within the full 42-test Vitest run | **2 (reduced after successful local verification)** | The six reducer action tests executed and passed; broader edge cases and UI integration gaps remain. |
| R-03 | 1 | No code change | Unchanged | **1** | Low-priority dead-code concern; intent remains unknown. |
| R-04 | 2 | No dependency/config change | Unchanged | **2** | Plausible concern only; no concrete failure demonstrated and no manifest change authorized. |
| R-05 | 4 | Draft PR #1 opened to `main` as the intended CI/review gate | Local checks pass; GitHub workflow-run query for PR head returned no runs | **4** | PR exists and local checks pass, but CI is still unconfirmed. Empty workflow data is not a passing result. |
| R-06 | 4 | README setup and quality-check instructions updated | Documentation reviewed against `package.json` scripts | **2** | The immediate onboarding gap is reduced; future documentation drift remains possible. |

Scores are intentionally unchanged until post-change checks can be executed and inspected. The principal trade-off for R-01 is that the entire stored todo array is rejected when any element is invalid; valid records are not partially recovered and malformed storage is not automatically deleted.

**Next verification gate:** execute `npm run lint`, `npm run test`, and `npm run build` on `assignment05-work`; run Cypress in an environment with Xvfb; then update residual scores using actual evidence.


## Additional risk identified during post-change verification

| ID | Category / status | Cause → event → consequence | Evidence | L | I | Score | Mitigation | Owner | Verification plan | Residual risk |
|---|---|---|---|---:|---:|---:|---|---|---|---|
| R-07 | Dependency / security — confirmed audit findings | Vulnerable direct or transitive package versions remain in the dependency tree → a vulnerable code path is reachable in the app or development environment → security exposure or denial of service may occur | `npm.cmd ci` reported 34 vulnerabilities (2 low, 14 moderate, 15 high, 3 critical); `npm.cmd audit --omit=dev` reported 8 findings (1 low, 1 moderate, 6 high) naming esbuild, nanoid, postcss, react-router/react-router-dom, source-map-js, uuid and vite | 2 | 3 | **6** | Do not apply blind or forced upgrades. Review direct/transitive paths, assess whether affected functionality is reachable, plan compatible updates, rerun all checks, or document explicit risk acceptance | Student / repository maintainer | Inspect full `npm audit` JSON and dependency paths; update reviewed packages/lockfile only with approval; rerun install, lint, unit, build and E2E checks | Findings remain unresolved; severity and reachability must be assessed. Release remains NO-GO until remediated or explicitly accepted. |

## Post-change verification update

Local Windows verification on Node.js v24.13.1 / npm 11.8.0:
- `npm.cmd run lint`: PASS.
- `npm.cmd run test`: 42/42 passed across 6 files.
- `npm.cmd run build`: PASS; TypeScript and Vite build succeeded.
- `npm.cmd run cypress:run`: 47/47 passed across 7 specs in headless Electron 130.
- `git status --short --branch`: clean and tracking `origin/assignment05-work`.

The local Cypress result does not replace the configured GitHub Actions Chrome run. The workflow-run query for the current draft PR head returned no runs. Keep R-05 open and do not infer CI success.

R-01 and R-02 implementation risks are reduced based on executed tests, but not eliminated. R-07 is a new release-blocking dependency risk. See `docs/POST_CHANGE_VERIFICATION.md` and `docs/RELEASE_DECISION.md` for the complete evidence and decision.
