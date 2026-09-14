# Glossary

> The terms you are most likely to meet in the briefs, defined in plain language. If a word in a project brief is unfamiliar, look it up here first. Terms are grouped by topic, and within a group they follow roughly the order you meet them in a project.

## How to use this glossary

Read the definition, then read the phase that covers the term in depth. A definition here is enough to follow a brief; it is not enough to pass an interview on that topic. Each entry ends with the phase to study when you want the full picture.

## Software and backend basics

| Term | Plain meaning | Learn more |
| --- | --- | --- |
| **API** | A defined way for one program to ask another for something, usually over HTTP. | Phase 1 |
| **SDK** | A provider's ready-made library for calling their service from your code, instead of raw HTTP. | Phase 1, 2 |
| **CLI** | Command-line interface — a program you drive by typing commands in a terminal. | Phase 1 |
| **Endpoint** | One address in an API that does one thing, like `POST /query`. | Phase 1 |
| **Service** | A running program that does a job and answers requests. | Phase 1 |
| **Schema** | The fixed shape of your data — which fields exist, their types, and the rules. | Phase 1 |
| **Migration** | A versioned change to a database schema, so it can be applied and reversed safely. | Phase 1 |
| **ORM** | A library that lets you talk to a database with objects instead of raw SQL. | Phase 1 |
| **Connection pool** | A set of reusable database connections, so each request does not open a new one. | Phase 1, 6 |
| **Transaction** | A group of database changes that all succeed or all fail together. | Phase 1, 6 |
| **Idempotency** | Doing the same operation twice has the same effect as doing it once. Essential for retries. | Phase 1, 6 |
| **Cache** | A stored copy of an answer so you can return it faster next time. | Phase 1, 6 |
| **Config** | Settings that change between environments (URLs, limits), kept out of the code. | Phase 1 |
| **Secret** | A credential such as an API key or a password. Never in the code or the logs. | Phase 9 |
| **CI/CD** | Automation that tests your code on every push and deploys it when it passes. | Phase 7 |
| **Container** | A running instance of an image, with a thin writable layer that is discarded when it stops. | Phase 7 |
| **Dockerfile** | The recipe that builds a container image. | Phase 7 |
| **Image** | A read-only, layered template built from a Dockerfile, from which containers run. | Phase 7 |
| **Docker Compose** | A file that starts several containers together with one command. | Phase 7 |
| **Kubernetes** | A system that runs and scales containers across many machines. | Phase 7 |
| **Pod** | The smallest unit Kubernetes runs — one or more containers together. | Phase 7 |
| **Deployment** | The Kubernetes object that keeps a set of identical pods running and updated. | Phase 7 |
| **Ingress** | The rule that routes outside traffic to the right service inside a cluster. | Phase 7 |
| **Helm** | A tool that packages Kubernetes configuration into a reusable, versioned chart. | Phase 7 |
| **Terraform / IaC** | Defining your cloud infrastructure in files, so it is versioned and repeatable. | Phase 7 |
| **AWS** | Amazon Web Services — the cloud provider used in the examples. | Phase 7 |

## LLMs and model usage

| Term | Plain meaning | Learn more |
| --- | --- | --- |
| **LLM** | Large language model — a program trained to predict the next token of text. | Phase 2 |
| **Token** | A chunk of text a model reads or writes — often a whole word or part of one. | Phase 2 |
| **Prompt** | The text you send to a model to get a response. | Phase 2 |
| **System prompt** | Instructions that set the model's role and rules for the whole conversation. | Phase 2 |
| **Context window** | The maximum amount of text (tokens) a model can consider at once. | Phase 2 |
| **Parameter / weight** | A number inside a model learned during training. Billions of them. | Phase 2 |
| **Inference** | Running a trained model to get an answer. | Phase 2 |
| **Temperature** | A setting that controls randomness: low is focused, high is creative. | Phase 2 |
| **Sampling** | How the model picks the next token from its predicted probabilities. | Phase 2 |
| **Embedding** | A list of numbers representing the meaning of text, used for search and comparison. | Phase 2, 3 |
| **Vector** | An ordered list of numbers — an embedding is a vector. | Phase 2, 3 |
| **Fine-tuning** | Continuing to train a model on your own examples to change its behaviour. | Phase 2 |
| **Quantization** | Storing model weights in fewer bits (such as INT8 or INT4) to save memory and run faster. | Phase 2, 10 |
| **Distillation** | Training a smaller model to imitate a larger one. | Phase 2 |
| **Mixture of experts (MoE)** | A model design where only part of the network runs per token, saving compute. | Phase 2, 10 |
| **Hallucination** | A confident answer that is not supported by the facts or the source. | Phase 2 |
| **Grounding** | Forcing the model to answer from supplied evidence rather than memory. | Phase 3 |
| **Structured output** | Making the model return JSON (or another fixed shape) that you can parse. | Phase 2, 4 |
| **Adapter** | A small layer that translates between your code and one provider's API. | Phase 2 |
| **Guardrail** | A check that blocks or changes unsafe or invalid model input or output. | Phase 9 |

