# Acceptance Criteria

These acceptance criteria describe **existing behavior** that must
remain true after any improvements made for Assignment 05. They are
regression guards, not new features.

> **Note:** No criterion is marked as "verified by test execution"
> unless the relevant test was actually run in this environment.
> See `docs/BASELINE.md` for which checks were executed.

---

## AC1 — Create a task with a valid non-empty title

- **ID:** AC1
- **Description:** A user can create a task by entering a valid,
  non-empty title. Leading and trailing whitespace is trimmed before
  the task is stored, and whitespace-only or empty submissions are
  rejected with an inline error.
- **Expected result:**
  - A task with a trimmed non-empty title is added to the list.
  - Submitting an empty or whitespace-only input shows the inline
    error "Please add a task description." and does **not** add a
    task.
  - Titles longer than 500 characters are rejected with "Task must
    be 500 characters or fewer."
- **How it can be verified:**
  - Unit: `src/components/AddTodo.test.tsx` (empty input, character
    limit).
  - E2E: `cypress/e2e/AddTodo.cy.ts` (adding tasks, whitespace
    rejection, character limit, character counter).
  - Manual: type a title, submit, confirm the task appears; type
    only spaces, submit, confirm the error and no new task.
- **Relevant source files:**
  - `src/components/AddTodo.tsx`
  - `src/context/TodoProvider.tsx`
  - `src/context/TodoReducer.ts`

---

## AC2 — Toggle task completion without affecting other tasks

- **ID:** AC2
- **Description:** A user can mark a task as completed and reverse
  that status. Toggling one task does not change the completed state
  of any other task.
- **Expected result:**
  - Clicking a task's checkbox flips its `completed` state.
  - Only the targeted task's checkbox and visual style change; all
    other tasks remain unchanged.
  - The footer counts (total / complete / open) update to reflect
    the new state.
- **How it can be verified:**
  - E2E: `cypress/e2e/TodoItem.cy.ts` ("can be marked as complete"),
    `cypress/e2e/TodosFooter.cy.ts` (complete/open count updates).
  - Manual: add multiple tasks, toggle one, confirm only that task
    changes and counts update.
- **Relevant source files:**
  - `src/components/TodoItem.tsx`
  - `src/context/TodoProvider.tsx`
  - `src/context/TodoReducer.ts`
  - `src/components/TodosFooter.tsx`

---

## AC3 — Edit a task with validation and cancellation

- **ID:** AC3
- **Description:** A user can edit an existing task. Invalid titles
  (empty, whitespace-only, or over 500 characters) are rejected with
  an inline error. Cancelling edit mode preserves the original title
  unchanged.
- **Expected result:**
  - Entering edit mode focuses and selects the current title.
  - Saving with an empty or whitespace-only value shows "Please add a
    task description." and does not change the stored title.
  - Saving with a title over 500 characters shows "Task must be 500
    characters or fewer." and does not change the stored title.
  - Only one task can be edited at a time.
  - Pressing Escape or clicking Cancel restores the original title
    and exits edit mode.
  - Pressing Enter saves the trimmed valid title.
- **How it can be verified:**
  - E2E: `cypress/e2e/TodoItem.cy.ts` (edit flow, empty/whitespace/
    over-limit rejection, cancel preserves original, edit after
    theme switch).
  - Manual: edit a task, clear the input, save (expect error), then
    cancel and confirm the original title is intact.
- **Relevant source files:**
  - `src/components/TodoItem.tsx`
  - `src/context/TodoProvider.tsx`
  - `src/context/TodoReducer.ts`

---

## AC4 — Delete a task and update counts

- **ID:** AC4
- **Description:** A user can delete a selected task. After deletion,
  the task no longer appears in the list and the footer counts
  update correctly.
- **Expected result:**
  - Clicking the delete button removes the task from the list.
  - The total count decreases by one.
  - If the deleted task was complete, the complete count decreases
    by one; otherwise the open count decreases by one.
  - If the list becomes empty, the "You're all caught up!" message
    appears.
- **How it can be verified:**
  - E2E: `cypress/e2e/TodoItem.cy.ts` ("can be deleted"),
    `cypress/e2e/TodosFooter.cy.ts` (total count decreases after
    delete), `cypress/e2e/TodosList.cy.ts` (empty state).
  - Manual: add tasks, delete one, confirm it is gone and counts
    update; delete all, confirm the empty message.
- **Relevant source files:**
  - `src/components/TodoItem.tsx`
  - `src/components/TodosList.tsx`
  - `src/components/TodosFooter.tsx`
  - `src/context/TodoProvider.tsx`
  - `src/context/TodoReducer.ts`

---

## AC5 — Task data persists across page reloads

- **ID:** AC5
- **Description:** Task data persists across page reloads using the
  existing `localStorage` mechanism. On reload, previously stored
  tasks are loaded back into the list with their completion state
  intact.
- **Expected result:**
  - After adding, editing, toggling, or deleting tasks, reloading
    the page restores the current task list and each task's
    `completed` state.
  - The persistence key is `"todos"` and the value is a JSON array
    of `TodoItemType` objects.
  - If `localStorage` is empty or unavailable, the app starts with
    an empty list (no crash).
  - **Known current limitation:** malformed JSON is caught, and unavailable storage is caught by the load/save handlers. However, a valid JSON value with an unexpected shape (for example, a non-array value or an object missing `id`, `title`, or `completed`) is not runtime-validated before it is dispatched. This is a confirmed code gap; its precise UI impact has not been tested. Task 07 should address this through a separate mitigation and regression tests.
- **How it can be verified:**
  - E2E: `cypress/e2e/ThemeSwitcher.cy.ts` demonstrates the reload
    persistence pattern for theme; task persistence follows the same
    `TodoProvider` load-on-mount mechanism. (There is no dedicated
    Cypress spec that reloads and asserts task persistence — this is
    a verification gap.)
  - Manual: add and toggle tasks, reload the page, confirm the list
    and completion states are restored.
- **Relevant source files:**
  - `src/context/TodoProvider.tsx`
  - `src/context/TodoReducer.ts`
  - `src/context/TodoContext.tsx`

---

## Verification status summary

| Criterion | Unit test coverage | E2E coverage | Verified by execution in this environment? |
|-----------|--------------------|--------------|---------------------------------------------|
| AC1 | Yes (`AddTodo.test.tsx`) | Yes (`AddTodo.cy.ts`) | Unit: yes. E2E: no (Cypress unavailable). |
| AC2 | Indirect only | Yes (`TodoItem.cy.ts`, `TodosFooter.cy.ts`) | No (E2E not runnable; no direct unit test). |
| AC3 | No | Yes (`TodoItem.cy.ts`) | No (E2E not runnable). |
| AC4 | No | Yes (`TodoItem.cy.ts`, `TodosFooter.cy.ts`) | No (E2E not runnable). |
| AC5 | No | Partial (no dedicated reload spec) | No. |

See `docs/BASELINE.md` for the exact checks that were executed and
their results.
