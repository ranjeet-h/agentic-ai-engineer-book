# Agentic AI Engineering Syllabus Analysis

**Date:** 2026-09-14  
**Scope:** Review of the roadmap, rendered-book structure, project briefs, career-readiness mapping, and authoring specification.  
**Target outcome:** Prepare for Senior Software Engineer, Senior AI Engineer, Agentic AI Engineer, AI Platform Engineer, Staff/Principal AI Engineer, and AI Systems Architect roles across AI Engineering, Agentic AI, AI Platform Engineering, Backend Engineering, Distributed Systems, Cloud Infrastructure, AI Reliability, AI Security, and System Architecture.

## Executive verdict

This is an unusually broad and well-organized syllabus. It already covers most of the vocabulary expected in modern AI engineering interviews, and it has stronger production intent than a typical LLM curriculum.

The main weakness is not a lack of topics. It is a lack of **proof of competence** and a few missing foundations around the topics that senior engineers are expected to own.

The current repository is best described as:

> **A strong knowledge map and project brief collection, but not yet a complete competency program.**

The syllabus can produce interview familiarity. It will produce job readiness only after every important area has a build exercise, measurable acceptance criteria, failure drills, and role-specific exit gates.

### High-level assessment

| Dimension | Current assessment | Finding |
| --- | --- | --- |
| Topic breadth | Strong | 13 phases and 261 topic pages cover a very large surface area. |
| AI/agent concepts | Strong | LLMs, RAG, agents, MCP, multi-agent systems, serving, evaluation, and security are well represented. |
| Backend/distributed foundations | Good but uneven | Important patterns are present, but core software, Linux, networking, and data-engineering depth is not explicit enough. |
| Cloud/platform coverage | Good survey level | AWS, Docker, Kubernetes, Terraform, Helm, CI/CD, and registries are present; production operations need more hands-on depth. |
| Reliability/security | Strong conceptual coverage | The controls are named, but chaos, incident, identity, application security, and evidence-based exercises need expansion. |
| Staff/architect readiness | Partial | Architecture topics are present; influence, strategy, economics, communication, and decision leadership are underdeveloped. |
| Interview readiness | Partial | Question banks exist, but timed drills, grading rubrics, mock interviews, and coding/system-design repetitions are not yet a complete practice loop. |
| Portfolio readiness | Partial | Six excellent briefs exist, but the learner must still produce deployed, measured, broken, secured, and publicly explainable systems. |

## Evidence reviewed

The analysis is based on:

- `phasewise-topic.md` — the complete roadmap and final-project requirements.
- `src/SUMMARY.md` — the actual book navigation and published page inventory.
- `src/phase-*/index.md` — phase outcomes and study sequence.
- `src/projects/index.md` — project order, shared requirements, and build process.
- `src/projects/definition-of-done.md` — current project quality bar.
- `src/projects/01-*.md` through `src/projects/06-*.md` — project requirements and acceptance criteria.
- `src/career-readiness/index.md` — current role and specialization mapping.
- `docs/superpowers/specs/2026-09-13-agentic-ai-study-book-design.md` — authoring and review standard.

This is a structural and competency audit. It is not a line-by-line fact check of every page or a survey of current job descriptions. Version-specific technologies and regulations should be refreshed periodically.

## What is already strong

### 1. The learning sequence is coherent

The progression from Production Python → LLMs → RAG → agents → tools → distributed systems → platform → reliability/security → serving → architecture is sensible. It reflects how production systems are assembled rather than presenting isolated prompt techniques.

### 2. The syllabus understands production failure

The roadmap repeatedly addresses retries, idempotency, durable execution, checkpoints, budgets, permissions, audit logs, tenant isolation, evaluation, SLOs, and graceful degradation. This is a major strength.

### 3. The project briefs aim above tutorial level

The projects require tests, migrations, structured logging, traces, metrics, security, evaluation, failure injection, ADRs, cost reports, and architecture diagrams. `src/projects/definition-of-done.md` sets a useful standard: design it, build it, measure it, break it, fix it, and explain it.

### 4. The role mapping is directionally correct

`src/career-readiness/index.md` correctly treats the career ladder as cumulative. Backend and distributed-systems ability does not disappear when someone becomes an AI engineer; platform and architecture add responsibilities on top.

