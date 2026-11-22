# Assignment 05 — AI Evidence Appendix

Date: 2026-11-22
Repository: `dauletRy/react-todo-app`
Working branch: `assignment05-work`

## AI assistants used

| Tool / model | Purpose | Context provided |
|---|---|---|
| Bolt.new (model not identified in the available report) | Read-only repository inspection, baseline command execution, AGENTS.md/documentation creation and verification, and an initial pattern/risk assessment | The imported React todo repository; task requirements; explicit read-only or file-scope boundaries; baseline checks and command results |
| ChatGPT (GPT-6) | Independent source review, risk classification, design decision support, implementation planning, repository file changes via GitHub, and documentation | The assignment PDF, Bolt reports, GitHub files on `assignment05-work`, baseline outputs, acceptance criteria and AGENTS.md |

## Prompt and output record

| Stage | Prompt summary | Output received or used | Decision / human review |
|---|---|---|---|
| Task 01 — initial inspection | Bolt was asked to inspect project structure, stack, scripts, tests, state flow and at least three weaknesses without editing files | Repository map; baseline commands listed; five initial findings and fact/assumption separation | The report was reviewed; source evidence was checked before using findings |
| Task 01 — baseline checks | Bolt was instructed to run Node/npm version, lint, Vitest and build checks without source changes | Node 22.23.1, npm 10.9.8; lint exit 0; 27/27 tests passed; build exit 0; Cypress verification failed because Xvfb was missing | Results were recorded as pre-change baseline only |
| Task 02 — agent instructions | Bolt was allowed to create only AGENTS.md, ACCEPTANCE_CRITERIA.md and BASELINE.md | Three documentation files created | Their contents and accuracy were reviewed. Bolt disclosed that AGENTS.md was not automatically loaded; later prompts explicitly required reading it |
| Task 02 — documentation verification | Bolt was asked to read-only verify instructions, AC5 behavior, and baseline accuracy | File/script consistency confirmed; localStorage shape-validation gap identified; optional AGENTS.md improvements suggested | AC5 note and AGENTS.md safety/setup language were clarified |
| Task 03 — pattern decision | Bolt was asked to compare Adapter, utility extraction and no refactoring without edits | Recommended a small utility extraction, not a formal design pattern | Utility extraction selected as proportionate; formal Adapter was rejected as extra abstraction |
| Task 04 — risk review | ChatGPT reviewed source/config files and classified candidate findings read-only | Six findings across correctness, maintainability, dependency/configuration and agent operations/readiness | Confirmed gaps separated from plausible consequences; no unsupported claim treated as confirmed |
| Task 05 — risk register | ChatGPT converted reviewed findings into a 1–3 likelihood/impact register | R-01 through R-06, scores, mitigations, owners and verification plans | R-01 and R-02 ranked as top corrective risks |
| Task 06 — readiness audit | ChatGPT compared repository structure, README, lockfile, scripts, CI, tests and AGENTS.md | Level 2 — Documented; Level 3 evidence gaps listed | Level 2 retained pending post-change verification |
| Task 07 — mitigations | ChatGPT implemented localStorage runtime shape validation and reducer unit tests through GitHub file operations | isTodoItem guard; invalid storage cases tested in source; six reducer action tests added | Human review and actual command execution remain required; no pass was claimed |
| Task 08 — background safeguards | ChatGPT drafted a hypothetical asynchronous agent policy | Isolated branch/worktree, file allowlist, safe commands, time limits, artifacts, review and rollback | No actual background agent was started |
| Task 09 — release decision | ChatGPT weighed baseline evidence against missing post-change checks | NO-GO decision for the current candidate | PR kept as draft; no merge or deployment |
| Task 10 — reflection | ChatGPT drafted the required 200–300-word account | AI reflection in `docs/AI_REFLECTION.md` | Student should confirm the first-person description matches their actual personal actions before submission |

## Independent verification and decision record

The following repository facts were checked through the connected GitHub repository:
- Repository: `dauletRy/react-todo-app`.
- Both `baseline-assignment05` and `assignment05-work` branches exist.
- The preserved baseline branch commit used in the comparison was `1c80da0d01b779b1f2aff4be42ee77dfc72ec0f0`.
- The working branch was compared against the baseline and showed it was ahead, with no commits behind at the time of comparison.
- `TodoProvider.tsx`, `TodoReducer.ts`, `TodoContext.tsx`, `todoStorage.ts`, relevant tests, `package.json`, `eslint.config.js`, README and CI workflows were inspected.
- The Task 03 diff was checked to confirm that reducer actions and UI component files were not changed by the persistence extraction.

## Verification limitations

- The 27/27 Vitest result, lint pass and build pass are baseline results from before Task 03/07.
- The new storage and reducer tests were authored, but the connected GitHub editing workflow did not provide a command terminal.
- GitHub PR #1 was opened as a draft to seek existing CI checks; status/check queries returned no status entries or workflow runs at the time checked.
- A local clone attempt failed because this environment could not resolve `github.com`.
- Cypress had previously failed verification because Xvfb was missing.
- Therefore, post-change lint, unit tests, build and Cypress results are **pending**, not passed.

## Human oversight

The user selected the repository/platform, connected GitHub, reviewed the AI reports and instructed that the assignment continue using the approach judged most appropriate. The working branch was kept separate from the preserved baseline. The draft PR was not merged, and no deployment was performed. Before final submission, the student must inspect the GitHub diff and obtain actual post-change test/build/CI logs.
