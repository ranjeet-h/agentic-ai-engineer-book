# Agentic AI Study Book — design and authoring spec

Date: 2026-09-13
Status: approved

## Purpose

An mdBook **book** that takes a working software engineer to interview-ready on agentic AI engineering, from Python fundamentals through multi-agent systems. The goal is interview readiness, so every topic must be explainable out loud, not just recognizable.

## Audience and tone

- Audience: an experienced developer who is new to AI/agentic engineering.
- Language: simple English, short sentences, jargon defined on first use.
- No filler. Every production claim should connect to a concrete failure, number, or trade-off.
- Written to be read once and revised quickly.

## Structure

- `book.toml` configures the Rust mdBook output. `src/SUMMARY.md` is the single source of study order.
- One **part per phase**, using `src/phase-NN-<slug>/index.md` as the part title page.
- One **folder per phase** under `src/`: `phase-NN-<slug>/`.
- One **`.md` per concept**, numbered in study order: `src/phase-NN-<slug>/01-<slug>.md`.
- `src/index.md` is the book introduction and holds the full roadmap.
- The `projects/` folder holds the final project chapters.
- New pages are added to `src/SUMMARY.md` as they are written (only existing files are listed, so the book always renders).

## One page per concept, not per bullet

The roadmap in `src/index.md` lists many bullets. A page is one **concept a person can be interviewed on end to end**. Facets of a single idea are merged into one page (for example `FP32`/`FP16`/`BF16`/`INT8`/`INT4` become one page on numeric precision). No roadmap bullet is dropped: merged bullets become sections inside the page, and the phase index records the mapping.

## Per-topic page template

Assume the reader knows **nothing** about the topic. Every term is defined on first use, and every idea is built from the ground up. Depth beats brevity: it is better for a page to be long and truly understood than short and half-learned.

Every topic page uses the same sections, in this order:

1. **Page title** — one level-one Markdown heading matching the topic.
2. **Interview answer** — a blockquote at the top with the one or two sentence answer to say first.
3. **Why this exists** — the problem it solves, in plain language, with a concrete failing example if possible.
4. **Start from zero** — the vocabulary and first principles someone needs before the idea makes sense. Define each word simply.
5. **The core idea** — analogy, mental model, and a diagram or table.
6. **How it works** — the mechanism, step by step, at the level of what Python actually does.
7. **The syntax you will use** — a guided tour of the real forms, each with a two-line example.
8. **Examples: simple to real** — several small examples that build in difficulty and show the idea in action.
9. **In production** — 5–10 bullets on trade-offs, failure modes, and gotchas.
10. **Interview questions** — 6–8 questions. Each has a model **Answer**, a **Follow-up**, and a **Trap**.
11. **Remember this** — 3–5 recall bullets for revision.

Code stays illustrative, but pages should include enough snippets to make the concept concrete. Explain each snippet in plain words; never assume the reader can infer what it does.

## Conventions

- Python 3.12+ in examples; `X | None` rather than `Optional[X]` where version allows.
- Diagrams use Mermaid, no external images.
- Use labelled Markdown blockquotes sparingly for the one thing on the page worth interrupting for.
- File and folder names are lowercase kebab-case.

## Pace

Write 1–2 topic pages per session, in roadmap order. Each session ends with a status note: what was written and what comes next. Do not batch-write hundreds of pages before review.

## Review gate

After writing every topic page, review it against this checklist **before** moving to the next topic. Fix any failure; do not mark work done until all items pass.

