# Study architecture

This book is a progressive, production-focused study path for building, operating, evaluating, and securing agentic AI systems. It is written to make you **interview-ready**, one concept at a time.

Each phase is a part of the book. Inside a phase, every topic is a short, self-contained lesson that follows the same shape:

1. **Why this exists** — the problem it solves, in plain language.
2. **Start from zero** — the vocabulary and first principles, for a reader who has never seen the topic.
3. **The core idea** — an analogy, a mental model, and a diagram or table.
4. **How it works** — the mechanism, step by step.
5. **The syntax you will use** — the real forms, each with a short example.
6. **Examples: simple to real** — graded worked examples.
7. **In production** — trade-offs, failure modes, and gotchas.
8. **Interview questions** — model answers with follow-ups and the trap answers interviewers look for.
9. **Remember this** — the few lines to revise before an interview.

Read the phases in order. Each phase has a short checkpoint, and the book ends with six projects you build yourself.

## Learning progression

1. Production Python
2. LLM and Generative AI Fundamentals
3. RAG Engineering
4. Agentic AI Engineering
5. MCP and Tool Ecosystems
6. Distributed Systems for AI
7. AI Platform Engineering
8. AI Evaluation, Observability and Reliability
9. AI Security and Governance
10. Model Serving and AI Infrastructure
11. AI Systems Architecture
12. Multi-Agent Systems
13. Interview Preparation

## Final projects

The book ends with six projects you build yourself. Each has requirements, a suggested architecture, milestones, and acceptance criteria — but no implementation code, so you make the decisions. Start here: [Final Projects](projects/index.md).

- [Project 1 — Production Enterprise RAG Engine](projects/01-production-enterprise-rag-engine.md)
- [Project 2 — Autonomous Enterprise Workflow Agent](projects/02-autonomous-enterprise-workflow-agent.md)
- [Project 3 — Open-Source Agent Platform / AI Control Plane](projects/03-open-source-agent-platform.md)
- [Project 4 — Production LLM Gateway](projects/04-production-llm-gateway.md)
- [Project 5 — AI Evaluation Platform](projects/05-ai-evaluation-platform.md)
- [Project 6 — Enterprise MCP Gateway](projects/06-enterprise-mcp-gateway.md)


## Phase 1 — Production Python

* Python syntax for experienced developers
* Type hints
* Dataclasses
* Pydantic
* Decorators
* Generators
* Iterators
* Context managers
* Exception handling
* File handling
* Async/await
* asyncio
* Threads vs processes
* Multiprocessing
* Concurrency patterns
* Python packaging
* Virtual environments
* Dependency management
* Logging
* Configuration management
* pytest
* Mocking
* Profiling
* Performance optimization
* FastAPI
* Pydantic v2
* SQLAlchemy
* Alembic
* PostgreSQL
* Redis
* Authentication
* Authorization
* Background jobs
* Rate limiting
* API testing
* Dockerizing Python applications
* CI/CD for Python services

## Phase 2 — LLM and Generative AI Fundamentals

* Machine learning fundamentals
* Neural network fundamentals
* Deep learning basics
* PyTorch fundamentals
* Tensors
* Forward pass
* Backpropagation concepts
* Transformer architecture
* Attention
* Self-attention
* Multi-head attention
* Positional encoding
* Tokenization
* Tokens
* Embeddings
* Vocabulary
* Context windows
* KV cache
* Logits
* Softmax
* Temperature
* Top-k
* Top-p
* Sampling
* Next-token prediction
* Inference
* Training vs inference
* Pretraining
* Fine-tuning
* Instruction tuning
* RLHF concepts
* LoRA
* QLoRA
* PEFT
* Quantization
* FP32
* FP16
* BF16
* INT8
* INT4
* Structured outputs
* JSON schema outputs
* Function calling
* Tool calling
* Streaming
* Batching
* Prompt design
* System prompts
* Context engineering
* Hallucinations
* Prompt injection
* Context poisoning
* Model comparison
* OpenAI APIs
* Anthropic APIs
* Gemini APIs
* Open-source LLMs
* Hugging Face ecosystem

## Phase 3 — RAG Engineering