### 5. The authoring specification has a good quality bar

The topic template requires first principles, examples, production trade-offs, interview questions, and recall points. This is a strong standard for readable study material.

## Critical findings

## Finding 1 — The syllabus is a topic catalog more than a competency system

**Priority:** P0  
**Impact:** Very high  
**Reason:** Reading 261 pages does not demonstrate that a learner can design, implement, operate, or defend a system.

The project briefs and readiness page already point in the right direction, but the curriculum does not yet make practical evidence a requirement for each major capability. A learner can finish the reading and still have no proof that they can:

- write a production service without a tutorial;
- debug a failed distributed workflow;
- tune retrieval with measured improvement;
- operate a service under load;
- recover from a failure;
- prevent a security exploit;
- explain an architecture under questioning.

### What to add

Every major topic or topic cluster should have:

1. **A small lab** with a concrete input and output.
2. **A failure lab** that intentionally breaks the mechanism.
3. **An assessment** with expected behavior, not a vague reflection.
4. **A link to one final project** where the concept is used for real.
5. **A short oral explanation prompt** for interview practice.

Every phase should end with a checkpoint that produces an artifact: code, benchmark, trace, threat model, incident report, ADR, or design review.

## Finding 2 — Senior software-engineering foundations are not explicit enough

**Priority:** P0  
**Impact:** Very high  
**Reason:** The target ladder starts at Senior Software Engineer, but Phase 1 focuses mainly on Python and service ingredients.

Phase 1 covers Python, FastAPI, databases, Redis, testing, Docker, and CI/CD. Phase 6 covers distributed-system patterns. The following senior-level foundations are missing or only implicit:

- data structures and algorithms as engineering tools, not only interview exercises;
- Linux processes, filesystems, signals, permissions, and debugging;
- HTTP semantics, DNS, TLS, TCP basics, connection pooling, and proxy behavior;
- Git internals, branching, rebasing, code review, release management, and rollback;
- API evolution, compatibility, versioning, pagination, error contracts, and deprecation;
- software design principles, boundaries, dependency inversion, and maintainable module design;
- property-based testing, contract testing, mutation testing, load testing, and test pyramids;
- profiling under realistic load and performance budgets;
- debugging methodology and production incident investigation.

### What to add

Create a **Software Engineering Core** track before or alongside Phase 1:

1. Algorithms and data structures for production and interviews.
2. Linux and runtime fundamentals.
3. Networking and HTTP for backend engineers.
4. Git, code review, release engineering, and API lifecycle.
5. Software design and modular architecture.
6. Testing strategy: unit, integration, contract, property, mutation, and load tests.
7. Debugging and performance engineering.

### Evidence required

- Build and test a service from a blank repository.
- Diagnose a deliberately slow endpoint using profiles and traces.
- Evolve an API without breaking an old client.
- Write a post-incident debugging report from logs, metrics, and a failing test.

## Finding 3 — Statistics, classical machine learning, and ML system fundamentals are too thin

**Priority:** P0  
**Impact:** High  
**Reason:** Phase 2 moves quickly from basic neural-network concepts into LLM mechanisms.

The roadmap includes machine learning fundamentals, neural networks, PyTorch, transformers, fine-tuning, and RLHF. It does not give enough explicit attention to the statistical and experimental foundation needed to evaluate model behavior or discuss ML systems credibly:

- probability, distributions, expectation, variance, covariance, and Bayes reasoning;
- sampling, confidence intervals, hypothesis tests, and experiment design;
- train/validation/test splits, leakage, overfitting, regularization, and calibration;
- classification and ranking metrics beyond the RAG context;
- optimization, loss functions, learning-rate schedules, and training instability;
- data imbalance, label quality, annotation agreement, and dataset bias;
- feature engineering and the difference between training, serving, and monitoring data;
- reproducibility, seeds, experiment tracking, and model lineage.

### What to add

Add a **Math, Statistics, and ML Systems Primer** before the deep LLM material. It does not need to become a research curriculum. It must let a senior engineer:

- choose a valid metric;
- detect leakage and selection bias;
- interpret uncertainty;
- explain why a model change is or is not meaningful;
- connect data quality to production behavior.

