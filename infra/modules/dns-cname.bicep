@description('Naam van de bestaande DNS-zone, bv. xprtz.dev')
param dnsZoneName string

@description('Naam van het CNAME-record binnen de zone, bv. keepscore')
param recordName string

@description('Waarde waar het CNAME-record naar wijst, bv. de default hostname van de static web app')
param cnameValue string

resource dnsZone 'Microsoft.Network/dnsZones@2018-05-01' existing = {
  name: dnsZoneName
}

resource cname 'Microsoft.Network/dnsZones/CNAME@2018-05-01' = {
  parent: dnsZone
  name: recordName
  properties: {
    TTL: 3600
    CNAMERecord: {
      cname: cnameValue
    }
  }
}
