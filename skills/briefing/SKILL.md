---
name: briefing
description: Write a one-page briefing or standup update — Headline, What's New, Why It Matters, What's Next / Asks — for a recurring audience that already holds context and needs the delta fast. Use for a terse status or situational update, not a narrative summary. Anti-trigger; for a longer standalone summary of a larger document written for a first-time reader use exec-summary, for a released-version history use changelog.
argument-hint: "<the status update to write, and the period it covers>"
---

# briefing

Produces a **one-page briefing**: a terse status or standup update for a
recurring audience — a standup, a sync, a regular stakeholder update — who
already hold the backdrop and need the delta and the next action, fast. It is
harness-native: no named external body (ISO/NISO/ANSI/APA/etc.) prescribes a
"briefing" format, so there is no domain standard to conform to here.

## Pattern (one-page briefing / standup update)

1. **Headline** — one line: the single most important thing to know right now.
2. **What's New** — 2 to 4 bullets of the latest developments since the last
   briefing. Favor the delta (changed or new items) over restating what's
   already known.
3. **Why It Matters** — one line per item: the implication or so-what. Every
   "What's New" bullet is paired with one of these — there is no orphan update.
4. **What's Next / Asks** — the next actions, owners, and any decisions or
   inputs needed. Name something concrete; "continue monitoring" is not an ask.

Front matter carries a title, a date, and the period the briefing covers (since
the last update). No figures are required — this is a one-pager; add a single
status indicator only if it replaces a sentence, and render it as a Mermaid
`xychart-beta`, never ASCII art or an image. A footnote/source list is the only
back matter, and only when citation markers are used.

## Rules

- Hard ceiling: one page. If it spills over, cut to the delta — the freshest,
  most decision-relevant items win over restated context.
- Lead with the change; do not re-explain standing background the recurring
  audience already holds.
- Every "What's New" bullet carries a paired "Why It Matters" line — an update
  with no stated implication is incomplete.
- Exclude claims known to be false; flag uncertain or weakened ones inline
  (e.g. "unconfirmed", "reportedly") rather than presenting them as settled.
- Account for everything the briefing is drawing from — compress to the delta,
  but never silently drop an item; note thin or uncertain ones instead of
  omitting them.
- Citations, when used, are inline markers (`[1]`, `[2]`) or bare links
  resolving to a short footnote list — never raw internal identifiers in the
  body prose.

## Anti-triggers — do not use this genre for

- **A longer, standalone summary of a larger document for a reader who does
  not already hold context** — that is `exec-summary`: it re-establishes
  background rather than assuming it, and isn't bound to a recurring cadence
  or a "since last update" delta.
- **A curated, versioned history of released changes** — that is `changelog`:
  entries are anchored to release versions, not to a standup cadence.
- **A single already-made technical decision with its rationale on record** —
  that is `adr`: immutable and driver-and-outcome shaped, not a status delta.

## MIF frontmatter

`type: episodic` — a briefing is a time-bound record tied to a specific
coverage period, not durable declarative knowledge. The L1 floor is `id`,
`type`, `created` + body; climb to L2 with `namespace` (`briefing/<area>`),
`title`, and `tags`, and to L3 with `modified`, `temporal` validity,
`provenance`, `citations[]` for any sourced claims, and typed
`relationships[]`. Gate every output with `mif-validate` (`--level 1`
minimum).

## Why machine-readable

| Question an agent asks | Answered by (frontmatter) |
| --- | --- |
| What period does this update cover, and is it still current? | `temporal.validFrom` / `temporal.ttl` |
| Where did each "What's New" item come from? | `citations[]` |
| Who or what produced this briefing? | `provenance` (W3C-PROV) |
| What does this briefing follow on from or feed into? | typed `relationships[]` (`relates-to`, `derived-from`) |

The same document still reads as a terse human status update and projects
losslessly to JSON-LD and back — one artifact, two readers.

## The L1 -> L3 climb

- `templates/good-l1.md` — **L1 floor**: `id`, `type`, `created` + body. A
  complete, valid briefing, but opaque to a machine consumer asking "is this
  still current?" or "where did this come from?".
- `templates/good.md` — **L3 (highest this genre supports)**: adds
  `namespace`, `modified`, `temporal` validity for the coverage period,
  W3C-PROV `provenance`, `citations[]` tied to the "What's New" items, and a
  typed `relationships[]` graph (e.g. `relates-to` the prior period's
  briefing). Validate with `mif-validate --level 3`.

Author at the **highest level the drafting context supports** (grade down
rather than fabricate). `templates/bad.md` shows the antipattern: "What's New"
bullets with no paired "Why It Matters" — orphan updates the reader has no way
to weigh.
