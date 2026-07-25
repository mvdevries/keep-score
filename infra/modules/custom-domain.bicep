@description('Naam van de bestaande static web app')
param staticSiteName string

@description('Volledige custom domain naam, bv. keepscore.xprtz.dev')
param domainName string

resource staticSite 'Microsoft.Web/staticSites@2024-04-01' existing = {
  name: staticSiteName
}

resource customDomain 'Microsoft.Web/staticSites/customDomains@2024-04-01' = {
  parent: staticSite
  name: domainName
  properties: {
    validationMethod: 'cname-delegation'
  }
}
