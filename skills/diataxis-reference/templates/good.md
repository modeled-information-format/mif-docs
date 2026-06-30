---
id: reference-mifx-export
type: semantic
created: 2026-06-29T10:00:00Z
namespace: reference/cli
title: "mifx export — command reference"
tags:
  - reference
  - cli
  - mifx
---

# mifx export

Serialise one or more MIF documents to a target format and write them to a
destination directory.

## Synopsis

```text
mifx export <path>... [--format <fmt>] [--out <dir>] [--level <n>]
                      [--manifest <file>] [--overwrite] [--quiet]
```

## Description

`mifx export` reads each MIF markdown document at `<path>`, projects it to the
canonical JSON-LD object, and writes a serialisation in the requested `--format`
to the `--out` directory. One input document produces one output file. The
command does not mutate input files. Validation is performed before serialisation;
a document that fails the requested `--level` floor is skipped and counted as an
error.

## Arguments

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `path` | path (variadic) | yes | One or more files or directories. Directories are searched non-recursively for `*.md`. At least one path must be supplied. |

## Options

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--format` | enum `jsonld` \| `json` \| `yaml` | `jsonld` | Output serialisation. `jsonld` emits canonical JSON-LD; `json` strips the `@context`; `yaml` emits the same object as YAML. |
| `--out` | path | `./dist` | Destination directory. Created if absent. |
| `--level` | integer `1` \| `2` \| `3` | `1` | MIF level floor each document must meet to be exported. |
| `--manifest` | path | none | If set, write a JSON manifest of exported files to this path. |
| `--overwrite` | boolean flag | `false` | Overwrite existing output files. When `false`, an existing target is an error. |
| `--quiet` | boolean flag | `false` | Suppress the per-file progress line; errors are still written to stderr. |

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | All input documents exported successfully. |
| `1` | One or more documents failed validation or could not be written. |
| `2` | Usage error (no path given, unknown flag, invalid `--format`). |

## Environment variables

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `MIFX_SCHEMA_DIR` | path | bundled schema | Directory of the hydrated MIF schema used for validation. |
| `NO_COLOR` | presence | unset | When set, progress output contains no ANSI colour codes. |

## Files

| Path | Access | Description |
| --- | --- | --- |
| `<out>/<id>.<ext>` | written | One serialised document per input, named by its `id`. |
| `<manifest>` | written | Present only when `--manifest` is supplied. |

## Examples

Export a single document as JSON-LD to `./dist`:

```text
mifx export docs/policy.md
```

Export a directory as YAML at level 2, writing a manifest:

```text
mifx export docs/ --format yaml --level 2 --manifest dist/manifest.json
```
