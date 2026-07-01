---
name: humanities-mla
description: Write an argumentative humanities essay in MLA style — Introduction with an explicit thesis, body argument sections, a Conclusion, MLA author-page in-text citations (e.g. (Author 42)), and a Works Cited list. Use when the deliverable is a humanities argument built on interpretation rather than an empirical IMRaD paper. Anti-trigger; for an empirical Method/Results report use academic, for the Chicago note-bibliography convention use humanities-chicago.
argument-hint: "<the thesis or argument to advance>"
---

# humanities-mla

Produces an **argumentative humanities essay in MLA style**: a thesis-driven
argument built through close reading and interpretation, cited with MLA
**author-page** in-text citations and a **Works Cited** list. Its center of
gravity is the **thesis** — every body section exists to advance it through
evidence and interpretation, not to report a method or results. This genre
follows the **MLA Handbook, 9th edition** citation and Works Cited convention.

> **Scope caveat (carry, do not over-attribute):** MLA author-page is a
> presentation/citation convention. The genre reproduces the *argumentative
> structure and citation form*; it does not certify scholarly sufficiency.
> **Verify the current MLA Handbook edition live** at authoring time (the 9th
> edition is current); do not bake an edition number into output as settled
> fact beyond what was verified.

## Pattern (industry: MLA 9th-edition humanities essay)

1. **Introduction** — context and an explicit **thesis** the essay will argue.
2. **Body argument sections** — one per major claim, each developing claim,
   evidence, and interpretation; sections build the argument cumulatively.
3. **Conclusion** — what the argument establishes and why it matters; no new
   evidence introduced here.
4. **Works Cited** — the alphabetized list of every source cited, MLA style.

There is **no Method and no Results section** — the essay argues; it does not
report an experiment.

## Citation style

MLA **author-page** in-text citations, e.g. `(Author 42)` — the author's
surname and the page locator in parentheses — resolving to a **Works Cited**
list, never author-date parentheticals or numbered footnotes. Each in-text
citation resolves to a real, verifiable source (or a bound MIF finding `@id`
and its source URL, at the MIF Level 3 floor); no uncited claims and no
fabricated sources.

## Rules

- Every claim traces to a cited source via its author-page citation; no orphan
  facts.
- State the limits of the reading honestly; engage counter-interpretations. An
  unaddressed strong counter-reading is a defect.
- When drawing from a verified findings corpus, do not silently drop
  `weakened` or `inconclusive` findings — annotate them with an explicit
  uncertainty qualifier. Exclude only `falsified` findings.
- Hedge uncertain interpretations; do not over-attribute when sources are
  contested.
- **Exhaustive coverage**: when a findings corpus is supplied, build the essay
  from the full surviving set — every surviving finding is treated with its
  own evidence, never condensed to a cherry-picked subset.
- Figures or tables appear only where the argument genuinely needs them,
  captioned and referenced; any diagram is a fenced Mermaid code block, never
  ASCII art or an image link. Plain tabular matter stays a Markdown table.
- The Works Cited list is alphabetized by author surname, MLA style, and is
  required back matter — never omitted, never renamed References or
  Bibliography.
- No raw internal identifiers (`urn:mif:` or similar) leak into prose or
  citations.

## Anti-triggers — do not use this genre for

- **An empirical report with a Method and Results section** — that is
  `academic`: IMRaD structure, testable method, reported findings, not an
  interpretive argument.
- **A humanities argument cited Chicago note-bibliography style** (superscript
  notes + a Bibliography) rather than MLA author-page parentheticals and a
  Works Cited list — that is `humanities-chicago`.
- **A practitioner decision report built around a mandatory options-vs-criteria
  comparison table** — that is `engineering`.

## MIF frontmatter

`type: semantic` — a humanities essay is declarative argumentative knowledge,
not a time-bound event or a step sequence. Climb to L2 with `namespace`
(`humanities-mla/<area>`), `modified`, `title`, and `tags` when the drafting
context supplies them. Gate every output with `mif-validate` at its target
level; the floor is `--level 1`. Use `entity_type: humanities-paper`.

## Why machine-readable — the point of MIF here

| Question an agent asks | Answered by (frontmatter) |
| --- | --- |
| Is this reading still current, or has scholarship moved on? | `temporal.validFrom` / `ttl` |
| Where did the evidence come from; can I trust it? | `provenance` (W3C-PROV) + `citations[]` |
| What does this essay engage with or get formalized by? | typed `relationships[]` (`relates-to`, `realized-by`) |
| Which sources back which claim? | `citations[]` tied to each in-text author-page citation |

The same document still reads as a human MLA essay and projects losslessly to
JSON-LD and back — one artifact, two readers.

## The L1 -> L3 climb (two exemplars)

- `templates/good-l1.md` — **L1 floor**: `id`, `type`, `created` + body. A
  complete, valid essay, but opaque to a machine consumer.
- `templates/good.md` — **L3 (highest this genre supports)**: adds
  `namespace`, `modified`, `temporal` validity, W3C-PROV `provenance`,
  `citations[]` tied to the essay's sources, and a typed `relationships[]`
  graph (e.g. `relates-to` a related close reading). Validate with
  `mif-validate --level 3`.

Author at the **highest level the drafting context supports** (grade down
rather than fabricate). `templates/bad.md` shows the antipattern: an essay
with no Works Cited list backing its in-text citations.