### Evidence required

- Run a small experiment with confidence intervals and a written conclusion.
- Demonstrate data leakage and then remove it.
- Compare two models using a fixed dataset and explain variance.
- Track data, code, configuration, model, and metric lineage.

## Finding 4 — Data engineering and knowledge-data lifecycle coverage is incomplete

**Priority:** P0  
**Impact:** Very high  
**Reason:** Production AI systems fail as often from bad data pipelines and stale permissions as from bad prompts.

The RAG phase covers parsing, chunking, embeddings, retrieval, access control, and evaluation. The platform phase covers registries. The missing layer is the broader data lifecycle:

- batch and streaming ingestion architecture;
- workflow orchestration and scheduling for data pipelines;
- data contracts, schema evolution, validation, and quality checks;
- lineage, provenance, freshness, retention, and deletion;
- backfills, replay, deduplication, and exactly-once effects in data pipelines;
- lake, warehouse, and object-storage design;
- change-data capture and event-based indexing;
- annotation workflows, human labelling, and dataset versioning at scale;
- feature stores and online/offline consistency where predictive ML is used;
- privacy-aware deletion from indexes, caches, logs, and backups.

### What to add

Add a **Data and Knowledge Engineering** track covering the data plane behind RAG, evaluation, and model training. Tie it directly to Project 1 and Project 5.

### Evidence required

- Ingest a changing source with retries, deduplication, versioning, and replay.
- Prove that deleting a document removes it from retrieval, cache, and derived indexes.
- Show a data-quality report and a freshness SLO.
- Perform a backfill without corrupting live queries.

## Finding 5 — MLOps and the full model lifecycle need a dedicated path

**Priority:** P0  
**Impact:** High  
**Reason:** The current material contains model registries, evaluation gates, serving, and deployment, but not a clearly connected model lifecycle.

A production AI engineer should understand the path:

```text
Data → experiment → training/fine-tuning → artifact → evaluation
     → registry → approval → deployment → monitoring → rollback
```

The current phases discuss most boxes separately. The lifecycle needs to be taught and built as one system, including:

- experiment tracking and reproducibility;
- model and dataset lineage;
- artifact packaging and promotion between environments;
- offline/online feature or input parity;
- model cards, risk documentation, and release criteria;
- shadow, canary, rollback, and champion/challenger operation;
- model drift, data drift, concept drift, and feedback loops;
- scheduled retraining and safe re-evaluation;
- model license and usage constraints.

### What to add

Add a **MLOps and Model Lifecycle** mini-phase, or make it a cross-project spine between Phases 7, 8, 9, and 10.

### Evidence required

- Promote a model through development, staging, and production gates.
- Roll back a model after a quality or latency regression.
- Reproduce a historical result from recorded artifacts.
- Show a monitoring signal that triggers investigation or rollback.

## Finding 6 — Cloud and platform content is broad but not operationally deep enough

**Priority:** P0  
**Impact:** Very high  
**Reason:** Listing Kubernetes and AWS resources is not the same as operating an AI platform.

Phase 7 covers Docker, Kubernetes, Terraform, Helm, GitHub Actions, and many AWS services. The missing depth is what platform and cloud interviews probe:

- Linux and container runtime troubleshooting;
- DNS, TLS certificates, ingress, NAT, private networking, and service-to-service identity;
- Kubernetes scheduling, probes, disruption budgets, affinity, taints, quotas, and upgrades;
- stateful workloads, storage classes, backups, restore testing, and data migration;
- GitOps, environment promotion, drift detection, and secret rotation;
- image provenance, SBOMs, signing, admission control, and supply-chain policy;
- queue-depth autoscaling and the difference between CPU scaling and work scaling;
- GPU node pools, device plugins, quotas, bin-packing, and capacity reservations;
- cloud cost allocation, budgets, tagging, and FinOps;
- operational ownership, support boundaries, and platform product thinking.

### What to add

Turn Phase 7 into a **build-and-operate** track rather than only a service survey. Add a production lab that deploys one project to a real or local Kubernetes environment, performs a rollout, injects a failure, restores data, and demonstrates rollback.

### Evidence required

