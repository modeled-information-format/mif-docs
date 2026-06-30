---
title: mif-docs
description: A Claude Code documentation skill suite — one skill per document genre over a MIF Level-1 floor, every doc both human-readable and machine-conformant.
template: splash
hero:
  tagline: One skill per document genre. Every doc, two readers — written once, read by a person and a parser.
  actions:
    - text: Get started
      link: tutorials/getting-started/
      icon: right-arrow
    - text: One artifact, two readers
      link: explanation/one-artifact-two-readers/
      variant: minimal
---

## Every document, two readers

Each genre skill writes a document in its native industry pattern over a MIF
floor: the same artifact is a human-readable doc and a machine-conformant unit
that projects losslessly to canonical JSON-LD.

```mermaid
graph LR
  doc["genre doc<br/>adr · runbook · tutorial · reference"] --> md["Markdown<br/>a person reads"]
  doc --> ld["JSON-LD<br/>a parser resolves"]
  md <-->|lossless round-trip| ld
```

Browse the suite's own documentation — itself authored with these skills and
validated by `mif-validate`: the [tutorial](tutorials/getting-started/), the
[genre &amp; CLI reference](reference/genre-and-cli-catalog/), the
[architecture](architecture/arc42/), and the [decision records](adr/).
