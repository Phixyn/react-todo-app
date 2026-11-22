# Assignment 05 — Final Submission Checklist

Repository: [dauletRy/react-todo-app](https://github.com/dauletRy/react-todo-app)  
Baseline branch: `baseline-assignment05`  
Working branch: `assignment05-work`  
Draft review PR: [#1](https://github.com/dauletRy/react-todo-app/pull/1)

## Task checklist

- [x] **Task 01 — Baseline and context:** repository map and pre-change lint/test/build results recorded in `docs/BASELINE.md`.
- [x] **Task 02 — Agent instructions:** root `AGENTS.md`, five acceptance criteria and baseline documentation created and reviewed.
- [x] **Task 03 — Focused pattern decision:** Adapter, utility extraction and no-refactor options compared; utility extraction selected as a focused refactor, not misrepresented as a design pattern. See `docs/PATTERN_DECISION.md`.
- [x] **Task 04 — Read-only risk review:** six findings across correctness, maintainability, dependency/configuration and agent-operations/readiness categories. See `docs/RISK_REVIEW.md`.
- [x] **Task 05 — Risk register:** cause/event/consequence, evidence, likelihood, impact, score, mitigation, owner, verification and residual risk recorded. See `docs/RISK_REGISTER.md`.
- [x] **Task 06 — Agent-readiness audit:** Level 2 — Documented, with remaining evidence and governance gaps listed. See `docs/AGENT_READINESS_AUDIT.md`.
- [x] **Task 07 — Mitigation and verification:** both mitigations implemented; 9 storage tests and 6 reducer tests passed within the 42-test Vitest run. Lint, build and 47 Cypress E2E tests also passed locally. See `docs/MITIGATION_VERIFICATION.md` and `docs/POST_CHANGE_VERIFICATION.md`.
- [x] **Task 08 — Background-agent safeguards:** hypothetical asynchronous task, isolation, allowlist, commands, time limits, prohibited operations, artifacts, review and rollback documented. See `docs/BACKGROUND_AGENT_SAFEGUARDS.md`.
- [x] **Task 09 — Release decision:** NO-GO retained due unresolved dependency audit findings, no confirmed GitHub Actions run, and pending human PR diff review. See `docs/RELEASE_DECISION.md`.
- [x] **Task 10 — AI reflection:** 200–300-word reflection drafted. Confirm first-person statements match the student's actual actions before submitting. See `docs/AI_REFLECTION.md`.

## Actual local verification evidence

- [x] `npm.cmd run lint` — PASS; ESLint completed without diagnostics.
- [x] `npm.cmd run test` — PASS; 6 files, 42 tests passed, 0 failed. Coverage: statements 60.05%, branches 84.94%, functions 55.55%, lines 60.05%.
- [x] `npm.cmd run build` — PASS; TypeScript and Vite production build succeeded; 82 modules transformed.
- [x] `npm.cmd run cypress:run` — PASS; 7 specs, 47 tests passed, 0 failed, 0 pending, 0 skipped, in headless Electron 130.
- [x] `git status --short --branch` — clean; `## assignment05-work...origin/assignment05-work`.
- [x] Record dependency audit: install reported 34 total findings (2 low, 14 moderate, 15 high, 3 critical); `npm audit --omit=dev` reported 8 (1 low, 1 moderate, 6 high).
- [ ] Review and remediate the dependency audit findings, or obtain explicit documented risk acceptance. Do not run `npm audit fix --force` blindly.
- [ ] Obtain successful GitHub Actions checks for the current PR head, including Chrome E2E. Current workflow-run query returned no runs; this is not a pass.
- [ ] Capture terminal screenshots of lint, unit tests, build, Cypress, audit and Git status for submission evidence if required by the course.
- [ ] Human-review every file in PR #1, including earlier Bolt-generated `.bolt/memory.md` and `index.html` changes and the `.gitignore` difference against `main`.
- [ ] Keep PR #1 in draft until the dependency, CI and human-review gates are satisfied. Do not merge or deploy while NO-GO remains.

## Repository references

- [Working branch](https://github.com/dauletRy/react-todo-app/tree/assignment05-work)
- [Preserved baseline branch](https://github.com/dauletRy/react-todo-app/tree/baseline-assignment05)
- [Draft PR #1](https://github.com/dauletRy/react-todo-app/pull/1)
- [Post-change verification report](POST_CHANGE_VERIFICATION.md)

## Email submission

The assignment PDF specifies:
- Recipient: `kibo.kz.contact.01@gmail.com`
- Subject format: `Software Engineering - Assignment #05 - Your Surname & Name`
- Deadline: **November 23, 2026, 23:59:59** (local course time).
- Do not CC `z.aldamuratov@kbtu.kz`.

Send only after completing the remaining submission requirements and reviewing the final repository link and evidence. Follow any course-specific file-format requirements from the assignment PDF.
