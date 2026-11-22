# Task 10 — AI Reflection

**Word count: approximately 280 words**

I used Bolt.new and ChatGPT (GPT-6) during Assignment 05. Bolt.new received a read-only request to inspect the React todo repository, its structure, quality checks and weaknesses. ChatGPT reviewed the assignment branch through GitHub. The context included AGENTS.md, acceptance criteria, baseline output and relevant source/configuration files. No credentials or private user data were provided.

The most useful AI suggestion was to separate browser persistence from TodoProvider. I compared a formal Adapter pattern with a smaller utility extraction and chose the utility because the project has one browser-storage implementation and no existing dependency-injection architecture. This kept the refactoring proportionate and made storage functions directly testable. I also identified that localStorage JSON was cast to a TypeScript type without runtime validation, so a guard and tests for invalid records were added.

One weak suggestion was that the unused @types/jest dependency might pollute Vitest types. The package entry and legacy configuration exist, but no concrete type or build failure was demonstrated. I classified this as plausible/unverified and did not remove dependencies.

I compared the working and baseline branches, reviewed code changes and checked the changed-file list. The original baseline had 27 passing unit tests, clean lint and a successful build. Post-change tests, lint and build have not yet run in this environment, and Cypress previously could not start because Xvfb was missing. This gap led to a NO-GO release decision rather than an unsupported pass claim.

AGENTS.md improved the process by making permissions, safe commands and human review explicit. Bolt did not automatically load it, so I instructed the agent to read it at the start of later tasks. Next, I should obtain actual test logs and improve automatic instruction loading and build verification.
