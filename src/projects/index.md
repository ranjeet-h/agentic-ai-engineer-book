# Final Projects

The projects are where the phases stop being theory. Each one is a real system you build yourself, following a short brief rather than a step-by-step tutorial. This section gives you the **requirements, the shape, the milestones, and the acceptance criteria** — not the code.

That is deliberate. Reading a finished implementation teaches you what someone else decided; building to a brief forces you to make the decisions, hit the constraints, and debug the failures. That is the skill the interview and the job actually test.

## How to use this section

1. **Pick a project** and read its brief end to end before writing anything.
2. **Write your own plan first** — a component diagram, a data model, and one or two ADRs. Compare it to the suggested architecture afterwards.
3. **Build in milestones.** Each brief lists them in order; each is independently demoable.
4. **Self-assess against the acceptance criteria.** Every criterion is something you can show, not something you feel.
5. **Keep a decisions log.** Every time you choose one option over another, write down why. This is what you will present in a project deep dive (Phase 13).

## How to build any project, step by step

Every project follows the same method. The briefs add project-specific steps; this is the shape underneath them.

1. **Read the brief twice.** Once for the goal, once for the constraints and acceptance criteria.
2. **Write your own plan first.** A component diagram, a data model, and the two or three hardest decisions. Do not look at the suggested architecture until you have yours.
3. **Cut the thinnest end-to-end slice.** The smallest path that goes from input to output and actually works. No caching, no scale, no polish.
4. **Make it correct.** Tests for the core logic and at least one failure path. If it has a boundary, test the boundary.
5. **Make it observable.** Structured logs, one trace per request, and a metric you trust.
6. **Make it safe.** Authentication, authorization, least-privilege credentials, and input validation.
7. **Make it fast and cheap enough.** Measure first, then optimize the real bottleneck — not the one you assumed.
8. **Make it survive failure.** Timeouts, retries, graceful degradation, and a recovery you have actually run.
9. **Prove it.** Walk the acceptance criteria; every box must be demonstrable in a demo or a test.
10. **Write it down.** README, ADRs, a failure-mode table, and a cost/latency report.
11. **Rehearse the deep dive.** Present it in five minutes, then answer "why not X?" without notes.

> **Build order tip.** Front-load the risky, uncertain part — the thing you are not sure will work. Leave logging polish and documentation until the system is correct.

## The projects

| # | Project | Builds on | Rough scale |
| --- | --- | --- | --- |
| 1 | Production Enterprise RAG Engine | Phases 1, 3, 7, 8 | Medium-large |
| 2 | Autonomous Enterprise Workflow Agent | Phases 1, 4, 5, 6, 8, 9 | Large |
| 3 | Open-Source Agent Platform / AI Control Plane | Phases 6, 7, 9, 10, 11, 12 | Large |
| 4 | Production LLM Gateway | Phases 1, 6, 7, 8, 9 | Medium |
| 5 | AI Evaluation Platform | Phases 3, 4, 8 | Medium |
| 6 | Enterprise MCP Gateway | Phases 5, 7, 9 | Medium |

## Requirements that apply to every project

These are not optional extras. A project without them is a demo, not a system, and interviewers probe exactly these.

- **Configuration.** All settings come from the environment (or a config file), validated at startup. No secrets in code. It runs with one documented command.
- **Structured logging.** JSON logs with a request id, and no secrets or personal data in them.
- **Tests.** Unit tests for the core logic and at least a few integration tests over the real boundaries (API, database).
- **Containerised.** A `Dockerfile` that builds a runnable image, and `docker compose` for local dependencies. Non-root user, health endpoint.
- **Migrations.** Schema changes are versioned and reversible.
- **Observability.** At least one trace per request, and a metrics endpoint with latency, error rate, and cost.
- **Security.** Authentication where there is a user, least privilege for every credential, and a documented threat model.
- **Evaluation.** A small labelled dataset and a repeatable way to score the system's output. A number you can improve.
- **README and ADRs.** How to run it, what it does, and two or three Architecture Decision Records for the hard choices.
- **Cost awareness.** You can state the cost per request (or per task) from your own measurements.

## What this makes you ready for

The six projects are chosen so that finishing them maps onto the career ladder. Building Project 1 or 4 makes you a stronger **Senior Software Engineer**; adding evaluation makes you a **Senior AI Engineer**; Projects 2 and 6 make you an **Agentic AI Engineer**; Project 3 makes you an **AI Platform Engineer**; hardening Project 3 and writing its ADRs is **Staff/Principal** work; and presenting all of them as one portfolio is **AI Systems Architect** work.

See [Career Readiness — Roles and Specializations](../career-readiness/index.md) for the full role-by-role mapping, the specializations this book targets, and a readiness rubric you can score yourself against.

## Order and scope

You do not have to build all six. Build **one properly** rather than three halfway. A sensible path:

1. **Project 1 or 4 first** — they are self-contained and exercise most of the backend skills.
2. **Project 6 next** if you want to go deep on tools and security.
3. **Project 2** once you understand agents and durable execution.
4. **Projects 3 and 5** are the platform-level ones; build them last, when the smaller systems work.

> **The rule.** If you cannot demo it, measure it, and explain a trade-off you made while building it, it is not finished.
