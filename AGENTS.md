# AGENTS.md

## Project Direction
- Read `development_guide.md` before architecture, setup, or migration work; it defines the AI100/AI200/AI300 app plan.
- Build the new app as a local educational lab, not a SaaS dashboard or generic landing page.
- Use `AI100/` only as legacy source/reference while migrating; do not copy its visual design.
- Write user-facing course/UI text in Spanish; keep code, configs, comments, commit messages, and internal docs in English.

## Current Structure
- Root is the Git/workspace boundary for the new app.
- `app/` is the Astro SSR application.
- `AI100/` is legacy static HTML/Markdown; `AI100/AGENTS.md` applies only when editing that legacy module.
- `development_guide.md` is planning context, not an executable source of commands.

## Tooling
- Use `pnpm` exclusively for JavaScript installs, scripts, and package execution.
- Run app commands from the root through workspace scripts when available, or from `app/` directly.
- The app is containerized; keep dependencies installed by the container image, not assumed from the host.
- Persist local data outside disposable container layers using `AI_DATA_DIR` and the Compose volume.

## App Stack
- Astro + TypeScript with SSR via `@astrojs/node` standalone mode.
- React is for interactive labs/islands only; keep static educational structure in Astro.
- SQLite is the local persistence layer; DB bootstrap/seed must be reproducible.
- Content should be structured so future web-scraped sections can be generated into the same model.

## Design
- Use a new minimal, organized, technical/editorial interface.
- Avoid the legacy AI100 styling, oversized radii, excessive padding, decorative glassmorphism, and generic dashboard cards.
- Maintain light/dark theme parity through CSS variables and the theme selector.
- Keep controls near the visualization they manipulate; prioritize dense, readable explanations and interactive examples.

## Verification
- Before committing app changes, run `pnpm lint`, `pnpm build`, and the focused Playwright test when relevant.
- For visual e2e review, use the headed Playwright script with `slowMo: 500`.
