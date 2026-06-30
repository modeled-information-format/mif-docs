---
name: changelog
description: Write or update a CHANGELOG in the Keep a Changelog 1.x format — a human-curated, reverse-chronological record of notable changes per released version, grouped by Added/Changed/Deprecated/Removed/Fixed/Security and versioned with SemVer. Use when the user needs release notes or a version history humans will read. Anti-trigger; not for forward-looking roadmaps, marketing release announcements, or a raw dump of git commit log lines.
---

# changelog

Produces a **changelog** in the Keep a Changelog 1.x sense: a *curated, time-bound
record* of what changed between released versions, written **for humans**, not a
machine dump of commits. It is episodic — every entry is anchored to a version
and a release date.

## Pattern (industry: Keep a Changelog 1.x, keepachangelog.com)

1. **Title + intro** — an `# Changelog` H1 and a one-line statement that the file
   follows Keep a Changelog and Semantic Versioning.
2. **`## [Unreleased]`** — the top section, accumulating changes not yet released.
3. **Version sections** — `## [x.y.z] - YYYY-MM-DD`, newest first
   (reverse-chronological). The date is ISO-8601.
4. **Grouped subsections** — within each version, `###` headings drawn only from
   the fixed set, in this order: **Added, Changed, Deprecated, Removed, Fixed,
   Security**. Include only the groups that apply.
5. **Link-reference definitions** (optional) — at the bottom, `[x.y.z]: <url>`
   compare/diff links matching each version header.

## Rules that keep it a changelog

- One entry block per **version**, not per commit. Curate; summarize the notable
  user-facing change, don't paste `git log`.
- Group same *kinds* of change together using the six canonical categories — no
  ad-hoc category names.
- **Latest version on top**; `## [Unreleased]` above all releases.
- Follow **SemVer**: breaking changes bump MAJOR, features MINOR, fixes PATCH.
- Always give released versions a date; flag removals/Deprecated and Security
  explicitly so readers can assess upgrade risk.
- Write for a human reader deciding whether/how to upgrade — clear, past-tense,
  no internal jargon or bare commit hashes.

## MIF frontmatter

`type: episodic` (a changelog is a time-bound record). Climb to L2 with
`namespace` (e.g. `changelog/<project>`), `tags`, and `title` when known. Gate
every output with `mif-validate --level 1`.

See `templates/good.md` (a conformant changelog with Unreleased plus released
versions) and `templates/bad.md` (a changelog reduced to ungrouped, undated,
unversioned git-log lines — the most common failure).
