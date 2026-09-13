# Phase 1 — Production Python

This phase is the foundation. Agentic AI systems are, underneath the model calls, ordinary backend services: they take requests, validate data, talk to databases and caches, run background jobs, authenticate users, and ship through CI/CD. If this layer is shaky, every later phase becomes harder than it needs to be.

The goal of Phase 1 is not to learn Python from zero. It is to turn working Python knowledge into **production Python**: typed, tested, observable, concurrent where it helps, and deployable.

## What you will be able to do

By the end of this phase you should be able to:

- Read and write modern typed Python with confidence.
- Choose the right concurrency model (async, threads, processes) for a given problem.
- Build a real FastAPI service backed by PostgreSQL and Redis.
- Add authentication, authorization, background jobs, rate limiting, and logging.
- Test it, profile it, containerize it, and ship it through CI/CD.
- Answer interview questions about each of these without hand-waving.

## Assumed knowledge: Python for experienced developers

Before the first lesson, make sure you are comfortable with the following. These are not separate lessons — they are the baseline the rest of the phase assumes. If any item feels weak, revise it first.

- Modules, packages, imports, and the meaning of `if __name__ == "__main__":`.
- Mutable vs immutable objects, and why `a = b` on a list copies a reference, not the list.
- List/dict/set comprehensions and unpacking (`*args`, `**kwargs`).
- Closures, first-class functions, and how Python scoping works.
- Classes, `self`, inheritance, `super()`, and dunder methods (`__init__`, `__repr__`, `__eq__`).
- Iterables vs sequences, and the difference between lazy and eager evaluation.
- Virtual environments, `pip`, and reading a traceback from the bottom up.

> **Note:**
>
> **Why Python is a strong base for AI engineering.** Python is the default language of AI: model SDKs, vector databases, agent frameworks (LangGraph, OpenAI Agents SDK), and evaluation tools all ship Python first. Depth in Python therefore compounds across every later phase.


## Topic order

Work through these in order. Each topic is one concept, and each assumes the ones before it.

1. [Type hints](01-type-hints.md) — describing data without enforcing it.
2. [Dataclasses](02-dataclasses.md) — containers for structured data, without the boilerplate.
3. [Pydantic](03-pydantic.md) — validation and conversion at the edge of your system.
4. [Decorators](04-decorators.md) — wrapping behaviour around functions.
5. [Iterators and generators](05-iterators-and-generators.md) — producing values lazily.
6. [Context managers](06-context-managers.md) — guaranteed setup and cleanup.
7. [Exception handling](07-exception-handling.md) — failing in a way callers can reason about.
8. [File handling](08-file-handling.md) — reading and writing safely.
9. [Async and asyncio](09-async-and-asyncio.md) — concurrency for I/O-bound work.
10. [Threads and processes](10-threads-and-processes.md) — concurrency for CPU-bound and blocking work.
11. [Concurrency patterns](11-concurrency-patterns.md) — choosing and combining models.
12. [Packaging and virtual environments](12-packaging-and-virtual-environments.md) — isolating and shipping code.
13. [Dependency management](13-dependency-management.md) — reproducible environments.
14. [Logging](14-logging.md) — structured, searchable records of what happened.
15. [Configuration management](15-configuration-management.md) — settings, secrets, and the twelve-factor idea.
16. [pytest](16-pytest.md) — the testing loop.
17. [Mocking](17-mocking.md) — replacing dependencies in tests.
18. [Profiling and performance](18-profiling-and-performance.md) — measuring before optimizing.
19. [FastAPI](19-fastapi.md) — the service layer.
20. [SQLAlchemy](20-sqlalchemy.md) — the ORM and the unit of work.
21. [Alembic](21-alembic.md) — database migrations.
22. [PostgreSQL](22-postgresql.md) — the durable data store.
23. [Redis](23-redis.md) — caching, rate limits, and ephemeral state.
24. [Authentication and authorization](24-authentication-and-authorization.md) — identity and permission.
25. [Background jobs](25-background-jobs.md) — work that outlives a request.
26. [Rate limiting](26-rate-limiting.md) — protecting the system from overload.
27. [API testing](27-api-testing.md) — testing the service boundary.
28. [Dockerizing Python applications](28-dockerizing-python-applications.md) — a reproducible runtime.
29. [CI/CD for Python services](29-cicd-for-python-services.md) — automated build, test, and deploy.

> **Tip:**
>
> **How to study this phase.** Read a topic once for the idea, then close the book and try to explain it out loud in two sentences. Then attempt the interview questions *before* reading the answers. Doing this now is far more effective than re-reading.


## Checkpoint project

At the end of the phase, build **Project 1 — Production Python service**: a tested, containerized FastAPI service with PostgreSQL, Redis, authentication, background jobs, and CI/CD. The exact scope lives in the projects part of the book. The point of the checkpoint is to prove the phase end-to-end: if you can build this service without looking things up, Phase 1 is done.
