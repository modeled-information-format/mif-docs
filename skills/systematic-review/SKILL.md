---
name: systematic-review
description: Write a PRISMA 2020 systematic review — structured abstract, reproducible search/eligibility methods, a mandatory Mermaid PRISMA flow diagram of records identified/screened/excluded/included, risk-of-bias assessment, and synthesis of results. Use when the deliverable must make the evidence-selection process legible and reproducible end to end. Anti-trigger; for a general scholarly write-up with no mandatory flow diagram or registered protocol use academic.
argument-hint: "<the review question or body of evidence to synthesize>"
---

# systematic-review

Produces a **PRISMA 2020 systematic review**: a reproducible, auditable account
of how a body of evidence was identified, screened, appraised, and synthesised.
Its center of gravity is the **PRISMA flow diagram** — the report is not
conformant without one reconciling the count of records at every stage. This
genre follows PRISMA 2020 (Page et al., *BMJ* 2021), the current reporting
standard for systematic reviews and meta-analyses. Before authoring, verify
the current PRISMA guidance live — confirm which statement is in force and
treat no item count or flow-diagram template as fixed until checked against
the live guidance.

## Pattern (industry: PRISMA 2020 systematic review and meta-analysis)

1. **Title / Structured Abstract** — background, objectives, eligibility
   criteria, information sources, methods of synthesis, results, and
   conclusions, each named as its own clause of the abstract.
2. **Introduction** — the **rationale** for the review against existing
   knowledge, and the explicit **objectives** (the review question, framed as
   PICO or a comparable structure where applicable).
3. **Methods** — the reproducible protocol:
   - **Eligibility criteria** — inclusion and exclusion criteria for evidence.
   - **Information sources** — where evidence was sought.
   - **Search strategy** — the search approach and terms.
   - **Selection process** — how records were screened and selected.
   - **Data items** — what was extracted from each included study.
   - **Risk-of-bias assessment** — how the validity of each included study was
     appraised (name the tool, e.g. Cochrane RoB 2).
4. **Results** — the study selection and synthesis:
   - **Study selection**, with the **PRISMA flow diagram**: the counts at
     every stage — records **identified**, records **screened**, records
     **excluded** (with reasons), and studies **included**.
   - A **risk-of-bias / verification-verdict table** for the included studies.
   - **Synthesis of results** — the synthesised findings across included
     evidence.
5. **Discussion** — interpretation, **limitations** of the evidence and the
   review process, and **conclusions**.
6. **Registration & Protocol** — the registration record and protocol
   availability (PRISMA 2020 "Other information"); state explicitly when none
   exists.
7. **References** — the full reference list.

## Rules that keep it a systematic review

- **The PRISMA flow diagram is mandatory and never silently omitted.** Render
  it as a Mermaid `flowchart` (top-down, `flowchart TD`) — never ASCII art, an
  image link, or Graphviz/DOT. If the underlying data cannot support a stage,
  say so in prose rather than dropping the diagram.
- **The flow diagram must reconcile**: records identified, minus those removed
  or excluded at each stage, equal the studies included. A diagram whose
  counts do not add up is a defect, not a rounding artifact.
- Every claim traces to a cited source; no orphan facts and no uncited
  assertions.
- Report the appraisal outcome of every included study explicitly. A study
  excluded on eligibility or risk-of-bias grounds is recorded as an excluded
  record in the flow diagram with its exclusion reason — never quietly
  dropped from the corpus.
- **Exhaustive coverage**: synthesize from the full set of eligible studies —
  every included study carries its own evidence (population, comparator,
  outcome, citation), never condensed to a cherry-picked subset.
- Numbered (Vancouver-style) inline citation markers `[1]`, `[2]` resolve to a
  references list; a risk-of-bias/verification-verdict table sits alongside
  the flow diagram as a plain Markdown table.
- The Methods section is reproducible on its own: another reviewer must be
  able to repeat the search and selection process from the prose alone.

## Anti-triggers — do not use this genre for

- **A general scholarly write-up with no mandatory flow diagram or registered
  search protocol** — that is `academic`: a formal research report (abstract,
  background, method, findings, discussion) with a selectable citation style,
  but no PRISMA-mandated flow diagram or reproducible multi-stage search
  protocol.
- **A single already-made technical decision** — that is `adr`.
- **What to build and why, before design** — that is `prd` or `feature-spec`.

## MIF frontmatter

`type: semantic` — a systematic review is declarative synthesized knowledge, not
a time-bound event or a step sequence. Use `namespace: systematic-review/<area>`
(e.g. `systematic-review/clinical-nlp`). Climb to L2 with `modified`, `title`,
and `tags` when the review context supplies them. Gate every output with
`mif-validate` at its target level; the floor is `--level 1`.

## Why machine-readable — the point of MIF here

| Question an agent asks | Answered by (frontmatter) |
| --- | --- |
| Is this evidence synthesis still current, or has newer evidence appeared? | `temporal.validFrom` / `ttl` |
| Where did each claim come from; can I trust it? | `provenance` (W3C-PROV) + `citations[]` |
| Which studies were included vs. excluded, and why? | the PRISMA flow-diagram counts, cross-checked against `citations[]` |
| What downstream document does this review inform? | typed `relationships[]` (`relates-to`, `realized-by`) |

The same document still reads as a human systematic review and projects
losslessly to JSON-LD and back — one artifact, two readers.

## The L1 -> L3 climb (two exemplars)

- `templates/good-l1.md` — **L1 floor**: `id`, `type`, `created` + body. A
  complete, valid PRISMA review, but opaque to a machine consumer.
- `templates/good.md` — **L3 (highest this genre supports)**: adds
  `namespace`, `modified`, `temporal` validity, W3C-PROV `provenance`,
  `citations[]` tied to the methodology and appraisal tool, and a typed
  `relationships[]` graph (e.g. `relates-to` a PRD the review's conclusions
  inform). Validate with `mif-validate --level 3`.

Author at the **highest level the drafting context supports** (grade down
rather than fabricate). `templates/bad.md` shows the antipattern: a review
that reports a study count and a "results" narrative with no PRISMA flow
diagram anywhere in it.
