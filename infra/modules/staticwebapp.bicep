@description('Naam van de Azure Static Web App')
param appName string

@description('Regio van de static web app')
param location string

@description('SKU van de static web app')
param sku string

resource staticSite 'Microsoft.Web/staticSites@2024-04-01' = {
  name: appName
  location: location
  sku: {
    name: sku
    tier: sku
  }
  properties: {}
}

output name string = staticSite.name
output defaultHostname string = staticSite.properties.defaultHostname
output id string = staticSite.id
