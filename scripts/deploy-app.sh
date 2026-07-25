#!/usr/bin/env bash
# Uploadt de statische content uit de app-map naar de bestaande Azure Static Web App.
# Vereist: az cli + npx (Node.js), en dat scripts/deploy-infra.sh al is uitgevoerd.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$SCRIPT_DIR/../app"

APP_SUBSCRIPTION_ID="44f5a2fb-f796-470a-9e44-d22b0782b39d" # XPRTZ Sponsorship 1
RESOURCE_GROUP_NAME="rg-keepscore"
STATIC_SITE_NAME="keepscore"

echo "==> Zet actieve subscription op XPRTZ Sponsorship 1 ($APP_SUBSCRIPTION_ID)"
az account set --subscription "$APP_SUBSCRIPTION_ID"

echo "==> Haal deployment token op"
DEPLOYMENT_TOKEN=$(az staticwebapp secrets list \
  --name "$STATIC_SITE_NAME" \
  --resource-group "$RESOURCE_GROUP_NAME" \
  --query "properties.apiKey" -o tsv)

echo "==> Upload de content in $APP_DIR naar de static web app"
npx --yes @azure/static-web-apps-cli deploy "$APP_DIR" \
  --deployment-token "$DEPLOYMENT_TOKEN" \
  --env production

echo "==> Klaar. De site is bereikbaar op de default hostname en op https://keepscore.xprtz.dev zodra de DNS/validatie rond is."
