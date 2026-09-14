# Warm-Up Projects

> Four small builds for before the big ones. Most take a day or two, each teaches one phase's core skill, and each gives you something you can actually run. Build all four before starting the six main projects.

## Why warm-ups

The main projects are large. If you start with Project 1, you will spend the first week on plumbing and lose momentum. These four build the smallest possible version of each core skill — typing and testing, calling a model, retrieving over your own data, and running one tool — so the big projects feel like assembly rather than a cliff.

Each warm-up uses only the phases you have already read.

## Warm-up 1 — A typed command-line tool

**Builds on:** Phase 1 — Production Python.

**Goal.** Get comfortable with modern, typed, tested Python with no AI involved.

**What you build.** A small CLI that does something useful with local data — for example, a note-taking tool that can `add`, `list`, and `search` notes stored in a JSON file.

**Requirements.**
- Parse arguments from the command line (a library like `argparse` or `typer`).
- Use type hints on every function.
- Use a dataclass or Pydantic model for a note.
- Store data in a file; handle "file does not exist" cleanly.
- Log actions as structured lines.
- Be installable and runnable with one documented command.

**Steps.**
1. Decide the three commands and their arguments.
2. Define the data model.
3. Implement add and list first.
4. Add search.
5. Add error handling and logging.
6. Write unit tests for the model and the search.
7. Write the README.

**Done when.**
- [ ] I can run it from a fresh terminal by following the README.
- [ ] Tests pass and cover the core logic.
- [ ] Bad input gives a clear message, not a crash.

## Warm-up 2 — A model API wrapper with fallback and streaming

**Builds on:** Phase 2 — LLM Fundamentals.

**Goal.** Learn to call a model cleanly and handle the ways it fails.

**What you build.** A small library that sends a chat prompt to a model and returns the answer, with a second provider as a fallback and streaming output.

**Requirements.**
- One function that takes a list of messages and returns text.
- A provider adapter so a second provider can be swapped in.
- Streaming: print tokens as they arrive.
- A timeout and a retry with backoff on transient errors.
- A structured (JSON) output mode validated against a schema.
- Read the API key from the environment, never from code.

**Steps.**
1. Call one provider with a simple prompt and print the answer.
2. Add streaming.
3. Wrap it in an adapter interface.
4. Add the second provider behind the same interface.
5. Add a timeout, then a retry with backoff and jitter.
6. Add an ask for JSON and validate it.
7. Add a tiny test that runs against a mock so it needs no network. Remember that a mock proves your plumbing, not the real streaming or fallback — check those once by hand.

**Done when.**
- [ ] I can stream an answer to the terminal.
- [ ] Simulating a first-provider outage (bad key, wrong URL, or timeout) still returns an answer from the second, or fails cleanly.
- [ ] A malformed JSON answer is rejected, not silently accepted.
- [ ] No key is hard-coded anywhere.

## Warm-up 3 — Mini RAG over your own notes

**Builds on:** Phase 3 — RAG Engineering.

**Goal.** Build the smallest complete retrieval-augmented system, over your own text.

**What you build.** A script that reads a folder of your notes, chunks and embeds them, and answers a question with the chunks it used.

**Requirements.**
- Read a folder of `.md` or `.txt` files.
- Chunk the text with a size and an overlap.
- Embed the chunks and store them (a simple file or SQLite is fine).
- For a question, embed it, find the top-k similar chunks, and print them.
- Ask the model to answer using only those chunks, and show which chunk each claim came from.

**Steps.**
1. Load the files and print one to check the text is clean.
2. Chunk and print the chunks with their ids.
3. Embed and store; then query and print the top-k.
4. Add the model call, grounded in the retrieved chunks.
5. Add citations and an "I don't know" when the chunks do not answer.
6. Build a tiny set of five questions with known answers, and score it.

**Done when.**
- [ ] I can add a file and ask a question about it.
- [ ] Answers cite the chunk they used.
- [ ] An unrelated question returns "not enough evidence", not a guess.
- [ ] I have five labelled questions and a repeatable score.

## Warm-up 4 — A single-tool agent with a loop cap

**Builds on:** Phase 4 — Agentic AI Engineering.

**Goal.** Build one agent that calls one tool in a loop and stops correctly.

**What you build.** An agent that answers questions needing arithmetic by calling a calculator tool, with a hard cap on loop iterations.

**Requirements.**
- Define one tool with a name, a description, and an argument schema.
- A loop: send the model the question and the tool; if it asks for a tool, run it and send the result back; repeat.
- A step cap (for example, ten) and a clear stop reason.
- Validate tool arguments before running, and return errors to the model rather than crashing.
- Log every step: the model's decision, the tool call, and the result.

**Steps.**
1. Define the tool and call it directly, with no model, to check it works.
2. Ask the model to choose a tool, and print its choice.
3. Execute the choice and feed the result back.
4. Loop until the model answers or the cap is hit.
5. Add argument validation and a tool-error path.
6. Log the whole run.

**Done when.**
- [ ] "What is 19 times 23?" returns 437 with a visible tool call.
- [ ] A question needing no tool is answered directly without a tool call.
- [ ] A stuck case stops at the cap with a reason, rather than looping forever.
- [ ] I can read the run log and see every decision.

> **Then what.** With these four done, pick a main project. Project 4 continues Warm-up 2, Project 1 continues Warm-up 3, and Project 2 continues Warm-up 4.