- Deploy with Terraform and Helm from a clean account or cluster.
- Rotate a secret without downtime.
- Roll back a bad release and explain the observed signals.
- Restore a database or object store backup and verify data integrity.
- Produce a cost report with per-tenant or per-service attribution.

## Finding 7 — AI reliability needs SRE practice, not only reliability vocabulary

**Priority:** P0  
**Impact:** Very high  
**Reason:** Phase 8 names SLOs, SLIs, error budgets, tracing, metrics, incident response, and drift, but the learner needs repeated operational drills.

Missing or under-emphasized reliability practices include:

- service ownership and on-call responsibilities;
- alert quality, paging thresholds, and runbooks;
- load, stress, soak, and concurrency testing;
- chaos engineering and failure injection;
- dependency mapping and critical-path analysis;
- recovery time objective and recovery point objective testing;
- graceful degradation and user-visible quality tiers;
- incident command, communication, timeline writing, and blameless postmortems;
- capacity planning from measured queueing and saturation;
- reliability of evaluation itself, including flaky judges and changing providers.

### What to add

Add an **AI SRE Lab** to Phase 8 and require it in at least Projects 2, 3, and 4:

1. Define SLOs and an error budget.
2. Run a load test and record p50/p95/p99 latency, throughput, saturation, and cost.
3. Kill workers, stop dependencies, exhaust quotas, and inject provider failures.
4. Recover using a runbook.
5. Write a postmortem and update the design.

## Finding 8 — AI security is strong conceptually, but security foundations are incomplete

**Priority:** P0  
**Impact:** Very high  
**Reason:** AI-specific threats are well covered, but senior engineers also need the ordinary security mechanisms that enforce the controls.

Phase 9 covers prompt injection, poisoning, exfiltration, excessive agency, sandboxing, least privilege, policies, privacy, encryption, secrets, supply chain, and governance. Add explicit treatment of:

- OAuth 2.0, OpenID Connect, JWT validation, key rotation, and token audience/issuer checks;
- mTLS, service identity, certificate rotation, and zero-trust boundaries;
- secure session management and replay protection;
- common web/API vulnerabilities and secure coding;
- threat modeling methods such as STRIDE and attack trees;
- SAST, DAST, dependency scanning, SBOMs, signing, provenance, and admission policies;
- network segmentation, egress controls, WAFs, and cloud IAM conditions;
- data retention, deletion, residency, consent, and access review;
- practical compliance mapping instead of only governance vocabulary.

### Evidence required

- Attack a deliberately vulnerable agent or gateway in a controlled lab.
- Demonstrate token validation failures and correct them.
- Generate an SBOM, scan dependencies, and block a vulnerable artifact.
- Write a threat model with assets, trust boundaries, abuse cases, controls, and residual risk.

## Finding 9 — Model serving needs more capacity and GPU operations practice

**Priority:** P1  
**Impact:** High  
**Reason:** Phase 10 explains the main serving concepts, but production serving decisions require measured capacity work.

Important additions:

- parameter and KV-cache memory calculations;
- queueing effects and admission control;
- prefill versus decode behavior;
- prefix caching and speculative decoding;
- tokenizer throughput and input-length limits;
- CUDA/NCCL failure modes and profiling basics;
- GPU fragmentation, utilization versus throughput, and thermal/capacity constraints;
- multi-GPU placement and network bandwidth;
- load testing representative prompt-length distributions;
- model warmup, draining, graceful shutdown, and rollout behavior;
- inference server comparison using a repeatable benchmark.

### Evidence required

- Predict memory use before deployment and compare it to measured use.
- Benchmark two serving configurations across latency, throughput, quality, and cost.
- Demonstrate safe draining and rollback during a model update.
- Explain the first bottleneck at low, medium, and saturated load.

## Finding 10 — Staff, principal, and architect skills need a dedicated leadership curriculum

**Priority:** P0  
**Impact:** Very high  
**Reason:** Phase 11 teaches architecture mechanics, but Staff/Principal and Architect roles are also about influence and organizational decisions.

The current material needs explicit practice in:

