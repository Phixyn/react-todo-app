# Task 08 — Background Coding Agent Safeguards

Date: 2026-11-22
Scenario: Hypothetical asynchronous coding-agent task. No paid background agent was started or required.

## 1. Hypothetical task

Ask an asynchronous coding agent to add focused provider-level tests for todo persistence behavior after the Task 03/07 storage refactor. The agent's purpose is to test that valid saved todos load on provider mount and malformed saved values do not enter the rendered task list. The agent must not change application behavior or introduce dependencies.

## 2. Isolation boundary

- Create a dedicated branch named `agent/task08-provider-persistence-tests` from the reviewed `assignment05-work` commit.
- Work in an isolated Git worktree or isolated cloud workspace; do not share an editable working directory with the human.
- Record the base commit SHA before the task starts.
- Do not rebase or merge `main`, `baseline-assignment05`, or other branches automatically.
- Push changes only to the dedicated agent branch.
- Do not modify the existing assignment working branch until a human reviews the diff and explicitly approves cherry-pick/merge.

## 3. Allowed files

The agent may create or modify only:
- `src/context/TodoProvider.test.tsx`

If the test genuinely cannot be written without changing another file, the agent must stop and request approval. It must not broaden the file allowlist itself.

## 4. Allowed commands

Use dependencies already installed in the isolated environment. No package installation is permitted.

Allowed non-destructive checks:
- `npm run lint`
- `npm run test`
- `npm run build`

The agent may inspect source, tests and package scripts. It may run a targeted test only if the local Vitest binary is already present; the exact command and output must be recorded. The full `npm run test` remains the required final unit-test check.

## 5. Time and resource limits

- Maximum task duration: 15 minutes.
- Maximum retry after a failed verification: one focused retry.
- No recurring execution or unbounded background loop.
- No external network requests, package downloads or environment provisioning.
- Stop early if the workspace, branch, base SHA or file allowlist cannot be confirmed.

These are hypothetical operating limits, not evidence that an agent actually ran.

## 6. Prohibited operations

The background agent must not:
- Read, print, copy or commit secrets, credentials, `.env` files or private keys.
- Modify `src/context/TodoProvider.tsx`, `todoStorage.ts`, reducer implementation, components or any other file outside the allowlist.
- Modify `package.json`, `package-lock.json`, CI workflows, repository settings or branch protection.
- Install, remove or upgrade dependencies.
- Change acceptance criteria, suppress tests, weaken assertions or fabricate test results.
- Run destructive commands, force-push, reset shared branches, delete unrelated files or overwrite another agent's work.
- Merge, approve, publish or deploy any code.
- Access or modify real browser user data.

## 7. Required artifacts from the agent

Before handoff, the agent must provide:
1. Plain-language change summary.
2. Exact base and head commit SHAs.
3. Complete file list.
4. Unified diff for every changed line.
5. Test names and purpose.
6. Exact commands, exit codes, and full/faithful logs.
7. Build and lint results, or explicit reasons they were not run.
8. Known limitations and any unresolved risks.
9. Confirmation that no out-of-scope files or dependencies were changed.

A statement such as "tests should pass" is not verification evidence.

## 8. Human review and approval gates

A human reviewer must:
1. Confirm the branch is isolated and based on the recorded SHA.
2. Inspect every changed line and verify that only the allowlisted test file changed.
3. Check that tests assert real provider behavior rather than implementation details.
4. Independently inspect reported test logs and rerun checks when possible.
5. Explicitly approve any transfer of commits to `assignment05-work`.

No merge to `main`, approval of a production release, or deployment is permitted without separate explicit human authorization.

## 9. Failure and rollback handling

- If a test fails, stop and report the first failing assertion plus the exact log.
- The agent may make one narrow correction within the allowlisted test file; after a second failure it must stop and hand off.
- If the base SHA changed or conflicts appear, do not rebase or overwrite; request human direction.
- Keep the branch and logs for review. Do not automatically delete the worktree, branch or commits.
- If rollback is required, propose a revert commit on the isolated branch and wait for human approval. Never use `git reset --hard` or force-push.
- The human decides whether to discard, revise or transfer the work.

## 10. Governance conclusion

This workflow limits the asynchronous agent to one isolated test file, a fixed branch, a small set of safe commands and a bounded time window. It produces reviewable artifacts and prevents direct merge/deployment. A human remains accountable for verification and release approval.
