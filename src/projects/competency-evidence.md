# Competency and Evidence Contract

> Reading a page proves nothing. This page defines the loop every phase and project must complete — **learn → build → measure → break → explain** — and the checkpoint record that proves it.

## Why this exists

This book is a knowledge map. Knowledge is necessary but not sufficient: interviews, promotions, and real incidents test whether you can **design, build, operate, and defend** a system.

The failure mode is easy to fall into. You read 300 pages, understand every concept, and still cannot answer "show me a system you built, what broke, and how you fixed it." That gap is the difference between interview familiarity and job readiness.

This contract closes the gap. Every phase ends with a **checkpoint** that produces an artifact — code, a benchmark, a trace, a threat model, an incident report, an ADR — and a short oral explanation. The artifact is the proof; the explanation is the interview rehearsal.

## The five steps

Every topic cluster and every project runs through the same five steps.

| Step | What it means | What it produces |
| --- | --- | --- |
| **Learn** | Understand the concept and its vocabulary well enough to explain it from first principles. | Study notes and a two-sentence oral answer |
| **Build** | Implement it yourself, from a blank directory, without following a tutorial. | A running artifact in your own repository |
| **Measure** | State the exact metric and the baseline you compared against. | Numbers: latency, throughput, cost, quality |
| **Break** | Inject the failure the design claims to survive, and recover. | A failure report and a runbook |
| **Explain** | Give the oral answer, the trade-off, and answer "why not X?" | A recorded or written explanation |

A capability is only complete when all five are done. Building without measuring, or measuring without breaking, leaves the most important interview questions unanswered.

## The checkpoint record

At the end of every phase, write one checkpoint record. Copy this shape into `artifacts/phase-NN/checkpoint.md` in your own project repository.

```text
checkpoint:
  phase: 1
  capability: API compatibility
  artifact: artifacts/phase-01/api-compatibility.md
  baseline: v1 client fails against the unversioned change
  change: added a versioned response and a compatibility test
  result: v1 and v2 clients pass their contract suites
  failure_test: removed a required field from the response
  recovery: restored the compatibility adapter and rejected the breaking release
  explanation: explain the migration and why a versioned contract was chosen
```

The seven fields are deliberate:

- **capability** — the one thing you can now do, named precisely.
- **artifact** — where the evidence lives. A path, not a promise.
- **baseline** — what was true before your change. Without this, a number means nothing.
- **change** — what you did.
- **result** — the measured outcome, not a feeling.
- **failure_test** — the specific thing you broke.
- **recovery** — how the system behaved and how you restored it.
- **explanation** — the sentence you would say in an interview.

## The readiness scale

Score each capability from 0 to 5. Do not mark a level from reading alone.

| Level | Meaning | Evidence |
| --- | --- | --- |
| **0 — Unfamiliar** | Cannot explain the term. | Nothing reliable. |
| **1 — Aware** | Can define the concept and recognise examples. | A short oral answer; no independent build. |
| **2 — Working** | Can implement a guided example and test the happy path. | A lab passes with support. |
| **3 — Production-capable** | Can choose, implement, measure, secure, and operate it. | Independent project evidence and a failure drill. |
| **4 — Senior-level** | Can compare alternatives, debug failures, and teach the decision. | ADR, incident report, benchmark, and interview defence. |
| **5 — Staff/architect-level** | Can set direction across teams and connect choices to business risk and cost. | RFC, roadmap, design review, migration plan, and stakeholder presentation. |

The role exit gates in [Career Readiness](../career-readiness/index.md) state which level each role requires.

## Phase checkpoint index

Each phase index repeats its checkpoint in full. This is the master list.

