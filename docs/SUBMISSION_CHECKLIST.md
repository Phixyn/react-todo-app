# Assignment 05 — Final Submission Checklist

Repository: [dauletRy/react-todo-app](https://github.com/dauletRy/react-todo-app)
Baseline branch: `baseline-assignment05`
Working branch: `assignment05-work`
Draft review PR: [#1](https://github.com/dauletRy/react-todo-app/pull/1)

## Task checklist

- [x] **Task 01 — Baseline and context:** repository map and pre-change lint/test/build results recorded in `docs/BASELINE.md`.
- [x] **Task 02 — Agent instructions:** root `AGENTS.md), five acceptance criteria, and baseline documentation created and reviewed.
- [x] **Task 03 — Focused pattern decision:** Adapter, utility extraction and no-refactor options compared; utility extraction selected as a focused refactor, not misrepresented as a design pattern. See `docs/PATTERN_DECISION.md`.
- [x] **Task 04 — Read-only risk review:** six findings across correctness, maintainability, dependency/configuration and agent-operations/readiness categories. See `docs/RISK_REVIEW.md`.
- [x] **Task 05 — Risk register:** cause/event/consequence, evidence, likelihood, impact, score, mitigation, owner, verification and residual risk recorded. Top two confirmed risks ranked. See `docs/RISK_REGISTER.md`.
- [x] **Task 06 — Agent-readiness audit:** Level 2 — Documented, with missing evidence listed. See `docs/AGENT_READINESS_AUDIT.md`.
- [ ] **Task 07 — Mitigation and verification:** two mitigations are implemented and tests are authored, but post-change lint, test and build commands still need actual execution. See `docs/MITIGATION_VERIFICATION.md`.
- [x] **Task 08 — Background-agent safeguards:** hypothetical asynchronous task, isolation, allowlist, commands, time limits, prohibited operations, artifacts, review and rollback documented. See `docs/BACKGROUND_AGENT_SAFEGUARDS.md`.
- [x] **Task 09 — Release decision:** NO-GO recorded for the current candidate until post-change verification is complete. See `docs/RELEASE_DECISION.md`.
- [x] **Task 10 — AI reflection:** 200–300-word reflection drafted. Confirm first-person statements match the student's actual actions before submitting. See `docs/AI_REFLECTION.md`.

## Required final evidence — still outstanding

- [ ] Run `npm run lint` on `assignment05-work`; save exact output and exit code.
- [ ] Run `npm run test`; save actual test-file and test totals, pass/fail counts, coverage and exit code. Confirm the storage and reducer tests are discovered.
- [ ] Run `npm run build`; save TypeScript/build output and exit code.
- [ ] Run Cypress in a supported environment or obtain a real successful CI E2E result. If it cannot run, capture the actual reason and report the gap.
- [ ] Capture screenshots of the terminal commands/results and GitHub branch/PR evidence.
- [ ] Inspect every file in the PR diff, including earlier Bolt-generated `.bolt/memory.md` and `index.html` changes and the redundant `.env` ignore difference relative to `main`.
- [ ] Update `docs/MITIGATION_VERIFICATION.md`, `docs/RISK_REGISTER.md`, and `docs/RELEASE_DECISION.md` with the actual results. Only reconsider NO-GO if evidence supports it.
- [ ] Keep PR #1 in draft until the human review and required checks are complete. Do not merge or deploy without explicit approval.

## Repository references

- [Working branch](https://github.com/dauletRy/react-todo-app/tree/assignment05-work)
- [Preserved baseline branch](https://github.com/dauletRy/react-todo-app/tree/baseline-assignment05)
- [Draft PR #1](https://github.com/dauletRy/react-todo-app/pull/1)

## Email submission

The assignment PDF specifies:
- Recipient: `kibo.kz.contact.01@gmail.com`
- Subject format: `Software Engineering - Assignment #05 - Your Surname & Name`
- Deadline: **November 23, 2026, 23:59:59** (local course time).
- Do not CC `z.aldamuratov@kbtu.kz`.

Send only after completing the required checks and reviewing the final repository link and evidence. Follow any course-specific file-format requirements from the assignment PDF.
