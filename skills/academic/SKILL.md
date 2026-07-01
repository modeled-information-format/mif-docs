---
name: academic
description: Write a formal academic research report — Abstract, Background, Method, Findings, Discussion, References — with a selectable citation style (author-date/APA or numbered/Vancouver-IMRaD) and optional APA Method sub-sections. Use when the deliverable is a scholarly write-up for a research or technical-expert audience that demands traceable evidence and explicit method. Anti-trigger; for an informal trade-off narrative use google-design-doc, for a practitioner decision report built around a mandatory comparison table use engineering.
argument-hint: "<the research question or topic to report on>"
---

# academic

Produces a **formal academic research report**: a scholarly write-up for a
research or technical-expert audience — peers who will scrutinize method,
evidence, and the limits of each claim before accepting it. Its center of
gravity is the **IMRaD structure plus mandatory citation discipline** — the
report is not conformant if any claim goes uncited, or if the chosen citation
style is applied inconsistently. This genre follows the general IMRaD
(Introduction/Background, Methods, Results, and Discussion) scholarly-paper
convention, with a selectable citation style.

## Pattern (industry: IMRaD scholarly paper, selectable citation style)

1. **Abstract** — 150-250 words: question, method, principal findings,
   conclusion.
2. **Background / Related Context** — what is already established and the
   gap this report addresses.
3. **Method** — how the reported evidence was gathered and verified; state
   the verification approach and how contested or weakened evidence was
   handled. *In APA mode (optional), expand Method into the APA
   sub-sections* — **Participants**, **Materials**, **Procedure**,
   **Analysis** — when the work warrants them.
4. **Findings** — the evidence, organized by theme or dimension. Each claim
   cites its source and, where evidence is contested, reports the
   verification status.
5. **Discussion** — interpretation, limitations, threats to validity, and
   open questions.
6. **References** — full citation list.

### Citation style — selectable

Pick one mode and apply it consistently for the whole document:

- **Author-date (APA, default)** — in text, e.g. `(Source, 2026)`, resolving
  to a full alphabetized reference list. Anchor APA to the **7th Edition**
  (verify the current edition live).
- **Numbered (Vancouver / IMRaD / ICMJE)** — numbered in-text markers, e.g.
  `[1]`, `[2]`, resolving to a numerically ordered reference list. Use this
  for IMRaD/ICMJE-style work, which expects numbered (Vancouver) citations
  rather than author-date. Anchor to the **current ICMJE Recommendations**
  (updated roughly annually — verify the current revision live; do not bake
  a dated revision in).

Every reference derives from a genuinely verifiable source with a citation
URL or DOI. No uncited claims, regardless of mode. Never fabricate a
citation — omit a claim entirely rather than inventing a source for it.

## Required figures & matter

- **Front matter**: title, author/attribution, date, abstract, optional
  table of contents.
- **Figures**: tables and figures as the evidence warrants — include a table
  whenever multiple findings are compared on shared attributes. Number and
  caption every figure; reference each in the text. Any figure, chart, or
  diagram is rendered as a fenced `mermaid` code block (never ASCII art, an
  image link, or Graphviz/DOT); a required figure is never silently omitted
  — if the data cannot support it, say so in prose. Plain tabular matter
  stays a Markdown table.
- **Back matter**: full References section; optional appendix for extended
  data or the method's verification log.

## Rules

- **Citation mode is selectable, not standard-certified.** The IMRaD/ICMJE
  landscape anchor is a *contested* one — pick author-date (APA 7th) or
  numbered (Vancouver/ICMJE) and apply it consistently, but do not
  over-attribute strict standard conformance; verify the live edition of
  whichever you choose. APA Method sub-sections (Participants/Materials/
  Procedure/Analysis) are an optional APA-mode expansion, not a default
  requirement.
- Every claim is traceable to a cited, real, verifiable source; no orphan
  facts and no fabricated citations.
- State limitations honestly — an undiscussed weakness is a defect, not an
  omission.
- Report the verification status of contested evidence; do not silently
  drop or launder disputed findings — annotate them (e.g. "preliminary
  evidence suggests", "contested"). Exclude claims that evidence has
  actively refuted.
- Hedge uncertain claims; present ranges when sources disagree.
- **Exhaustive coverage**: build the report from the full body of surviving
  evidence available — every finding worth including gets its own treatment
  (claim, citation, interpretation), never condensed to a cherry-picked
  subset. A silently dropped finding is a defect.
- **MIF level**: author at least MIF Level 1 (never bare, frontmatter-less
  prose); climb to Level 3 when the drafting context supplies provenance and
  citation detail.

## Anti-triggers — do not use this genre for

- **An informal, pre-build trade-off narrative** — that is `google-design-doc`:
  conversational, alternatives reasoned in prose, no IMRaD structure or
  citation-style requirement.
- **A practitioner decision report built around a mandatory options-vs-criteria
  comparison table** — that is `engineering`: its center of gravity is the
  Trade-offs table, not scholarly method and cited evidence.
- **A single already-made, immutable decision record** — that is `adr`.

## MIF frontmatter

`type: semantic` — an academic report is declarative knowledge (a scholarly
claim set with method and evidence), not a time-bound event or a step
sequence. Use `entity_type: academic-paper` and a `namespace` of the form
`academic/<area>` (e.g. `academic/information-retrieval`). Climb to L2 with
`namespace`, `modified`, `title`, and `tags` when the drafting context
supplies them. Gate every output with `mif-validate` at its target level;
the floor is `--level 1`.

## Why machine-readable — the point of MIF here

| Question an agent asks | Answered by (frontmatter) |
| --- | --- |
| Is this finding still current, or has it been superseded? | `temporal.validFrom` / `ttl` |
| Where did the evidence come from; can I trust it? | `provenance` (W3C-PROV) + `citations[]` |
| Which claims are settled vs. contested? | `citations[]` `citationRole` + hedged prose in Findings/Discussion |
| What prior work or companion artifact does this relate to? | typed `relationships[]` (e.g. `relates-to` a dataset or prior study) |

The same document still reads as a human scholarly paper and projects
losslessly to JSON-LD and back — one artifact, two readers.

## The L1 -> L3 climb (two exemplars)

- `templates/good-l1.md` — **L1 floor**: `id`, `type`, `created` + body. A
  complete, valid academic report, but opaque to a machine consumer.
- `templates/good.md` — **L3 (highest this genre supports)**: adds
  `namespace`, `modified`, `temporal` validity, W3C-PROV `provenance`,
  `citations[]` tied to the cited claims, and a typed `relationships[]`
  graph (e.g. `relates-to` a companion dataset or design doc).
  Validate with `mif-validate --level 3`.

Author at the **highest level the drafting context supports** (grade down
rather than fabricate). `templates/bad.md` shows the antipattern: a report
that states findings as fact with no citations to support them — this genre's
single most load-bearing requirement.
