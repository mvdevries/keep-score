#!/usr/bin/env bash
# Draait de end-to-end tests. De testopstelling staat volledig in tests/ met een
# eigen package.json; de app zelf blijft zonder dependencies en zonder buildstap.
# Eerste keer: scripts/test.sh --install
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/../tests"

if [[ "${1:-}" == "--install" ]]; then
  echo "==> Installeer testdependencies en browsers"
  npm install
  npx playwright install chromium webkit
  shift
fi

if [[ ! -d node_modules ]]; then
  echo "Geen node_modules gevonden. Draai eerst: scripts/test.sh --install" >&2
  exit 1
fi

npm test -- "$@"
