#!/usr/bin/env node
// planner-check.mjs — prove a doc-set recipe decomposes to REAL member skills and
// that its cross-link graph is link-complete (every cross-relationships[] target
// resolves to a member of the set). Demonstrates the doc-set-planner reconcile +
// validate stages without authoring documents.
//
//   node scripts/planner-check.mjs <recipe>   (or no arg to check all recipes)
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const RECIPES = join(ROOT, "skills", "doc-set-planner", "recipes");
const SKILLS = join(ROOT, "skills");

function checkRecipe(name) {
  const path = join(RECIPES, `${name}.json`);
  if (!existsSync(path)) throw new Error(`recipe not found: ${name}`);
  const recipe = JSON.parse(readFileSync(path, "utf8"));
  const memberSkills = recipe.members.map((m) => m.skill);
  const memberSet = new Set(memberSkills);
  const problems = [];

  // 1. every member skill exists as a real skill dir
  for (const s of memberSkills) {
    if (!existsSync(join(SKILLS, s, "SKILL.md"))) problems.push(`member skill missing: ${s}`);
  }
  // 2. link-complete: every cross-link from/to is a member of this set
  for (const link of recipe.crossLinks || []) {
    if (!memberSet.has(link.from)) problems.push(`cross-link 'from' not in set: ${link.from}`);
    if (!memberSet.has(link.to)) problems.push(`cross-link 'to' not in set: ${link.to}`);
  }
  return { name, members: memberSkills, links: (recipe.crossLinks || []).length, problems };
}

const arg = process.argv[2];
const names = arg
  ? [arg]
  : readdirSync(RECIPES).filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/, ""));

let failed = 0;
for (const n of names) {
  const r = checkRecipe(n);
  if (r.problems.length) {
    failed++;
    console.error(`recipe ${r.name}: INCOMPLETE`);
    for (const p of r.problems) console.error(`  - ${p}`);
  } else {
    console.log(`recipe ${r.name}: link-complete (${r.members.length} members, ${r.links} cross-links all resolve) -> [${r.members.join(", ")}]`);
  }
}
if (failed) process.exit(1);
console.log(`OK — ${names.length} recipe(s) decompose to real members and are link-complete.`);
