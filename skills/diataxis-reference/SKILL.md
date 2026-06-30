---
name: diataxis-reference
description: Write a Diataxis reference — a dry, information-oriented, exhaustive description of ONE thing (a CLI command, config file, API endpoint, or schema) whose structure mirrors the thing itself. Use when the user needs lookup material they consult, not read through. Anti-trigger; for learning by doing use diataxis-tutorial, for accomplishing a known task use diataxis-how-to.
---

# diataxis-reference

Produces a **reference** in the Diataxis sense: *information-oriented*. The reader
already knows what they are doing and has arrived to look one fact up — a flag's
default, a field's type, an endpoint's status codes. Reference is neutral and
exhaustive; it is not a tutorial (learning-oriented) and not an explanation
(understanding-oriented) — keep those modes out.

## Pattern (industry: Diataxis, diataxis.fr)

1. **Subject line** — one neutral sentence naming the single thing described
   (one command, one file, one endpoint, one schema).
2. **Synopsis / shape** — the canonical signature or structure (a usage line, a
   skeleton config block, a request template) the rest mirrors.
3. **Itemised body** — every item described uniformly. For each: **name, type,
   default, constraints, description**. Use tables or definition lists so the
   layout is identical for every entry.
4. **Boundary facts** — the dry edges: exit codes, status codes, environment
   variables, files read/written, limits. Tabulate; do not narrate.
5. **Examples** — minimal, literal invocations or payloads. Show *what*, never a
   guided *how*.

## Rules that keep it a reference

- Describe, do not instruct. No numbered learning steps, no "first… then…".
- State facts, not opinions or rationale. No "why", no "we recommend", no
  "best practice" — link to an explanation doc for that.
- Be exhaustive and uniform: every item gets the same fields in the same order.
  A missing default is `none` or `—`, never silence.
- Mirror the structure of the thing. The doc's section order matches the thing's
  own order (argument order, field order, endpoint order).
- Stay consistent and predictable: same table columns throughout, same wording
  for "required", same type vocabulary.

## MIF frontmatter

`type: semantic` (declarative knowledge — facts that are true independent of any
task or moment). Climb to L2 with `namespace` (e.g. `reference/cli`), `tags`, and
`title` when known. Gate every output with `mif-validate --level 1`.

See `templates/good.md` (a conformant CLI command reference) and
`templates/bad.md` (a reference that has drifted into tutorial/explanation mixing
— the most common error).
