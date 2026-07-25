targetScope = 'subscription'

@description('Naam van de resource group voor de static web app')
param resourceGroupName string = 'rg-keepscore'

@description('Naam van de Azure Static Web App')
param appName string = 'keepscore'

@description('Regio van de static web app')
param location string = 'westeurope'

@description('SKU van de static web app')
@allowed([
  'Free'
  'Standard'
])
param sku string = 'Free'

@description('Volledige custom domain naam, bv. keepscore.xprtz.dev')
param customDomainName string = 'keepscore.xprtz.dev'

@description('Subscription id waar de DNS-zone (xprtz.dev) staat')
param dnsSubscriptionId string = '92f4e2a9-8f0a-4ecc-90fc-6c77c24a1b31'

@description('Resource group van de DNS-zone')
param dnsResourceGroupName string = 'rg-xprtzbv-infrastructure'

@description('Naam van de DNS-zone')
param dnsZoneName string = 'xprtz.dev'

@description('Record-naam binnen de DNS-zone (het subdomain-deel voor customDomainName)')
param dnsRecordName string = 'keepscore'

resource rg 'Microsoft.Resources/resourceGroups@2024-03-01' = {
  name: resourceGroupName
  location: location
}

module site 'modules/staticwebapp.bicep' = {
  name: 'deploy-staticwebapp'
  scope: rg
  params: {
    appName: appName
    location: location
    sku: sku
  }
}

module dnsRecord 'modules/dns-cname.bicep' = {
  name: 'deploy-dns-cname'
  scope: resourceGroup(dnsSubscriptionId, dnsResourceGroupName)
  params: {
    dnsZoneName: dnsZoneName
    recordName: dnsRecordName
    cnameValue: site.outputs.defaultHostname
  }
}

module customDomain 'modules/custom-domain.bicep' = {
  name: 'deploy-custom-domain'
  scope: rg
  params: {
    staticSiteName: site.outputs.name
    domainName: customDomainName
  }
  dependsOn: [
    dnsRecord
  ]
}

output staticSiteName string = site.outputs.name
output defaultHostname string = site.outputs.defaultHostname
output customDomain string = customDomainName