- writing RFCs and decision documents for mixed audiences;
- leading design reviews and resolving disagreement;
- defining technical strategy and a sequenced roadmap;
- identifying platform customers and designing a good internal developer experience;
- setting standards and reusable golden paths across teams;
- mentoring, delegation, and raising engineering quality;
- communicating risk, cost, and uncertainty to executives;
- build-versus-buy economics and vendor evaluation;
- organizational boundaries, ownership, and operating models;
- migration planning, deprecation, and adoption measurement;
- handling a failed decision and changing direction without blame.

### What to add

Create a **Technical Leadership and Architecture Practice** track with exercises:

1. Write an RFC with two alternatives and a recommendation.
2. Conduct a recorded design review.
3. Create a six-month platform roadmap with milestones and risks.
4. Write a vendor comparison using total cost of ownership.
5. Present the same architecture to engineers, product leadership, and executives.
6. Write a migration and deprecation plan for a breaking change.

## Finding 11 — The role ladder needs differentiated paths and exit gates

**Priority:** P0  
**Impact:** Very high  
**Reason:** The existing career-readiness page maps roles well, but it largely points every role at the same large curriculum and projects.

The learner needs to know what is **required**, what is **supporting**, and what is **optional** for a specific target role. Otherwise the program is too large to finish and progress is hard to measure.

### Recommended path model

```text
Common Core
  → choose a primary role track
  → choose one secondary specialization
  → complete the matching evidence project
  → pass the role exit gate
```

Do not require every learner to complete all six final projects. Require one primary project and one smaller secondary project, then use architecture drills to connect them.

## Finding 12 — Interview preparation needs simulation, not only question pages

**Priority:** P0  
**Impact:** High  
**Reason:** Phase 13 has useful question banks and answer patterns, but interview performance requires timed retrieval, coding, diagrams, and follow-up pressure.

Add:

- timed Python and data-structure drills with hidden tests;
- SQL exercises with query plans and performance follow-ups;
- debugging sessions from logs, traces, and failing tests;
- low-level design exercises with interfaces and test strategy;
- high-level system-design prompts with capacity numbers and changing requirements;
- AI-specific debugging cases: bad retrieval, tool loops, judge bias, cost spikes, and provider outages;
- mock interviews with a rubric and recorded self-review;
- a project deep-dive question tree that includes hostile follow-ups;
- a behavioral story bank using Situation → Action → Result → Learning;
- resume and portfolio evidence checks.

### Required interview artifacts

- 30 timed coding solutions with tests.
- 15 SQL problems, including indexes and query plans.
- 10 backend/distributed design drills.
- 10 AI system-design drills.
- 6 recorded five-minute project walkthroughs or one portfolio walkthrough with six variants.
- 8 behavioral stories covering failure, conflict, leadership, ambiguity, mentoring, and measurable impact.

## Finding 13 — The projects are strong, but the portfolio strategy is too large and not integrated enough

**Priority:** P1  
**Impact:** High  
**Reason:** Six ambitious projects can create breadth without completion. The projects also appear as separate systems rather than one coherent portfolio with shared contracts.

### Recommended portfolio strategy

Build one **portfolio spine**:

```text
Project 1: RAG capability
        ↓
Project 2: safe agent workflow
        ↓
Project 4: shared LLM gateway
        ↓
Project 6: secure tool gateway
        ↓
Project 5: evaluation and release gate
        ↓
Project 3: platform/control plane integration
```

The learner should choose one of these as the primary showcase system and integrate at least two supporting capabilities. This makes the architecture story coherent and demonstrates reuse, platform thinking, and trade-offs.

### Add to every project

- a starter test harness and contract fixtures;
- a local, low-cost deployment path;
- a cloud deployment path;
- a load-test scenario and baseline numbers;
- a security test suite;
- a failure-injection script;
- a migration and rollback exercise;
- a demo dataset with reproducible seeds;
- a portfolio summary showing decisions, evidence, and limitations.

## Finding 14 — Product, human factors, and domain delivery are underrepresented

**Priority:** P1  
**Impact:** Medium-high  
**Reason:** Real AI engineers build systems for users and business processes, not only infrastructure.

Add practical material on:

