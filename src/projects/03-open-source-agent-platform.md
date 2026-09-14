# Project 3 — Open-Source Agent Platform / AI Control Plane

> Build the control plane that lets many teams run many agents: registries, a scheduler, worker pools, a model gateway, and the governance around them.

## Goal

Prove you can design and operate a **platform**, not just an app. This is the project that tests tenancy, versioning, scheduling, policy, cost control, and the control/data/runtime split. It is the most system-design-heavy project in the book.

## What you will build

A platform with two faces:

- a **control plane** where agents, models, tools, prompts, and evaluations are registered, versioned, and governed;
- a **runtime plane** where registered agents are scheduled and executed by worker pools, using the gateway and registries.

The core architecture:

```text
Developers / Applications
          |
        SDK / API
          |
      API Gateway
          |
      Control Plane
          |
  +-------+--------+---------+
  |       |        |         |
Agent   Model    Tool      Prompt
Registry Registry Registry  Registry
  +-------+--------+---------+
          |
       Scheduler
          |
        Kafka
          |
  +-------+--------+
  |       |        |
Agent   Agent    Agent
Worker  Worker   Worker
          |
      Kubernetes
```

## Functional requirements

- **Registries.** Register and version agents, models, tools, MCP servers, prompts, evaluation datasets, and evaluators. Each entry is immutable once published.
- **Agent deployment.** Publish an agent version and route traffic to it; promote between environments.
- **Model gateway.** One API in front of multiple providers with routing, provider abstraction, fallback, load balancing, caching, and per-tenant quotas.
- **Scheduler.** Accept run requests, place them on queues by capability, and track status.
- **Workers.** Execute runs durably, reporting progress, heartbeats, and completion; recover leased work from dead workers.
- **Multi-tenancy.** Per-tenant isolation for data, keys, quotas, and cost attribution.
- **Policy.** RBAC/ABAC decisions and allowlists enforced at the gateway, not in prompts.
- **Evaluation and gates.** Register evaluators; require an eval gate before promoting a version.
- **Observability and audit.** Traces across gateway, scheduler, and workers; an append-only audit log.
- **Cost control.** Token budgets per run/tenant and a cost dashboard.

## Non-functional requirements

- **Scalability.** Workers scale on queue depth; the control plane stays stateless.
- **Availability.** A model or registry outage degrades gracefully, not fatally.
- **Isolation.** A buggy or hostile tenant cannot affect another tenant's runs or data.
- **Reproducibility.** A run records the exact agent, model, prompt, and tool versions used.
- **Governance.** Every promotion is traceable to an approver and an evaluation result.

## Suggested architecture

```mermaid
flowchart TD
    D["Developer / app"] --> GW["API gateway"]
    GW --> CP["Control plane<br/>registries · policy · config"]
    CP --> SCH["Scheduler"]
    SCH --> Q["Kafka / queue"]
    Q --> W1["Agent worker"]
    Q --> W2["Agent worker"]
    W1 --> MG["Model gateway"]
    W2 --> MG
    W1 --> TR["Tool / MCP registry"]
    W2 --> TR
    W1 --> DP["Data plane<br/>Postgres · vectors · object store"]
    CP -.-> OBS["Observability · audit · cost"]
    W1 -.-> OBS
```

## Suggested stack

- **Language:** Python.
- **Control plane:** FastAPI, PostgreSQL.
- **Messaging:** Kafka (or a managed equivalent), Redis for caching and quotas.
- **Runtime:** Kubernetes with horizontal pod autoscaling on queue depth.
- **Infra:** Terraform and Helm; container images in a registry.
- **Observability:** OpenTelemetry, Prometheus, Grafana.

## Control-plane data model sketch

| Registry | Key fields |
| --- | --- |
| Agents | name, version, image/config ref, capabilities, owner, status |
| Models | provider, model id, price, limits, health |
| Tools / MCP | server, tool schema, scopes, version |
| Prompts | template, variables, version, eval result |
| Evaluations | dataset version, evaluator, thresholds, result |
| Runs | tenant, agent version, status, cost, trace id |

## Milestones

1. **M0 — Skeleton.** Gateway + control plane + Postgres; register a model and a stub agent.
2. **M1 — Registries.** Create, version, and read back agents, models, and prompts.
3. **M2 — Gateway.** Route a call through the model gateway with fallback and quota.
4. **M3 — Scheduler + worker.** Run an agent end-to-end through a queue with status tracking.
5. **M4 — Durability.** Recover a lost worker's run; prove no duplicate side effects.
6. **M5 — Tenancy + policy.** Per-tenant keys, quotas, cost attribution, and an allowlist decision at the gateway.
7. **M6 — Evaluation gate.** Block promotion of a version that fails its eval threshold.
8. **M7 — Hardening.** Autoscaling, tracing, audit, cost dashboard, IaC, README and ADRs.

## Acceptance criteria

