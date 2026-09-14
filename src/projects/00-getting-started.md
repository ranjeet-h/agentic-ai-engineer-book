# Getting Started with the Projects

> Read this before your first project. It explains who the projects are for, what to install, how to pick one, and how to work through a brief.

## Who these projects are for

- A **student** who has finished the phases and wants real systems for a portfolio and a job application.
- A **working engineer** moving from backend or data work into AI engineering.

You do **not** need prior AI experience. Every brief points back to the phase that teaches the idea it uses, and the [glossary](glossary.md) defines every term in plain language.

## What you should already be able to do

If any of these are shaky, do **Phase 1 — Production Python** first. The projects assume them.

- Write and run a Python file; create and use a virtual environment.
- Use a terminal: change directory, run commands, read output.
- Use git basics: clone, add, commit, branch.
- Read a stack trace and find the line that failed.
- Call an HTTP API and read a JSON response.

## Install these tools

These are the base tools for every project.

| Tool | Why | Notes |
| --- | --- | --- |
| Python 3.12+ | the language | check with `python3 --version` |
| `uv` or `pip` | install libraries | `uv` is faster and handles virtual environments |
| Git | version control | you will commit your work |
| Docker + Docker Compose | run databases and services unchanged | one command brings up Postgres and Redis |
| A database client (`psql`) | inspect the database directly | or use Docker and `docker exec` |
| VS Code or an editor | write code | the Python extension helps a lot |
| Model access | call a model | a hosted API key, or a local model (see below) |

Some projects need extra tools on top of the base set. Install them when you reach that project, not now:

| Project | Extra tools |
| --- | --- |
| 3 — Agent Platform | Kubernetes (`kind` or `minikube` locally), Terraform, Helm, and a queue such as Kafka or a managed service |
| 4 — LLM Gateway | Redis for caching and counters |
| 5 — Evaluation Platform | S3-compatible object storage (or a local substitute such as MinIO) |
| 6 — MCP Gateway | A secret manager such as Vault (or environment variables locally) |

**Never commit a key.** Put it in a `.env` file that is git-ignored, or in your environment. Most projects need model access; a local model or a mock can substitute for the warm-ups, but the main projects assume you can call one.

## How to pick your first project

Do the four [warm-up projects](warm-up-projects.md) first — they are a day or two each and make the main projects feel like assembly rather than a cliff. If you must skip ahead, this is the shortest sensible path for your background.

| If you are… | Start with | Then |
| --- | --- | --- |
| New to AI entirely | Warm-up 1, then Warm-up 3 | Project 1 — RAG Engine |
| A backend engineer | Warm-up 2, then Project 4 | Project 1 or 6 |
| Excited about agents | Warm-up 4 | Project 2 — Workflow Agent |
| Platform-minded | Project 4 | Project 3 — Agent Platform |
| Short on time | Project 4 (smallest complete system) | Project 6 — MCP Gateway |

## How to work through a brief

The full method is in the [projects index](index.md); it is the same for every project:

1. **Read the brief twice** — once for the goal, once for the constraints and acceptance criteria.
2. **Write your own plan first** — a diagram, a data model, and the hardest decisions. Compare with the suggested architecture only afterwards.
3. **Build the thinnest end-to-end slice** — the smallest path that works, with no polish.
4. **Make it correct, then observable, safe, fast enough, and resilient** — in that order.
5. **Prove it** against every acceptance criterion.
6. **Write it down** — README, decision records, and your measurements.
7. **Rehearse the demo** out loud.

## What "no code" means

These briefs deliberately contain **no implementation code**. That is not a gap; it is the point. Reading someone else's solution teaches you what they decided. Building to a brief forces you to decide, hit constraints, and debug — which is exactly what the job and the interview test.

When you get stuck, that is normal. Use the debugging loop below and the phase that taught the topic.

## Getting unstuck

- **Reduce the problem** to the smallest case that fails, and fix that first.
- **Read the traceback from the bottom up** — the last line usually names the real error.
- **Add an observability point** — a log line or a trace — to see what actually happened.
- **Check one assumption at a time** with a tiny test or a one-line script.
- **Read the error message literally**; it usually says what is wrong.
- **Explain it out loud** to a rubber duck or a friend; the gap often appears mid-sentence.
- **Re-read the phase page** for the topic rather than guessing.

## A realistic time budget

Part-time estimates, not deadlines. Take longer and do it well. Warm-ups come first, then the main projects in numeric order.

| Project | Rough effort |
| --- | --- |
| Warm-up 1 — CLI tool | 1–2 days |
| Warm-up 2 — model wrapper | 1–2 days |
| Warm-up 3 — mini RAG | 2–3 days |
| Warm-up 4 — single-tool agent | 2–3 days |
| Project 1 — RAG Engine | 2–3 weeks |
| Project 2 — Workflow Agent | 3–4 weeks |
| Project 3 — Agent Platform | 4–6 weeks |
| Project 4 — LLM Gateway | 1–2 weeks |
| Project 5 — Evaluation Platform | 1–2 weeks |
| Project 6 — MCP Gateway | 2 weeks |

## Where to go next

- [Warm-up projects](warm-up-projects.md) — four small builds to get your hands moving.
- [Definition of done](definition-of-done.md) — what "finished" means for every project.
- [Glossary](glossary.md) — every term used in the briefs, in plain language.
- [The projects](index.md) — the six full briefs.
