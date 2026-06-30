---
name: adr
description: Write an Architectural Decision Record (ADR) in the public MADR style — one decision, its drivers, the options weighed, the chosen outcome, and the consequences accepted — as a MIF-conformant document. Use when a team is making or capturing a consequential, hard-to-reverse technical choice and needs it documented with rationale. Anti-trigger; for a how-to use diataxis-how-to, for requirements use prd or feature-spec, not an ADR.
---

# adr

Produces an **Architectural Decision Record**: a short, immutable document that
captures one architecturally significant decision — the context that forced it,
the options considered, the option chosen, and the consequences the team accepts.
An ADR records a *decision*, not a task and not a requirement; if there are no
alternatives to weigh, it is not an ADR.

This genre follows the **public MADR standard** (Markdown Any Decision Records,
adr.github.io). It is **decoupled from `structured-madr`** — it shares the common
ADR shape by convention only and depends on none of that repo's tooling or schema.

## Pattern (industry: MADR / adr.github.io)

1. **Title** — `ADR-NNNN: <decision>`; names the decision, not an action.
2. **Status** — the lifecycle state (see below).
3. **Context and Problem Statement** — the forces and the problem, stated so a
   reader could disagree.
4. **Decision Drivers** — the criteria that decide it; express the testable ones
   in EARS (see the `ears-acceptance-criteria` helper).
5. **Considered Options** — at least two real alternatives.
6. **Decision Outcome** — the chosen option *and the justification* tying it back
   to the drivers, followed by **Consequences** (Good / Bad / Neutral).
7. **Pros and Cons of the Options** — per-option Good/Bad so the comparison that
   justifies the choice is visible.
8. **More Information** — links, related ADRs, and an audit/changelog trail.

## Lifecycle states

```text
proposed  ->  accepted  ->  deprecated
                       \->  superseded   (by a newer ADR)
```

- `proposed` — drafted, under review; the decision is not yet binding.
- `accepted` — the decision is in force.
- `deprecated` — no longer recommended, with no direct replacement.
- `superseded` — replaced by a newer ADR; link it (typically via a
  `relationships[]` entry of type `superseded-by`).

An accepted ADR is **immutable**: to change the decision, write a new ADR that
supersedes it rather than editing the outcome in place.

## Rules that keep it an ADR

- Exactly one decision per record. Split compound decisions into separate ADRs.
- At least two genuinely considered options; "no alternatives" means no ADR.
- Always state Consequences — the Bad and Neutral ones especially. An ADR that
  lists only upside is hiding its cost.
- Status MUST be one of the lifecycle enum; no free-form statuses ("done",
  "final").
- No placeholder text — every section reflects a real position.

## Research-grounded genre features

- **Temporal validity (D1):** carry a review cadence via an `x-expires`
  frontmatter date and note it in Status, so a stale decision is detectable.
- **Cross-genre relationships (D4):** link the artifacts that realize or replace
  the decision via MIF `relationships[]` with typed targets (e.g. `realized-by`
  a feature-spec, `superseded-by` a newer ADR).
- **Audit trail (D6):** keep a dated changelog under More Information.

## MIF frontmatter

`type: semantic` — an ADR is declarative knowledge (the decision and its
rationale), not a time-bound record or a how-to. Climb to L2 with `namespace`
(`adr/<area>`), `modified`, `title`, and `tags`; add `relationships[]` and the
`x-expires` review date when known. Gate every output with
`mif-validate --level 1`.

See `templates/good.md` (a conformant, accepted ADR) and `templates/bad.md` (an
ADR that records no decision — the most common failure: no options, no
consequences, a status outside the enum).