| Phase | Checkpoint artifact | Pass condition |
| --- | --- | --- |
| 1 — Production Python | A typed FastAPI service built from a blank directory | A versioned API, migration, Redis use, unit/integration/contract tests, a load baseline, structured logs, and a documented failure investigation; one backward-compatible API change and one deliberate performance fix. |
| 2 — LLM Fundamentals | A controlled experiment report with lineage | A fixed dataset, hypothesis, baseline, metric, confidence interval, variance explanation, and data/code/config/model lineage; one intentionally leaked dataset corrected. |
| 3 — RAG Engineering | An incremental-ingestion and deletion report | A changed document ingested twice produces no duplicate chunks; a corrected document is backfilled; a deleted document disappears from source, chunks, vectors, cache, and logs; in-flight queries stay consistent. |
| 4 — Agentic AI | A side-effect replay proof | The worker is killed at every side-effect boundary and the run resumes with no duplicate effect; a mutated approval payload is refused. |
| 5 — MCP and Tools | A protocol conformance suite | A compatible schema change is accepted; a breaking change is rejected; a server that disappears mid-call is handled; an invalid tool result is rejected. |
| 6 — Distributed Systems | A load-and-chaos report | Worker death, duplicate delivery, network delay, dependency outage, and clock skew each have an expected result, an observed result, and a follow-up change; capacity and recovery numbers are recorded. |
| 7 — AI Platform | A deploy-and-operate report | One project deployed from a clean environment with Terraform and Helm; a canary or blue-green release, a secret rotation, a worker kill, a backup restore, and a rollback, with a cost report. |
| 8 — Reliability | An SLO incident drill and postmortem | SLOs defined, a load test run, a provider outage and queue backlog injected, a meaningful alert paged, a runbook followed, recovery shown, and a quality regression added to the evaluation set. |
| 9 — Security | A threat model and exploit lab | Assets, trust boundaries, abuse cases, controls, and residual risk documented; invalid tokens, unauthorised tool access, replay, injected tool output, a vulnerable dependency, secret redaction, and tenant deletion demonstrated. |
| 10 — Model Serving | A serving benchmark | Memory predicted before deployment and compared to measured use; two configurations benchmarked on latency, throughput, quality, and cost; safe draining and rollback during a model update. |
| 11 — Architecture | An architecture package | Requirements, estimates, two alternatives, a recommendation, ADRs, TCO, a migration plan, an ownership model, a six-month roadmap, a risk register, and two presentations (technical and executive). |
| 12 — Multi-Agent | A single-versus-multi-agent comparison | The same task built both ways, with quality, latency, cost, failure rate, coordination failures, and user-visible behaviour; the multi-agent design is kept only if the measured benefit justifies the complexity. |
| 13 — Interview Preparation | A drill and portfolio package | 30 timed coding solutions, 15 SQL problems, 10 backend/distributed design drills, 10 AI system-design drills, 8 behavioural stories, and recorded walkthroughs. |

## Where your artifacts live

Keep the evidence in your own repository, not in this book. A workable layout:

```text
artifacts/
  phase-01/
    checkpoint.md
    load-baseline.json
    incident-2026-01-04.md
  phase-03/
    freshness-report.md
    deletion-proof.md
  ...
```

Every artifact is something a reviewer can open. A claim without a file is a claim without evidence.

## Anti-patterns

- **Reading as proof.** "I read the RAG chapter" is level 1. It is not readiness.
- **A name without a mechanism.** Naming a tool or vendor without explaining the mechanism, the trade-off, and why you chose it.
- **A happy-path demo.** If you never broke it, you do not know how it fails.
- **A number without a baseline.** "p95 is 200 ms" means nothing unless you know what it was before and what it needs to be.
- **An explanation that cannot survive "why not X?"** If you cannot name the alternative you rejected and why, the decision is not yours yet.
- **Six unfinished projects.** One deployed, measured, broken, secured, explained system beats six half-built demos. See the [portfolio spine](portfolio-spine.md).

> **The rule.** If it is not measured, broken, and explained, it is not done — it is only read.

## Related pages

- [Definition of Done](definition-of-done.md) — the shared bar every project must clear.
- [Portfolio Spine](portfolio-spine.md) — how the projects connect into one coherent showcase.
- [Career Readiness](../career-readiness/index.md) — the role ladder, specializations, and exit gates.