- converting a vague business problem into an AI/non-AI decision;
- defining user and business success metrics;
- human-in-the-loop UX and trust calibration;
- uncertainty, abstention, escalation, and user feedback;
- accessibility and usable error states;
- prompt and policy changes as product changes;
- domain adaptation and subject-matter-expert collaboration;
- adoption, support, and change management;
- cost and quality trade-offs from the user's perspective.

This is especially important for Senior AI Engineer, Forward Deployed, Solutions Architect, and Staff roles.

## Role readiness matrix

The following matrix separates the existing strengths from the additions needed for credible readiness.

| Role | Existing foundation | Highest-priority additions | Minimum evidence before claiming readiness |
| --- | --- | --- | --- |
| Senior Software Engineer | Python, FastAPI, SQLAlchemy, PostgreSQL, Redis, testing, Docker, CI/CD, distributed patterns | Algorithms, Linux, networking, API lifecycle, debugging, load testing, code review, release operations | One service built from scratch, tested, deployed, load-tested, failure-injected, and explained end to end |
| Senior AI Engineer | LLMs, RAG, embeddings, retrieval, evaluation, providers, cost/latency concepts | Statistics, data quality, MLOps, experiment design, dataset lineage, model lifecycle, product metrics | A measured RAG or AI feature with labelled evaluation, regression gate, cost/latency report, and a real quality improvement |
| Agentic AI Engineer | Agent loops, memory, tools, LangGraph, durable state, approvals, MCP, multi-agent patterns | Tool contract testing, side-effect semantics, sandboxing, replay, UX for approvals, adversarial evaluation | An agent that resumes after failure, avoids duplicate effects, enforces permissions, and has traces plus attack tests |
| AI Platform Engineer | Registries, gateway, tenancy, quotas, Kubernetes, Terraform, AWS, deployment strategies | Platform product thinking, GitOps, cloud networking, GPU operations, supply chain, backup/restore, cost allocation | A multi-tenant platform deployed from IaC with promotion gates, rollback, autoscaling, isolation tests, and SLOs |
| Staff / Principal AI Engineer | Architecture, estimates, ADRs, reliability, security, cost, multi-region concepts | Technical strategy, influence, design reviews, roadmap, TCO, standards, mentoring, migration leadership | A defended architecture proposal, roadmap, review recording, failure plan, ADR set, and measurable trade-off analysis |
| AI Systems Architect | End-to-end architecture across data, models, agents, platform, cloud, security, and operations | Executive communication, domain discovery, governance implementation, organizational ownership, vendor economics | A complete portfolio architecture from requirements to rollout, with alternatives, economics, risks, compliance, and operating model |

## Specialization gap matrix

| Specialization | Current strength | Gap to close | Recommended proof |
| --- | --- | --- | --- |
| AI Engineering | LLM fundamentals, RAG, evaluation, providers | Statistics, data quality, MLOps, product metrics, model lifecycle | Reproducible AI feature with quality, cost, and latency improvements |
| Agentic AI | Agent loops, memory, orchestration, approvals, MCP | Replay, side-effect safety, adversarial tests, human factors, bounded autonomy | Durable workflow agent with failure and security demonstrations |
| AI Platform Engineering | Registries, gateway, tenancy, Kubernetes, IaC | Platform UX, GitOps, operations, backups, GPU scheduling, supply chain | Self-service platform deployed and operated by another user |
| Backend Engineering | Python services, APIs, databases, jobs, Redis | Linux, networking, API evolution, testing depth, performance, debugging | Production service with compatibility, load, and incident evidence |
| Distributed Systems | Queues, Kafka, delivery, idempotency, sagas, workflows | Formal invariants, load behavior, coordination edge cases, recovery testing | Worker platform with duplicate delivery, worker death, and replay tests |
| Cloud Infrastructure | AWS catalog, Docker, Kubernetes, Terraform, Helm, CI/CD | Private networking, identity, GitOps, restore, cost, GPU operations | Reproducible cloud deployment with rollback and restore evidence |
| AI Reliability | Evaluation, tracing, metrics, SLOs, incident concepts | Chaos, alerting, runbooks, load/soak testing, postmortems | SLO-backed service with a real incident drill and postmortem |
| AI Security | AI threats, permissions, sandboxing, privacy, governance | OAuth/OIDC, mTLS, AppSec, supply chain, network controls, compliance mapping | Threat model plus exploit/mitigation lab and security CI gates |
| System Architecture | Methodology, estimation, trade-offs, ADRs, multi-region | Leadership, economics, ownership, migrations, executive communication | Recorded design review and architecture decision package |

