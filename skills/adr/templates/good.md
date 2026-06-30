---
id: adr-0007-postgresql-system-of-record
type: semantic
created: 2026-06-29T10:00:00Z
modified: 2026-06-29T10:00:00Z
namespace: adr/data-platform
title: "ADR-0007: Adopt PostgreSQL as the System-of-Record Datastore"
summary: >-
  Consolidate orders, ledger, and audit onto a single ACID datastore.
  PostgreSQL chosen over MongoDB and DynamoDB because storage-layer integrity,
  cross-aggregate atomic commits, and point-in-time recovery are must-haves.
tags:
  - adr
  - architecture
  - datastore
  - accepted
aliases:
  - "ADR-7"
  - "PostgreSQL system of record"
status: accepted
deciders:
  - platform-architecture-forum
ontology:
  "@type": OntologyReference
  id: decision-record
  version: 1.0.0
  uri: https://mif-spec.dev/ontologies/decision-record
temporal:
  "@type": TemporalMetadata
  validFrom: 2026-06-29T00:00:00Z
  validUntil: 2027-06-29T00:00:00Z
  recordedAt: 2026-06-29T10:00:00Z
  ttl: P1Y
x-review-cycle: P6M
provenance:
  "@type": Provenance
  sourceType: user_explicit
  trustLevel: verified
  confidence: 0.95
  wasGeneratedBy:
    "@id": "urn:mif:activity:adr-review-2026-06-29"
    "@type": prov:Activity
  wasAttributedTo:
    "@id": "urn:mif:team:platform-architecture"
    "@type": prov:Agent
  wasDerivedFrom:
    "@id": "urn:mif:episodic:incident-2026-q2-reconciliation"
    "@type": prov:Entity
citations:
  - "@type": Citation
    citationType: specification
    citationRole: methodology
    title: "MADR — Markdown Any Decision Records"
    url: https://adr.github.io/madr/
    accessed: 2026-06-26
  - "@type": Citation
    citationType: documentation
    citationRole: supports
    title: "PostgreSQL 17 — Continuous Archiving and Point-in-Time Recovery"
    url: https://www.postgresql.org/docs/17/continuous-archiving.html
    accessed: 2026-06-26
    relevance: 0.9
  - "@type": Citation
    citationType: article
    citationRole: background
    title: "Q2 Reconciliation Incident Review"
    url: https://example.internal/incidents/2026-q2-reconciliation
    date: 2026-06-12
relationships:
  - type: derived-from
    target: /episodic/incidents/2026-q2-reconciliation.md
    strength: 0.9
  - type: realized-by
    target: /semantic/feature-specs/event-sourced-write-path.md
  - type: relates-to
    target: /semantic/adr/adr-0009-logical-replication-to-warehouse.md
---

# ADR-0007: Adopt PostgreSQL as the System-of-Record Datastore

## Status

`accepted` — 2026-06-29. Lifecycle: `proposed` → `accepted` →
`{deprecated, superseded}`.

This record carries a **temporal validity SLA**: it is valid from `validFrom`
until `validUntil` (one year, `ttl: P1Y`) and is reviewed on a `P6M` cadence
(`x-review-cycle`). A `mif-validate`-driven freshness gate flags this ADR once it
passes `validUntil` while still `accepted`; at that point it is superseded, never
edited in place.

## Context and Problem Statement

Orders, ledger entries, and the audit trail are spread across three services with
independent, eventually-consistent stores. In the Q2 reconciliation incident
(`derived-from` the episodic record in `relationships[]`) a partial failure left
the order store and the ledger store disagreeing for nine hours; recovery was a
manual, spreadsheet-driven reconciliation because no store held the
cross-aggregate truth. Before we build the event-sourced write path, we must pick
one primary datastore that owns the transactional core with strong guarantees so
that "what really happened" has a single, recoverable home.

## Decision Drivers

Drivers are EARS acceptance criteria so a human and an agent grade them
identically (see the `ears-acceptance-criteria` helper).

- The datastore shall enforce relational integrity constraints at the storage
  layer. *(Ubiquitous)*
- When a write transaction spans the order and ledger aggregates, the datastore
  shall commit them atomically or roll the whole transaction back.
  *(Event-driven)*
- While the system serves production traffic, the datastore shall support
  point-in-time recovery to within five minutes of any chosen instant.
  *(State-driven)*
- If a query plan regresses after a schema change, then the datastore shall let
  operators inspect and pin the plan without a vendor support contract.
  *(Unwanted behaviour)*
- Where analytical read replicas are required, the datastore shall stream changes
  to them without application dual-writes. *(Optional feature)*

## Considered Options

- **PostgreSQL** — open-source relational engine, ACID transactions, logical
  replication. Technical risk: low. Schedule risk: low (team has operators).
  Ecosystem risk: low.
- **MongoDB** — document store, tunable consistency, multi-document transactions.
  Technical risk: medium (transactions discouraged at scale). Ecosystem risk:
  low.
- **Amazon DynamoDB** — managed key-value/document store, single-digit-ms reads.
  Technical risk: high for this use (no storage-layer relational integrity).
  Schedule risk: low. Ecosystem risk: medium (lock-in).

## Decision Outcome

Chosen option: **PostgreSQL**. It is the only candidate that satisfies every
must-have driver without a second system: storage-layer constraints,
cross-aggregate atomic commits, and point-in-time recovery are first-class, and
logical replication feeds analytical replicas without dual-writes. The managed
alternatives meet the scale driver but force us to relax the integrity and
atomicity drivers — the very reasons we are consolidating.

### Consequences

- Good: a single transactional core removes cross-store reconciliation and the
  partial-failure bug class that caused the Q2 incident.
- Good: logical replication realizes the analytical-replica driver natively; the
  event-sourced write path (`realized-by` in `relationships[]`) subscribes to the
  change stream.
- Bad: horizontal write scaling needs explicit sharding later; one primary is a
  known ceiling we accept for now.
- Bad: the team owns backups, failover, and version upgrades rather than
  delegating to a managed store.
- Neutral: schema changes go through reviewed migrations — more process, but the
  auditable history this platform wants.

## Pros and Cons of the Options

### PostgreSQL

- Good: ACID transactions across tables satisfy the atomicity driver directly.
- Good: storage-layer constraints, PITR, and logical replication cover the
  integrity, recovery, and replica drivers.
- Bad: a single primary caps write throughput until sharding is introduced.

### MongoDB

- Good: flexible document model speeds early schema iteration.
- Bad: multi-document transactions are discouraged at scale, risking the
  cross-aggregate atomicity driver.

### Amazon DynamoDB

- Good: fully managed, predictable low-latency reads at very high scale.
- Bad: no storage-layer relational constraints and limited transaction scope fail
  the integrity and atomicity drivers; consolidation would still need a relational
  store alongside it.

## More Information

This decision is **MIF Level 3**: it carries `ontology` (typed as a
`decision-record`), `temporal` validity, W3C-PROV `provenance` (generated by the
review activity, attributed to the architecture forum, derived from the incident),
`citations[]`, and typed cross-genre `relationships[]`. The same document projects
losslessly to JSON-LD for machine consumers and back to this markdown for humans.

### Audit Trail

Each entry is provenance-backed (see frontmatter `provenance.wasGeneratedBy`).

- 2026-06-12 — Proposed by the platform team after the Q2 reconciliation incident.
- 2026-06-26 — Reviewed in the architecture forum; DynamoDB eliminated on the
  integrity driver; citations recorded.
- 2026-06-29 — Accepted. Valid until 2027-06-29 (`temporal.validUntil`); next
  review at the `P6M` cadence.
