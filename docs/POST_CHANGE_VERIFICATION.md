# Post-change Verification Report

Date: 2026-11-22  
Repository: `dauletRy/react-todo-app`  
Branch: `assignment05-work`  
Environment: Windows PowerShell; Node.js v24.13.1; npm v11.8.0; Cypress 14.5.4; Electron 130

## Scope and method

The repository was cloned locally from the `assignment05-work` branch. The branch name was confirmed with `git branch --show-current`. Dependencies were installed with `npm.cmd ci`; no package manifest or lockfile changes were made. PowerShell blocked the `npm.ps1` shim under the current execution policy, so commands were run with `npm.cmd` instead. No PowerShell execution-policy setting was changed.

The results below are transcribed from the command output supplied by the repository owner. The initial baseline results in `BASELINE.md` remain pre-change results and are not conflated with this report.

## Post-change checks

| Command | Result | Evidence |
|---|---|---|
| `npm.cmd run lint` | **PASS** | ESLint completed without diagnostics; PowerShell returned to the prompt normally. |
| `npm.cmd run test` | **PASS** | 6 test files passed; **42 tests passed, 0 failed**. |
| `npm.cmd run build` | **PASS** | `tsc -b` completed and Vite 7.3.2 built the app; 82 modules transformed. |
| `npm.cmd run cypress:run` | **PASS** | 7 specs; **47 tests passed, 0 failed, 0 pending, 0 skipped**. |
| `git status --short --branch` | **CLEAN** | Output: `## assignment05-work...origin/assignment05-work`; no modified/untracked paths and no ahead/behind count displayed. |

### Unit-test coverage

Vitest 3.2.4 with v8 coverage reported:

| Metric | Result |
|---|---:|
| Test files | 6 passed |
| Tests | **42 passed / 0 failed** |
| Statements | 60.05% |
| Branches | 84.94% |
| Functions | 55.55% |
| Lines | 60.05% |

The 42 tests include the 9 todo-storage helper tests and 6 reducer-action tests added for the assignment, in addition to the 27-test pre-change baseline. The storage test intentionally logs a warning while testing rejection of invalid saved data; that test passed.

### Cypress end-to-end results

Cypress 14.5.4 ran headlessly using Electron 130 under Node.js v24.13.1. All seven specs passed:

| Spec | Passed |
|---|---:|
| `AddTodo.cy.ts` | 11 |
| `AppFooter.cy.ts` | 3 |
| `ThemeSwitcher.cy.ts` | 9 |
| `TodoItem.cy.ts` | 11 |
| `TodosFooter.cy.ts` | 6 |
| `TodosHeader.cy.ts` | 4 |
| `TodosList.cy.ts` | 3 |
| **Total** | **47 / 47** |

The repository's GitHub Actions workflow is configured to run Cypress in Chrome on `ubuntu-latest`. The local Electron result is valid local E2E evidence but does not substitute for a successful Chrome CI run.

## Dependency audit findings

Installation completed successfully with `npm.cmd ci` (529 packages added, 530 audited), but npm reported **34 dependency vulnerabilities**: 2 low, 14 moderate, 15 high and 3 critical.

A separate `npm.cmd audit --omit=dev` reported **8 findings** in the dependency tree retained by that command: 1 low, 1 moderate and 6 high. The report named esbuild, nanoid, postcss, react-router (also affecting react-router-dom), source-map-js, uuid and vite. npm reported that fixes are available via `npm audit fix`.

No audit fix, forced fix, dependency upgrade, or package manifest/lockfile change was performed. This was deliberate: dependency changes are outside the approved mitigation scope and may alter the lockfile or introduce regressions. The dependency paths and applicable exposure should be reviewed, then remediated or formally accepted by the repository owner. The audit output is a release blocker until resolved or explicitly risk-accepted.

## Git and CI evidence

The local status output showed the working branch tracking `origin/assignment05-work` with no local changes and no ahead/behind count. The connected GitHub check performed during this review found PR #1 still open and in draft state. The PR head had no workflow runs returned by the GitHub Actions query at that time. Therefore, no GitHub Actions pass is claimed.

## Conclusion

The post-change local verification gate for lint, unit tests, TypeScript/production build and Cypress E2E has passed. The working tree is clean. However, **release approval remains blocked** by the dependency audit findings, the absence of confirmed GitHub Actions results (including the configured Chrome E2E job), and the required human review of the full PR diff. Keep PR #1 in draft; do not merge or deploy until those items are addressed.