| # | Check | Pass condition |
| --- | --- | --- |
| 1 | Page title | Level-one heading is present and matches the topic. |
| 2 | Interview answer | Blockquote at the very top with the one-or-two-sentence answer. |
| 3 | Section order | Why this exists → Start from zero → The core idea → How it works → The syntax you will use → Examples: simple to real → In production → Interview questions → Remember this. |
| 4 | Zero-knowledge test | Every term is defined on first use; the page is readable by someone who has never heard of the topic. |
| 5 | Visual or table | At least one diagram (Mermaid) or comparison table. |
| 6 | First principles | "Start from zero" covers the vocabulary and the underlying concept, not just this feature. |
| 7 | Syntax tour | Covers the real forms used in production code, each with a tiny example. |
| 8 | Graded examples | At least three examples that build in difficulty. |
| 9 | Production depth | 5–10 concrete bullets: trade-offs, failure modes, gotchas — no vague advice. |
| 10 | Interview set | 6–8 questions, each with Answer, Follow-up, and Trap. |
| 11 | Recall | 3–5 "Remember this" bullets. |
| 12 | Technical accuracy | Every version claim, API behavior, and code snippet is true and was verified. |
| 13 | Language | Simple English, short sentences, no unexplained jargon. |
| 14 | Wiring | Page is linked from the phase index and listed in `src/SUMMARY.md`. |
| 15 | Build | The GitHub Actions `mdbook build` passes with no errors. |

The review result for each topic is reported alongside the topic, naming any item that needed a fix.

## Status

- [x] Book restructured from website to Rust `mdBook`.
- [x] Phase 1 overview written.
- [x] Phase 1, Topic 1 (Type Hints) written.
- [x] Phase 1, Topic 2 (Dataclasses) written.
- [x] Phase 1, Topic 3 (Pydantic) written.
- [x] Phase 1, Topic 4 (Decorators) written.
- [x] Phase 1, Topic 5 (Iterators and Generators) written.
- [x] Phase 1, Topic 6 (Context Managers) written.
- [x] Phase 1, Topic 7 (Exception Handling) written.
- [x] Phase 1, Topics 8–29 written.
- [x] Phase 1 checkpoint review (independent content review + fixes applied).
- [x] Phase 2 — LLM and Generative AI Fundamentals (overview + Topics 1–25 written, independent review + fixes applied).
- [x] Phase 3 — RAG Engineering (overview + Topics 1–21 written, independent review + fixes applied; 52/52 roadmap bullets covered).
- [x] Phase 4 — Agentic AI Engineering (overview + Topics 1–22 written, independent review + fixes applied; 60/60 roadmap bullets covered).
- [x] Phase 5 — MCP and Tool Ecosystems (overview + Topics 1–20 written, independent review + fixes applied; 38/38 roadmap bullets covered).
- [ ] Phases 6–13.
- [ ] Final projects.

## Batch review note

Topics 8–29 were drafted in parallel by several agents from this spec, then reviewed centrally against the review gate before being wired into `src/SUMMARY.md`. The central review checked: section order, exactly 8 interview questions each with Answer/Follow-up/Trap, 8–12 production bullets, 3–5 recall bullets, at least one Mermaid diagram or comparison table, no placeholders, no cross-file duplication, and that all Python snippets compile. Every behavioral claim in a runnable topic was executed during review (Python 3.14, and `uv` for third-party packages); infrastructure claims were checked against standard behavior. The phase index and `src/SUMMARY.md` are updated only after a topic passes.

### Independent content review (Phase 1)

After the structural pass, every Phase 1 topic was read in full by independent reviewer agents that fact-checked claims against real execution and checked studyability. This found and fixed real defects that the structural pass could not see, including:

- A TaskGroup example whose helper never raised, so the fail-fast behaviour it taught never occurred.
- A false statement about thread joining.
- `asyncio.gather(...)` called with a generator instead of `*args`.
- A reversed `sys.path` search order, contradicting the chapter's own example.
- Inverted FastAPI middleware-ordering advice.
- A Redis claim that logical databases isolate eviction (they do not).
- CI deploy jobs that ran repository scripts without checking the repository out.

All high- and medium-severity findings were fixed and re-verified. The lesson for later phases: generate, then review with fresh eyes, then verify the fixes — never ship on structure alone.
