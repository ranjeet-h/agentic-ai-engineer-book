# Agentic AI Engineering Study Book

> A production-first study book for engineers who want to understand, build, and operate reliable agentic AI systems.

[![Read the live book](https://img.shields.io/badge/read-live%20book-1f6feb?style=for-the-badge)](https://ranjeet-h.github.io/agentic-ai-engineer-book/)
[![Built with mdBook](https://img.shields.io/badge/built%20with-mdBook-4d76ae?style=flat-square)](https://rust-lang.github.io/mdBook/)
[![Status](https://img.shields.io/badge/status-growing%20roadmap-f2cc60?style=flat-square)](https://github.com/ranjeet-h/agentic-ai-engineer-book)

## Read the book

**[Open the live book →](https://ranjeet-h.github.io/agentic-ai-engineer-book/)**

The live edition is the best way to read the current material. It is published as a searchable mdBook with responsive navigation, collapsible phase sections, syntax highlighting, Mermaid diagrams, and mdBook's default theme picker.

## Why this book exists

Many AI resources teach isolated API calls or framework recipes. This book follows the layers underneath a production AI system:

```text
Production Python
        ↓
LLMs and Generative AI
        ↓
RAG Engineering
        ↓
Agentic AI Engineering
        ↓
MCP and Tool Ecosystems
        ↓
Distributed Systems
        ↓
AI Platforms, Reliability, Security, and Architecture
```

The goal is interview-ready understanding that transfers to real systems. Each concept is written to help you explain the idea, understand the mechanism, recognize production trade-offs, and apply it in a project.

## Learning architecture

The roadmap progresses through these phases:

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

The final project track will connect the phases through production-style systems such as an enterprise RAG engine, workflow agent, AI control plane, LLM gateway, evaluation platform, and enterprise MCP gateway.

## Career outcomes

The completed book is designed to help engineers prepare for roles across applied AI, backend systems, platform engineering, and architecture:

- Senior AI Engineer
- AI Engineer
- Agentic AI Engineer
- GenAI Engineer
- AI Platform Engineer
- LLM Engineer
- Forward Deployed AI Engineer
- AI Backend Engineer
- GenAI Solutions Engineer
- AI Solutions Architect
- AI Systems Architect

## Project direction

This repository is being developed as a complete, end-to-end study book. The full roadmap is defined up front so the material can grow in a coherent order from production Python to AI systems architecture.

Content is added incrementally, but the intended destination is the complete roadmap and project track described above. Pages are linked into the rendered book only after they meet the common authoring, verification, and review standard.

## What a finished topic should contain

Each topic is designed as a self-contained interview and revision page:

- A concise interview answer.
- The problem the concept solves.
- First-principles vocabulary and mental models.
- How the mechanism works.
- Practical syntax and progressively harder examples.
- Production trade-offs, failure modes, and security considerations.
- Interview questions with answers, follow-ups, and common traps.
- Short recall points for revision.

The book favors simple explanations, concrete examples, Mermaid diagrams, comparison tables, and technically verified claims.

## Project structure

```text
.
├── book.toml                            # mdBook configuration and output settings
├── src/
│   ├── SUMMARY.md                      # Chapter order and navigation
│   ├── index.md                        # Introduction and complete roadmap
│   └── phase-NN-<slug>/                # One directory per learning phase
│       ├── index.md                    # Phase overview and topic map
│       └── *.md                        # Individual concept pages
├── styles/
│   └── navigation.css                  # Bottom previous/next chapter links
├── theme/
│   └── mermaid*.js                     # Mermaid runtime used by mdBook
├── assets/fonts/                       # Self-hosted reading and code fonts
├── book/                                # Generated mdBook site (ignored)
└── docs/superpowers/specs/             # Authoring and review specification
```

The chapter list in `src/SUMMARY.md` is the source of truth for what appears in the rendered book. A draft page is not considered published until it is linked there and passes review.

## Publishing

The repository publishes to GitHub Pages from the `gh-pages` branch through [`.github/workflows/publish.yml`](.github/workflows/publish.yml).

Every push to `master` (or a manual workflow dispatch) runs the same release path:

1. Install pinned Rust `mdbook`.
2. Build the Markdown source into the ignored `book/` directory.
3. Publish `book/` to `gh-pages` with Jekyll disabled.

GitHub Pages then serves the static `gh-pages` branch at:

**[Open the live book →](https://ranjeet-h.github.io/agentic-ai-engineer-book/)**

## Local preview

Mermaid is rendered in the browser, matching the setup used by the sibling mdBooks. No Mermaid preprocessor is required, so the local server only needs mdBook:

```bash
mdbook serve
```

No local build is required for publishing; GitHub Actions is the build and publishing environment.

## Writing and review principles

The repository uses a deliberate, incremental workflow:

1. Choose the next topic from the phase roadmap.
2. Write one or two concepts using the standard page structure.
3. Verify code, API behavior, version claims, diagrams, and links.
4. Let the GitHub Actions mdBook build verify the complete book.
5. Read the page as a learner and fix gaps before moving on.

See the [authoring specification](docs/superpowers/specs/2026-09-13-agentic-ai-study-book-design.md) for the complete page template and review checklist.

## Contributing

Contributions are welcome, especially improvements to explanations, examples, diagrams, terminology, and technical accuracy.

Before opening a pull request:

1. Keep changes focused on one topic or one clearly related improvement.
2. Preserve the learning sequence and page structure.
3. Confirm the GitHub Actions mdBook build succeeds.
4. Explain what was verified in the pull request description.
5. Do not present planned or unverified material as production-ready guidance.

For larger changes, open an issue first so the learning architecture can be discussed before implementation.

## Maintainer

Created and maintained by [Ranjeet Harishchandre](https://github.com/ranjeet-h).

## License and reuse

This is an open-source learning project. Licensing and reuse terms for the book content, code examples, and visual assets are documented separately in the repository as the project is prepared for broader contributions.
