---
id: adr-0007-postgresql-system-of-record
type: semantic
created: 2026-06-29T10:00:00Z
modified: 2026-06-29T10:00:00Z
namespace: adr/data-platform
title: "ADR-0007: Adopt PostgreSQL as the System-of-Record Datastore"
tags:
  - adr
  - architecture
  - datastore
  - accepted
x-expires: 2027-06-29T00:00:00Z
relationships:
  - type: realized-by
    target: /semantic/feature-specs/event-sourced-write-path.md
---

# ADR-0007: Adopt PostgreSQL as the System-of-Record Datastore

## Status

Accepted — 2026-06-29.

Lifecycle: `proposed` -> `accepted` -> `{deprecated, superseded}`. This record is
`accepted`. Review cadence: re-evaluate by `x-expires` (2027-06-29); if the load
profile or the drivers below have shifted, supersede this ADR rather than editing
the decision in place.

## Context and Problem Statement

The platform needs a single system-of-record for orders, ledger entries, and the
audit trail. Today these live in three services with divergent, eventually
consistent stores, and reconciling them after a partial failure is manual and
error-prone. We must choose one primary datastore that can hold the
transactional core with strong guarantees, before we build the event-sourced
write path that depends on it.

## Decision Drivers

Drivers are stated as EARS acceptance criteria so a human and an agent grade them
identically (see the `ears-acceptance-criteria` helper).

- The datastore shall enforce relational integrity constraints at the storage
  layer. (Ubiquitous)
- When a write transaction spans the order and ledger aggregates, the datastore
  shall commit them atomically or roll the whole transaction back. (Event-driven)
- While the system serves production traffic, the datastore shall support
  point-in-time recovery to within five minutes of any chosen instant.
  (State-driven)
- If a query plan regresses after a schema change, then the datastore shall let
  operators inspect and pin the plan without a vendor support contract.
  (Unwanted behaviour)
- Where analytical read replicas are required, the datastore shall stream
  changes to them without dual-writes from the application. (Optional feature)

## Considered Options

- **PostgreSQL** — open-source relational engine with ACID transactions and
  logical replication.
- **MongoDB** — document database with tunable consistency and multi-document
  transactions.
- **Amazon DynamoDB** — managed key-value/document store with single-digit
  millisecond reads at scale.

## Decision Outcome

Chosen option: **PostgreSQL**, because it is the only candidate that satisfies
every must-have driver without bolting on a second system: storage-layer
relational constraints, true cross-aggregate atomic commits, and point-in-time
recovery are first-class, and logical replication feeds analytical replicas
without application dual-writes. The managed alternatives meet the scale driver
but force us to relax the integrity and atomicity drivers, which are the reasons
we are consolidating in the first place.

### Consequences

- Good: a single transactional core removes the cross-store reconciliation work
  and the class of partial-failure bugs that motivated this ADR.
- Good: logical replication realizes the analytical-replica driver natively, so
  the event-sourced write path can subscribe to the change stream.
- Bad: horizontal write scaling requires explicit sharding work later; a single
  primary is a known ceiling we accept for now.
- Bad: the team takes on operational ownership of backups, failover, and version
  upgrades rather than delegating them to a fully managed store.
- Neutral: schema changes now go through migrations and review, which adds
  process but also gives us the auditable history this platform wants.

## Pros and Cons of the Options

### PostgreSQL

- Good: ACID transactions across multiple tables satisfy the atomicity driver
  directly.
- Good: storage-layer constraints, point-in-time recovery, and logical
  replication cover the integrity, recovery, and replica drivers.
- Bad: a single primary caps write throughput until sharding is introduced.

### MongoDB

- Good: flexible document model speeds early schema iteration.
- Good: horizontal scaling via sharding is built in.
- Bad: multi-document transactions exist but are discouraged at scale, putting
  the cross-aggregate atomicity driver at risk.

### Amazon DynamoDB

- Good: fully managed, with predictable low-latency reads at very high scale.
- Good: no operational burden for backups or failover.
- Bad: no storage-layer relational constraints and limited transaction scope
  fail the integrity and atomicity drivers; consolidation would still need a
  relational store alongside it.

## More Information

- Realized by the feature spec at `/semantic/feature-specs/event-sourced-write-path.md`
  (declared in `relationships[]` as `realized-by`).
- Supersedes nothing; this is the first datastore consolidation decision.

### Audit Trail

- 2026-06-12 — Proposed by the platform team after the Q2 reconciliation incident.
- 2026-06-26 — Reviewed in architecture forum; DynamoDB eliminated on the
  integrity driver.
- 2026-06-29 — Accepted. Next review due by `x-expires` (2027-06-29).
