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

## Why machine-readable — the point of MIF here

An ADR's value is mostly consumed by machines: an agent deciding whether a
decision still holds, a CI gate flagging a stale one, a dependency walker tracing
which spec realizes it. As prose (L1) all of that requires reading and inferring.
The MIF layer makes those questions answerable by *reading frontmatter*:

| Question an agent asks | Answered by (frontmatter) |
| --- | --- |
| Is this decision still valid? | `temporal.validUntil` / `ttl` |
| What replaces or realizes it? | typed `relationships[]` (`superseded-by`, `realized-by`) |
| Where did it come from; can I trust it? | `provenance` (W3C-PROV) + `trustLevel` |
| What kind of thing is this? | `ontology` (`decision-record`) + `conceptType` |
| What evidence backs it? | `citations[]` |

The same document still reads as a human ADR and projects losslessly to JSON-LD
and back — one artifact, two readers.

## The L1 -> L2 -> L3 climb (three exemplars)

This skill ships the **same decision at three MIF levels** so the climb is
explicit:

- `templates/good-l1.md` — **L1 floor**: `id`, `type`, `created` + body. A valid
  ADR, but opaque to a machine consumer.
- `templates/good-l2.md` — **L2**: adds `namespace`, `modified`, `temporal`
  validity, and a typed `realized-by` relationship.
- `templates/good.md` — **L3 (highest the genre supports)**: adds `ontology`
  typing, W3C-PROV `provenance`, `citations[]`, and a full typed
  `relationships[]` graph. Decision drivers are EARS; the audit trail is
  provenance-backed. Validate with `mif-validate --level 3`.

Author at the **highest level the drafting context supports** (grade down rather
than fabricate). Gate every output with `mif-validate` at its target level; the
floor is `--level 1`. `templates/bad.md` shows the antipattern: no options, no
consequences, a status outside the enum.
