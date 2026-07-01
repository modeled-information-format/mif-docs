---
name: computing-paper
description: Write an ACM/IEEE computing conference or journal paper — Abstract, Introduction, Related Work, Approach/System Design, Evaluation, Discussion, Conclusion & Future Work, and a numbered References list — with IEEE numbered bracket citations. Use when the deliverable is a computing/engineering systems paper for an ACM or IEEE venue. Anti-trigger; for the APA/IMRaD empirical-paper structure with author-date citations use academic, for a practitioner decision report with a mandatory trade-offs table (no CCS/evaluation matter) use engineering.
argument-hint: "<the systems/computing research topic to write up>"
---

# computing-paper

Produces an **ACM/IEEE computing conference or journal paper**: a formal
systems/engineering research write-up aimed at program-committee reviewers and
practitioners, built around a described approach or system and an explicit,
falsifiable **Evaluation**. Its center of gravity is the evaluation evidence —
the paper earns its Conclusion from what the Evaluation actually shows, not
from an asserted claim up front.

This genre is **distinct from `academic`** (the APA/IMRaD empirical-paper
structure: Method → Findings → Discussion, author-date citations) and from
`engineering` (a practitioner decision report whose mandatory matter is an
options-vs-criteria Trade-offs table, not CCS Concepts or an Evaluation
section). Choose `computing-paper` for systems and engineering research
targeting an ACM or IEEE program committee.

## Pattern (industry: ACM/IEEE computing conference/journal paper)

1. **Abstract** — 150-250 words: problem, approach, principal results,
   conclusion.
2. **Introduction** — the problem, why it matters, the contribution, and a
   roadmap of the rest of the paper.
3. **Related Work** — prior systems and approaches, and how this work differs
   from each.
4. **Approach / System Design / Method** — the design or method under study,
   in enough detail that a reviewer could reproduce it.
5. **Evaluation** — experimental setup (datasets, baselines, metrics,
   environment) and results. Every result claim cites its source; a results
   table or figure is used whenever multiple findings or baselines are
   compared on shared metrics.
6. **Discussion** — interpretation, threats to validity, limitations, and open
   questions.
7. **Conclusion & Future Work** — what was shown, and the concrete next
   directions.
8. **References** — a numbered reference list, ordered by first appearance.

Front matter also carries **CCS Concepts** (ACM Computing Classification
System) and **keywords / index terms** — the indexing matter an ACM/IEEE venue
requires alongside title, authors, and abstract.

Add an architecture or flow figure — rendered as a fenced Mermaid `flowchart`
or `sequenceDiagram`, never ASCII art, an image link, or Graphviz/DOT — when
the system or method has a structure worth visualizing. This is optional and
additive; a paper with nothing to diagram is still conformant without one.
Plain tabular matter (results, baselines) stays a Markdown table.

## Citation Style

**IEEE numbered** bracket citations in text — `[1]`, `[2]` — ordered by first
appearance and resolving to a numbered reference list (`[1] Author, "Title,"
Venue, Year.`). Author-date citations are never used. No uncited claims: every
factual or measured assertion traces to a numbered reference. Anchor the
format to the current ACM Primary Article Template (`acmart`) and IEEE
`IEEEtran` conventions — verify these live at authoring time, as the templates
revise without fanfare.

## Rules that keep it a computing paper

- Every claim is traceable to a numbered citation; no orphan facts.
- The Evaluation section states experimental setup (datasets, baselines,
  metrics, environment) and reports results — it is never collapsed into a
  single unsupported paragraph of assertions.
- State limitations and threats to validity honestly — an undiscussed weakness
  is a defect, not an omission.
- Hedge uncertain or contested claims explicitly; do not present them with the
  same confidence as settled ones.
- Every option, baseline, or prior system gets a fair, neutral description in
  Related Work before Evaluation judges it against the proposed approach.
- Cite only real, verifiable sources. If no genuine citation applies to a
  claim, omit the citation and mark the claim as an assumption — never
  fabricate a reference.
- Any architecture or flow figure is a fenced `mermaid` code block; a required
  figure is never silently omitted — if the data cannot support it, say so in
  prose instead.

## Anti-triggers — do not use this genre for

- **An empirical paper following APA/IMRaD with author-date citations** — that
  is `academic`.
- **A practitioner decision/evaluation report whose mandatory matter is an
  options-vs-criteria Trade-offs table**, with no CCS Concepts and no formal
  Evaluation section — that is `engineering`.
- **An informal pre-build alignment narrative** — that is `google-design-doc`.

## MIF frontmatter

`type: semantic` — a computing paper is declarative research knowledge (a
described approach plus its evaluated evidence), not a time-bound event or a
step sequence. Climb to L2 with `namespace` (`computing-paper/<area>`),
`modified`, `title`, and `tags` when the drafting context supplies them. Gate
every output with `mif-validate` at its target level; the floor is
`--level 1`.

## Why machine-readable — the point of MIF here

| Question an agent asks | Answered by (frontmatter) |
| --- | --- |
| Is this paper's evidence still current? | `temporal.validFrom` / `ttl` |
| Where did each result claim come from; can I trust it? | `provenance` (W3C-PROV) + `citations[]` |
| What system or decision does this paper relate to or realize? | typed `relationships[]` (`relates-to`, `realized-by`) |
| Which claims were measured vs. asserted? | `citations[]` tied to each Evaluation result |

The same document still reads as a human ACM/IEEE paper and projects
losslessly to JSON-LD and back — one artifact, two readers.

## The L1 -> L3 climb (two exemplars)

- `templates/good-l1.md` — **L1 floor**: `id`, `type`, `created` + body. A
  complete, valid paper, but opaque to a machine consumer.
- `templates/good.md` — **L3 (highest this genre supports)**: adds
  `namespace`, `modified`, `temporal` validity, W3C-PROV `provenance`,
  `citations[]` tied to each Evaluation claim, and a typed `relationships[]`
  graph (e.g. `relates-to` an engineering report that later operationalizes
  the approach).

Author at the **highest level the drafting context supports** (grade down
rather than fabricate). `templates/bad.md` shows the antipattern: a paper with
no Evaluation section and no citations anywhere — every claim is an orphan
assertion, the genre's single most load-bearing requirement.
