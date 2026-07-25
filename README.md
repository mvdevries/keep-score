# Keep Score

Een simpel, snel scorebord voor bordspellen en kaartspellen — bijhouden wie er
voor staat, een timer, dobbelstenen en een kiezer om te bepalen wie begint.

Live op **https://keepscore.xprtz.dev**

## Functies

- **Spellen**: houd de score bij van meerdere spelers, met rondes, levels en
  een winscore/doel.
- **Templates**: bewaar een opstelling van spelers en instellingen om snel
  een nieuw spel te starten.
- **Historie**: eindstanden van afgelopen spellen terugkijken.
- **Tools**:
  - **Timer** — aftellen met een instelbare duur.
  - **Dobbelen** — 1 tot 6 dobbelstenen gooien.
  - **Kiezer** — leg tot 5 vingers tegelijk op het scherm; zodra er even
    niemand meer bijkomt, kiest de app er willekeurig één uit.

De hele app is één static HTML-bestand zonder build-stap of externe
dependencies (de iconen zijn inline SVG's van [Lucide](https://lucide.dev)).

## Installeren op je telefoon

Open de site in Safari (iOS) of Chrome (Android) en kies **Zet op beginscherm**
/ **App installeren**. Keep Score heeft een eigen icoon en start als
volwaardige app zonder browserbalk.

## Project structuur

```
app/                  de static web app (index.html + manifest + icons)
infra/                Bicep-infrastructuur voor Azure Static Web Apps
  main.bicep          top-level deployment (subscription scope)
  modules/            static web app, custom domain, DNS CNAME
scripts/
  deploy-infra.sh      valideert en deployt de Bicep-infrastructuur
  deploy-app.sh        uploadt app/ naar de bestaande Static Web App
```

## Deployen

De infrastructuur draait in Azure (subscription "XPRTZ Sponsorship 1") als
een Azure Static Web App, met een custom domain (`keepscore.xprtz.dev`) dat
verwijst naar een DNS-zone in een andere subscription.

```bash
./scripts/deploy-infra.sh   # eenmalig: resource group, static web app, custom domain, DNS
./scripts/deploy-app.sh     # content uploaden na elke wijziging in app/
```
