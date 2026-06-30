---
name: sre-runbook
description: Write an SRE operational runbook — a tactical, step-by-step procedure an on-call responder follows to detect, diagnose, and remediate ONE specific alert or failure condition under pressure. Use when the user needs incident-response content for a named alert/symptom (latency SLO burn, queue backlog, replica lag). Anti-trigger; for strategic, multi-incident response design write a playbook, and for a learning lesson use diataxis-tutorial.
---

# sre-runbook

Produces an **operational runbook**: a *tactical* procedure scoped to one
alert/condition, written for an on-call engineer acting under time pressure. It
answers "this page just fired — what exactly do I do?" with copy-pasteable
commands and explicit decision points.

A runbook is **tactical**, not strategic. Contrast: a *playbook* is strategic —
it coordinates the broader response (comms, roles, multi-team escalation) across
a class of incidents. A runbook is the narrow, executable fix for one named
condition. Keep strategy out; link to the playbook instead.

## The "5 A's" quality frame

Every section is judged against five properties:

- **Actionable** — concrete commands and decisions, never "investigate the issue".
- **Accurate** — commands are correct and current; thresholds match the real SLO.
- **Authoritative** — it is the single source of truth for this alert; owner named.
- **Accessible** — findable, readable at 3 a.m., no tribal knowledge assumed.
- **Adaptable** — versioned and dated so it tracks the system as it changes.

## Pattern (seven canonical sections, in order)

1. **Overview** — the service this covers and the one alert/condition it handles.
2. **Prerequisites & Access** — tools, credentials, roles, and dashboards needed
   *before* you start. Get access blockers out of the way first.
3. **Detection** — the firing alert, observable symptoms, and the dashboards/
   queries that confirm it. State the SLO/threshold being breached.
4. **Diagnosis** — ordered triage steps that narrow root cause. Each step is a
   command plus how to read its output.
5. **Remediation** — the numbered, step-by-step fix. Each step has an expected
   result so the responder can confirm it worked before moving on.
6. **Escalation** — who to page, when (explicit trigger conditions), and how.
7. **Verification & Rollback** — confirm the alert is clear and the SLO is
   recovering; and the exact steps to undo the remediation if it made things
   worse.

## Rules that keep it a runbook

- Tactical scope: one alert, one happy path to recovery. No incident-management
  theory, no postmortem.
- Every action is runnable as written — real commands, real dashboard names.
  No `TODO`, no "investigate as appropriate".
- Detection states a measurable trigger; Remediation states an expected result;
  Verification has an explicit pass condition AND a rollback. Never ship a
  remediation you cannot undo.
- Escalation names a role/rotation and a concrete trigger, not "if it's bad".

## MIF frontmatter

`type: procedural` (a how-to executed under pressure). Climb to L2 with
`namespace` (e.g. `runbook/<service>`), `tags`, `title` when known; add
`modified`/`temporal` when a review cadence exists. Gate every output with
`mif-validate --level 1`.

See `templates/good.md` (a conformant runbook for an API p99 latency SLO burn)
and `templates/bad.md` (a runbook with vague triage, no detection criteria, and
no rollback — the failure modes that get people paged twice).
