---
name: diataxis-how-to
description: Write a Diataxis how-to guide — a task-oriented recipe that walks a competent user through accomplishing one real, already-understood goal, start to finish. Use when the user knows what they want to do and needs the steps, not learning or background. Anti-trigger; for a beginner learning by doing use diataxis-tutorial, for looking up facts use diataxis-reference.
---

# diataxis-how-to

Produces a **how-to guide** in the Diataxis sense: *task-oriented*. The reader is
already competent and has a specific goal in mind; success is that the goal is
accomplished. A how-to is not a tutorial (it does not teach) and not reference
(it does not catalog) and not explanation (it does not theorize) — keep those
modes out.

## Pattern (industry: Diataxis, diataxis.fr)

1. **Title** — states the goal directly: "How to <accomplish X>".
2. **Context line** — one or two sentences naming when/why you'd do this.
3. **Prerequisites** — the concrete starting state and access the task assumes.
4. **Numbered action steps** — an ordered sequence of real commands/actions that
   move from the starting state to the goal. Each step does one thing.
5. **Completion** — a short line confirming the goal is now met. Stop there.

## Rules that keep it a how-to

- Assume competence. Do not teach concepts or define terms — link out instead.
- No theory, background, or "why it works" prose — that is an explanation doc.
- Serve the user's one goal; do not document every flag or option — that is
  reference. Pick the path that accomplishes the task.
- Real, runnable commands — no `TODO`, no `<your-value-here>` left unexplained.
- End at task completion. No "next you could also…" tours.

## MIF frontmatter

`type: procedural` (a how-to is a procedure). Climb to L2 with `namespace`,
`tags`, `title` when known. Gate every output with `mif-validate --level 1`.

See `templates/good.md` (a conformant how-to) and `templates/bad.md` (a how-to
that has drifted into tutorial hand-holding and theory dumps — the most common
error).
