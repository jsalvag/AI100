# AI Lab

Local educational lab for AI100, AI200, and AI300. The current app is an Astro SSR project in `app/` with React islands for interactive labs and SQLite persistence through `AI_DATA_DIR`.

## Commands

- `pnpm install` installs workspace dependencies.
- `pnpm dev` runs the app at `http://localhost:4321`.
- `pnpm build` runs Astro checks and builds the standalone server.
- `pnpm test:e2e:headed` runs the focused Playwright suite in headed Chromium with `slowMo: 500`.
- `docker compose up --build` runs the app in a container with persistent data in the `ai_lab_data` volume.

## Data

SQLite is created at `AI_DATA_DIR/local.db`. In Docker, `AI_DATA_DIR=/data` and `/data` is a named volume.

## Content Growth

Section content is seeded from `app/src/data/sections.ts`. Future web scraping should generate semantic section data, not copied HTML or styles, and target the same module/section/block model.
