---
name: example-auto-memory
description: an auto-memory file whose only type is nested under metadata, not a MIF conceptType
metadata:
  node_type: memory
  type: reference
---

This is an auto-memory note, not a MIF genre document. The guard must leave it
alone even though `metadata.type` happens to be `reference`.
