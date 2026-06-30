# mif-docs

A **standalone Claude Code plugin** that ships **one skill per concrete document
genre**, each adopting the primary industry pattern for its genre over a **MIF
(Modeled Information Format) Level-1 floor that climbs to L2/L3 when the drafting
context supplies the detail**.

Every document the suite produces is *both* a human-readable artifact in its
native genre *and* a MIF-conformant unit: structured frontmatter that projects to
the canonical JSON-LD and validates fail-closed against
`https://mif-spec.dev/schema/`.

## What's inside

| Layer | Skills |
| --- | --- |
| **Genre skills** | `diataxis-tutorial`, `diataxis-how-to`, `diataxis-reference`, `diataxis-explanation`, `arc42-arch-doc`, `c4-model-diagram`, `google-design-doc`, `adr`, `rust-rfc`, `python-pep`, `changelog`, `sre-runbook`, `playbook`, `prd`, `feature-spec`, `ai-architecture-doc`, `kiro-requirements`, `kiro-design`, `kiro-tasks` |
| **Shared substrate** | `mif-frontmatter` (L1–L3 authoring), `ears-acceptance-criteria`, `mif-validate` (deterministic canonical-schema gate) |
| **Orchestration** | `doc-set-planner` (engine) + the `diataxis` / `ai-spec` / `kiro` / `architecture` recipes |

## MIF conformance

`mif-validate` is deterministic: it parses a document's YAML frontmatter, projects
it to the MIF JSON-LD object, and validates with `ajv` (+ `ajv-formats`) against
the **canonical** schema at `mif-spec.dev` — no LLM judgment in the conformance
path. Level floors (`--level 1|2|3`) layer an original required-field overlay over
the canonical core. Identical input + identical resolved schema → identical
verdict.

The bundled schema is a refreshable **cache**, never the authority: it
auto-hydrates from `mif-spec.dev/schema` and records the resolved version in
`schema/VENDOR.lock`. Offline, it falls back to the last hydrated copy and warns.

## Quickstart

```bash
npm ci
npm run hydrate-schema          # fetch canonical MIF schema -> schema/.cache
npm run mif-validate -- path/to/doc.md --level 1
npm run validate-plugin         # structural check of plugin.json + every SKILL.md
npm run lint:md                 # markdownlint-cli2
```

## License

MIT.