## Retrieval and RAG

| Term | Plain meaning | Learn more |
| --- | --- | --- |
| **RAG** | Retrieval-augmented generation: find relevant text, then ask the model to answer from it. | Phase 3 |
| **Retrieval** | Finding the most relevant pieces of text for a question. | Phase 3 |
| **Chunk** | A small piece of a document, sized so it can be embedded and retrieved. | Phase 3 |
| **Chunking** | Splitting documents into chunks, usually with some overlap. | Phase 3 |
| **Overlap** | Text shared between neighbouring chunks so meaning is not lost at the boundary. | Phase 3 |
| **Vector database** | A store built to hold embeddings and find the nearest ones fast. | Phase 3 |
| **pgvector** | An add-on that gives PostgreSQL vector search. | Phase 3 |
| **Similarity search** | Finding embeddings closest to the question's embedding. | Phase 3 |
| **Hybrid search** | Combining keyword search and vector search for better recall. | Phase 3 |
| **Recall** | The share of relevant items the system actually found. | Phase 3, 8 |
| **Precision** | The share of found items that are actually relevant. | Phase 3, 8 |
| **Reranking** | Reordering the first set of results with a more accurate but slower model. | Phase 3 |
| **Rank fusion** | Combining several ranked lists (keyword and vector) into one order. | Phase 3 |
| **MRR** | Mean reciprocal rank — a ranking score that rewards putting the first relevant result near the top. | Phase 8 |
| **NDCG** | Normalized discounted cumulative gain — a ranking score that rewards relevant results appearing high in the list. | Phase 8 |
| **HyDE** | Hypothetical Document Embeddings — asking the model to draft an answer, then searching with that draft's embedding. | Phase 3 |
| **Top-k** | How many results you keep (for example, the 5 best chunks). | Phase 3 |
| **Query rewriting** | Rephrasing the user's question into better search terms. | Phase 3 |
| **Citation** | Pointing an answer back to the exact source it came from. | Phase 3 |
| **ACL / access control** | Rules about who is allowed to see which documents. | Phase 3, 9 |
| **Index** | A data structure that makes lookup fast. | Phase 3 |
| **Freshness** | How up to date the indexed content is. | Phase 3 |
| **Ingestion** | The pipeline that reads, cleans, chunks, and stores documents. | Phase 3 |

## Agents, tools, and MCP

| Term | Plain meaning | Learn more |
| --- | --- | --- |
| **Agent** | A model that can take actions in a loop — decide, call a tool, observe, repeat. | Phase 4 |
| **Agent loop** | The cycle of: think, choose a tool, run it, read the result, decide again. | Phase 4 |
| **Tool / function calling** | Letting the model request a named function with arguments, which you then run. | Phase 4 |
| **Tool schema** | The name, description, and argument types that define a tool for the model. | Phase 4 |
| **Planning** | The agent deciding a sequence of steps to reach a goal. | Phase 4 |
| **ReAct** | A common agent pattern: reason, then act, then reason about the result. | Phase 4 |
| **Memory** | Stored information an agent can recall later — short-term (this run) or long-term (across runs). | Phase 4 |
| **State** | Everything the agent knows at a point in a run. | Phase 4 |
| **Checkpoint** | A saved snapshot of a run, so it can resume after a crash. | Phase 4, 6 |
| **Durable execution** | Running a long task so it survives restarts without losing progress or repeating side effects. | Phase 4, 6 |
| **Human-in-the-loop** | Pausing for a person to approve an action before it happens. | Phase 4, 9 |
| **Approval gate** | The specific point where a human must say yes before a risky action. | Phase 4, 9 |
| **Guardrail (agent)** | A rule that limits what the agent is allowed to do. | Phase 4, 9 |
| **Loop cap** | A hard limit on iterations, so an agent cannot run forever. | Phase 4 |
| **MCP** | Model Context Protocol — a standard way to expose tools and data to models. | Phase 5 |
| **MCP server** | A program that publishes tools or resources over MCP. | Phase 5 |
| **MCP client** | The program that connects to MCP servers and offers their tools to the model. | Phase 5 |
| **stdio** | A way for an MCP client and server to talk over standard input/output on one machine. | Phase 5 |
| **Tool registry** | A catalogue of available tools and what they do. | Phase 5, 7 |
| **Multi-agent system** | Several agents that cooperate or hand off work to reach a goal. | Phase 12 |
| **Orchestrator** | The component that decides which agent does what. | Phase 12 |
| **Handoff** | Passing a task and its context from one agent to another. | Phase 12 |

