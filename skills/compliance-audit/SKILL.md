---
name: compliance-audit
description: Draft/model a compliance audit report shaped like a SOC 2 Type II controls report — auditor's-report framing, management's assertion, system description, in-scope criteria/framework, a mandatory tests-of-controls/findings matrix with severity, control gaps, remediation plan, and management response. This template reproduces the report STRUCTURE only and never issues, implies, or substitutes for an attestation, assurance, or audit opinion. Anti-trigger; for a penetration test's vulnerability findings use security-pentest, for a single immutable decision use adr.
argument-hint: "<the system, service, or scope being audited and the framework assessed against>"
---

# compliance-audit

Produces a **compliance audit report** in the shape of a SOC 2 Type II controls
report: scope and period, the criteria/framework assessed against, findings
with severity, control gaps, a remediation plan, and management's response.
Its center of gravity is the **tests-of-controls / findings matrix** — the
report is not conformant without a table that traces every control to a test
performed and a result or exception. This genre mirrors the AICPA SOC 2 Type
II report shape so a service organization can draft and model its controls
narrative and self-assess ahead of (or independent of) a formal audit. **It
produces a controls report draft, not an attestation** — the no-attestation
caveat below is the single load-bearing constraint this genre exists to
enforce.

## Pattern (industry: SOC 2 Type II-shaped compliance audit report)

1. **Independent Service Auditor's Report** — a modeled placeholder section
   framing the report's scope, the period covered, and the criteria applied.
   It is a DRAFT framing only: it must state plainly that no audit opinion is
   expressed and that no licensed CPA firm has performed an examination. Never
   write this as if an opinion were rendered.
2. **Management's Assertion** — the organization's own statement describing
   the system and asserting that controls were suitably designed (and, for a
   Type II shape, operated effectively) over the period. Each assertion ties
   to a cited finding.
3. **System Description** — the boundaries of the system across the five
   description components: **infrastructure**, **software**, **people**,
   **data**, and **processes**. Each component's claims cite their
   originating findings.
4. **Criteria / Framework Assessed Against** (Trust Services Criteria) — the
   criteria in scope. **Security** (the common criteria) is always present;
   **Availability**, **Processing Integrity**, **Confidentiality**, and
   **Privacy** are included only when the findings cover them. State
   explicitly which of the five are in scope and which are excluded.
5. **Tests of Controls & Findings (with Severity)** — the required matrix:
   each control, the test performed against it, and the result — a pass, or
   an exception/control gap rated by severity (e.g. critical / high / medium
   / low). Every row traces a control to a cited finding. Exceptions and
   control gaps are reported, never suppressed or softened.
6. **Remediation Plan** — for every control gap or exception in the matrix, a
   named remediation action, an owner, and a target date. A gap with no
   remediation entry is a defect.
7. **Other Information / Management's Response** — supplementary material
   outside the scope of the criteria, including management's response to each
   exception (concur / dispute, planned action, timeline). Clearly demarcated
   as not covered by any testing.

## Rules

- **No attestation. No assurance. No audit opinion. Ever.** A genuine SOC 2
  report is an **attestation engagement performed by a licensed CPA firm under
  AICPA attestation standards (SSAE 18)**. This harness is **not** a CPA firm,
  performs **no** examination, and issues **no** opinion. This template
  reproduces the report STRUCTURE and a controls/findings matrix and
  **nothing more**. The output MUST NOT state, imply, or be presented as an
  attestation, assurance, certification, or audit opinion. The Independent
  Service Auditor's Report section is a DRAFT placeholder that must say so in
  plain terms. Misrepresenting this output as an issued compliance audit is a
  defect of the highest severity.
- The tests-of-controls/findings matrix is mandatory, not optional matter —
  render it as a Markdown table (columns at minimum: Control, Test Performed,
  Result / Exception, Severity), never ASCII art or an image. A report
  without this matrix is not conformant.
- Every control, test, finding, and remediation item traces to a cited
  finding; no orphan controls, no uncited assertions.
- Report exceptions and control gaps honestly — a failed or partially-met
  control test is reported as an exception with its severity, never hidden or
  upgraded to "met".
- Every exception or control gap gets a Remediation Plan entry (action, owner,
  target date); a gap with no remediation entry is a defect.
- State which criteria are in scope and which are excluded; never imply
  coverage of a criterion the findings do not support.
- Surface findings whose verdict is weakened or inconclusive with an explicit
  annotation rather than hiding them. Exclude falsified findings from the
  matrix — a falsified claim may only appear in a methodology note describing
  why it was excluded, never as evidence for a control.
- **Exhaustive coverage**: build the report from the full surviving findings
  corpus — every surviving finding is treated with its own evidence, never
  condensed to a cherry-picked subset. A silently dropped finding is a defect.
- Any figure, chart, or diagram (e.g. a control or process flow) is a fenced
  `mermaid` code block — never ASCII art, an image link, or Graphviz/DOT.
- When citing the AICPA Trust Services Criteria or SSAE 18, anchor the
  edition at implementation time — verify the current AICPA TSC and
  attestation-standard editions live rather than baking a year into the
  report as settled fact.

## Anti-triggers — do not use this genre for

- **A penetration test's technical vulnerability findings** — that is
  `security-pentest` (or an equivalent vulnerability-assessment genre): scored
  by exploitability and CVSS, not mapped to a controls-vs-criteria matrix.
- **A single already-made, immutable decision with no controls matrix to
  show** — that is `adr` (Structured MADR): driver-and-outcome, no mandatory
  tests-of-controls table.
- **An operational step-by-step procedure** — that is `sre-runbook`: tactical
  incident response, not a periodic controls assessment against a named
  framework.

## MIF frontmatter

`type: semantic` — a compliance audit report is declarative controls-and-
evidence knowledge for a bounded period, not a step sequence. Climb to L2
with `namespace` (`compliance-audit/<area>`), `modified`, `title`, and `tags`
when the audit context supplies them. Gate every output with `mif-validate`
at its target level; the floor is `--level 1`.

## Why machine-readable

| Question an agent asks | Answered by (frontmatter) |
| --- | --- |
| Is this audit period still current? | `temporal.validFrom` / `ttl` |
| Where did the evidence come from; can I trust it? | `provenance` (W3C-PROV) + `citations[]` |
| What remediation or follow-up work realizes a fix for a gap? | typed `relationships[]` (`relates-to`, `realized-by`) |
| Which control results were tested vs. asserted, and at what severity? | `citations[]` tied to each matrix row + the entity's `entity_type` |

The same document still reads as a human compliance audit report and projects
losslessly to JSON-LD and back — one artifact, two readers.

## The L1 -> L3 climb

- `templates/good-l1.md` — **L1 floor**: `id`, `type`, `created` + body. A
  complete, valid report, but opaque to a machine consumer — it cannot be
  queried for "is this audit period still current?" or "where did the
  evidence come from?".
- `templates/good.md` — **L3 (highest this genre supports)**: adds
  `namespace`, `modified`, `temporal` validity, W3C-PROV `provenance`,
  `citations[]` tied to each matrix row, and a typed `relationships[]` graph
  (e.g. `relates-to` the remediation tracking issue). Validate with
  `mif-validate --level 3`.

Author at the **highest level the drafting context supports** (grade down
rather than fabricate). `templates/bad.md` shows the antipattern: a report
that states control results with no tests-of-controls/findings matrix to
support them.
