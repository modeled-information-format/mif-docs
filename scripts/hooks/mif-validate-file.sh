#!/usr/bin/env bash
# Maps a staged/tracked doc path to its required MIF level and validates it.
# Mirrors the level mapping in .github/workflows/ci.yml's "validate" job.
set -euo pipefail

f="$1"

case "$f" in
  skills/adr/templates/good.md)
    # adr is exempt: aligned to structured-MADR, validated by the adr-smadr CI job instead.
    exit 0
    ;;
  skills/*/templates/good.md)
    level=1
    ;;
  docs/adr/*.md|docs/architecture/*.md|docs/runbooks/*.md|docs/reference/*.md|docs/explanation/*.md)
    level=3
    ;;
  docs/tutorials/*.md|docs/how-to/*.md|CHANGELOG.md)
    level=2
    ;;
  *)
    exit 0
    ;;
esac

[ -f "$f" ] || exit 0
node scripts/mif-validate.mjs "$f" --level "$level"
