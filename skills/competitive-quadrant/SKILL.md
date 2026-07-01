---
name: competitive-quadrant
description: Write a two-axis competitive-quadrant report — Completeness of Vision x Ability to Execute, four quadrants (Leaders / Challengers / Visionaries / Niche Players), per-vendor Strengths/Cautions, and a required Mermaid quadrant figure. Use when the deliverable ranks vendors or offerings in a defined market on two evaluation axes and places each into one quadrant. Anti-trigger; for a narrative survey of a market's size, segments, and trends with no forced vendor placement use market-research-report, not this genre.
argument-hint: "<the market and vendors to place on the competitive quadrant>"
---

# competitive-quadrant

Produces a **two-axis competitive-quadrant report**: a practitioner deliverable
that scores every included vendor or offering in a defined market on two
evaluation axes — **Completeness of Vision** (x) and **Ability to Execute**
(y) — and places each into exactly one of four quadrants. Its center of
gravity is the **quadrant placement**, backed by explicit inclusion criteria,
per-axis scoring, and a per-vendor Strengths/Cautions pair. It captures
declarative comparative-judgment knowledge, not a time-bound event or a
step-by-step procedure.

This genre reproduces a **generic two-axis competitive-analysis structure**.
It is **not** a Gartner Magic Quadrant and must never claim to be one — see
Rules.

## Pattern (industry: two-axis competitive-quadrant report)

1. **Market Definition / Inclusion Criteria** — the market under evaluation and
   the explicit, stated criteria a vendor must meet to be included (and what
   excludes one). No vendor appears without satisfying the inclusion criteria.
2. **Two-axis evaluation** — the evaluation framework: **Completeness of
   Vision** (x-axis) and **Ability to Execute** (y-axis). State the
   sub-criteria rolled into each axis and how each vendor is scored against
   them, every score traced to a cited source.
3. **Vendor profiles** — one profile per included vendor, each with an
   explicit **Strengths** list and a **Cautions** list, every point
   source-attributed.
4. **Quadrant placement** — the four quadrants — **Leaders**, **Challengers**,
   **Visionaries**, **Niche Players** — with each vendor assigned to exactly
   one, justified by its position on the two axes. A two-axis quadrant figure
   is **required** here, rendered as a Mermaid `quadrantChart` (see Rules).
5. **Context & Market Overview** — the market forces, adjacent trends, and
   conditions that frame the placements and would shift them.
6. **Methodology** — how vendors were scored, how evidence was gathered and
   verified, and the limits and as-of date of the assessment.

## Rules that keep it a competitive-quadrant report

- **Trademark / not-Gartner caveat (load-bearing).** "Magic Quadrant" is a
  Gartner trademark and a proprietary methodology. This genre reproduces only
  a generic two-axis competitive-analysis structure (Completeness of Vision x
  Ability to Execute, four quadrants). It **MUST NOT** claim to be a Gartner
  Magic Quadrant, use the "Magic Quadrant" trademark as a conformance or
  branding claim, or imply Gartner endorsement or methodology. State the
  caveat explicitly in every report this genre produces.
- **The quadrant figure is mandatory and is always Mermaid.** Render the
  two-axis placement as a fenced `mermaid` `quadrantChart` block — never ASCII
  art, an image link, or Graphviz/DOT. If the underlying data cannot support a
  rendered figure, say so in prose; a required figure is never silently
  omitted. Plain tabular matter (e.g. the scoring rubric) stays a Markdown
  table.
- State inclusion criteria before placing any vendor; an included vendor that
  does not meet the stated criteria is a defect.
- Every axis score, Strength, and Caution traces to a cited source; no orphan
  facts and no uncited placements.
- Assign each vendor to exactly one quadrant and justify it from its two-axis
  position; never assert a quadrant without the underlying scores.
- Annotate contested or preliminary evidence with an explicit uncertainty
  qualifier rather than hiding it; exclude only evidence that has been
  affirmatively discredited.
- **Exhaustive coverage**: place every vendor that meets the inclusion
  criteria; a silently dropped vendor is a defect.

## Anti-triggers — do not use this genre for

- **A narrative survey of a market's size, segments, growth, and trends with
  no forced two-axis placement of named vendors** — that is
  `market-research-report`: broader in scope, descriptive rather than
  comparative, and it does not require every entrant to land in exactly one
  of four quadrants.
- **A single evaluation with a free-form comparison table and no fixed
  two-axis quadrant shape** — that is `engineering`: its Trade-offs table maps
  options against decision drivers, but it never forces a Completeness-of-
  Vision-by-Ability-to-Execute placement.
- **An informal, one-design narrative weighing alternatives before building
  something** — that is `google-design-doc`, not a vendor-comparison genre.

## MIF frontmatter

`type: semantic` — a competitive-quadrant report is declarative comparative-
judgment knowledge, not a time-bound event or a how-to. Climb to L2 with
`namespace` (`competitive-quadrant/<area>`), `modified`, `title`, and `tags`
when the review context supplies them. Set `entity.entity_type` to
`competitive-quadrant-report`. Gate every output with `mif-validate` at its
target level; the floor is `--level 1`.

## Why machine-readable — the point of MIF here

| Question an agent asks | Answered by (frontmatter) |
| --- | --- |
| Is this placement still current? | `temporal.validFrom` / `ttl` |
| Where did each vendor score come from; can I trust it? | `provenance` (W3C-PROV) + `citations[]` |
| What does this placement relate to or get superseded by? | typed `relationships[]` (`relates-to`, `supersedes`) |
| Which vendor claims were verified vs. asserted? | `citations[]` tied to each Strength/Caution and axis score |

The same document still reads as a human competitive-quadrant report and
projects losslessly to JSON-LD and back — one artifact, two readers.

## The L1 -> L3 climb (two exemplars)

- `templates/good-l1.md` — **L1 floor**: `id`, `type`, `created` + body. A
  complete, valid report with the required Mermaid quadrant figure, but opaque
  to a machine consumer.
- `templates/good.md` — **L3 (highest this genre supports)**: adds
  `namespace`, `modified`, `temporal` validity, W3C-PROV `provenance`,
  `citations[]` tied to each vendor's Strengths/Cautions and axis scores, and a
  typed `relationships[]` graph (e.g. `relates-to` a related market-research
  report). Validate with `mif-validate --level 3`.

Author at the **highest level the drafting context supports** (grade down
rather than fabricate). `templates/bad.md` shows the antipattern: a report that
places vendors into quadrants with no quadrant figure at all — the single most
load-bearing required element this genre exists to demand.
