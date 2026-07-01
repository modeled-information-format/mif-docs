---
name: trend-analysis
description: Write a trajectory report — Trajectory, Signals, Drivers & Inhibitors, Scenarios, and Implications & Watch-list, with a mandatory trajectory/scenario diagram and an optional STEEP/PESTLE environmental scan plus methodology appendix. Use when the deliverable tracks how something is changing and projects it forward under uncertainty. Anti-trigger; for a fieldwork-and-sampling study of a market at a point in time use market-research-report, for ranking vendors on two axes use competitive-quadrant, not this genre.
argument-hint: "<the trend or trajectory to analyze>"
---

# trend-analysis

Produces a **trajectory report**: a foresight deliverable that states the
current direction of change, the observable signals behind it, the forces
driving and dampening it, and the plausible forward scenarios so a reader can
plan against an uncertain future. Its center of gravity is the **trajectory or
scenario diagram** — a report with no such figure is not a conformant
trend-analysis deliverable, because a trend without a time-anchored visual is
narration, not analysis.

This genre follows the widely-used IFTF/WEF/APF foresight-report pattern. That
pattern is **conventional practice, not a codified format standard** — no
standards body (ISO/NISO/ANSI) has codified a foresight/trend-report format,
and the report must say so plainly rather than claim conformance to a named
standard.

## Pattern (industry: IFTF/WEF/APF-style trajectory report)

1. **Trajectory** — the current direction of change and its recent history;
   the headline movement, framed as increasing / decreasing / steady where the
   evidence supports it.
2. **Signals** — the observable indicators behind the trajectory, each tied to
   a cited source. Distinguish leading from lagging signals and strong from
   weak ones.
3. **Drivers & Inhibitors** — the forces accelerating or dampening the trend.
4. **Scenarios** — 2 to 4 plausible forward paths over a stated horizon, with
   the conditions and triggers that would select each one. Note the
   confidence and the unknowns.
5. **Implications & Watch-list** — what to monitor and the early indicators
   that would confirm or break each scenario.

### Optional sub-structure (additive — off by default; render when requested)

- **STEEP / PESTLE environmental scan** — when an explicit environmental scan
  is requested, precede or fold into Drivers & Inhibitors a scan organized by
  the STEEP (Social, Technological, Economic, Environmental, Political) or
  PESTLE (Political, Economic, Social, Technological, Legal, Environmental)
  dimensions, mirroring IFTF/WEF practice. Each factor still ties to a cited
  source.
- **Methodology Appendix** — when requested, add a back-matter appendix
  documenting how signals and any survey/scan inputs were sourced, scoped,
  and weighted, so the foresight basis is auditable.

These are opt-in; the five-section default is unchanged when they are not
requested.

## Rules that keep it a trend-analysis report

- **A trajectory or scenario diagram is mandatory, not optional matter** — a
  time-series trajectory as a Mermaid `xychart-beta` and/or a
  scenario-evolution diagram as a Mermaid `stateDiagram-v2` (both when the
  data supports it). Render any figure as a fenced `mermaid` code block —
  never ASCII art, an image link, or Graphviz/DOT. A required figure is never
  silently omitted — if the data cannot support it, say so in prose. Plain
  tabular matter stays a Markdown table.
- Anchor every trajectory claim in time — undated trend assertions are not
  admissible.
- Separate observed signal from projected scenario; never present a forecast
  as a fact.
- State confidence per scenario; surface findings whose verdict is
  `weakened` or `inconclusive` rather than hiding them. Exclude `falsified`
  findings.
- Present ranges, not false precision, when sources disagree.
- **Exhaustive coverage**: build the report from the full surviving evidence
  base — every surviving finding is treated with its own evidence (claim,
  citations, entities), never condensed to a cherry-picked subset. A silently
  dropped finding is a defect.
- **State the convention-not-standard caveat.** No standards body has
  codified a foresight/trend-report format; a report that claims conformance
  to a named standard is a defect.
- Use inline numeric citation markers `[1]`, `[2]` resolving to a references
  list. Each signal and data point cites its originating source, including
  the observation's date, so trajectory claims are time-anchored.

## Anti-triggers — do not use this genre for

- **A fieldwork-and-sampling study of a market at a point in time** — that is
  `market-research-report`: Background & Objectives, a mandatory sampling and
  fieldwork disclosure, Findings, Conclusions & Recommendations, not a
  trajectory over a time horizon.
- **Ranking vendors in a market on two evaluation axes** — that is
  `competitive-quadrant`: Completeness of Vision vs. Ability to Execute, four
  quadrants, per-vendor strengths/cautions, not a trend over time.
- **What to build and why, before design** — that is `prd` or `feature-spec`.

## MIF frontmatter

`type: semantic` — a trend-analysis report is declarative trajectory-and-scenario
knowledge, not a time-bound event or a step sequence. Climb to L2 with
`namespace` (`trend-analysis/<area>`), `modified`, `title`, and `tags` when the
drafting context supplies them. Gate every output with `mif-validate` at its
target level; the floor is `--level 1`. Any published projection (blog/book)
is at least MIF Level 1 — never bare, frontmatter-less prose.

## Why machine-readable — the point of MIF here

| Question an agent asks | Answered by (frontmatter) |
| --- | --- |
| Is this trajectory reading still current, or has the trend moved on? | `temporal.validFrom` / `ttl` |
| Where did a signal come from; can I trust it? | `provenance` (W3C-PROV) + `citations[]` |
| What later work formalizes, supersedes, or extends this trajectory? | typed `relationships[]` (`relates-to`, `superseded-by`) |
| Which signals were measured vs. asserted, and how confident is each scenario? | `citations[]` tied to each signal and scenario |

The same document still reads as a human trend-analysis report and projects
losslessly to JSON-LD and back — one artifact, two readers.

## The L1 -> L3 climb (two exemplars)

This genre ships the **same report at two MIF levels** so the climb is
explicit:

- `templates/good-l1.md` — **L1 floor**: `id`, `type`, `created` + body. A
  complete, valid trend-analysis report, but opaque to a machine consumer.
- `templates/good.md` — **L3 (highest this genre supports)**: adds
  `namespace`, `modified`, `temporal` validity, W3C-PROV `provenance`,
  `citations[]` tied to the signals and scenarios, and a typed
  `relationships[]` graph (e.g. `relates-to` a follow-on market-research
  report).

Author at the **highest level the drafting context supports** (grade down
rather than fabricate). `templates/bad.md` shows the antipattern: a report
that narrates a trajectory and asserts a single forward scenario as
settled fact, with no trajectory or scenario diagram anywhere — the genre's
single most load-bearing requirement, missing.
