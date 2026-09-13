# Agentic AI Engineering Study Book

Quarto study book for a production-oriented agentic AI learning path.

## Local preview

Install [Quarto](https://quarto.org/docs/get-started/) and run:

```bash
quarto preview
```

## Build

```bash
quarto render
```

The generated static site is written to `_site/`. Pushing to `master` publishes it to
GitHub Pages using the workflow in `.github/workflows/publish.yml`.

## Structure

The book is a Quarto `book`. Each phase is a part, and each topic is one concept page with the same shape: one idea, how it works, a small example, production notes, interview questions, and three recall points. See `docs/superpowers/specs/2026-09-13-agentic-ai-study-book-design.md` for the authoring conventions.

## Current scope

- Book structure and the study roadmap (`index.qmd`).
- Phase 1 — Production Python: overview and the first topics (Type Hints, Dataclasses).
- Remaining phase topics and projects are written incrementally, 1–2 concepts per session.
# agentic-ai-engineer-book
