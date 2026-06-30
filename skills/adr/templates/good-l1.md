---
id: adr-0007-postgresql-system-of-record
type: semantic
created: 2026-06-29T10:00:00Z
---

# ADR-0007: Adopt PostgreSQL as the System-of-Record Datastore

## Status

`accepted`

## Context and Problem Statement

Orders, ledger entries, and the audit trail live in three services with
independent, eventually-consistent stores; after a partial failure they disagree
and reconciliation is manual. We need one primary datastore that owns the
transactional core before we build the event-sourced write path.

## Decision Drivers

- Storage-layer relational integrity.
- Atomic commits across the order and ledger aggregates.
- Point-in-time recovery.

## Considered Options

- PostgreSQL
- MongoDB
- Amazon DynamoDB

## Decision Outcome

Chosen: **PostgreSQL** — the only option giving storage-layer constraints, true
cross-aggregate atomic commits, and point-in-time recovery without a second
system.

### Consequences

- Good: one transactional core removes cross-store reconciliation.
- Bad: horizontal write scaling needs explicit sharding later.

<!--
MIF Level 1 (floor): id, type, created + body only. This is a complete, valid
ADR — but to a machine consumer it is opaque prose. It cannot be queried for
"is this still valid?", "what supersedes it?", or "where did it come from?".
Compare good-l2.md (adds namespace + temporal validity) and good.md (full L3:
ontology, provenance, citations, typed relationships).
-->
