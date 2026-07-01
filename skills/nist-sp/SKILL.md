---
name: nist-sp
description: Write a NIST Special Publication (SP 800-series style) standards/guidance document — authority statement, purpose & scope, audience, abstract, keywords, numbered normative sections with shall/should/may force, a required definitions/glossary, numbered bracketed references, and lettered appendices with control-mapping crosswalks. Use when the deliverable is standing standards or guidance issued under NIST's mandate. Anti-trigger; for a one-time client engagement report that applies a standard use security-pentest or compliance-audit, not this genre.
argument-hint: "<the standard or guidance topic to document>"
---

# nist-sp

Produces a **NIST Special Publication (SP 800-series style) standards/guidance
document**: an authoritative, standards-track deliverable that states normative
requirements, defines terms of art, and maps to external control frameworks —
for standards authors, control owners, security/privacy program leads,
auditors, and implementers who must apply it as binding guidance, not read it
as narrative. Its center of gravity is the **numbered normative section**:
every requirement is stated with explicit normative force (shall / should /
may) and traces to cited evidence. This genre follows the NIST SP 800-series
convention — front-matter authority statement, numbered sections, definitions,
references, appendices — at altitude `authoritative`: normative precision over
narrative, with uncertainty recorded as an explicit verdict annotation, never
as hedged phrasing in a requirement.

## Target Audience

Standards authors, control owners, security and privacy program leads,
auditors, and implementers who must read the document as authoritative
guidance — understand its authority and scope, apply its numbered normative
requirements, and trace defined terms and control mappings into their own
programs.

## Pattern (industry: NIST SP 800-series)

Front matter, in this order, ahead of the first numbered section:

1. **Authority** — the front-matter statement of the publication's standing:
   the mandate under which it is issued and the standing of its guidance.
2. **Purpose & Scope** — what the publication establishes and the boundary of
   its applicability; what is in and out of scope.
3. **Audience** — the intended readers and the roles expected to apply the
   guidance.
4. **Abstract** — a self-contained summary of the problem, the guidance, and
   the principal conclusions.
5. **Keywords** — a short controlled list of index terms (cap at ten).

Body and back matter (continuing the same numbered sequence, items 6-9):

1. **Numbered normative sections** — the body, numbered sequentially with up
   to four heading levels (`1.`, `1.1.`, `1.1.1.`, `1.1.1.1.`). Each normative
   requirement traces to a cited finding; state normative force explicitly
   (shall / should / may).
2. **Definitions / Glossary** — every term of art used normatively, defined
   once. Required.
3. **References** — the numbered reference list (see Citation Style).
4. **Appendices** — supporting matter such as control mappings, control
   catalogs, and crosswalks. Lettered (Appendix A, B, …).

## Citation Style

Numbered references in square brackets — `[1]`, `[2]` — resolving to a
numbered References list at the back. Each reference entry renders as a
human-readable citation (author, title, source/URL, and the DOI as a complete
URL when available — NIST reference format). An internal MIF finding `@id`
(`urn:mif:`) is traceability only: it links the rendered entry back to its
finding and is never printed in the output. Every normative requirement and
defined term cites the finding it rests on; no orphan normative claims.

## Required Figures & Matter

- **Front matter**: Authority statement, Purpose & Scope, Audience, Abstract,
  and Keywords (≤ 10), in that order, before the first numbered section.
- **Definitions / Glossary**: required — every normatively-used term of art is
  defined.
- **Back matter**: a numbered References list is required; **appendices**
  carry the mappings and control catalogs (e.g. a crosswalk table mapping
  requirements to an external control framework, or a catalog of the controls
  the publication defines).
- **Figures / tables**: a control-mapping or crosswalk table is expected
  whenever the findings support a mapping to an external framework. Any
  figure, chart, or diagram is rendered as a fenced Mermaid code block (a
  `mermaid` info-string fence) — a control or data-flow figure as a
  `flowchart` — never ASCII art, an image link, or Graphviz/DOT; a required
  figure is never silently omitted — if the data cannot support it, say so in
  prose. Plain tabular matter stays a Markdown table.

## Rules

- Every normative requirement and defined term traces to a cited finding; no
  orphan facts and no uncited normative claims.
- Report verification verdicts: annotate findings whose verdict is `weakened`
  or `inconclusive` rather than hiding them, and exclude only `falsified`
  units from normative guidance.
- Do not bake a standard's edition or version number into the text as settled
  fact unless a surviving finding establishes it; anchor edition references to
  their cited finding and verify currency at authoring time.
- **Exhaustive coverage**: build the publication from the full surviving
  findings corpus — every surviving finding is treated with its own evidence
  (claim, citations, entities), never condensed to a cherry-picked subset. A
  silently dropped finding is a defect.
- No `urn:mif:` identifier leaks into reader-facing prose; identifiers resolve
  to numbered `[N]` references.

## Anti-triggers — do not use this genre for

- **A one-time client or internal engagement deliverable that applies a
  standard rather than issuing one** — that is `security-pentest` (a
  penetration-test engagement report) or `compliance-audit` (an audit-of-record
  engagement report): each performs and reports against a standard's controls;
  neither states normative requirements, defines terms of art, or carries the
  standing of an issuing authority.
- **A single immutable decision with its drivers** — that is `adr`.
- **An internal system architecture description with no standards-track
  authority** — that is `arc42-arch-doc` or `ai-architecture-doc`.

## MIF frontmatter

`type: semantic` — a NIST SP is declarative normative/standards knowledge, not
a time-bound event or a step sequence. Climb to L2 with `namespace`
(`nist-sp/<area>`), `modified`, `title`, and `tags` when the drafting context
supplies them. Gate every output with `mif-validate` at its target level; the
floor is `--level 1`. Rendered through the `report` channel at MIF Level 3
(authoritative concept frontmatter + falsification verdict); any published
projection (blog/book) is at least MIF Level 1 — never bare, frontmatter-less
prose.

## Why machine-readable — the point of MIF here

| Question an agent asks | Answered by (frontmatter) |
| --- | --- |
| Is this requirement still current, or has it been superseded? | `temporal.validFrom` / `ttl` |
| Where did the normative claim come from; can I trust it? | `provenance` (W3C-PROV) + `citations[]` |
| What control framework, crosswalk, or engagement report relates to it? | typed `relationships[]` (`relates-to`, `realized-by`) |
| Which requirements were tested/verified vs. asserted? | `citations[]` tied to each normative requirement |

The same document still reads as a human standards publication and projects
losslessly to JSON-LD and back — one artifact, two readers.

## The L1 -> L3 climb (two exemplars)

- `templates/good-l1.md` — **L1 floor**: `id`, `type`, `created` + body. A
  complete, valid publication, but opaque to a machine consumer.
- `templates/good.md` — **L3 (highest this genre supports)**: adds
  `namespace`, `modified`, `temporal` validity, W3C-PROV `provenance`,
  `citations[]` tied to each normative requirement, and a typed
  `relationships[]` graph (e.g. `relates-to` a compliance-audit engagement that
  assesses conformance against it). Validate with `mif-validate --level 3`.

Author at the **highest level the drafting context supports** (grade down
rather than fabricate). `templates/bad.md` shows the antipattern: a document
titled and numbered like an SP but whose normative sections state guidance in
hedged narrative prose with no cited evidence — the single most load-bearing
rule this genre exists to enforce (every normative requirement traces to a
cited finding; no orphan normative claims) simply broken.
