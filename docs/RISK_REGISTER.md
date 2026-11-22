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
| R-06 | Agent readiness / documentation — confirmed gap | README omits unit test/lint/type-check instructions and recommends `npm install` → coding agent or contributor misses quality gates or does not use lockfile-based install | `README.md` Testing/Getting Started sections vs scripts in `package.json` | 2 | 2 | **4** | Update README to document `npm ci`, `npm run lint`, `npm run test`, `npm run build`, and Cypress environment constraints | Student / repository maintainer | Compare each documented command with `package.json`; run documented checks in supported environment | README can become stale again as scripts evolve; AGENTS.md provides a more detailed internal workflow. |

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