* RAG architecture
* Document ingestion
* PDF parsing
* DOCX parsing
* HTML parsing
* Data normalization
* Chunking
* Fixed-size chunking
* Recursive chunking
* Semantic chunking
* Parent-child chunking
* Metadata extraction
* Embedding models
* Embedding dimensions
* Cosine similarity
* Dot product similarity
* Vector databases
* PostgreSQL pgvector
* Vector indexing
* HNSW
* Approximate nearest-neighbor search
* Dense retrieval
* Sparse retrieval
* BM25
* Full-text search
* Hybrid search
* Metadata filtering
* Query rewriting
* Query expansion
* Multi-query retrieval
* HyDE
* Reranking
* Cross-encoder rerankers
* Context compression
* Context selection
* Citation generation
* Grounded generation
* Knowledge-base versioning
* RAG caching
* Retrieval latency optimization
* RAG evaluation
* Recall@K
* Precision@K
* MRR
* NDCG
* Faithfulness
* Answer relevance
* Context relevance
* RAG testing
* Multi-tenant RAG
* RAG security
* Access-controlled retrieval

## Phase 4 — Agentic AI Engineering

* What an AI agent is
* Agent loop
* Observe
* Reason
* Act
* Tool execution
* Result validation
* State management
* Agent memory
* Short-term memory
* Long-term memory
* Episodic memory
* Semantic memory
* Working memory
* Planning
* Task decomposition
* Routing
* Reflection
* Self-correction
* Retry strategies
* Agent termination
* Loop detection
* Checkpointing
* Durable execution
* Human-in-the-loop
* Approval workflows
* Guardrails
* Structured agent outputs
* Tool schemas
* Tool selection
* Tool permissions
* Parallel tool execution
* Sequential workflows
* Conditional workflows
* Long-running agents
* Background agents
* Agent scheduling
* Agent state persistence
* LangGraph
* Nodes
* Edges
* Conditional edges
* Graph state
* Reducers
* Checkpoints
* Interrupts
* Subgraphs
* Parallel branches
* Streaming
* Durable workflows
* OpenAI Agents SDK
* Agent orchestration patterns
* ReAct
* Plan-and-execute
* Router agents
* Supervisor agents
* Worker agents
* Evaluator agents
* Critic agents
* Agent reliability

## Phase 5 — MCP and Tool Ecosystems

* Model Context Protocol fundamentals
* MCP architecture
* MCP clients
* MCP servers
* MCP hosts
* MCP transports
* MCP tools
* MCP resources
* MCP prompts
* Tool discovery
* Capability discovery
* Tool schemas
* Tool validation
* MCP authentication
* MCP authorization
* Session management
* Stateful MCP servers
* Stateless MCP servers
* MCP over local transport
* MCP over remote transport
* Building MCP servers
* Building MCP clients
* Database MCP servers
* GitHub MCP integration
* Filesystem MCP integration
* Browser MCP integration
* Internal API MCP integration
* Enterprise MCP gateways
* MCP security
* Tool permission boundaries
* MCP observability
* MCP audit logging
* MCP tool versioning
* MCP registry concepts
* Agent-to-agent communication
* A2A concepts
* Agent capability discovery
* Agent interoperability

## Phase 6 — Distributed Systems for AI

* Distributed-system fundamentals
* Scalability
* Availability
* Reliability
* Fault tolerance
* Consistency
* CAP theorem
* Horizontal scaling
* Vertical scaling
* Stateless services
* Stateful services
* Load balancing
* Reverse proxies
* API gateways
* Service discovery
* Message queues
* Kafka
* Redis
* RabbitMQ concepts
* SQS concepts
* Producer-consumer architecture
* Event-driven architecture
* Event sourcing concepts
* Pub/sub
* Consumer groups
* Partitioning
* Ordering
* Delivery guarantees
* At-most-once
* At-least-once
* Exactly-once concepts
* Idempotency
* Distributed locks
* Leader election concepts
* Retries
* Exponential backoff
* Jitter
* Dead-letter queues
* Timeouts
* Circuit breakers
* Bulkheads
* Rate limiting
* Backpressure
* Caching
* Distributed caching
* Replication
* Sharding
* Database partitioning
* Saga pattern
* Transactional outbox
* CQRS
* Workflow engines
* Distributed task execution
* Agent worker pools
* Distributed agent scheduling
* Distributed state management
* Long-running workflow reliability

