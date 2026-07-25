#!/usr/bin/env bash
# Deployt de Bicep-infrastructuur (Static Web App + custom domain + DNS CNAME)
# Vereist: az cli, ingelogd op een account met rechten op zowel de
# "XPRTZ Sponsorship 1" subscription als de subscription met de xprtz.dev DNS-zone.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INFRA_DIR="$SCRIPT_DIR/../infra"

APP_SUBSCRIPTION_ID="44f5a2fb-f796-470a-9e44-d22b0782b39d" # XPRTZ Sponsorship 1
LOCATION="westeurope"
DEPLOYMENT_NAME="keepscore-$(date +%Y%m%d%H%M%S 2>/dev/null || echo manual)"

echo "==> Zet actieve subscription op XPRTZ Sponsorship 1 ($APP_SUBSCRIPTION_ID)"
az account set --subscription "$APP_SUBSCRIPTION_ID"

echo "==> Valideer de Bicep-deployment"
az deployment sub validate \
  --location "$LOCATION" \
  --template-file "$INFRA_DIR/main.bicep" \
  --parameters "$INFRA_DIR/main.parameters.json"

echo "==> Start de deployment"
az deployment sub create \
  --name "$DEPLOYMENT_NAME" \
  --location "$LOCATION" \
  --template-file "$INFRA_DIR/main.bicep" \
  --parameters "$INFRA_DIR/main.parameters.json"

echo "==> Klaar. Gebruik scripts/deploy-app.sh om de content naar de static web app te uploaden."