## Recommended curriculum architecture

The current linear sequence should become a **core plus tracks plus evidence** model.

### Layer 1 — Common engineering core

All learners complete:

1. Python and production service development.
2. Algorithms, data structures, Linux, networking, Git, and API design.
3. Databases, data pipelines, testing, debugging, and performance.
4. LLM fundamentals, RAG, agents, and tool protocols.
5. Distributed systems, cloud fundamentals, security foundations, and SRE.
6. Evaluation, model lifecycle, serving, and system architecture.

### Layer 2 — Primary role tracks

- **Backend / Senior Software Engineer:** services, data, distributed systems, cloud operations.
- **Senior AI Engineer:** ML/statistics, RAG, evaluation, MLOps, product metrics.
- **Agentic AI Engineer:** durable workflows, tools, safety, MCP, human approvals, multi-agent systems.
- **AI Platform Engineer:** control planes, gateways, registries, tenancy, Kubernetes, GPU/cloud operations.
- **Staff / Principal AI Engineer:** architecture, strategy, reliability, security, economics, influence.
- **AI Systems Architect:** requirements, portfolio architecture, compliance, organization, migration, executive communication.

### Layer 3 — Secondary specialization

Choose one secondary specialization to avoid trying to master everything equally:

- retrieval and knowledge systems;
- agent safety and tool ecosystems;
- inference and GPU serving;
- platform and cloud infrastructure;
- reliability and evaluation;
- AI security and governance;
- backend and distributed systems.

### Layer 4 — Evidence portfolio

Each learner must produce:

- one primary production-style project;
- one smaller specialization project;
- one reusable platform capability;
- one incident/failure report;
- one threat model;
- one evaluation report;
- one architecture decision package;
- one five-minute demonstration;
- one recorded system-design walkthrough.

## Prioritized remediation roadmap

### P0 — Required before claiming production or interview readiness

1. Add measurable labs and assessments to every phase.
2. Add the Software Engineering Core: algorithms, Linux, networking, API lifecycle, testing depth, debugging, and performance.
3. Add statistics, experiment design, data quality, and ML lifecycle fundamentals.
4. Add data-engineering and knowledge-lifecycle material.
5. Turn reliability into load, chaos, incident, runbook, and recovery practice.
6. Add security foundations: identity protocols, AppSec, threat modeling, supply chain, and network controls.
7. Split the curriculum into role-specific paths with exit gates.
8. Add timed coding, SQL, debugging, system-design, behavioral, and mock-interview practice.
9. Require one completed, deployed, measured, secured, failure-tested primary project.

### P1 — Required for strong platform, Staff, Principal, or Architect positioning

1. Add MLOps and full model/data lifecycle implementation.
2. Add production Kubernetes/cloud operations, GitOps, backup/restore, cost allocation, and GPU scheduling.
3. Add serving benchmarks with real memory, throughput, latency, and cost measurements.
4. Add technical leadership, RFCs, roadmaps, design reviews, mentoring, TCO, and migration planning.
5. Integrate the projects into one portfolio spine.
6. Add product, human-factors, adoption, and domain-discovery exercises.

### P2 — Advanced differentiation

1. Multi-region active-active design and tested failover.
2. Advanced inference: speculative decoding, prefix caching, custom kernels, and NCCL profiling.
3. Multi-cloud or hybrid-cloud trade-offs.
4. Go or Rust for high-performance platform components.
5. Service mesh, eBPF, advanced scheduler design, and GPU cluster economics.
6. Research reading, reproduction, and contribution to open-source AI infrastructure.

## Project evidence standard

The existing definition of done is good. Add the following universal gates to every primary project:

### Build

- A stranger can run it from a clean checkout.
- The core path is covered by unit, integration, and contract tests.
- The service has versioned schemas and a documented API.

### Measure

- p50, p95, and p99 latency are known.
- Throughput, saturation, error rate, and cost are measured.
- AI quality has a labelled dataset and a repeatable evaluation.
- Baselines and improvements are recorded.

