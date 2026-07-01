---
name: sustainability-report
description: Write a GRI-Standards sustainability/ESG report — GRI 1 Foundation, GRI 2 General Disclosures, GRI 3 Material Topics (the materiality determination), topic standards across the GRI 200 (economic) / 300 (environmental) / 400 (social) series, and a mandatory GRI content index mapping every disclosure to its location. Use when the deliverable must reproduce the GRI sustainability-reporting structure. Reproduces the GRI structure only, never GRI assurance. Anti-trigger; for a SOC-2-shaped internal controls review use compliance-audit, for a Reg-S-K/Form-10-K annual disclosure use regulatory-disclosure — neither carries the GRI topic-standard frame or the content index this genre requires.
argument-hint: "<the organization and reporting period to disclose>"
---

# sustainability-report

Produces a **GRI-Standards sustainability/ESG report**: a disclosure-oriented
document that reports an organization's economic, environmental, and social
impacts against the Global Reporting Initiative's topic standards, ties every
disclosure to a stated materiality determination, and indexes every disclosure
to its location so a reader can audit coverage at a glance. Its center of
gravity is the **GRI content index** — the report is not conformant without
one mapping every GRI disclosure it makes to where that disclosure lives.

This genre follows the GRI Standards' own reporting architecture (GRI 1/2/3
Universal Standards plus the GRI 200/300/400 Topic Standards). It is a
convention, not a certification: the template reproduces the GRI **structure**
only. It does not assert assurance, third-party verification, or full "in
accordance with GRI" conformance — that requires meeting every applicable GRI
requirement, which cannot be guaranteed from a findings corpus alone. Present
output as **GRI-structured, not GRI-assured**.

## Pattern (industry: GRI Standards sustainability/ESG report)

1. **GRI 1 — Foundation** — the reporting principles in play and how this
   report applies them (accuracy, balance, comparability, verifiability).
2. **GRI 2 — General Disclosures** — the organizational profile, governance
   structure, strategy, and stakeholder engagement.
3. **GRI 3 — Material Topics** — the materiality determination: how material
   topics were identified and prioritized, not merely listed.
4. **Topic Standards** — disclosures for each material topic, drawn from the
   **GRI 200** (economic), **GRI 300** (environmental), and **GRI 400**
   (social) series, each with quantified performance and a stated reporting
   boundary.
5. **GRI Content Index** — the distinguishing back matter: a table mapping
   every GRI disclosure made in the report to its location (and any omission,
   with a reason).

Add a materiality-matrix figure — a Mermaid `quadrantChart`, or a plain
material-topic list when a quadrant view isn't warranted — when the
materiality determination supports one. Performance tables per topic standard
are numbered, captioned, and referenced in the text.

## Rules that keep it a sustainability report

- Every claim traces to a cited MIF finding `@id` and its source URL; no
  orphan facts. The GRI content index doubles as the disclosure map — each
  indexed disclosure points to the finding(s) behind it.
- State impacts, omissions, and limitations honestly; the genre reproduces
  structure, not assurance, and must say so. An undisclosed material impact is
  a defect, not an omission of convenience.
- Report verification verdicts explicitly: annotate `weakened` or
  `inconclusive` findings rather than silently dropping them; exclude only
  `falsified` findings from the reported facts.
- Hedge uncertain claims and present ranges when sources disagree; state the
  reporting boundary (entities, sites, time period covered) for every
  quantified disclosure.
- **Exhaustive coverage**: build the report from the full surviving-findings
  corpus — every surviving finding gets its own evidence (claim, citation,
  entities), never condensed to a cherry-picked subset. A silently dropped
  finding is a defect.
- The GRI Content Index is mandatory back matter, not optional — a report
  without it is not conformant with this genre.
- Any figure, chart, or diagram is a fenced `mermaid` code block — never ASCII
  art, an image link, or Graphviz/DOT. Plain tabular matter stays a Markdown
  table. A required figure is never silently omitted — say so in prose when
  the data cannot support it.
- Verify the current GRI Standards (Universal and applicable Topic Standards)
  live at authoring time; do not bake a specific standard year into the
  report as settled fact.

## Anti-triggers — do not use this genre for

- **An internal controls/process conformance review** (auditor's-report
  framing, tests-of-controls matrix, management's assertion) — that is
  `compliance-audit`; it never carries the GRI topic-standard frame or a GRI
  content index.
- **A statutory annual disclosure in Reg S-K / Form 10-K item order**
  (Business, Risk Factors, MD&A, Financial Statements) — that is
  `regulatory-disclosure`; it is a mandatory public-company filing shape, not
  a voluntary ESG/impact narrative organized by GRI topic standards.
- **A single already-made decision with no comparison or disclosure structure
  to show** — that is `adr`.

## MIF frontmatter

`type: semantic` — a sustainability report is declarative disclosure knowledge
tied to a reporting period, not a time-bound event or a step sequence. Climb
to L2 with `namespace` (`sustainability-report/<area>`), `modified`, `title`,
and `tags` when the drafting context supplies them. Gate every output with
`mif-validate` at its target level; the floor is `--level 1`.

## Why machine-readable — the point of MIF here

| Question an agent asks | Answered by (frontmatter) |
| --- | --- |
| Is this disclosure still current for this reporting period? | `temporal.validFrom` / `ttl` |
| Where did the evidence come from; can I trust it? | `provenance` (W3C-PROV) + `citations[]` |
| What formalizes it or relates to it (e.g. the audit or the filing it feeds)? | typed `relationships[]` (`relates-to`, `realized-by`) |
| Which disclosures were measured vs. asserted, and under what verdict? | `citations[]` tied to each topic-standard claim |

The same document still reads as a human sustainability report and projects
losslessly to JSON-LD and back — one artifact, two readers.

## The L1 -> L3 climb (two exemplars)

- `templates/good-l1.md` — **L1 floor**: `id`, `type`, `created` + body. A
  complete, valid report, but opaque to a machine consumer.
- `templates/good.md` — **L3 (highest this genre supports)**: adds
  `namespace`, `modified`, `temporal` validity, W3C-PROV `provenance`,
  `citations[]` tied to the topic-standard disclosures, and a typed
  `relationships[]` graph (e.g. `relates-to` the regulatory disclosure the
  data feeds). Validate with `mif-validate --level 3`.

Author at the **highest level the drafting context supports** (grade down
rather than fabricate). `templates/bad.md` shows the antipattern: a report
that makes topic-standard disclosures with no GRI Content Index anywhere to
map them.