## Phase 7 — AI Platform Engineering

* Platform engineering fundamentals
* Internal developer platforms
* AI platform architecture
* Control plane
* Data plane
* Runtime plane
* Agent registry
* Model registry
* Tool registry
* MCP registry
* Prompt registry
* Evaluation registry
* Dataset registry
* Agent deployment
* Agent versioning
* Model versioning
* Prompt versioning
* Model gateway
* Model routing
* Provider abstraction
* Model fallback
* Model load balancing
* Token quotas
* Cost budgets
* API key management
* Secrets management
* Multi-tenancy
* Tenant isolation
* RBAC
* ABAC concepts
* Policy engines
* Feature flags
* Configuration management
* Docker
* Docker Compose
* Kubernetes
* Pods
* Deployments
* Services
* ConfigMaps
* Secrets
* Jobs
* CronJobs
* StatefulSets
* Ingress
* Autoscaling
* HPA
* Resource limits
* Kubernetes networking
* Helm
* Terraform
* Infrastructure as code
* GitHub Actions
* CI/CD
* Deployment strategies
* Blue-green deployments
* Canary deployments
* Rollbacks
* AWS fundamentals
* IAM
* VPC
* EC2
* ECS
* EKS
* Lambda
* S3
* RDS
* ElastiCache
* SQS
* SNS
* Bedrock
* CloudWatch
* Secrets Manager
* API Gateway

## Phase 8 — AI Evaluation, Observability and Reliability

* AI system evaluation
* Agent evaluation
* RAG evaluation
* Offline evaluation
* Online evaluation
* Golden datasets
* Evaluation datasets
* Regression datasets
* Deterministic evaluators
* Rule-based evaluators
* LLM-as-judge
* Pairwise evaluation
* Human evaluation
* Task-success metrics
* Tool-success metrics
* Hallucination rate
* Retrieval quality
* Answer correctness
* Faithfulness
* Latency
* Time-to-first-token
* Token usage
* Cost per request
* Cost per task
* Retry rate
* Failure rate
* Agent loop count
* Tool-call count
* Tracing
* Distributed tracing
* OpenTelemetry
* Structured logging
* Metrics
* Prometheus
* Grafana
* LangSmith
* Agent traces
* Prompt traces
* Tool traces
* Model traces
* Error analysis
* Failure classification
* Regression testing
* AI CI/CD
* Shadow deployments
* A/B testing
* Canary evaluation
* Model quality monitoring
* Drift concepts
* SLOs
* SLIs
* Error budgets
* Incident response for AI systems

## Phase 9 — AI Security and Governance

* AI threat models
* Prompt injection
* Indirect prompt injection
* Jailbreaking
* Context poisoning
* Memory poisoning
* Tool poisoning
* MCP poisoning
* Data exfiltration
* Secret leakage
* Excessive agency
* Privilege escalation
* Agent impersonation
* Unauthorized tool execution
* Malicious documents
* Malicious web content
* Output validation
* Input validation
* Schema validation
* Sandboxing
* Least privilege
* Scoped credentials
* Tool allowlists
* Tool denylists
* Approval gates
* Human approvals
* RBAC
* Policy enforcement
* Audit logging
* Data privacy
* PII handling
* Encryption at rest
* Encryption in transit
* Secret management
* Tenant isolation
* Secure model gateways
* Secure MCP gateways
* Supply-chain security
* Dependency security
* AI governance
* Model governance
* Prompt governance
* Agent governance
* Responsible AI concepts

## Phase 10 — Model Serving and AI Infrastructure

