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
- `loadTodos()` now rejects non-array JSON and arrays containing any invalid item. It logs an invalid-data warning and returns `null`, so the provider does not dispatch invalid records.
- The existing `"todos"` key, JSON representation for valid records, load/save error handling, and provider mount-guard timing remain in place.

**Tests added**
- Non-array JSON is rejected.
- An array containing an object missing `completed` is rejected.
- Blank titles and incorrectly typed fields are rejected.
- Existing tests cover missing key, valid records, malformed JSON, read errors, JSON saving, and write errors.

**Residual limitation**
- Invalid persisted data is rejected as a whole rather than partially recovering valid records. The original malformed storage value is not explicitly removed.
- A runtime test execution is still required to verify the implementation.

## Mitigation 2 — Add direct reducer tests (R-02)

**File created**
- `src/context/TodoReducer.test.ts`

**Tests added**
1. ADD_TODO prepends a new task without mutating prior state.
2. TOGGLE_TODO_COMPLETE changes only the targeted task.
3. DELETE_TODO removes only the targeted task.
4. UPDATE_TODO changes only the targeted title.
5. SET_EDITING_ID updates the editing identifier.
6. LOAD_TODOS replaces the todo list.

The reducer implementation itself was not changed.

## Verification status

| Check | Post-mitigation execution status | Result |
|---|---|---|
| `npm run lint` | Not executed in this workflow | No result claimed |
| `npm run test` | Not executed in this workflow | No result claimed |
| `npm run build` | Not executed in this workflow | No result claimed |
| Cypress E2E | Not executed after changes | No result claimed; baseline environment lacked Xvfb |
| GitHub Actions | Draft PR #1 exists; queried status/check endpoints returned no statuses or workflow runs at the time of review | CI result unavailable; do not interpret an empty status list as a pass |

The connected GitHub workflow in this session supports repository file operations and inspection but did not provide a command terminal. An attempt to clone the public repository for local command execution failed because this environment could not resolve `github.com`. No test or build result has been fabricated.

The baseline is still the pre-change result: lint PASS, 27/27 Vitest tests PASS, build PASS, and Cypress verification blocked by missing Xvfb. These are not post-change results.

## Change evidence

Relevant commits on `assignment05-work`:
- `1d8f4d59a96c5942a53a894b2e25fa158b1ccf63` — runtime validation in storage helper.
- `f417dbb204663ab068a79852f43b1b7fb40efc11` — tests for malformed and invalid-shape storage.
- `1084af73a993405461772ce9f46258f11e581a07` — direct tests for six reducer actions.
- `f15f21f81b2370b43d4715bd1366004f19af7b58` — test mock callback lint-safety cleanup.

## Acceptance criteria impact

- AC1–AC4 implementation files were not changed by these mitigations.
- AC5 now has runtime validation for the persisted item shape. Empty/missing data, malformed JSON, invalid shapes and storage access errors result in no invalid payload being dispatched.
- The six storage tests and six reducer tests (plus the pre-existing storage helper checks) are authored but still require actual execution.

**Status:** Mitigations implemented in the working branch; verification pending. Do not mark R-01 or R-02 fully closed until the relevant test/build checks have passed.
