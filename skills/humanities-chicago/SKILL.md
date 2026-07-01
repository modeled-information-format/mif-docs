---
name: humanities-chicago
description: Write an argumentative humanities essay in Chicago Notes-Bibliography style — Introduction with thesis, thematic argument sections (claim, evidence, interpretation), Conclusion, numbered footnotes/endnotes, and a full Bibliography. Use when the deliverable is a humanities argument advanced through close reading, not an empirical study. Anti-trigger; for the same notes-bibliography convention with parenthetical author-date citations instead of footnotes use humanities-mla, for an empirical IMRaD paper with Method and Results use academic.
argument-hint: "<the humanities thesis or argument to write>"
---

# humanities-chicago

Produces an **argumentative humanities essay in Chicago Notes-Bibliography
style**: a scholarly argument advanced through close reading and
interpretation, not an empirical study. Its center of gravity is the
**citation apparatus** — every claim carries a numbered footnote (or endnote)
with its human-readable source citation, and the back matter carries a full,
alphabetized **Bibliography**. This genre follows the Chicago Manual of
Style's Notes-Bibliography system, the standard citation convention for
history, literature, and the arts.

> **Scope caveat (weakened verdict — carry, do not over-attribute):** Chicago
> Notes-Bibliography is a presentation/citation convention, validated less
> firmly than the STEM standards. The genre reproduces the *argumentative
> structure and citation form*; do not over-attribute conformance.

## Pattern (industry: Chicago Manual of Style, Notes-Bibliography system)

1. **Introduction** — context and an explicit **thesis** the essay will argue.
2. **Thematic argument sections** — one per major claim, each developing
   **claim -> evidence -> interpretation**; the sections build the argument
   cumulatively.
3. **Conclusion** — what the argument establishes and why it matters; no new
   evidence introduced here.
4. **Bibliography** — the full, alphabetized list of every source cited,
   Chicago style.

There is **no Method and no Results section** — the essay argues; it does not
report an experiment. This is the distinguishing feature versus the
`academic` genre.

## Citation Style

Chicago **Notes-Bibliography**: numbered **footnotes** (or endnotes) carry the
citations — e.g. `[^1]` markers resolving to a note with the human-readable
source citation (author, title, publication detail, URL where applicable) —
and a full **Bibliography** lists every source alphabetically by author
surname. Internally each note may resolve through a MIF finding `@id` for
traceability (MIF Level 3 floor), but that `@id` is never printed in the note
or the body text. No uncited claims — an orphan fact is a defect.
**Verify the current Chicago Manual of Style edition live** (the 18th Edition
supersedes the 17th); do not bake an edition number into output as settled
fact.

## Required Figures & Matter

- **Front matter**: title and, where the convention calls for it, author and
  date.
- **Figures**: tables or images only where the argument genuinely needs them;
  caption and reference each. Any figure, chart, or diagram is rendered as a
  fenced Mermaid code block (a `mermaid` info-string fence), never ASCII art,
  an image link, or Graphviz/DOT; a required figure is never silently
  omitted — if the data cannot support it, say so in prose. Plain tabular
  matter stays a Markdown table.
- **Back matter**: the full **Bibliography** (required) — alphabetized,
  Chicago style.

## Rules that keep it a Chicago humanities essay

- Every claim carries a numbered footnote with its human-readable source
  citation; that footnote may resolve internally to a MIF finding `@id` for
  traceability (never printed). No orphan facts.
- The Bibliography is mandatory back matter and must be alphabetized — an
  essay with footnotes but no Bibliography, or a Bibliography with no
  footnotes tying claims to it, is not conformant.
- State the limits of the reading honestly; engage counter-interpretations.
  An unaddressed strong counter-reading is a defect.
- Report verification verdicts; do not silently drop `weakened` or
  `inconclusive` findings — annotate them with an explicit uncertainty
  qualifier. Exclude only `falsified` units.
- Hedge uncertain interpretations; do not over-attribute when sources are
  contested.
- **Exhaustive coverage**: build the essay from the full surviving findings
  corpus — every surviving finding is treated with its own evidence (claim,
  citations, entities), never condensed to a cherry-picked subset. A silently
  dropped finding is a defect.
- No `urn:mif:` identifiers or internal finding-ID handles leak into prose or
  footnotes.

## Anti-triggers — do not use this genre for

- **The same notes-bibliography argument with author-date parenthetical
  citations instead of footnotes** — that is `humanities-mla`: same
  argumentative shape, a different citation apparatus (in-text `(Author
  page)` plus a Works Cited list, not footnotes plus a Bibliography).
- **An empirical study with Method and Results** — that is `academic`:
  IMRaD structure, mandatory citation discipline, but reporting a study
  rather than arguing a reading.
- **A practitioner decision built around a mandatory comparison table** —
  that is `engineering`.

## MIF frontmatter

`type: semantic` — a humanities essay is declarative argument-and-evidence
knowledge, not a time-bound event or a step sequence. Climb to L2 with
`namespace` (`humanities-chicago/<area>`), `modified`, `title`, and `tags`
when the drafting context supplies them. Gate every output with
`mif-validate` at its target level; the floor is `--level 1`.

## Why machine-readable — the point of MIF here

| Question an agent asks | Answered by (frontmatter) |
| --- | --- |
| Is this reading still current, or has scholarship moved on? | `temporal.validFrom` / `ttl` |
| Where did the evidence come from; can I trust it? | `provenance` (W3C-PROV) + `citations[]` |
| What does this essay build on or get contested by? | typed `relationships[]` (`relates-to`, `contested-by`) |
| Which footnote traces to which source? | `citations[]` tied to each argument claim |

The same document still reads as a human humanities essay and projects
losslessly to JSON-LD and back — one artifact, two readers.

## The L1 -> L3 climb (two exemplars)

This genre ships the **same essay at two MIF levels** so the climb is
explicit:

- `templates/good-l1.md` — **L1 floor**: `id`, `type`, `created` + body. A
  complete, valid essay, but opaque to a machine consumer.
- `templates/good.md` — **L3 (highest this genre supports)**: adds
  `namespace`, `modified`, `temporal` validity, W3C-PROV `provenance`,
  `citations[]` tied to the footnoted claims, and a typed `relationships[]`
  graph (e.g. `relates-to` a companion essay in a neighboring genre).
  Validate with `mif-validate --level 3`.

Author at the **highest level the drafting context supports** (grade down
rather than fabricate). `templates/bad.md` shows the antipattern: an essay
that asserts claims with no footnotes and no Bibliography — the citation
apparatus this genre exists to require is simply missing.
