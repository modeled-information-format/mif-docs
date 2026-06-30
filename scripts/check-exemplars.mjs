#!/usr/bin/env node
// check-exemplars.mjs — enforce the L1-floor + highest-level convention.
// For each genre in tests/level-targets.json: good-l1.md must validate at L1 and
// good.md must validate at the genre's target level. Fail-closed.
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const targets = JSON.parse(readFileSync(join(ROOT, "tests", "level-targets.json"), "utf8")).targets;
const validator = join(ROOT, "scripts", "mif-validate.mjs");

function validate(file, level) {
  try {
    execFileSync("node", [validator, file, "--level", String(level)], { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

let failed = 0;
const rows = [];
for (const [skill, target] of Object.entries(targets)) {
  const l1 = join(ROOT, "skills", skill, "templates", "good-l1.md");
  const top = join(ROOT, "skills", skill, "templates", "good.md");
  const l1ok = existsSync(l1) && validate(l1, 1);
  const topok = existsSync(top) && validate(top, target);
  if (!l1ok || !topok) failed++;
  rows.push(`  ${skill.padEnd(22)} good-l1@L1: ${existsSync(l1) ? (l1ok ? "PASS" : "FAIL") : "MISSING"}   good@L${target}: ${existsSync(top) ? (topok ? "PASS" : "FAIL") : "MISSING"}`);
}
console.log(`exemplar climb check (${Object.keys(targets).length} genres):`);
for (const r of rows) console.log(r);
if (failed) {
  console.error(`\n${failed} genre(s) do not yet ship a valid L1 floor + target-level exemplar.`);
  process.exit(1);
}
console.log(`\nOK — every genre ships good-l1.md (L1) and good.md at its target level.`);
