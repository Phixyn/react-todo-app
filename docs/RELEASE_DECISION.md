# Task 09 — Release Decision

Decision date: 2026-11-22
Reviewed version: `assignment05-work`
Review PR: #1 (draft; not merged)

## Decision

# NO-GO — do not merge or deploy this candidate yet.

This is a decision about the current reviewed candidate and its evidence state, not a claim that the application is inherently unusable.

## Evidence supporting the decision

### Positive evidence
- Pre-change baseline: `npm run lint` passed with exit code 0.
- Pre-change baseline: `npm run test` passed 27/27 tests across 4 files.
- Pre-change baseline: `npm run build` passed; TypeScript and Vite production build succeeded.
- Task 03 moved persistence details out of the provider without changing the reducer action paths or UI components.
- Task 07 added runtime validation for persisted todo data and direct tests for six reducer actions.
- README setup and quality-check instructions were clarified.
- A root `AGENTS.md` defines safe operating rules and human approval gates.

### Blocking evidence gaps
- The Task 03/07 storage and reducer tests have been authored but have not been executed after the changes.
- Post-change `npm run lint`, `npm run test`, and `npm run build` results are not available.
- GitHub PR #1 is open as a draft; status/check queries returned no check statuses or workflow runs at the time of review. An empty status response is not a passing result.
- Cypress E2E was not executed in the original environment because Cypress could not find Xvfb. No post-change CI E2E result is available.
- The branch comparison contains earlier Bolt-generated differences in `.bolt/memory.md` and `index.html`; these are documented but are not required Task 03/07 changes.
- The draft PR diff against `main` also shows a redundant `.env` ignore line that is already present on `baseline-assignment05`; this is a base-branch comparison difference, not a new Task 03/07 change.

## Risk-register basis

- R-01 (invalid persisted data shape): code mitigation implemented; execution evidence pending.
- R-02 (missing reducer tests): tests implemented; execution evidence pending.
- R-03 (unused AppHeader): low residual maintainability concern; no removal attempted.
- R-04 (legacy Jest-related entries): plausible/unverified; no dependency/config change attempted.
- R-05 (CI branch filters): PR workflow is the control, but its run is not confirmed.
- R-06 (README verification guidance): README was updated; it should be rechecked against the actual scripts after final verification.

## Conditions to reconsider the release

The owner is the student/repository maintainer. The candidate may be reconsidered only after all of these are completed:

1. On `assignment05-work`, run `npm run lint`, `npm run test`, and `npm run build`; record exact commands, exit codes, pass/fail totals and output.
2. Confirm the new storage and reducer tests are discovered and pass. The current branch contains 15 newly authored test cases in addition to the 27 baseline tests; the actual final count must come from the test runner.
3. Execute the existing Cypress suite in an environment with the required browser/display dependencies, or obtain a successful CI E2E result. Do not infer success from workflow configuration.
4. Review the complete PR #1 diff and account for every changed file, including the earlier `.bolt/memory.md` and `index.html` changes.
5. Have a human inspect the code and test evidence before marking the PR ready or merging.

Until these conditions are met, keep PR #1 in draft and do not merge or deploy.

## Conclusion

NO-GO is the defensible decision because the reviewed code version has not completed post-change verification. The baseline was healthy, and the targeted mitigations are present, but release approval requires evidence from the version being released, not only evidence from its earlier baseline.
