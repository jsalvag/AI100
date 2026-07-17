# Source Ingestion Notes

This directory is reserved for generated source descriptors from future web scraping work.

Expected generated shape per section:
- stable module id, section number, slug, title, summary, source URL, and retrieval timestamp
- normalized concept blocks, examples, exercises, references, and lab candidates
- no scraped HTML styles; only semantic content and metadata

The app seed model in `src/data/sections.ts` is intentionally small so generated sections can target the same fields before database insertion.