## Distributed systems and serving

| Term | Plain meaning | Learn more |
| --- | --- | --- |
| **Queue** | A line of work items waiting to be processed, so producers and consumers do not have to run in step. | Phase 6 |
| **SQS** | Amazon Simple Queue Service — AWS's managed message queue. | Phase 6 |
| **Producer / consumer** | One side puts work on a queue; the other takes it off and does it. | Phase 6 |
| **Worker** | A process whose job is to take items from a queue and process them. | Phase 6 |
| **Backpressure** | Slowing down incoming work when the system is already busy, instead of collapsing. | Phase 6 |
| **Throughput** | How much work the system completes per unit of time (for example, requests per second). | Phase 6 |
| **Latency** | How long one request takes, usually reported as p50 (median) and p95 (slow tail). | Phase 6, 8 |
| **p95 / p99** | The time within which 95% (or 99%) of requests finish. The tail matters most. | Phase 6, 8 |
| **Consistency** | The guarantee about what different readers see after a write. | Phase 6 |
| **Eventual consistency** | Replicas agree eventually, but may briefly differ. | Phase 6 |
| **Consensus** | How a group of machines agrees on one value despite failures. | Phase 6 |
| **Partition** | When the network splits and some machines cannot reach others. | Phase 6 |
| **CAP theorem** | Under a partition you must choose consistency or availability. | Phase 6 |
| **Circuit breaker** | Stops calling a failing dependency for a while, so it can recover. | Phase 4, 6, 8 |
| **Retry with backoff** | Trying again after a growing delay, with randomness (jitter) to avoid stampedes. | Phase 6 |
| **Rate limit** | A cap on how many requests are allowed in a time window. | Phase 6 |
| **Quota** | An allowance per user or tenant, such as tokens per month. | Phase 6, 7 |
| **Dead letter queue** | Where messages go after repeated failures, so they are not lost. | Phase 6 |
| **Serving** | Running a model so it answers requests, usually with batching and caching. | Phase 10 |
| **Batching** | Grouping several requests into one model call to use the hardware better. | Phase 10 |
| **Continuous batching** | Adding and removing requests from a running batch as they arrive and finish. | Phase 10 |
| **KV cache** | Stored keys and values from attention, so the model does not recompute them for every new token. | Phase 2, 10 |
| **Streaming** | Sending the answer token by token as it is generated, instead of all at once. | Phase 2, 4 |
| **GPU / VRAM** | The processor used for models, and its memory. Running out is the usual limit. | Phase 10 |
| **vLLM** | A popular, efficient open-source model server. | Phase 10 |

## Platform and multi-tenancy

| Term | Plain meaning | Learn more |
| --- | --- | --- |
| **Platform** | Shared services other teams build on, so they do not each rebuild the same thing. | Phase 7 |
| **Control plane** | The part that manages and configures things (registries, policy, deployments). | Phase 7 |
| **Data plane** | The part that actually handles the traffic and data. | Phase 7 |
| **Tenant** | One customer or team whose data and limits are kept separate. | Phase 7, 9 |
| **Tenant isolation** | Making sure one tenant cannot see or affect another's data. | Phase 9 |
| **Registry** | A versioned catalogue of models, prompts, agents, or datasets. | Phase 7 |
| **Artifact** | A stored, versioned output such as a model file or an evaluation result. | Phase 7, 8 |
| **Feature flag** | A switch that turns behaviour on or off without redeploying. | Phase 7 |
| **Rollout** | Releasing a change gradually, such as canary or blue-green. | Phase 7 |
| **Blue-green** | Running two environments and switching traffic between them. | Phase 7 |
| **Canary** | Sending a small slice of traffic to a new version before everyone gets it. | Phase 7 |
| **Gateway** | One entry point that fronts many backends, adding routing, auth, and limits. | Phase 7, 9 |

## Reliability and observability

| Term | Plain meaning | Learn more |
| --- | --- | --- |
| **Observability** | Being able to understand a running system from its outputs: logs, metrics, traces. | Phase 8 |
| **Log** | A timestamped record of something that happened. | Phase 8 |
| **Metric** | A number measured over time, such as error rate or tokens per second. | Phase 8 |
| **Trace / span** | A trace follows one request through all services; a span is one step inside it. | Phase 8 |
| **SLI** | Service level indicator — the number you measure (for example, p95 latency). | Phase 8 |
| **SLO** | Service level objective — the target for that number (for example, 99.9% success). | Phase 8 |
| **Error budget** | How much failure is allowed before you must stop shipping features and fix reliability. | Phase 8 |
| **SLA** | The promise you make to a customer, usually with a penalty if you miss it. | Phase 8 |
| **Incident** | Something broken in production that affects users. | Phase 8 |
| **Postmortem** | A blameless write-up of what happened, why, and what changes. | Phase 8 |
| **Graceful degradation** | Losing quality or features rather than failing completely. | Phase 8 |
| **Chaos testing** | Deliberately breaking things to check the system copes. | Phase 8 |
| **Drift** | When real-world data slowly stops matching what the system was built or tested for. | Phase 8 |

