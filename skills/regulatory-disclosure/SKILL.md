---
name: regulatory-disclosure
description: Write an SEC-style annual disclosure report — Business, Risk Factors, Properties & Legal Proceedings, Selected Financial Data, MD&A, Financial Statements & Supplementary Data, and Controls & Procedures, in Regulation S-K / Form 10-K item order. Use when the deliverable must reproduce the disclosure structure of a public-company annual report. Anti-trigger; for an internal controls/process conformance review use compliance-audit, for a voluntary ESG/impact narrative use sustainability-report — neither carries the fixed Reg S-K item order or the MD&A analytical core this genre requires.
argument-hint: "<the organization and fiscal period to disclose>"
---

# regulatory-disclosure

Produces an **SEC-style annual disclosure report**: a document that reproduces
the section order, audience, and evidentiary discipline of a public-company
Form 10-K under Regulation S-K. Its center of gravity is the fixed **item
order** — Business, then Risk Factors, then Properties & Legal Proceedings,
then Selected Financial Data, then MD&A, then Financial Statements &
Supplementary Data, then Controls & Procedures — and the **MD&A section as the
analytical core**, not a restatement of the Business section.

> **Scope caveat (carry, do not over-sell):** this genre reproduces the
> **disclosure structure** of an SEC annual report. It does **not** assert
> legal or financial sufficiency, regulatory conformance, or audit assurance.
> Never market output as "10-K compliant" — it is a disclosure-structured
> narrative grounded only in the cited findings supplied to it.

## Pattern (industry: SEC Reg S-K / Form 10-K item order)

1. **Business (Item 1)** — what the organization does: markets, products,
   operations.
2. **Risk Factors (Item 1A)** — the material risks, most significant first.
3. **Properties & Legal Proceedings (Items 2-3)** — material properties and
   pending legal matters.
4. **Selected Financial Data** — the multi-period financial highlights.
   **Always emit this heading** so the section structure stays stable across
   filings, even when the content changes. **Verify live:** Reg S-K item
   requirements evolve — the former *Item 301 Selected Financial Data* was
   eliminated by SEC Release No. 33-10890 (2020), which folded its purpose
   into MD&A — confirm the currently effective item set at authoring time,
   never treat this as settled fact. When the currently effective Reg S-K no
   longer calls for a standalone section, keep the heading, mark it explicitly
   *N/A* (state why, citing the rule that eliminated it), and fold the
   highlights into MD&A; otherwise populate it.
5. **Management's Discussion & Analysis (MD&A, Item 7)** — the analytical
   heart: results of operations, liquidity, capital resources, and known
   trends/uncertainties. This is where the numbers get explained, not just
   restated.
6. **Financial Statements & Supplementary Data (Item 8)** — the statements and
   notes.
7. **Controls & Procedures** — disclosure controls and internal-control
   status, including any identified material weakness and its remediation.

## Citation Style

Disclosure references to authority and source filings. Every material claim
resolves to a cited source (a MIF finding `@id` and its source URL at MIF
Level 3); no uncited claims. **Inline XBRL machine-readable tagging is the
live SEC mandate but is an orthogonal serialization concern — out of scope for
this genre.** A downstream `xbrl` channel projects a conformant disclosure
report into inline XBRL by mapping facts onto this genre's item-numbered
sections; this genre's job is to keep those sections stable and
citation-grounded so that projection is possible, not to emit XBRL itself.

## Required Figures & Matter

- **Front matter**: a cover identifying the organization and reporting period.
- **Figures**: financial-highlight tables in MD&A (and in Selected Financial
  Data when that section is currently required and populated); number and
  caption each and reference it in the text. Any figure, chart, or diagram is
  a fenced Mermaid code block (a `mermaid` info-string fence) — a trend chart
  as `xychart-beta` — never ASCII art, an image link, or Graphviz/DOT. A
  required figure is never silently omitted; if the data cannot support it,
  say so in prose. Plain tabular matter stays a Markdown table.
- **Back matter**: notes to the financial statements and a full reference
  list.

## Rules

- Every claim is traceable to a cited source; no orphan facts.
- State risks and limitations honestly — the genre reproduces structure, not
  sufficiency or audit assurance, and says so. An undiscussed material risk is
  a defect.
- Report verification verdicts on the underlying findings; do not silently
  drop weakened or inconclusive findings — annotate them with an explicit
  uncertainty qualifier. Exclude only falsified findings.
- Hedge uncertain claims and flag forward-looking statements; present ranges
  when sources disagree.
- **Exhaustive coverage**: build the report from the full surviving findings
  corpus — every surviving finding gets its own evidence (claim, citation,
  entities), never condensed to a cherry-picked subset. A silently dropped
  finding is a defect.
- **Fixed item order is not optional.** Risk Factors precedes MD&A precedes
  Financial Statements & Supplementary Data. A report that reorders or omits a
  required item is not a conformant disclosure report — this is the single
  most load-bearing structural requirement of the genre.
- No internal identifiers (finding IDs, `urn:mif:` handles) leak into prose;
  they resolve to named disclosure references.

## Anti-triggers — do not use this genre for

- **An internal controls/process conformance review** (SOC 2, ISO 27001, an
  internal-audit finding set) — that is `compliance-audit`: it judges
  conformance against a control framework, and has no Reg S-K item order or
  investor-facing MD&A.
- **A voluntary ESG or impact narrative** with no fixed statutory item order —
  that is `sustainability-report`: it is organized around impact themes and
  frameworks (e.g. GRI/SASB), not Business/Risk Factors/MD&A/Controls.
- **A single technical decision with a comparison table** — that is
  `engineering`. **What to build and why, pre-decision** — that is `prd` or
  `feature-spec`.

## MIF frontmatter

`type: semantic` — a disclosure report is declarative, point-in-time
organizational fact plus rationale, not a step sequence. Namespace as
`regulatory-disclosure/<area>` (e.g. `regulatory-disclosure/energy`). Climb to
L2 with `namespace`, `modified`, `title`, and `tags` when the review context
supplies them, and to L3 with `provenance`, `citations[]`, and
`relationships[]` when the underlying findings and cross-document links are
known. Gate every output with `mif-validate` at its target level; the floor is
`--level 1`.

## Why machine-readable — the point of MIF here

| Question an agent asks | Answered by (frontmatter) |
| --- | --- |
| Is this disclosure still the current filing, or superseded? | `temporal.validFrom` / `ttl` |
| Where did each disclosed fact come from; can I trust it? | `provenance` (W3C-PROV) + `citations[]` |
| What does this disclosure relate to (an ESG report, a prior filing)? | typed `relationships[]` (`relates-to`, `supersedes`) |
| Which claims survived verification vs. were excluded as falsified? | `citations[]` + the exclusion rule in prose |

The same document still reads as a human disclosure report and projects
losslessly to JSON-LD and back — one artifact, two readers.

## The L1 -> L3 climb (two exemplars)

- `templates/good-l1.md` — **L1 floor**: `id`, `type`, `created` + body. A
  complete, valid disclosure report, but opaque to a machine consumer.
- `templates/good.md` — **L3 (highest this genre supports)**: adds
  `namespace`, `modified`, `temporal` validity, W3C-PROV `provenance`,
  `citations[]` tied to the disclosed facts, and a typed `relationships[]`
  graph (e.g. `relates-to` a companion ESG disclosure). Validate with
  `mif-validate --level 3`.

Author at the **highest level the drafting context supports** (grade down
rather than fabricate). `templates/bad.md` shows the antipattern: a report
that omits Risk Factors (Item 1A) entirely — the fixed item order this genre
exists to enforce, broken.
