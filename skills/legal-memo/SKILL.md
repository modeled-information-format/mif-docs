---
name: legal-memo
description: Write a predictive legal memorandum — Question Presented, Brief Answer, Statement of Facts, an IRAC Discussion (Issue, Rule, Application, Conclusion per issue), and a Conclusion, with Bluebook practitioner citations. Use when the deliverable is an internal legal analysis predicting how a question of law resolves on the facts. Anti-trigger; for a single immutable engineering/technical decision use adr, for a regulated-industry compliance finding rather than a predictive legal question use compliance-audit.
argument-hint: "<the legal question to analyze>"
---

# legal-memo

Produces a **predictive legal memorandum**: an internal analysis that predicts
how a question of law resolves on a given set of facts, and shows its reasoning
issue by issue so a supervising attorney or decision-maker can scrutinize the
chain from facts to rule to application before relying on it. Its center of
gravity is **IRAC** (Issue, Rule, Application, Conclusion) applied once per
discrete issue inside the Discussion — that ordered sub-structure is what makes
this a legal memo and not a narrative brief.

This genre follows the standard U.S. law-practice predictive-memo convention,
with Bluebook practitioner citation style for authority.

> **Scope caveat (carry, do not over-sell):** this genre reproduces the
> *structure and reasoning form* of a predictive legal memorandum. It is not
> legal advice and asserts no legal sufficiency — the analysis is only as sound
> as the cited authority it points to.

## Audience and altitude

A supervising attorney or internal decision-maker who must act on a prediction
of how a legal question resolves. Altitude is **predictive**: state the most
likely outcome and the confidence in it, then earn that prediction issue by
issue. Surface adverse authority and counter-arguments honestly — an
unaddressed weakness is a defect, not an omission.

## Pattern (industry: predictive legal memorandum, IRAC + Bluebook)

1. **Front matter** — a standard memo heading (To / From / Date / Re).
2. **Question Presented** — the legal issue framed as a single yes/no question
   that joins the governing rule to the determinative facts, not an open-ended
   topic.
3. **Brief Answer** — the predicted conclusion in 2-3 sentences, with the core
   reason.
4. **Statement of Facts** — the material facts, stated neutrally; no argument
   here.
5. **Discussion** — the analytical core, in **IRAC per issue**: **I**ssue ->
   **R**ule -> **A**pplication -> **C**onclusion. One IRAC cycle per discrete
   issue, each cycle citing its authority. Address counter-arguments within
   Application. This ordered sub-structure is the genre's distinguishing
   feature and the section that grounds the Conclusion.
6. **Conclusion** — overall disposition, the recommendation, and any open
   questions or next steps.
7. **Back matter** — the full table of authorities / reference list; an
   optional appendix for extended record or verification notes.

Add a figure only when authorities or factors are compared on shared
attributes: render it as a Markdown table (or a fenced `mermaid` code block if
it is a diagram, never ASCII art or an image), number and caption it, and
reference it in the text. A required figure is never silently omitted — if the
data cannot support one, say so in prose.

## Citation style

Bluebook practitioner format — citations to authority as footnotes or inline
cites, resolving to a table of authorities in the back matter. Every citation
must resolve to a real, verifiable source; no uncited claims. **Verify the
current Bluebook edition live at authoring time** and follow it — never bake an
edition number into output as settled fact.

## Rules that keep it a legal memo

- Every claim is traceable to cited authority; no orphan facts.
- The Discussion uses IRAC per issue, not a flat narrative — Issue, Rule,
  Application, and Conclusion must each be identifiable, in order, for every
  discrete issue.
- State adverse authority and limitations honestly; an undiscussed weakness is
  a defect, not an omission.
- Hedge uncertain predictions; present the range when authorities disagree, and
  mark a weakened or contested authority with an explicit qualifier rather than
  asserting it with the same confidence as settled authority.
- **Exhaustive coverage**: build the memo from the full set of supplied
  authority — every surviving source gets its own treatment, never condensed to
  a cherry-picked subset. A silently dropped source is a defect.
- Never cite a source you cannot verify is real; omit it or substitute a real,
  well-known authority rather than fabricate a citation.

## Anti-triggers — do not use this genre for

- **A single already-made technical decision with no predictive legal
  question** — that is an `adr` (Structured MADR): immutable, driver-and-outcome,
  no IRAC and no legal authority to weigh.
- **A finding against a regulatory standard rather than a prediction of how a
  legal question resolves** — that is `compliance-audit`: a conformance
  checklist against a named regulation, not an issue-by-issue legal analysis.
- **A settled record of what already happened** — a legal memo predicts an
  outcome; it does not narrate history.

## MIF frontmatter

`type: semantic` — a legal memorandum is declarative legal analysis and its
rationale, not a time-bound event or a step sequence. Climb to L2 with
`namespace` (`legal-memo/<area>`), `modified`, `title`, and `tags` when the
drafting context supplies them. Gate every output with `mif-validate` at its
target level; the floor is `--level 1`.

## Why machine-readable — the point of MIF here

| Question an agent asks | Answered by (frontmatter) |
| --- | --- |
| Is this prediction still current, or has the law moved? | `temporal.validFrom` / `ttl` |
| Where did the authority come from; can I trust it? | `provenance` (W3C-PROV) + `citations[]` |
| What does this memo relate to or get formalized by? | typed `relationships[]` (`relates-to`, `realized-by`) |
| Which claims are cited authority vs. asserted analysis? | `citations[]` tied to each IRAC cycle's Rule |

The same document still reads as a human legal memo and projects losslessly to
JSON-LD and back — one artifact, two readers.

## The L1 -> L3 climb (two exemplars)

- `templates/good-l1.md` — **L1 floor**: `id`, `type`, `created` + body. A
  complete, valid memo, but opaque to a machine consumer.
- `templates/good.md` — **L3 (highest this genre supports)**: adds `namespace`,
  `modified`, `temporal` validity, W3C-PROV `provenance`, `citations[]` tied to
  the cited authority, and a typed `relationships[]` graph (e.g. `relates-to` a
  related engineering or compliance record). Validate with
  `mif-validate --level 3`.

Author at the **highest level the drafting context supports** (grade down
rather than fabricate). `templates/bad.md` shows the antipattern: a memo whose
Discussion has no IRAC sub-structure — the genre's single most load-bearing
required element.
