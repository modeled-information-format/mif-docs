---
title: "Adopt PostgreSQL as the System-of-Record Datastore"
description: "Consolidate orders, ledger, and audit onto one ACID datastore; PostgreSQL is chosen over MongoDB and DynamoDB because storage-layer integrity, cross-aggregate atomic commits, and point-in-time recovery are must-haves."
type: adr
conceptType: semantic
x-ontology:
  id: mif-docs
  version: "1.0.0"
  entity_type: decision-record
category: data-platform
tags:
  - adr
  - architecture
  - datastore
status: accepted
created: 2026-06-29
updated: 2026-06-29
author: platform-architecture-forum
project: payments-platform
technologies:
  - postgresql
  - mongodb
  - dynamodb
audience:
  - developers
  - architects
related:
  - adr-0009-logical-replication-to-warehouse.md
---

# ADR-0007: Adopt PostgreSQL as the System-of-Record Datastore

## Status

Accepted

## Context

### Background and Problem Statement

Orders, ledger entries, and the audit trail are spread across three services with
independent, eventually-consistent stores. In the Q2 reconciliation incident a
partial failure left the order store and the ledger store disagreeing for nine
hours; recovery was a manual, spreadsheet-driven reconciliation because no store
held the cross-aggregate truth. Before we build the event-sourced write path, we
must pick one primary datastore that owns the transactional core with strong
guarantees so that "what really happened" has a single, recoverable home.

### Current Limitations

1. **No cross-aggregate truth**: order and ledger state live in separate stores
   with no atomic boundary, so a partial failure desynchronizes them.
2. **Manual recovery**: reconciliation after a failure is human-driven and slow.
3. **No point-in-time recovery**: the current stores cannot be rewound to a
   chosen instant.

## Decision Drivers

### Primary Decision Drivers

The following factors are weighted most heavily in this decision:

1. **Storage-layer integrity**: the datastore shall enforce relational integrity
   constraints at the storage layer, not in application code.
2. **Cross-aggregate atomicity**: when a write spans the order and ledger
   aggregates, the datastore shall commit them atomically or roll back entirely.
3. **Point-in-time recovery**: while serving production traffic, the datastore
   shall support recovery to within five minutes of any chosen instant.

### Secondary Decision Drivers

The following factors influenced the decision but were not individually decisive:

1. **Operable query plans**: operators should be able to inspect and pin a query
   plan after a schema change without a vendor support contract.
2. **Native analytical replicas**: change data should stream to read replicas
   without application dual-writes.

## Considered Options

### Option 1: PostgreSQL

**Description**: Open-source relational engine with ACID transactions and logical
replication.

**Technical Characteristics**:

- ACID transactions across multiple tables.
- Storage-layer constraints, point-in-time recovery, logical replication.

**Advantages**:

- Cross-aggregate atomic commits satisfy the atomicity driver directly.
- Integrity, recovery, and replica drivers are first-class.

**Disadvantages**:

- A single primary caps write throughput until sharding is introduced.

**Risk Assessment**:

- **Technical Risk**: Low. Mature engine; the team already runs it.
- **Schedule Risk**: Low. No new operational tooling required.
- **Ecosystem Risk**: Low. Open standard, no lock-in.

### Option 2: MongoDB

**Description**: Document database with tunable consistency and multi-document
transactions.

**Technical Characteristics**:

- Flexible document model; built-in sharding.

**Advantages**:

- Fast early schema iteration.
- Horizontal scaling via sharding is built in.

**Disadvantages**:

- Multi-document transactions are discouraged at scale.

**Disqualifying Factor**: multi-document transactions discouraged at scale put the
cross-aggregate atomicity driver at risk.

**Risk Assessment**:

- **Technical Risk**: Medium. Atomicity guarantees weaken at scale.
- **Schedule Risk**: Low.
- **Ecosystem Risk**: Low.

### Option 3: Amazon DynamoDB

**Description**: Managed key-value/document store with single-digit-millisecond
reads at scale.

**Technical Characteristics**:

- Fully managed; predictable low-latency reads.

**Advantages**:

- No operational burden for backups or failover.

**Disadvantages**:

- No storage-layer relational constraints; limited transaction scope.

**Disqualifying Factor**: no storage-layer integrity and limited transaction scope
fail the integrity and atomicity drivers.

**Risk Assessment**:

- **Technical Risk**: High for this use. Integrity must move into application code.
- **Schedule Risk**: Low.
- **Ecosystem Risk**: Medium. Vendor lock-in.

## Decision

We adopt **PostgreSQL** as the single system-of-record datastore for orders,
ledger, and audit. It is the only option that satisfies every primary driver
without a second system.

The implementation will use:

- **PostgreSQL logical replication** for streaming changes to analytical replicas.
- **Continuous archiving (WAL)** for point-in-time recovery within five minutes.

## Consequences

### Positive

1. **Single transactional core**: removes cross-store reconciliation and the
   partial-failure bug class that caused the Q2 incident.
2. **Native analytical replicas**: logical replication realizes the replica driver
   without application dual-writes.

### Negative

1. **Sharding deferred**: horizontal write scaling needs explicit sharding work
   later; mitigated by a known capacity ceiling and a tracked follow-up ADR.
2. **Operational ownership**: the team owns backups, failover, and upgrades;
   mitigated by managed-Postgres hosting and runbooks.

### Neutral

1. **Reviewed migrations**: schema changes now go through migrations and review —
   more process, but the auditable history this platform wants.

## Decision Outcome

The decision achieves its primary objective — a single recoverable source of
truth — measured by: zero cross-store reconciliation incidents post-adoption and
point-in-time recovery validated at five minutes in a quarterly game-day.

Mitigations:

- Sharding follow-up tracked in ADR-0011 (capacity).
- Backups/failover covered by the database-failover runbook.

## Related Decisions

- [ADR-0009: Logical Replication to the Warehouse][adr-0009] - enables the change stream.

## Links

- [PostgreSQL 17 — Continuous Archiving and PITR][pg-pitr] - supports the recovery driver.

## More Information

- **Date:** 2026-06-29
- **Source:** Q2 reconciliation incident review
- **Related ADRs:** ADR-0009, ADR-0011

## Audit

### 2026-06-29

**Status:** Compliant

**Findings:**

| Finding                                 | Files | Lines | Assessment |
| --------------------------------------- | ----- | ----- | ---------- |
| DynamoDB eliminated on integrity driver | -     | -     | accepted   |

**Summary:** Decision accepted after architecture-forum review; DynamoDB
eliminated on the integrity driver.

**Action Required:** Implement the event-sourced write path on PostgreSQL.

[adr-0009]: adr-0009-logical-replication-to-warehouse.md
[pg-pitr]: https://www.postgresql.org/docs/17/continuous-archiving.html