- [ ] I can register a model, a prompt, a tool, and an agent, each with a version.
- [ ] Promoting a version is gated on an evaluation result and is auditable.
- [ ] A run flows gateway -> scheduler -> worker -> gateway -> tool and returns a result.
- [ ] Killing a worker mid-run recovers the run without duplicate effects.
- [ ] Workers scale on queue depth and scale back down.
- [ ] A load test records throughput, queue depth, p95, and the first saturation point, with a written capacity plan and stated headroom (see [Load Testing, Capacity, and Saturation](../phase-06-distributed-systems/26-load-testing-capacity-and-saturation.md)).
- [ ] A chaos run injects duplicate delivery, worker death, network delay, and a dependency outage, and records expected versus observed for each safety and liveness invariant (see [Invariants, Chaos, and Recovery Testing](../phase-06-distributed-systems/27-invariants-chaos-and-recovery-testing.md)).
- [ ] A restore from backup verifies the recovery point objective, and a runbook is followed end to end.
- [ ] Serving memory is predicted before deployment and compared with measured use, and a model update drains and rolls back without dropping in-flight requests (see [Serving Capacity, Memory, and Benchmarking](../phase-10-model-serving-and-ai-infrastructure/15-serving-capacity-memory-and-benchmarking.md) and [Advanced Inference, Profiling, and Safe Rollouts](../phase-10-model-serving-and-ai-infrastructure/16-advanced-inference-profiling-and-safe-rollouts.md)).
- [ ] A tenant cannot exceed its token budget, and cannot see another tenant's data or cost.
- [ ] A disallowed tool is refused at the gateway (not by the prompt).
- [ ] A trace shows the full path across gateway, scheduler, and worker.
- [ ] The platform deploys from Terraform + Helm with one documented pipeline.
- [ ] A secret is rotated with no downtime, and only signed images are admitted (see [Supply Chain, FinOps, and GPU Scheduling](../phase-07-ai-platform-engineering/25-supply-chain-finops-and-gpu-scheduling.md)).
- [ ] A backup is restored into a scratch environment, the data is verified, and the measured recovery time meets the RTO (see [Kubernetes Operations, Backup, and Restore](../phase-07-ai-platform-engineering/24-kubernetes-operations-backup-and-restore.md)).
- [ ] A cost report attributes spend per tenant and service, and a budget alert fires before the limit is hit.

## Stretch goals

- A self-service portal or CLI for publishing agents.
- Blue-green or canary promotion of an agent version with automatic rollback.
- A shared tool/MCP marketplace with review workflow.
- Chargeback reports per team.

## What to document

- README: architecture, the control/data/runtime split, and how to publish an agent.
- Three ADRs: the registry model, the scheduling and queue design, and the tenancy model.
- A failure-mode table: what happens when the gateway, scheduler, queue, or a worker fails.

## How to build it, step by step

This is the most design-heavy project, so start with the registry contracts and the control-plane data model, because everything else references a version. Prove one run can travel gateway to scheduler to worker to model gateway and back before adding a second tenant or a policy rule. Leave autoscaling, infrastructure as code, and dashboards until the core path is observable.

1. Create the repository with a layout for control plane, model gateway, workers, and SDK; add shared config and CI lint/test.
2. Define the registry contracts for agents, models, tools/MCP, prompts, evaluations, and runs, each immutable once published.
3. Write the PostgreSQL schema and migrations for those registries, with version and status columns.
4. Stand up the control-plane API in FastAPI and register then read back a model and a stub agent version.
5. Build the model gateway: one interface with provider adapters, routing by task and cost, and fallback.
6. Add the scheduler: accept a run request, place it on a queue by capability, and track status.
7. Add one worker pool that consumes a queued run, executes the stub agent through the model gateway, and reports heartbeat and completion.
8. Close the thinnest end-to-end run path (gateway to scheduler to queue to worker to gateway to result) and trace it.
9. Add durable leases so a dead worker's run is recovered without duplicate side effects.
10. Add the prompt and tool/MCP registries, and have a run record exactly which versions it used.
11. Add multi-tenancy: per-tenant keys, data isolation, and cost attribution on runs.
12. Add policy and RBAC at the gateway: allowlists and decisions enforced outside prompts, deny by default.
13. Add per-tenant token quotas and budgets, and refuse a run that would exceed them.
14. Register evaluators and a versioned dataset, then run an evaluation for an agent version.
15. Add the promotion gate: block publishing an agent version that fails its eval threshold, and record the approver.
16. Prove recovery by killing a worker mid-run, showing the run resumes, and proving no duplicate effects.
17. Add end-to-end traces across gateway, scheduler, and worker, an append-only audit log, and a cost dashboard.
18. Add worker autoscaling on queue depth and confirm it scales back down.
19. Package the platform as Terraform plus Helm with one documented deploy pipeline.
20. Harden and document last: write the failure-mode table, the three ADRs (registry model, scheduling and queue design, tenancy model), and the README, then re-run the acceptance checks.

> **Build order tip.** Prove one run can travel gateway to scheduler to worker to model gateway before adding a second tenant or a policy rule. Multi-tenancy, eval gates, and autoscaling are much easier to reason about once that single path is observable.

## Builds on

Phase 6 (Distributed Systems), Phase 7 (AI Platform Engineering), Phase 9 (Security and Governance), Phase 10 (Model Serving), Phase 11 (AI Systems Architecture), Phase 12 (Multi-Agent Systems).
