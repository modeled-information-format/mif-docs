---
name: market-research-report
description: Write a full ESOMAR/ISO 20252-style market research report — Background & Objectives, Methodology (with mandatory sampling and fieldwork disclosure), Findings, Conclusions & Recommendations, and a Technical Appendix. Use when the deliverable is a complete market study for clients or stakeholders who must see the sampling basis, the fieldwork, and traceable evidence before they trust it. Anti-trigger; for tracking a trajectory over time use trend-analysis, for ranking vendors on two axes use competitive-quadrant, not this genre.
argument-hint: "<the market or product study to report on>"
---

# market-research-report

Produces a full **market research report**: a client-facing deliverable that
states the business question, discloses exactly how the evidence was gathered,
presents the findings by objective, and draws recommendations that trace back
to that evidence. Its center of gravity is the **Methodology section's sampling
and fieldwork disclosure** — a report that presents findings without disclosing
the sample frame, method, size, and fieldwork basis is not a conformant market
research report, no matter how polished the findings read.

This genre follows the widely-used ESOMAR-style market-research report
structure. That structure is **conventional practice, not a codified format
standard** — ESOMAR/ICC publishes an ethics/conduct code, not a report-format
mandate, and the report must say so plainly rather than claim ESOMAR
conformance.

## Pattern (industry: ESOMAR/ISO 20252-style market research report)

1. **Background & Objectives** — the commissioning context, the business
   problem, the research objectives, and the scope and definitions of the
   market under study.
2. **Methodology** — research design, sampling (frame, method, size), the
   instrument (questionnaire / discussion guide), and fieldwork (mode, dates,
   response/completion rate). State the verification gate and how `falsified`
   and `weakened` findings were handled.
3. **Findings** — the evidence, organized by objective or theme. Every claim
   traces to a cited source and reports its verification verdict. Quantify
   where the data allows, and include a comparative table whenever multiple
   segments or sources are measured on shared attributes.
4. **Conclusions & Recommendations** — what the findings mean for the business
   question, and specific, actionable recommendations, each traceable to the
   evidence that supports it.
5. **Technical Appendix** — full methodology detail (sampling and weighting,
   instrument, fieldwork log), data-quality and limitations notes, and ISO
   20252 quality notes.

## Rules that keep it a market research report

- **The Methodology section's sampling and fieldwork disclosure is mandatory,
  not optional matter** — an explicit sample frame, method, and size, plus a
  fieldwork summary (mode, dates, response/completion rate). An undisclosed
  sample limitation is a defect, not an omission.
- Every claim in Findings is traceable to a cited source; no orphan facts.
- Report verification verdicts: annotate `weakened` or `inconclusive` findings
  rather than silently dropping them; exclude only `falsified` findings from
  the evidence base (they may be named in Methodology as excluded, never
  presented as evidence).
- **Exhaustive coverage**: build Findings from the full surviving evidence —
  every surviving finding gets its own treatment, never condensed to a
  cherry-picked subset. A silently dropped finding is a defect.
- Include a comparative table whenever multiple segments or sources are
  measured on shared attributes; number and caption every table and figure and
  reference it in the text. Render any chart or diagram as a fenced `mermaid`
  code block (a market chart as `xychart-beta` or `pie`) — never ASCII art, an
  image link, or Graphviz/DOT. Plain tabular matter stays a Markdown table. A
  required figure is never silently omitted — if the data cannot support it,
  say so in prose.
- **State the convention-not-standard caveat.** ESOMAR/ICC is an ethics/conduct
  code, not a codified report-format standard; a report that claims "ESOMAR
  conformance" is a defect. Anchor any ISO 20252 reference to "verify the
  current edition live at authoring time" — the standard is under active
  revision (2024-2026) — rather than baking a specific edition in as fact.
- Hedge uncertain claims and present ranges when sources disagree; disclose the
  sampling and fieldwork basis honestly.

## Anti-triggers — do not use this genre for

- **Tracking how something is changing and projecting it forward under
  uncertainty** — that is `trend-analysis`: trajectory, signals, drivers, and
  scenarios over a time horizon, not a fieldwork-and-sampling study of a market
  at a point in time.
- **Ranking vendors in a market on two evaluation axes** — that is
  `competitive-quadrant`: Completeness of Vision vs. Ability to Execute, four
  quadrants, per-vendor strengths/cautions, not a client study with disclosed
  sampling and fieldwork.
- **What to build and why, before design** — that is `prd` or `feature-spec`.

## MIF frontmatter

`type: semantic` — a market research report is declarative study knowledge
(objectives, methodology, findings, recommendations), not a time-bound event or
a step sequence. Climb to L2 with `namespace` (`market-research-report/<area>`),
`modified`, `title`, and `tags` when the drafting context supplies them. Gate
every output with `mif-validate` at its target level; the floor is `--level 1`.

## Why machine-readable — the point of MIF here

| Question an agent asks | Answered by (frontmatter) |
| --- | --- |
| Is this study still current, or has the market moved on? | `temporal.validFrom` / `ttl` |
| Where did the evidence come from; can I trust the sample? | `provenance` (W3C-PROV) + `citations[]` |
| What later work formalizes or supersedes this study? | typed `relationships[]` (`relates-to`, `superseded-by`) |
| Which findings were measured vs. asserted, and by whom? | `citations[]` tied to each finding |

The same document still reads as a client-facing market research report and
projects losslessly to JSON-LD and back — one artifact, two readers.

## The L1 -> L3 climb (two exemplars)

This genre ships the **same report at two MIF levels** so the climb is
explicit:

- `templates/good-l1.md` — **L1 floor**: `id`, `type`, `created` + body. A
  complete, valid market research report, but opaque to a machine consumer.
- `templates/good.md` — **L3 (highest this genre supports)**: adds
  `namespace`, `modified`, `temporal` validity, W3C-PROV `provenance`,
  `citations[]` tied to the findings, and a typed `relationships[]` graph (e.g.
  `relates-to` a follow-on trend-analysis report).

Author at the **highest level the drafting context supports** (grade down
rather than fabricate). `templates/bad.md` shows the antipattern: a report that
presents findings and recommendations with no Methodology sampling or
fieldwork disclosure at all — the genre's single most load-bearing
requirement, missing.
