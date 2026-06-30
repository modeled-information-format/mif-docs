---
name: google-design-doc
description: Write a Google-style engineering design doc — an informal, trade-off-focused narrative that frames a problem, proposes one design, and weighs the alternatives it rejected. Use when an engineer must align a team on a non-trivial technical approach before building and wants the rationale and the decision on record. Anti-trigger; for a single immutable decision use adr, for product requirements use feature-spec, for an operational procedure use sre-runbook.
---

# google-design-doc

Produces a **Google-style engineering design doc**: an informal, prose-first
document an engineer writes *before* building, to think through a design and get
a team to agree on it. Its center of gravity is the **trade-off** — it does not
just describe the chosen design, it shows the alternatives that were weighed and
says plainly why each was rejected. A design doc captures *declarative design
knowledge and its rationale*; it is not a step-by-step procedure and not a
product requirements list.

This genre follows the widely-published Google pattern (informal tone,
trade-off-driven, reviewer-oriented). It is a convention, not a schema — keep the
voice conversational and let the design dictate which optional subsections appear.

## Pattern (industry: Google engineering design doc)

1. **Context and Scope** — the background and the problem. What exists today, why
   it is insufficient, and the boundary of what this doc covers. Orient a reader
   who has not been in the hallway conversations.
2. **Goals and Non-Goals** — bullet the outcomes that define success, then
   explicitly bullet what is *out of scope*. Non-goals are not optional; they are
   how the doc bounds the design and pre-empts scope creep in review.
3. **The Design / Overview** — the proposed approach in prose, then the concrete
   surfaces it touches: **APIs** (signatures/contracts), **data storage / schema**
   (tables, keys, indexes, retention), and the **key flows** (the request/data
   paths, ideally one happy path and the important failure path).
4. **Alternatives Considered** — one subsection per rejected option, each with
   explicit **pros / cons** and a one-line **why rejected** that ties back to a
   goal or constraint. This section is the doc's reason to exist.
5. **Cross-cutting Concerns** — how the design handles **security**, **privacy**,
   and **observability** (metrics, logs, traces, alerts). Add others (cost,
   latency budget, rollout) when the design forces them.

## Rules that keep it a design doc

- Lead with the trade-offs and the decision, not an exhaustive spec — a reviewer
  should learn *why this and not that* faster than *every field of every struct*.
- Every alternative gets an honest case for it before the case against; a
  strawman alternative is a review smell, not a trade-off.
- Tie each rejection to a stated goal, non-goal, or constraint — "rejected
  because slow" is weak; "rejected: fails the p99 < 50 ms latency goal" is a
  trade-off.
- Keep the tone informal and concrete. Real names, real numbers, real schemas —
  no `TODO`, no "details TBD" in a doc you are asking people to approve.

## MIF frontmatter

`type: semantic` — a design doc is declarative design knowledge plus its
rationale, not a time-bound event or a how-to. Climb to L2 with `namespace`
(`design/<area>`), `modified`, `title`, and `tags` when the review context
supplies them. Gate every output with `mif-validate --level 1`.

See `templates/good.md` (a conformant, trade-off-explicit design doc) and
`templates/bad.md` (a design doc that omits Non-Goals and Alternatives — the most
common failure, where a proposal masquerades as a design doc).
