---
id: how-to-run-mif-validate
type: procedural
created: '2026-06-30T12:00:00Z'
modified: '2026-06-30T12:00:00Z'
namespace: how-to/validate
title: How to run mif-validate and convert a document
tags:
  - how-to
  - mif-docs
  - mif-validate
  - validation
temporal:
  '@type': TemporalMetadata
  validFrom: '2026-06-30T00:00:00Z'
  recordedAt: '2026-06-30T12:00:00Z'
  ttl: P1Y
relationships:
  - type: relates-to
    target: urn:mif:how-to-validate-and-author
  - type: relates-to
    target: urn:mif:reference-skill-mif-validate
  - type: relates-to
    target: urn:mif:reference-skills-by-purpose
ontology:
  '@type': OntologyReference
  id: mif-docs
  version: 1.0.0
  uri: https://mif-spec.dev/ontologies/mif-docs
provenance:
  '@type': Provenance
  sourceType: agent_inferred
  trustLevel: high_confidence
  agent: anthropic/claude-code
  wasAttributedTo:
    '@id': https://github.com/modeled-information-format
    '@type': prov:Agent
  wasGeneratedBy:
    '@id': urn:mif:activity:mif-docs-self-documentation
    '@type': prov:Activity
  wasDerivedFrom:
    - '@id': https://github.com/modeled-information-format/mif-docs-plugin
      '@type': prov:Entity
    - '@id': https://mif-spec.dev
      '@type': prov:Entity
citations:
  - '@type': Citation
    citationType: documentation
    citationRole: methodology
    title: 'Diátaxis — How-to Guides: the task-oriented quadrant this guide follows'
    url: https://diataxis.fr/how-to-guides/
    accessed: '2026-06-30'
  - '@type': Citation
    citationType: specification
    citationRole: background
    title: 'JSON Schema 2020-12 — the dialect the canonical MIF schema declares'
    url: https://json-schema.org/specification
    accessed: '2026-06-30'
  - '@type': Citation
    citationType: repository
    citationRole: source
    title: 'modeled-information-format/mif-docs-plugin — the mif-validate and mif-convert scripts'
    url: https://github.com/modeled-information-format/mif-docs-plugin
entity:
  name: Run mif-validate and convert a document
  entity_type: how-to-guide
extensions:
  x-diataxis-quadrant: how-to
---

# How to run mif-validate and convert a document

This guide runs the deterministic `mif-validate` gate on a document and converts it
between Markdown and JSON-LD. The verdict carries no language model — it is the
canonical schema plus a lossless round-trip, so identical input yields an identical
answer every time. For the full description of the skill, see the
[mif-validate reference](../../reference/skills/mif-validate/).

## Step 1 — Validate at a level

Pick the MIF level the document targets and run the validator:

```bash
node scripts/mif-validate.mjs your-doc.md --level 1
```

The level overlay layers required fields on top of the canonical schema: L1 is the
floor (`id` + `type` + `created`); **L2** additionally requires `namespace`,
`modified`, and `temporal`; **L3** additionally requires `provenance` and
`temporal.validFrom`. A `RESULT: VALID at MIF L<n>` line means the document is
schema-conformant and its round-trip is lossless.

## Step 2 — Read the failure when it fails

A non-zero exit names the cause: `1` is a schema, level, or round-trip failure; `2`
is a usage error (no file given). Schema failures print the exact JSON pointer that
broke, for example `/citations/0/citationRole must be equal to one of the allowed
values` — fix that field and re-run.

## Step 3 — Convert to JSON-LD

Project the document to its machine form. The converter schema-checks the input
first unless you pass `--no-check`:

```bash
node scripts/mif-convert.mjs emit-jsonld your-doc.md
```

## Step 4 — Confirm the round-trip is lossless

The round-trip is the heart of the "one artifact, two readers" guarantee: the
Markdown a person reads and the JSON-LD a parser resolves must carry the same
information both ways. Check it explicitly:

```bash
node scripts/mif-convert.mjs roundtrip your-doc.md
```

A `round-trip OK (lossless md<->jsonld)` line confirms no information is lost in
either direction.

## Step 5 — Skip the round-trip only when you must

If you are validating a fragment whose round-trip you do not need, pass
`--no-roundtrip` to `mif-validate` to check schema and level alone. Prefer the full
check for any document you ship — losslessness is what makes the two readers
equivalent. To author a document from scratch and then validate it, follow the
[validate-and-author how-to](../validate-and-author-a-document/).