## Evaluation

| Term | Plain meaning | Learn more |
| --- | --- | --- |
| **Evaluation** | Measuring how good a system's output is, repeatably. | Phase 8 |
| **Dataset** | A fixed set of inputs and expected answers used for evaluation. | Phase 8 |
| **Golden set** | A trusted, hand-checked dataset you compare against. | Phase 8 |
| **Ground truth** | The correct answer you compare against. | Phase 8 |
| **Judge (LLM-as-judge)** | Using a model to score another model's output against a rubric. | Phase 8 |
| **Rubric** | The written criteria a judge or a person scores against. | Phase 8 |
| **Calibration** | Checking the judge agrees with human scores before trusting it. | Phase 8 |
| **Cohen's kappa** | A score for how much two raters (or a judge and a human) agree beyond chance. | Phase 8 |
| **Faithfulness** | Whether the answer is supported by the retrieved evidence. | Phase 3, 8 |
| **Regression test** | A test that catches a previously fixed problem coming back. | Phase 8 |
| **A/B test** | Comparing two versions on real traffic to see which is better. | Phase 8 |
| **Benchmark** | A repeatable measurement of speed, cost, or quality. | Phase 8 |

## Security and governance

| Term | Plain meaning | Learn more |
| --- | --- | --- |
| **Threat model** | A written list of what you are defending against and how. | Phase 9 |
| **Prompt injection** | Untrusted text in the model's context that it follows as an instruction — typed by the user (direct) or hidden in content it reads (indirect). | Phase 9 |
| **Jailbreak** | Getting a model to break its own rules. | Phase 9 |
| **Excessive agency** | Giving an agent more power than the task needs. | Phase 9 |
| **Least privilege** | Giving each component only the permissions it strictly needs. | Phase 9 |
| **Scoped credential** | A key limited to specific actions, resources, or time. | Phase 9 |
| **Sandbox** | An isolated place to run untrusted code so it cannot harm the host. | Phase 9 |
| **Allowlist / denylist** | Explicitly permitting or blocking specific tools, domains, or actions. | Phase 9 |
| **RBAC** | Role-based access control — permissions tied to roles. | Phase 9 |
| **ABAC** | Attribute-based access control — rules based on attributes (tenant, region, sensitivity). | Phase 9 |
| **OIDC** | OpenID Connect — a standard way to log users in and get an identity token, built on OAuth 2. | Phase 9 |
| **Audit log** | An append-only record of who did what and when. | Phase 9 |
| **PII** | Personally identifiable information — data that can identify a person. | Phase 9 |
| **Data exfiltration** | Moving data out of the system without permission. | Phase 9 |
| **Secret management** | Storing and rotating credentials safely. | Phase 9 |
| **Encryption at rest / in transit** | Protecting data while stored / while travelling over the network. | Phase 9 |
| **Supply chain** | The third-party libraries and images you depend on, and the risk they carry. | Phase 9 |
| **Governance** | The policies and controls that keep AI use lawful and accountable. | Phase 9 |

## Architecture and project documents

| Term | Plain meaning | Learn more |
| --- | --- | --- |
| **Architecture** | The choice of components and how they fit and talk together. | Phase 11 |
| **Trade-off** | The cost you accept by choosing one option over another. | Phase 11 |
| **Failure mode** | A specific way the system can fail, and what happens then. | Phase 11 |
| **Capacity planning** | Estimating the resources you will need at a given scale. | Phase 11 |
| **ADR** | Architecture Decision Record — a short note: the decision, the alternatives, the consequences. | Phase 11, 13 |
| **Component diagram** | A drawing of the main parts and the connections between them. | Phase 11 |
| **Sequence diagram** | A drawing of the order of messages between parts for one flow. | Phase 11 |
| **Milestone** | A checkpoint in the build that is independently demonstrable. | Projects |
| **Acceptance criteria** | The specific, checkable things that prove the project works. | Projects |
| **Definition of done** | The shared bar every project must clear. See [Definition of done](definition-of-done.md). | Projects |
| **Demo** | A short live walkthrough of the working system. | Phase 13 |
| **Deep dive** | A detailed, questioning conversation about one part of your work. | Phase 13 |

> **One last tip.** Do not memorise this page. Look a term up when a brief uses it, read the definition, then read the phase page. A glossary you have used beats a glossary you have recited.