* Hugging Face Transformers
* Model downloading
* Model loading
* Tokenizers
* GPU fundamentals
* CUDA concepts
* GPU memory
* VRAM
* GPU utilization
* CPU vs GPU inference
* KV cache
* Batch inference
* Dynamic batching
* Continuous batching
* Quantization
* INT8
* INT4
* GGUF concepts
* GPTQ concepts
* AWQ concepts
* Model parallelism concepts
* Tensor parallelism
* Pipeline parallelism
* vLLM
* PagedAttention
* Continuous batching
* OpenAI-compatible model servers
* Triton Inference Server concepts
* Model caching
* Model warmup
* Model autoscaling
* GPU scheduling
* Model routing
* Local models
* Cloud models
* Hybrid model infrastructure
* LoRA serving
* Adapter serving
* Fine-tuned model deployment
* Cost optimization
* Throughput optimization
* Latency optimization
* GPU utilization optimization

## Phase 11 — AI Systems Architecture

* AI system-design methodology
* Functional requirements
* Non-functional requirements
* Capacity estimation
* Latency estimation
* Cost estimation
* Throughput estimation
* Storage estimation
* Model selection
* Build vs buy decisions
* RAG vs fine-tuning
* Agent vs deterministic workflow
* Model routing architecture
* LLM gateway architecture
* Agent orchestration architecture
* Multi-agent architecture
* Event-driven AI architecture
* AI workflow architecture
* Enterprise integration patterns
* Human-in-the-loop architecture
* Multi-tenant architecture
* Reliability architecture
* Security architecture
* Observability architecture
* Cost-control architecture
* Data architecture
* Knowledge architecture
* Model-serving architecture
* AI platform architecture
* Disaster recovery
* High availability
* Multi-region systems
* Compliance architecture
* Architecture trade-offs
* Architecture decision records
* Failure-mode analysis
* Capacity planning
* Scaling AI workloads

## Phase 12 — Multi-Agent Systems

* Why multi-agent systems
* When not to use multi-agent systems
* Agent roles
* Supervisor-worker pattern
* Planner-executor pattern
* Router-agent pattern
* Debate pattern
* Critic-agent pattern
* Evaluator-agent pattern
* Hierarchical agents
* Peer-to-peer agents
* Agent communication
* Shared memory
* Private memory
* Shared state
* Task delegation
* Capability discovery
* Agent scheduling
* Agent coordination
* Agent handoffs
* Conflict resolution
* Consensus concepts
* Multi-agent deadlocks
* Infinite-agent loops
* Agent failure handling
* Multi-agent observability
* Multi-agent evaluation
* Multi-agent security
* Cost control
* Distributed multi-agent systems
* LangGraph multi-agent patterns
* Agent-to-Agent protocol concepts

## Phase 13 — Interview Preparation

* Python coding interviews
* Python internals
* FastAPI interviews
* SQL
* PostgreSQL
* Redis
* REST API design
* Backend architecture
* Distributed systems
* Kafka
* Microservices
* Event-driven architecture
* Docker
* Kubernetes
* AWS
* System design
* Low-level design
* High-level design
* LLM fundamentals
* Transformer questions
* Embeddings
* RAG architecture
* RAG debugging
* RAG evaluation
* Agent architecture
* LangGraph
* MCP
* Multi-agent architecture
* AI security
* AI observability
* AI evaluation
* AI platform architecture
* Model serving
* Cost optimization
* Reliability
* AI architecture trade-offs
* Behavioral interviews
* Project deep dives
* Architecture walkthroughs

# Final Projects

> **Full requirements live in the [Final Projects](projects/index.md) part.** The lists below are a feature checklist; the briefs there give the goal, suggested architecture, milestones, and acceptance criteria for each project.

## Project 1 — Production Enterprise RAG Engine

* FastAPI
* PostgreSQL
* pgvector
* Redis
* PDF/DOCX ingestion
* Chunking pipeline
* Embeddings
* Hybrid search
* BM25
* Vector search
* Reranking
* Query rewriting
* Context construction
* Citations
* Access-controlled retrieval
* Multi-tenancy
* Caching
* Evaluation datasets
* Recall@K
* MRR
* Faithfulness
* Latency tracking
* Cost tracking
* OpenTelemetry
* Prometheus
* Grafana
* Docker
* CI/CD
* Authentication
* RBAC

## Project 2 — Autonomous Enterprise Workflow Agent

Example workflow:

