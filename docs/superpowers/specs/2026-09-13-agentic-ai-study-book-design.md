# Agentic AI Study Book — design and authoring spec

Date: 2026-09-13
Status: approved

## Purpose

A Quarto **book** that takes a working software engineer to interview-ready on agentic AI engineering, from Python fundamentals through multi-agent systems. The goal is interview readiness, so every topic must be explainable out loud, not just recognizable.

## Audience and tone

- Audience: an experienced developer who is new to AI/agentic engineering.
- Language: simple English, short sentences, jargon defined on first use.
- No filler. Every production claim should connect to a concrete failure, number, or trade-off.
- Written to be read once and revised quickly.

## Structure

- `_quarto.yml` is `type: book`. The `chapters` list is the single source of study order.
- One **part per phase**, using the phase's `index.qmd` as the part title page.
- One **folder per phase**: `phase-NN-<slug>/`.
- One **`.qmd` per concept**, numbered in study order: `01-<slug>.qmd`.
- `index.qmd` at the root is the book introduction and holds the full roadmap.
- The `projects/` folder holds the final project chapters.
- New pages are added to `_quarto.yml` as they are written (only existing files are listed, so the book always renders).

## One page per concept, not per bullet

The roadmap in `index.qmd` lists many bullets. A page is one **concept a person can be interviewed on end to end**. Facets of a single idea are merged into one page (for example `FP32`/`FP16`/`BF16`/`INT8`/`INT4` become one page on numeric precision). No roadmap bullet is dropped: merged bullets become sections inside the page, and the phase index records the mapping.

## Per-topic page template

Every topic page uses the same sections, in this order:

1. **Front matter** — `title` only.
2. **Interview answer** — a blockquote at the top with the one or two sentence answer to say first.
3. **Why this exists** — the problem it solves, in plain language.
4. **The core idea** — analogy, mental model, and a small diagram or table.
5. **How it works** — the mechanism as a short numbered list.
6. **A small example** — code only when words are not enough, 5–15 lines, explained.
7. **In production** — 4–8 short bullets on trade-offs, failure modes, and gotchas.
8. **Interview questions** — 4–6 questions. Each has a model **Answer**, a **Follow-up**, and a **Trap**.
9. **Remember this** — exactly 3 recall bullets for revision.

Code is illustrative, not a coding exercise. Keep snippets minimal.

## Conventions

- Python 3.12+ in examples; `X | None` rather than `Optional[X]` where version allows.
- Diagrams use Mermaid, no external images.
- Use Quarto callouts (`note`, `tip`, `warning`) sparingly for the one thing on the page worth interrupting for.
- File and folder names are lowercase kebab-case.

## Pace

Write 1–2 topic pages per session, in roadmap order. Each session ends with a status note: what was written and what comes next. Do not batch-write hundreds of pages before review.

## Status

- [x] Book restructured from website to `type: book`.
- [x] Phase 1 overview written.
- [x] Phase 1, Topic 1 (Type Hints) written.
- [ ] Phase 1, Topics 2–29.
- [ ] Phases 2–13.
- [ ] Final projects.
