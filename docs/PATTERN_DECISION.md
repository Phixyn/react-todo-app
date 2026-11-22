# Task 03 — Focused Design/Refactoring Decision

Decision date: 2026-11-22
Repository branch: `assignment05-work`

## 1. Decision

**Choose Option B: extract persistence operations into a small utility module.**

This is a focused separation-of-concerns refactoring, not a formal Adapter design-pattern implementation. The project does not need an interface/class pair or dependency-injection mechanism for its current single browser storage implementation.

The assignment asks us to evaluate a small pattern and justify whether one is warranted. The Adapter option was evaluated and rejected as disproportionate. The selected utility extraction solves the demonstrated maintainability issue with less complexity.

## 2. Confirmed maintainability problem

Before the change, `src/context/TodoProvider.tsx` combined:
- React reducer initialization and action dispatch.
- Load/save effect orchestration.
- The `"todos"` storage key.
- Direct `localStorage.getItem` / `setItem` calls.
- JSON parsing/stringifying and storage error handling.
- A mount guard used to coordinate initial load and subsequent saves.

The reducer in `src/context/TodoReducer.ts` is already pure and does not access storage. The issue is therefore concentrated in the provider's persistence responsibilities, not in the reducer.

This concern is supported by the baseline report: there were no direct storage-helper tests and the provider's save-effect path was not covered. The baseline unit suite passed 27 tests, but statement coverage was 50.86%.

## 3. Alternatives evaluated

| Option | Benefits | Costs | Decision |
|---|---|---|---|
| A — Adapter pattern | Interface can decouple provider from a concrete storage implementation and support injected alternatives | Adds abstraction and wiring for one small browser-only persistence mechanism; dependency injection is not otherwise used | Rejected as over-engineering for current scope |
| B — Utility extraction | Separates persistence details, permits direct unit tests, follows the existing focused-module style used by TodoReducer | Provider still orchestrates when load/save occur | **Selected** |
| C — No refactoring | No additional files or abstraction | Leaves storage logic embedded in React effects and difficult to test independently | Rejected because the testability concern is concrete |

## 4. Before/after structure

### Before

```text
TodoProvider
  ├── useReducer + action dispatch
  ├── load effect
  │    ├── localStorage.getItem("todos")
  │    └── JSON.parse + warning handling
  └── save effect + mount guard
       ├── JSON.stringify
       └── localStorage.setItem("todos")
TodoReducer (pure; unchanged)
TodoContext (types/context; unchanged)
```

### After

```text
TodoProvider
  ├── useReducer + action dispatch
  ├── load effect ───────────────┐
  └── save effect + mount guard ─┤
                                v
                         todoStorage.ts
                           ├── STORAGE_KEY
                           ├── loadTodos()
                           └── saveTodos()
                                |
                                v
                         browser localStorage

TodoReducer (pure; unchanged)
TodoContext (types/context; unchanged)
todoStorage.test.ts (direct storage-helper tests)
```

The provider still controls lifecycle timing. The utility owns the storage key, serialization and storage error handling.

## 5. Implementation record

| File | Change |
|---|---|
| `src/context/todoStorage.ts` | Added `loadTodos()` and `saveTodos()`; retained the existing key and JSON representation; catches read/parse/write errors and logs the same warning messages |
| `src/context/TodoProvider.tsx` | Replaced direct storage operations with helper calls; kept reducer actions, effect dependencies and the `hasMounted` guard |
| `src/context/todoStorage.test.ts` | Added six unit tests for empty storage, valid JSON, malformed JSON, read failure, save serialization and write failure |

No components, routes, reducer actions, context interfaces, package manifests, dependencies or CI workflows were changed for this refactoring.

## 6. Acceptance-criteria preservation

- **AC1 — Create:** AddTodo validation and the ADD_TODO dispatch path were not changed.
- **AC2 — Toggle:** TodoItem and TOGGLE_TODO_COMPLETE dispatch/reducer behavior were not changed.
- **AC3 — Edit:** TodoItem validation, keyboard handling, cancellation and UPDATE_TODO dispatch were not changed.
- **AC4 — Delete/counts:** DELETE_TODO and the footer calculation/rendering were not changed.
- **AC5 — Persistence:** The key remains `"todos"`; data remains JSON; load still occurs on mount; save still occurs on todoItems changes after the existing mount guard; read/write errors remain caught.

This is a source-level scope comparison, **not a claim that all five criteria have passed post-change tests**. Post-change commands and CI results must be recorded after they are actually executed.

## 7. Targeted tests added

The new `src/context/todoStorage.test.ts` contains six tests:
1. Missing storage key returns null.
2. Valid saved JSON is parsed and returned.
3. Malformed JSON returns null and emits the load warning.
4. A throwing localStorage read returns null and emits the load warning.
5. Todo items are serialized under the existing `"todos"` key.
6. A throwing localStorage write is caught and emits the save warning.

These tests were added but have **not yet been executed** in the connected GitHub editing workflow. The baseline results (27/27) are pre-change results and must not be represented as post-change verification.

## 8. Known limitations and separate risks

- Runtime validation of parsed todo object shapes is not included in this refactoring. TypeScript's `as TodoItemType[]` assertion does not validate JSON at runtime. This remains a candidate correctness/security risk for Task 04/07.
- The existing `hasMounted` effect-ordering approach was intentionally retained to limit behavioral change.
- The local environment previously could not launch Cypress because Xvfb was missing. CI verification is still required.
- The existing assignment branch also contains changes from earlier Bolt work outside this refactoring: `.bolt/memory.md` was added and `index.html` received three metadata lines. These are recorded as branch-scope observations, not attributed to Task 03.

## 9. Verification status

| Check | Post-change status |
|---|---|
| Source diff reviewed | Yes |
| Six storage tests authored | Yes |
| `npm run lint` | Not yet executed after refactoring |
| `npm run test` | Not yet executed after refactoring |
| `npm run build` | Not yet executed after refactoring |
| Cypress E2E | Not yet executed; prior local Xvfb limitation remains |

**Task 03 decision conclusion:** The focused utility extraction is justified and proportionate. It is intentionally described as a separation-of-concerns refactoring, not as an Adapter pattern.
