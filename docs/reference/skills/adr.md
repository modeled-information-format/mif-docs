---
id: reference-skill-adr
type: semantic
created: '2026-06-30T12:00:00Z'
modified: '2026-06-30T12:00:00Z'
namespace: reference/skills
title: 'Skill reference: adr'
tags:
  - reference
  - mif-docs
  - skill
  - adr
  - madr
temporal:
  '@type': TemporalMetadata
  validFrom: '2026-06-30T00:00:00Z'
  recordedAt: '2026-06-30T12:00:00Z'
  ttl: P1Y
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
    - '@id': urn:mif:skill:adr
      '@type': prov:Entity
citations:
  - '@type': Citation
    citationType: specification
    citationRole: methodology
    title: MADR — Markdown Architectural Decision Records (4.0.0)
    url: https://adr.github.io/madr/
    accessed: '2026-06-30'
  - '@type': Citation
    citationType: article
    citationRole: background
    title: Architectural Decision Records — the ADR community and organization
    url: https://adr.github.io/
    accessed: '2026-06-30'
  - '@type': Citation
    citationType: tool
    citationRole: source
    title: 'mif-docs — adr skill (SKILL.md)'
    url: https://github.com/modeled-information-format/mif-docs-plugin/tree/main/skills/adr
relationships:
  - type: relates-to
    target: urn:mif:reference-skills-by-purpose
  - type: relates-to
    target: urn:mif:reference-skill-rust-rfc
  - type: relates-to
    target: urn:mif:reference-skill-python-pep
ontology:
  '@type': OntologyReference
  id: mif-docs
  version: 1.0.0
  uri: https://mif-spec.dev/ontologies/mif-docs
entity:
  name: 'Skill reference: adr'
  entity_type: reference-document
extensions:
  x-skill: adr
  x-genre-conceptType: semantic
  x-target-level: 3
  x-purpose-group: decisions-proposals
---

# Skill reference: `adr`

The `adr` skill authors one document genre: an **Architectural Decision Record**
in the MADR (Markdown Architectural Decision Records) format — a single,
consequential, hard-to-reverse decision captured with its drivers, the options
weighed, the chosen outcome, and the consequences accepted. This reference
describes what that document type is, how the skill produces one, when it earns
its place, and the provenance and sources behind it.

| Property | Value |
| --- | --- |
| Authors | An Architectural Decision Record in MADR format |
| Purpose group | Decisions & proposals |
| MIF `conceptType` | `semantic` |
| Target MIF level | 3 |
| Primary source | [MADR 4.0.0](https://adr.github.io/madr/) |

## What this document type is

An ADR records one architecturally significant decision: a choice that is costly
to change, shapes structure or dependencies, or constrains future work. The skill
authors it natively in the **MADR open standard**, the lightweight Markdown
template maintained by the ADR community. A MADR document names the decision in
its title, then states the **context and problem statement**, the **decision
drivers** (the forces that matter), the **considered options**, the **decision
outcome** with its justification, and the **consequences** — both the good and the
bad that follow from the choice. Richer MADR variants add per-option pros and cons
and confirmation criteria, and a status that moves an accepted decision through its
lifecycle (proposed, accepted, deprecated, superseded).

An ADR is therefore *not* a how-to guide (use [diataxis-how-to](../diataxis-how-to/)
for task steps) and *not* a requirements document (use [prd](../prd/) or
[feature-spec](../feature-spec/) for what to build). It is also distinct from a
forward-looking proposal seeking consensus *before* a choice is made: a
[rust-rfc](../rust-rfc/) or [python-pep](../python-pep/) argues a design open for
debate, whereas an ADR records a decision and the reasoning that produced it so
future readers understand *why*.

## How the skill produces one

`adr` is a genre skill: it carries the MADR pattern as durable instructions plus
exemplars, and writes the artifact over a MIF floor so the result is at once a
human-readable record and a machine-conformant unit.

- **Pattern, made operational.** The skill encodes the MADR sections — context,
  drivers, options-with-risk, outcome, consequences, audit trail — and refuses
  anti-triggered work, redirecting how-to and requirements requests to the right
  sibling.
- **Exemplars set the bar.** Like every genre in the suite it ships `good-l1.md`
  (the MIF Level-1 floor), `good.md` (the Level-3 target), `bad.md` (a
  counter-example), and `evals/evals.json`. The `check-exemplars` gate proves
  `good-l1.md` validates at L1 and `good.md` at L3, so the pattern the skill teaches
  is itself continuously verified.
- **MIF projection.** The ADR is authored with MIF frontmatter (via the shared
  `mif-frontmatter` substrate) and a `conceptType` of `semantic`, reflecting that an
  ADR is declarative knowledge about a decision rather than a sequence of steps.
  `mif-validate` proves the Markdown ↔ JSON-LD round-trip is lossless before the
  document is considered done.

## When it is beneficial

Reach for `adr` when a team makes or captures a decision that is **consequential
and hard to reverse** — a datastore choice, a service boundary, a protocol, a
build-vs-buy call — and needs the rationale on record for the engineers who arrive
later and ask "why is it this way?" A decision log of MADR records turns tacit
architectural memory into durable, searchable knowledge and prevents the same
debate from recurring.

Do **not** write an ADR for a small or easily reversed change (a plain issue
suffices), for end-user task instructions (a how-to), or for requirements that
describe *what* to build rather than *which* design was chosen. When the decision is
still open and you want written consensus before committing, an RFC or PEP is the
better instrument; the ADR is the artifact you write once the choice is settled.

## Example

An ADR titled *"Use event-driven messaging between order and inventory services"*
opens with the context — synchronous calls were coupling deploys and causing
cascading timeouts — lists decision drivers (decoupling, resilience, operational
familiarity), weighs the options (direct HTTP, shared database, a message broker)
with the risks of each, then records the outcome: a broker, accepted because it
decouples deploys at the cost of new operational surface. The consequences section
states the tradeoff plainly, and the status marks it accepted with a date.

## Provenance & citations

- **Genre source — MADR:** the canonical Markdown Architectural Decision Records
  template, <https://adr.github.io/madr/>, maintained within the broader ADR
  community and organization, <https://adr.github.io/>.
- **Skill provenance:** authored by the `adr` skill in the mif-docs plugin,
  <https://github.com/modeled-information-format/mif-docs-plugin>; the skill's
  exemplars and `evals/` define and verify the pattern.
- **MIF conformance:** the document projects to canonical JSON-LD under the MIF
  specification, <https://mif-spec.dev>, and is proven lossless by `mif-validate`.
- **Index:** this skill is one entry in the [skills by purpose](../../skills-by-purpose/)
  catalog; its sibling decisions-and-proposals genres are
  [rust-rfc](../rust-rfc/) and [python-pep](../python-pep/).
