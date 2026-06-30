---
name: c4-model-diagram
description: Author a C4 model architecture document — Simon Brown's four levels of abstraction (System Context, Container, Component, Code) rendered as notation-independent Mermaid C4 diagrams plus an element catalog of people, systems, containers, and components. Use when the user needs to map or communicate software architecture at varying zoom levels for mixed technical/non-technical audiences. Anti-trigger; for a point-in-time decision record use adr, for a sequence/data-flow or deployment-only view use the matching diagram genre instead.
---

# c4-model-diagram

Produces a **C4 model** in Simon Brown's sense (c4model.com): a set of nested
diagrams that describe a software system at **four levels of abstraction**, each
zooming in one notch. C4 is *abstraction-first and notation-independent* — the
value is the consistent set of boxes-and-lines abstractions (person, software
system, container, component), not any particular drawing tool. Mermaid C4 is
one rendering; the abstractions are the contract.

## The four levels (zoom in one level at a time)

1. **Level 1 — System Context.** The system as a single box, surrounded by its
   **users (people)** and the **other software systems** it talks to. Audience:
   everyone, technical and not. Answers "what is this and who/what uses it".
2. **Level 2 — Container.** Zooms into the system box to show the deployable /
   runnable **containers** (web app, API, mobile app, database, message broker —
   *not* Docker containers specifically) and how they communicate. Audience:
   technical people inside and outside the team.
3. **Level 3 — Component.** Zooms into one container to show its major
   **components** (groupings of related functionality behind an interface) and
   their relationships. Audience: developers of that container.
4. **Level 4 — Code.** Zooms into one component (classes / functions). **Usually
   omitted** — it ages fast and is better generated on demand from the IDE. Most
   C4 docs stop at Level 3.

## Pattern (each level is the same shape)

- A **Mermaid C4 diagram** in a fenced ` ```mermaid ` block using the matching
  block keyword: `C4Context`, `C4Container`, or `C4Component`. Declare people
  with `Person(...)`, systems with `System(...)`/`System_Ext(...)`, containers
  with `Container(...)`/`ContainerDb(...)`, components with `Component(...)`,
  group an in-scope system with a `System_Boundary`/`Container_Boundary`, and
  connect everything with `Rel(...)` labelled by *what* flows and *how*.
- An **element catalog** under the diagram: a short table or list naming each
  element, its kind (person / system / container / component), and its single
  **responsibility**. The catalog is the durable part; the diagram is its view.

## Authoring rules (what keeps it a true C4 model)

- **One level of abstraction per diagram.** Never mix containers and components
  in the same picture — that is the most common C4 failure.
- **People and boundaries are mandatory at Level 1.** A diagram with only
  technical boxes and no actors and no system boundary is an arbitrary
  architecture sketch, not C4.
- **Label every relationship** with intent and (where useful) technology/protocol
  ("Reads from, via JDBC"), and keep the arrows directional.
- **Consistent naming** across levels: the container you zoom into at Level 3 is
  the same named container from the Level 2 diagram.
- Keep technology choices on **containers and components**, not on people or
  external systems.

## MIF frontmatter

`type: semantic` — a C4 model is declarative architectural knowledge (what the
system *is*), not a time-bound event or a how-to. Climb to L2 with `namespace`
(e.g. `architecture/c4/<system>`), `title`, and `tags` when known. Gate every
output with `mif-validate --level 1`.

See `templates/good.md` (Context + Container + Component for an example system)
and `templates/bad.md` (a "C4" diagram that mixes abstraction levels and shows
tech-only boxes with no people or boundaries — the canonical antipattern).
