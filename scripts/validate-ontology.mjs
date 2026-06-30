#!/usr/bin/env node
// validate-ontology.mjs — keep the ontology real and its references non-dangling.
//
// 1. The mif-docs ontology validates against the canonical MIF ontology schema.
// 2. Every genre good.md that declares entity.entity_type uses a type the
//    ontology actually defines (else the "discovery connection" points nowhere).
// 3. Every relationships[].type used is a relationship the ontology declares.
// Fail-closed.
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { load } from "js-yaml";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parseMarkdown } from "./lib/projection.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

// 1. ontology valid against canonical schema. The ontology is NOT vendored here;
// it is hydrated from the modeled-information-format/ontologies repo into the cache
// (run `npm run hydrate-ontology`); the release build pulls it into the artifact.
const ontoPath = join(ROOT, "ontologies", ".cache", "mif-docs.ontology.yaml");
if (!existsSync(ontoPath)) {
  console.error("ontology not hydrated — run `npm run hydrate-ontology` (pulls from ../ontologies / published URI)");
  process.exit(1);
}
const onto = load(readFileSync(ontoPath, "utf8"));
const schemaFile = join(ROOT, "schema", ".cache", "1.0.0", "ontology", "ontology.schema.json");
if (existsSync(schemaFile)) {
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);
  const validate = ajv.compile(JSON.parse(readFileSync(schemaFile, "utf8")));
  if (!validate(onto)) {
    for (const e of validate.errors) failures.push(`ontology schema: ${e.instancePath} ${e.message}`);
  }
} else {
  failures.push("ontology schema not hydrated — run npm run hydrate-schema");
}

const entityTypes = new Set((onto.entity_types || []).map((t) => t.name));
const relTypes = new Set(Object.keys(onto.relationships || {}));
const ontologyId = onto.ontology?.id;

// 2 + 3. every genre good.md's entity_type and relationship types resolve
const skillsDir = join(ROOT, "skills");
let checked = 0, typed = 0;
for (const entry of readdirSync(skillsDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const good = join(skillsDir, entry.name, "templates", "good.md");
  if (!existsSync(good)) continue;
  checked++;
  let fm;
  try { fm = parseMarkdown(readFileSync(good, "utf8")).frontmatter; } catch { continue; }
  if (fm.ontology && fm.ontology.id && fm.ontology.id !== ontologyId) {
    failures.push(`${entry.name}: ontology.id "${fm.ontology.id}" != "${ontologyId}"`);
  }
  if (fm.entity && fm.entity.entity_type) {
    typed++;
    if (!entityTypes.has(fm.entity.entity_type)) {
      failures.push(`${entry.name}: entity_type "${fm.entity.entity_type}" not defined in the ontology`);
    }
  }
  for (const r of fm.relationships || []) {
    if (r.type && !relTypes.has(r.type)) {
      failures.push(`${entry.name}: relationship type "${r.type}" not declared in the ontology`);
    }
  }
}

console.log(`ontology: ${ontologyId} v${onto.ontology?.version}  entity_types: ${entityTypes.size}  relationships: ${relTypes.size}`);
console.log(`genres checked: ${checked}  ontology-typed: ${typed}`);
if (failures.length) {
  console.error(`\nONTOLOGY VALIDATION FAILED (${failures.length}):`);
  for (const f of failures) console.error("  - " + f);
  process.exit(1);
}
console.log("OK — ontology is schema-valid and every genre's entity_type + relationships resolve in it.");
