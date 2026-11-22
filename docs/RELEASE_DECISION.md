# Task 09 — Release Decision

Decision date: 2026-11-22  
Reviewed version: `assignment05-work`  
Review PR: [#1](https://github.com/dauletRy/react-todo-app/pull/1) (open, draft, not merged)

## Decision

# NO-GO — do not mark the PR ready, merge or deploy this candidate yet.

The local verification gates now pass. NO-GO is retained because the dependency audit identified unresolved vulnerabilities, GitHub Actions results are not confirmed, and the complete PR diff still requires human review. This is a decision about release evidence and residual risk, not a claim that the application is unusable.

## Positive evidence

- `npm.cmd run lint`: PASS; ESLint completed without diagnostics.
- `npm.cmd run test`: PASS; 6 Vitest files and 42 tests passed, 0 failed.
- Vitest coverage: statements 60.05%, branches 84.94%, functions 55.55%, lines 60.05%.
- `npm.cmd run build`: PASS; TypeScript `tsc -b` and Vite 7.3.2 production build passed; 82 modules transformed.
- `npm.cmd run cypress:run`: PASS; 7 Cypress specs and 47 tests passed, 0 failed, 0 pending, 0 skipped, using Electron 130 headlessly on Windows.
- `git status --short --branch`: clean; branch tracks `origin/assignment05-work`.
- The 9 todo-storage tests and 6 reducer tests added for Tasks 03/07 were discovered and passed.

## Blocking risks and evidence gaps

### 1. Dependency vulnerabilities

- `npm ci` reported 34 vulnerabilities overall: 2 low, 14 moderate, 15 high and 3 critical.
- `npm audit --omit=dev` reported 8 findings: 1 low, 1 moderate and 6 high. The report names esbuild, nanoid, postcss, react-router/react-router-dom, source-map-js, uuid and vite.
- npm indicated fixes are available through `npm audit fix`.
- No automatic fix or dependency update was run because that could alter dependency versions/lockfile and introduce unrelated changes. Review the dependency paths and upgrade plan; resolve the findings or obtain explicit documented risk acceptance before release.

### 2. GitHub Actions not confirmed

- PR #1 remains open and in draft state.
- The workflow-run query for the current PR head returned no runs. An empty result is not a passing check.
- Local Cypress used Electron 130, while the repository workflow is configured for Chrome on `ubuntu-latest`. The configured Chrome CI run remains unverified.

### 3. Human review of the complete PR diff

- Review every changed file and account for earlier Bolt-generated differences in `.bolt/memory.md` and `index.html`.
- Review the `.gitignore` difference against `main`; the `.env` ignore line was already present on `baseline-assignment05`.
- Confirm that all changes are in assignment scope and that no secrets or generated artifacts are included.

## Risk-register basis

- R-01: runtime validation implemented; 9 storage tests and full suite passed. Residual limitations remain for all-or-nothing rejection and malformed stored values.
- R-02: six direct reducer tests implemented and passed.
- R-03: unused AppHeader remains a low-priority maintainability concern.
- R-04: legacy Jest-related entries remain plausible/unverified; no cleanup was attempted.
- R-05: PR-based CI control exists, but no workflow run is confirmed.
- R-06: README verification guidance was updated; retain normal documentation-drift risk.
- R-07: dependency audit findings are unresolved and block release.

## Conditions to reconsider the release

1. Review the 8 findings from `npm audit --omit=dev` and the full 34-finding install audit; identify direct/transitive paths, apply reviewed compatible updates or document explicit risk acceptance, and rerun install, lint, unit tests, build and Cypress.
2. Obtain successful GitHub Actions results for the current PR head, including the configured Chrome E2E job; if workflows do not trigger, investigate the workflow configuration without bypassing required checks.
3. Have a human inspect the full PR diff, including the previously documented Bolt and `.gitignore` differences.
4. Save terminal screenshots or other course-required evidence of the local checks and final repository state.
5. Only after the above, reconsider the NO-GO decision and explicitly approve any PR status change.

Until then, keep PR #1 in draft and do not merge or deploy.

## Environment note

Local checks used Windows, Node.js v24.13.1 and npm 11.8.0. The original baseline was tested with Node.js v22.23.1 and npm 10.9.8. This environment difference should be disclosed when comparing baseline and post-change results.
