# Definition of Done

> Every project brief has its own acceptance criteria. This page is the shared bar underneath all of them: what "finished" means, how to demo it, and what to hand over.

## Why this page exists

A project is not done when it runs on your laptop once. It is done when someone else can start it, use it, break it, and understand why you built it that way. Interviewers and teammates judge you on that, not on whether the happy path worked.

Use this as a checklist. If a box is unticked, the project is still in progress — however impressive the code looks. It covers the common requirements in the [projects index](index.md) and the evidence rules in the [competency and evidence contract](competency-evidence.md), and adds the "how to prove it" detail.

## The shared bar

Every project must have all of these.

### 1. It runs from a clean checkout

- [ ] A fresh clone starts with **one documented command** (for example `docker compose up`).
- [ ] Dependencies are pinned and installed by that command.
- [ ] A `Dockerfile` builds a runnable image; the container runs as a **non-root user**.
- [ ] There is a **health endpoint** (or health check) that says whether the service is ready.
- [ ] The README states the exact command and what a successful start looks like.
- [ ] No step depends on a file, key, or database that only exists on your machine.

### 2. Its schema is versioned

- [ ] Schema changes are **migrations** — versioned, ordered, and reversible.
- [ ] A fresh database reaches the current schema with one command.
- [ ] Data that must survive a migration (records, vectors, checkpoints) is preserved by design, not by luck.
- [ ] You have run a migration forward and back at least once.

### 3. It is tested

- [ ] Unit tests cover the core logic — not every line, but every decision that matters.
- [ ] At least a few **integration tests** run against the real boundaries (the API, the database, the queue).
- [ ] **Contract tests** pin the interfaces other systems depend on, so a change that breaks a caller fails in CI.
- [ ] At least one **failure-path** test exists (a timeout, a bad input, a provider error).
- [ ] Tests run with one command and are green.
- [ ] Tests that need the network or a model are marked and can be skipped, so the suite runs offline.

### 4. It is observable

- [ ] **Structured logs** (keys and values), not free-text print statements, every line carrying a request id.
- [ ] One **trace per request or run**, so you can follow a single request end to end.
- [ ] A **metrics endpoint** exposing at least latency, error rate, and cost (or tokens).
- [ ] You have looked at the logs and traces yourself, not just written them.

### 5. It is safe

- [ ] Authentication and authorization are enforced where the brief requires them.
- [ ] Credentials are least-privilege and come from the environment or a secret store.
- [ ] Inputs are validated at the boundary.
- [ ] Dependency and image security checks run in CI (scan, SBOM, or both).
- [ ] Secrets are not in the repository, the logs, or the error messages.
- [ ] You can state the threat model in a sentence or two.

### 6. It is measured

- [ ] You can state **latency** (p50, p95, and p99), **cost**, and the **quality** metric relevant to the project.
- [ ] You can state **throughput** and the **saturation** point — the load at which the system stops coping.
- [ ] There is a **small labelled dataset** and a repeatable way to score the system's output against it.
- [ ] The numbers come from your own system, not from a blog post.
- [ ] You have a repeatable way to reproduce them (a benchmark script or a load test).
- [ ] You know which number would degrade first under load, and why.

### 7. It survives failure

- [ ] Timeouts exist on every external call.
- [ ] Retries are bounded and use backoff and jitter.
- [ ] A downstream failure degrades the system rather than crashing it.
- [ ] State is durable: a restart, a duplicate message, or a worker death does not lose or duplicate work.
- [ ] You have **actually run** a failure: killed a process, stopped a database, exhausted a queue, exceeded a budget.
- [ ] You have restored state from a backup or checkpoint and verified the data.
- [ ] You can tell the recovery story: what broke, how it behaved, how you fixed it.

### 8. It is documented

- [ ] A README that a stranger can follow: what it is, how to run it, how to test it.
- [ ] **ADRs** for the two or three hardest decisions, each with the alternatives you rejected and why.
- [ ] A **failure-mode table**: what can go wrong, the effect, and the mitigation.
- [ ] A **runbook** for the top failure modes, which you have actually followed during a drill.
- [ ] A short **postmortem** of one incident you caused on purpose: timeline, impact, cause, and what changed.
- [ ] A short **cost and latency report** with your real numbers.

### 9. It is presentable

- [ ] You can present it in **five minutes** without reading slides.
- [ ] You can answer "why not X?" for every major choice.
- [ ] You have a diagram you can draw from memory.

## The five-minute demo script

Rehearse this out loud before every project review or interview. It is the same shape for all six projects, and the times add up to five minutes.

1. **Problem (30s).** "This system does X for Y, and the hard part is Z."
2. **Architecture (60s).** Draw it. Name the components and the data flow in one pass.
3. **Happy path (60s).** Run a real request end to end and show the result.
4. **The interesting part (90s).** Show the one thing that makes it non-trivial — the routing, the checkpoint, the citation, the approval gate.
5. **Failure (30s).** Break something live and show how the system copes.
6. **Numbers (20s).** Latency, cost, quality — from your own measurements.
7. **What I would change (10s).** One honest limitation and how you would fix it.

> **The point of step 7.** Admitting a real limitation, with a plan, reads as senior. Claiming there are none reads as junior.

## What to submit

For each project, keep these together — in the repo itself or a short PDF:

- [ ] The repository, with a clean history.
- [ ] The README, ADRs, failure-mode table, runbook, postmortem, and cost/latency report.
- [ ] The benchmark and load-test scripts, with their baseline results.
- [ ] The threat model and the security test results.
- [ ] The architecture diagram.
- [ ] Screenshots or a short recording of the demo.
- [ ] A one-page portfolio summary you could attach to a job application (see the [portfolio spine](portfolio-spine.md)).

## Self-review before you call it done

Answer these honestly. Any "no" means there is more to do.

- [ ] Could a stranger run this from my README alone?
- [ ] Can I show a failure, its recovery, and a security test?
- [ ] Can I reproduce my numbers by running the committed benchmark scripts?
- [ ] Can I state three real numbers about it?
- [ ] Can I justify every major decision against an alternative?
- [ ] If the interviewer changed one requirement, do I know what I would change and why?

## How this maps to the lessons

The nine items above are the same themes the phases teach: correctness and testing (Phase 1), model usage (Phase 2), retrieval (Phase 3), agents (Phase 4), tools (Phase 5), distributed behaviour (Phase 6), platform (Phase 7), evaluation and reliability (Phase 8), security and governance (Phase 9), serving (Phase 10), architecture (Phase 11), and multi-agent systems (Phase 12). The project is where they stop being separate subjects.

> **The one-line test.** If you can design it, build it, measure it, break it, fix it, and explain why you chose it — it is done.
