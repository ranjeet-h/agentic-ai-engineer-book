# Dark Mode Toggle Implementation Plan

> **For agentic workers:** Use the repository's implementation and verification skills when executing this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a visible mdBook light/dark toggle that defaults to the device color scheme and remembers an explicit user choice.

**Architecture:** Let mdBook choose the initial theme from `prefers-color-scheme` when no `mdbook-theme` value exists. Configure `light` and `navy` as the default light and preferred dark themes. Add a small toolbar button that stores an explicit `light` or `navy` choice and reloads the page so mdBook applies it before content paints.

**Tech Stack:** Rust mdBook 0.4.52, `mdbook-mermaid` 0.16.2, CSS, JavaScript, and GitHub Pages static output.

## Global Constraints

- Preserve the existing book structure, lesson content, diagrams, fonts, and assets.
- Keep mdBook as the only build system.
- Publish the generated `book/` directory to the `gh-pages` branch from GitHub Actions.
- Do not run a local build or server; CI is the rendering environment.
- Keep the toggle keyboard-accessible and responsive on touch devices.

---

### Task 1: Configure mdBook themes and add the toggle

**Files:**

- Modify: `book.toml` with mdBook theme configuration and assets.
- Add: `theme/custom.js` for the device-aware toggle.
- Modify: `theme/custom.css` for light/dark variables and toolbar styling.

**Interfaces:**

- Consumes: mdBook's `default-theme`, `preferred-dark-theme`, `prefers-color-scheme`, and `mdbook-theme` local-storage key.
- Produces: Every rendered page has a visible, keyboard-accessible theme toggle. With no stored choice, the page follows the device preference; after a click, the explicit choice persists across reloads.

- [x] **Step 1: Configure light and dark themes.**

Use `light` as the normal theme and `navy` as the preferred dark theme in `book.toml`. Include the custom CSS and JavaScript in mdBook's HTML output.

- [x] **Step 2: Add the toolbar control.**

`theme/custom.js` inserts a moon/sun button into mdBook's toolbar, labels it for assistive technology, sets `aria-pressed`, and stores only explicit `light` or `navy` choices. A mutation observer keeps the icon and label synchronized with mdBook's native theme picker.

- [x] **Step 3: Style both modes.**

`theme/custom.css` defines shared reading variables for light and dark themes, styles the toolbar control and focus state, and keeps Mermaid diagrams readable in either mode.

- [x] **Step 4: Publish through GitHub Actions.**

`.github/workflows/publish.yml` installs pinned mdBook binaries, runs `mdbook build`, and publishes `book/` to `gh-pages` with Jekyll disabled.

- [x] **Step 5: Verify without a local render.**

Check tool versions, JavaScript syntax, TOML parsing, navigation and relative links, Mermaid/callout counts, whitespace, and the absence of legacy source files. Do not run `mdbook build` or `mdbook serve` locally.
