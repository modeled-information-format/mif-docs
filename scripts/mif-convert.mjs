#!/usr/bin/env node
// mif-convert.mjs — project a MIF doc to EITHER output, both directions.
//
//   mif-convert emit-jsonld   <doc.md>            markdown  -> JSON-LD (stdout)
//   mif-convert emit-markdown  <doc.json|.jsonld>  JSON-LD   -> markdown (stdout)
//   mif-convert roundtrip      <doc.md|.json>      verify md<->jsonld is lossless
//
// emit-markdown schema-checks the JSON-LD first (the canonical form is the one
// the JSON Schema checks), then projects to markdown.
import { readFileSync } from "node:fs";
import {
  parseMarkdown, toJsonld, toMarkdown, serializeMarkdown,
  roundTripFromMarkdown, roundTripFromJsonld, loadValidator,
} from "./lib/projection.mjs";

const [cmd, file, ...rest] = process.argv.slice(2);
if (!cmd || !file) {
  console.error("usage: mif-convert <emit-jsonld|emit-markdown|roundtrip> <file>");
  process.exit(2);
}

function isJson(p) { return /\.jsonl?d?$|\.json$/.test(p); }

try {
  if (cmd === "emit-jsonld") {
    const jsonld = toJsonld(parseMarkdown(readFileSync(file, "utf8")));
    process.stdout.write(JSON.stringify(jsonld, null, 2) + "\n");
  } else if (cmd === "emit-markdown") {
    const jsonld = JSON.parse(readFileSync(file, "utf8"));
    if (!rest.includes("--no-check")) {
      const { validate, resolvedVersion } = loadValidator();
      if (!validate(jsonld)) {
        console.error(`JSON Schema check FAILED (schema ${resolvedVersion}):`);
        for (const e of validate.errors) console.error(`  - ${e.instancePath || "(root)"} ${e.message}`);
        process.exit(1);
      }
    }
    const { frontmatter, body } = toMarkdown(jsonld);
    process.stdout.write(serializeMarkdown(frontmatter, body));
  } else if (cmd === "roundtrip") {
    const text = readFileSync(file, "utf8");
    const r = isJson(file) ? roundTripFromJsonld(JSON.parse(text)) : roundTripFromMarkdown(text);
    if (r.lossless) {
      console.log(`round-trip OK (lossless md<->jsonld): ${file}`);
    } else {
      console.error(`round-trip FAILED (information lost): ${file}`);
      process.exit(1);
    }
  } else {
    console.error(`unknown command: ${cmd}`);
    process.exit(2);
  }
} catch (e) {
  console.error(`mif-convert: ${e.message}`);
  process.exit(1);
}