```text
Issue/Ticket
    ↓
Agent understands task
    ↓
Searches documentation
    ↓
Searches source code
    ↓
Checks GitHub history
    ↓
Queries logs/monitoring
    ↓
Creates implementation plan
    ↓
Human approval
    ↓
Creates branch
    ↓
Changes code
    ↓
Runs tests
    ↓
Analyzes failures
    ↓
Fixes issues
    ↓
Creates pull request
    ↓
Posts summary
```

Topics/features:

* LangGraph
* MCP
* GitHub integration
* Filesystem tools
* Database tools
* Browser tools
* Internal APIs
* Planning
* State
* Memory
* Checkpointing
* Durable execution
* Human-in-the-loop
* Tool permissions
* RBAC
* Sandboxing
* Retry handling
* Approval gates
* Evaluation
* Tracing
* Audit logs
* Cost tracking
* Failure recovery

## Project 3 — Open-Source Agent Platform / AI Control Plane

Core architecture:

```text
Developers / Applications
          ↓
        SDK/API
          ↓
     API Gateway
          ↓
      Control Plane
          ↓
 ┌────────┼─────────┬─────────┐
 ↓        ↓         ↓         ↓
Agent    Model     Tool      MCP
Registry Registry  Registry  Registry
 └────────┼─────────┴─────────┘
          ↓
       Scheduler
          ↓
        Kafka
          ↓
 ┌────────┼────────┐
 ↓        ↓        ↓
Agent   Agent    Agent
Worker  Worker   Worker
          ↓
      Kubernetes
```

Platform features:

* Agent registry
* Agent versions
* Model registry
* Model gateway
* Model routing
* Provider fallback
* Tool registry
* MCP registry
* Prompt registry
* Evaluation registry
* Dataset registry
* Agent scheduler
* Agent worker pools
* Kafka
* Redis
* PostgreSQL
* pgvector
* Object storage
* Kubernetes
* Docker
* Helm
* Terraform
* AWS
* Secrets management
* RBAC
* Multi-tenancy
* Audit logging
* Tracing
* OpenTelemetry
* Prometheus
* Grafana
* Cost tracking
* Token budgets
* Rate limits
* Evaluation
* Regression testing
* Human approvals
* Agent sandboxing
* Policy engine
* CI/CD

## Project 4 — Production LLM Gateway

* Unified API for multiple providers
* OpenAI
* Claude
* Gemini
* Local models
* Model routing
* Automatic fallback
* Retry policies
* Circuit breakers
* Rate limiting
* Token quotas
* Cost budgets
* Semantic caching
* Response caching
* Streaming
* Load balancing
* Provider health checks
* Prompt logging
* PII filtering
* Observability
* Usage analytics
* Multi-tenancy
* Authentication
* RBAC
* Audit logging

## Project 5 — AI Evaluation Platform

* Evaluation datasets
* Dataset versioning
* Prompt versions
* Model versions
* Agent versions
* Batch evaluations
* RAG evaluations
* Agent evaluations
* Tool-call evaluations
* Rule-based evaluators
* LLM-as-judge
* Human evaluation
* Pairwise comparisons
* Regression detection
* Cost comparison
* Latency comparison
* Quality dashboards
* CI/CD integration
* Evaluation gates before deployment
* Production feedback ingestion

## Project 6 — Enterprise MCP Gateway

* Central MCP gateway
* MCP server registry
* Tool discovery
* Enterprise authentication
* Authorization
* RBAC
* Scoped credentials
* MCP server health checks
* Tool schemas
* Policy enforcement
* Tool allowlists
* Approval workflows
* Audit logs
* Rate limiting
* Multi-tenancy
* Secrets management
* Monitoring
* Tracing
* Versioning
* Usage analytics

# End Goal

```text
Senior Software Engineer
        ↓
Senior AI Engineer
        ↓
Agentic AI Engineer
        ↓
AI Platform Engineer
        ↓
Staff / Principal AI Engineer
        ↓
AI Systems Architect
```

Target specialization:

```text
AI Engineering
+
Agentic AI
+
AI Platform Engineering
+
Backend Engineering
+
Distributed Systems
+
Cloud Infrastructure
+
AI Reliability
+
AI Security
+
System Architecture
```
