# Task 06 — Agent-Readiness Audit

Audit date: 2026-11-22
Repository: `dauletRy/react-todo-app`
Branch: `assignment05-work`

## Readiness result

**Level 2 — Documented**

The repository has a readable, conventional React/TypeScript structure, a lockfile, core quality scripts, CI workflows, and a root-level `AGENTS.md` with explicit safety boundaries and review gates. It is not rated Level 3 (Agent-ready) because important verification and correctness evidence is still incomplete: persisted todo payloads are not yet runtime-validated, direct reducer tests were absent at audit time, and post-refactoring checks had not yet completed.

## Audit details

| Area | Assessment | Evidence and gap |
|---|---|---|
| Readable structure | Satisfactory | Clear separation of `src/components`, `src/context`, `src/pages`, `src/assets`, `src/styles`, and `cypress`. Context + Reducer state management is documented in `AGENTS.md`. |
| README accuracy | Partial | README describes the app and basic setup, but its setup recommends `npm install` and the Testing section focuses on Cypress. It omits the available Vitest, lint and build/type-check commands. |
| Reproducible setup | Good with a documentation gap | `package-lock.json` exists and `npm ci` is the lockfile-based installation command. README does not currently prefer it. Local baseline used Node 22.23.1; CI workflows specify Node 24. |
| Pinned dependencies | Good | A committed npm lockfile is present (lockfileVersion 3). Manifest ranges use semver, but `npm ci` follows the lockfile. Dependency installation or upgrades remain approval-gated in `AGENTS.md`. |
| Tests | Partial | Baseline: 27/27 Vitest tests passed across 4 files, 50.86% statement coverage. Reducer coverage was 2.17%, and no dedicated reducer/provider test file existed. Six new storage-helper tests and a reducer test are planned/being added separately; their results must be recorded only after execution. |
| Lint / type-check / build | Tooling present; CI gap | `npm run lint` and `npm run build` exist. Build runs `tsc -b && vite build`. Baseline lint and build passed. Current CI workflows run lint and unit/E2E tests but do not run the production build/type-check command. |
| End-to-end testing | Partial | Seven Cypress specs are present. The initial environment's `npx cypress verify` failed because Xvfb was missing. The workflow defines Cypress on `ubuntu-latest`, but post-change CI evidence is pending. |
| Logging | Basic | Todo and theme persistence failures use `console.warn`; there is no structured logging framework. This is proportionate for a small client-only app, but messages are not centrally managed. |
| Security safeguards | Partial before Task 07 | No backend/authentication or server secrets are used by the app. Browser localStorage is untrusted input, but todo data currently has no runtime shape validation. `AGENTS.md` prohibits secret exposure, destructive commands, unapproved dependency changes, unreviewed deployment and unsafe branch operations. |
| Agent instructions | Good | Root `AGENTS.md` describes purpose, architecture, setup, conventions, test evidence, forbidden actions and human review gates. The earlier Bolt report disclosed that the file was not automatically loaded; future prompts must explicitly instruct the agent to read it. |
| Review gates | Good on paper; evidence pending | `AGENTS.md` requires human approval for dependencies, manifest/CI changes, merges and deployment. A draft PR to `main` is being used as the review/CI gate; no merge is authorized. |

## Required operating checks for an AI agent

Before work:
1. Read `AGENTS.md` explicitly; do not assume the tool auto-loads it.
2. Confirm the checked-out branch is `assignment05-work`.
3. Inspect the existing diff and avoid changes to `baseline-assignment05`.
4. Read the relevant source, test and configuration files before proposing edits.

During work:
1. Keep the scope to explicitly approved files.
2. Do not read secret-bearing files or reveal credentials.
3. Do not install/upgrade/remove dependencies, modify package manifests/CI, run destructive commands, force-push, merge or deploy without approval.
4. Separate observed facts, hypotheses and unverified AI suggestions.

After work:
1. Review every diff.
2. Run and record `npm run lint`, `npm run test`, and `npm run build` where execution is available.
3. Run relevant Cypress tests when Xvfb/display support is available.
4. Record unexecuted checks as gaps; never fabricate outcomes.
5. Require human review before merge/deployment.

## Missing evidence preventing Level 3

- Post-refactoring lint, full unit suite and TypeScript/production build results.
- A successful CI run for the working PR, including Cypress result.
- Runtime validation and tests for malformed todo data (targeted for Task 07).
- Direct tests of reducer action behavior (targeted for Task 07).
- Improved README verification instructions.
- Evidence that the coding agent consistently loads and follows `AGENTS.md` automatically; current evidence is that Bolt required explicit instruction.

## Conclusion

Level 2 is justified: the repository is documented and has a usable quality toolchain, but agent operation is not yet supported by complete, verified evidence. Level 3 should only be reconsidered after the critical correctness/test gaps are mitigated and the final checks are executed successfully.

## Follow-up after Task 07

The README setup/testing gap has been addressed: `README.md` now documents `npm ci`, `npm run lint`, `npm run test`, `npm run build`, and the Cypress/Xvfb limitation.

The two priority code mitigations are also present in the working branch:
- Runtime validation for persisted todo records in `src/context/todoStorage.ts`.
- Direct tests for all six reducer actions in `src/context/TodoReducer.test.ts`.

**Readiness remains Level 2 — Documented.** These test files have not yet been executed after the changes, post-change lint/build results are unavailable, and the draft PR has no reported check statuses. The code mitigations improve readiness but do not replace execution evidence.
