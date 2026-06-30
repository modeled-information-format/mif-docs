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
status: accepted
temporal:
  "@type": TemporalMetadata
  validFrom: 2026-06-29T00:00:00Z
  validUntil: 2027-06-29T00:00:00Z
  ttl: P1Y
relationships:
  - type: realized-by
    target: /semantic/feature-specs/event-sourced-write-path.md
---

# ADR-0007: Adopt PostgreSQL as the System-of-Record Datastore

## Status

`accepted` — valid until 2027-06-29 (`temporal.validUntil`).

## Context and Problem Statement

Orders, ledger entries, and the audit trail live in three services with
independent, eventually-consistent stores; after a partial failure they disagree
and reconciliation is manual. We need one primary datastore that owns the
transactional core before we build the event-sourced write path.

## Decision Drivers

- Storage-layer relational integrity.
- Atomic commits across the order and ledger aggregates.
- Point-in-time recovery to within five minutes.

## Considered Options

- PostgreSQL
- MongoDB
- Amazon DynamoDB

## Decision Outcome

Chosen: **PostgreSQL** — the only option giving storage-layer constraints,
cross-aggregate atomic commits, and point-in-time recovery without a second
system.

### Consequences

- Good: one transactional core removes cross-store reconciliation.
- Good: logical replication feeds the analytical replicas natively.
- Bad: horizontal write scaling needs explicit sharding later.

<!--
MIF Level 2 (standard): adds namespace, modified, and temporal validity, plus a
typed `realized-by` relationship. Now a machine consumer can answer "is this
ADR still in its validity window?" and "which feature spec realizes it?" by
reading frontmatter — no prose parsing. good.md climbs to L3 with ontology
typing, W3C-PROV provenance, and citations.
-->