### Break

- A dependency outage, timeout, duplicate message, worker death, and budget exhaustion have been tested.
- The recovery path is documented in a runbook.
- At least one incident report explains what happened and what changed.

### Secure

- Threat model, trust boundaries, assets, and abuse cases are documented.
- Authentication, authorization, tenant isolation, secret handling, and audit behavior are tested.
- Dependency and image security checks run in CI.

### Explain

- Two or three ADRs show alternatives and consequences.
- The architecture can be drawn from memory.
- The owner can answer “why not X?” and “what breaks first?”
- The owner can explain one decision to an engineer and to an executive.

## Readiness rubric

Use this rubric for each role and specialization. A learner should not mark a capability complete from reading alone.

| Level | Meaning | Evidence |
| --- | --- | --- |
| 0 — Unfamiliar | Has not studied or cannot explain the term | No reliable explanation |
| 1 — Aware | Can define the concept and recognize examples | Short oral answer, no independent build |
| 2 — Working | Can implement a guided example and test the happy path | Lab passes with support |
| 3 — Production-capable | Can choose, implement, measure, secure, and operate it | Independent project evidence and failure drill |
| 4 — Senior-level | Can compare alternatives, debug failures, and teach the decision | ADR, incident report, benchmark, and interview defense |
| 5 — Staff/architect-level | Can set direction across teams and connect technical choices to business risk and cost | RFC, roadmap, design review, migration plan, and stakeholder presentation |

### Role exit gates

#### Senior Software Engineer

- Build a typed service from scratch.
- Design a schema and safe API evolution path.
- Test, profile, load-test, deploy, and debug it.
- Explain one production failure and recovery.

#### Senior AI Engineer

- Build an AI feature with a baseline and labelled evaluation.
- Diagnose retrieval, generation, data, and model failures separately.
- State measured quality, latency, and cost.
- Ship a regression gate and explain uncertainty.

#### Agentic AI Engineer

- Build a bounded agent or workflow with durable state.
- Prevent duplicate side effects and unauthorized tool calls.
- Demonstrate restart, timeout, loop, and approval behavior.
- Show traces and adversarial test results.

#### AI Platform Engineer

- Build a self-service path for registering, deploying, and promoting an AI artifact.
- Enforce tenancy, policy, quota, cost, and audit controls.
- Deploy with IaC and roll back safely.
- Demonstrate scaling, restore, and dependency failure.

#### Staff / Principal AI Engineer

- Lead a design review.
- Produce estimates, options, ADRs, SLOs, FMEA, roadmap, and migration plan.
- Make a build/buy or model/vendor decision using TCO and risk.
- Show how the design improves multiple teams, not only one service.

#### AI Systems Architect

- Turn an ambiguous brief into requirements, estimates, architecture, operating model, rollout, and risk register.
- Connect data, models, agents, platform, cloud, security, reliability, cost, and compliance.
- Present to technical and non-technical audiences.
- Defend trade-offs and state what evidence would change the design.

## What not to do

- Do not add more vendor names without a mechanism, trade-off, and lab.
- Do not require all six final projects for every learner.
- Do not treat a completed page or copied repository as proof of readiness.
- Do not optimize for framework breadth at the expense of Linux, networking, data, testing, and operations.
- Do not call a system production-ready without measured SLOs, failure evidence, security evidence, and a recovery story.
- Do not let Phase 13 become a list of memorized answers; require timed performance and follow-up pressure.

## Final recommendation

Keep the existing 13 phases and project briefs as the knowledge backbone. Do not solve the problem by adding an even larger list of technologies.

Instead:

1. Add the missing engineering, data/ML, security, SRE, and leadership foundations.
2. Convert each phase into a learn → build → measure → break → explain loop.
3. Publish role-specific tracks and exit gates.
4. Require one primary project plus one specialization project rather than six unfinished projects.
5. Make the portfolio evidence, not page count, the definition of readiness.

If these changes are implemented, the repository can become a credible path from Senior Software Engineer through AI Systems Architect. Without them, it remains an excellent reference syllabus, but completion alone will not reliably demonstrate readiness for those roles.
