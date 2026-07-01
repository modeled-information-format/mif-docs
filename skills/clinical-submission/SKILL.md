---
name: clinical-submission
description: Write a clinical study report on the ICH E3 skeleton — Synopsis, Ethics, Investigators/Structure, Objectives, Investigational Plan, Methods (efficacy & safety), Results, Discussion & Conclusions, Tables/Figures/Appendices — situated in the CTD five-module frame (M1-M5). Use when the deliverable must reproduce the clinical-study-report structure of a regulatory submission. Anti-trigger; for a scientific journal article write academic, for a financial/legal disclosure filing use regulatory-disclosure, not this genre — and this genre never asserts clinical validity or regulatory acceptance, only structure.
argument-hint: "<the clinical study to report on>"
---

# clinical-submission

Produces a **clinical study report (CSR)** on the **ICH E3** skeleton, situated
in the **CTD** (Common Technical Document) five-module frame. Its center of
gravity is the **fixed section order** — Synopsis through Tables/Figures/
Appendices — with efficacy and safety kept distinct throughout, and every claim
resolving to a cited finding. This genre follows the ICH E3 clinical-study-report
convention used across regulated submissions.

> **Scope caveat (carry, do not over-sell):** this genre reproduces the **ICH E3
> clinical study report structure** within the CTD module frame. It does **not**
> assert clinical validity, statistical adequacy, or regulatory acceptance — the
> analysis is only as sound as the cited findings. Do not market output as a
> "submittable" CSR.

## Pattern (industry: ICH E3 CSR, CTD module frame)

1. **Synopsis** — a structured summary of the study and its principal results.
2. **Ethics** — ethics-committee review, informed consent, and conduct standards.
3. **Investigators & Study Structure** — administrative structure and
   investigators.
4. **Objectives** — the primary and secondary study objectives.
5. **Investigational Plan** — study design, randomization/blinding, and
   rationale.
6. **Methods (Efficacy & Safety)** — endpoints, analysis populations, and
   statistical methods, kept distinct for efficacy and safety.
7. **Results** — efficacy results then safety results, with the analysis
   populations.
8. **Discussion & Conclusions** — interpretation, limitations, and
   benefit-risk.
9. **Tables, Figures & Appendices** — the supporting data displays and
   appendices.

**CTD framing:** situate the report in the five-module Common Technical
Document frame — **M1** regional administrative, **M2** summaries, **M3**
quality, **M4** nonclinical study reports, **M5** clinical study reports — and
state that an E3 CSR lives in **Module 5**.

## Rules that keep it a clinical study report

- Every claim is traceable to a cited source; no orphan facts. Verification
  verdicts are reported, not silently dropped — annotate `weakened` or
  `inconclusive` findings with their uncertainty qualifier, and exclude only
  `falsified` findings.
- State limitations and benefit-risk honestly; the genre reproduces structure,
  not clinical validity or regulatory acceptance — say so. An undiscussed
  safety signal is a defect.
- Efficacy and safety stay distinct — in Methods, in Results, and in the
  Discussion's benefit-risk weighing. Never merge them into one undifferentiated
  "results" narrative.
- Hedge uncertain claims; present confidence intervals or ranges when sources
  disagree.
- **Exhaustive coverage**: build the report from the full surviving evidence —
  every surviving finding is treated with its own evidence (claim, citation,
  population), never condensed to a cherry-picked subset. A silently dropped
  finding is a defect.
- Section order is fixed — Objectives precedes Investigational Plan precedes
  Methods precedes Results. A CSR that reorders or omits a required section is
  not conformant.
- **Verify live:** check the current ICH E3 guidance and CTD module numbering at
  authoring time rather than baking a guidance revision into output as settled
  fact — regulatory guidance revises.

## Required Figures & Matter

- **Front matter**: title page identifying the study, and the Synopsis.
- **Figures**: efficacy and safety tables (analysis populations, endpoint
  results, adverse-event summaries); number and caption each and reference it
  in the text. Any efficacy or survival curve is rendered as a Mermaid
  `xychart-beta`. Any figure, chart, or diagram is a fenced `mermaid` code
  block — never ASCII art, an image link, or Graphviz/DOT — and a required
  figure is never silently omitted; if the data cannot support it, say so in
  prose. Plain tabular matter stays a Markdown table.
- **Back matter**: appendices and the full reference list.

## Citation Style

Scientific / regulatory referencing to source studies and guidance. Every claim
resolves to a source with a URL (MIF Level 3 floor); no uncited claims.
**FDA eCTD v4.0 electronic packaging is an orthogonal serialization — it is out
of scope for this genre.**

## Anti-triggers — do not use this genre for

- **A scientific journal article reporting the same trial for peer review** —
  that is `academic`: discipline-citation-style narrative, not the fixed ICH E3
  CSR skeleton or CTD module frame.
- **A financial or legal disclosure filing** — that is `regulatory-disclosure`
  or a similar filings genre: disclosure obligations under securities or
  contract law, not a clinical-trial write-up.
- **The electronic packaging of a submission (eCTD v4.0)** — that is a
  serialization/transport concern, a separate `ectd`-style channel, not this
  document genre.

## MIF frontmatter

`type: semantic` — a clinical study report is declarative study-and-results
knowledge, not a time-bound event or a step sequence. Climb to L2 with
`namespace` (`clinical-submission/<area>`), `modified`, `title`, and `tags` when
the review context supplies them. At L3, `entity.entity_type` is
`clinical-study-report`. Gate every output with `mif-validate` at its target
level; the floor is `--level 1`.

## Why machine-readable — the point of MIF here

| Question an agent asks | Answered by (frontmatter) |
| --- | --- |
| Is this report still the current version of the study record? | `temporal.validFrom` / `ttl` |
| Where did each result come from; can I trust it? | `provenance` (W3C-PROV) + `citations[]` |
| What does this CSR relate to (protocol, statistical analysis plan)? | typed `relationships[]` (`relates-to`) |
| Which results are confirmed vs. exploratory/underpowered? | `citations[]` tied to each Results claim, with verdict annotated in prose |

The same document still reads as a human clinical study report and projects
losslessly to JSON-LD and back — one artifact, two readers.

## The L1 -> L3 climb (two exemplars)

- `templates/good-l1.md` — **L1 floor**: `id`, `type`, `created` + body. A
  complete, valid CSR, but opaque to a machine consumer.
- `templates/good.md` — **L3 (highest this genre supports)**: adds
  `namespace`, `modified`, `temporal` validity, W3C-PROV `provenance`,
  `citations[]` tied to the efficacy/safety claims, and a typed
  `relationships[]` graph (e.g. `relates-to` the statistical analysis plan).
  Validate with `mif-validate --level 3`.

Author at the **highest level the drafting context supports** (grade down
rather than fabricate). `templates/bad.md` shows the antipattern: a report
that collapses efficacy and safety into one undifferentiated narrative in
Methods and Results instead of keeping them distinct throughout.
