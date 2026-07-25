# Keep Score — verslag van de eerste sessie

Dit document vat samen wat er in de allereerste bouw-sessie van Keep Score is
gebeurd: van een los HTML-bestand op het bureaublad tot een live PWA op
`keepscore.xprtz.dev`, inclusief offline-ondersteuning.

## Startpunt

Er was één bestand: `keepscore.html`, een kant-en-klaar scorebord (spellen
bijhouden, timer, dobbelstenen, een kiezer) zonder infrastructuur, zonder git,
zonder deployment.

## 1. Projectstructuur en infrastructuur

- Herschikt naar `app/` (de site), `infra/` (Bicep) en `scripts/` (deploy-cli's).
- `<title>` aangepast naar "Keep Score".
- Bicep-deployment geschreven (`infra/main.bicep` + modules) die in één
  subscription-scoped deployment:
  - een resource group + Azure Static Web App aanmaakt in **XPRTZ
    Sponsorship 1**;
  - een CNAME-record `keepscore` aanmaakt in de bestaande `xprtz.dev`
    DNS-zone, die in een **andere** subscription staat (cross-subscription
    module met een expliciete `resourceGroup(subscriptionId, rgName)` scope);
  - de custom domain `keepscore.xprtz.dev` koppelt via cname-delegation
    validatie.
- `scripts/deploy-infra.sh` (valideert + deployt de Bicep) en
  `scripts/deploy-app.sh` (upload `app/` naar de Static Web App via de SWA
  CLI) toegevoegd.
- Git-repo geïnitialiseerd, later gepubliceerd als publieke GitHub-repo
  `mvdevries/keep-score`.
- Infra gedeployed en site geverifieerd bereikbaar op zowel het
  default-hostname als `keepscore.xprtz.dev`.

## 2. Kiezer 2 — multitouch fingerpicker

Nieuwe tool gebouwd naast de bestaande (naam-gebaseerde) kiezer: leg tot 5
vingers tegelijk op het scherm, elk met een draaiende ring; na een korte
stilte (geen nieuwe vinger meer) kiest de app willekeurig een winnaar, die
opgelicht blijft terwijl de rest dooft.

Onderweg gevonden en opgelost:
- **"Springt naar de hoek"-bug**: de CSS-animatie van de winnaar zette
  `transform: scale()` op hetzelfde element als de positionering
  (`transform: translate()`), waardoor de positie werd overschreven zodra
  iemand gekozen werd. Fix: positie en animatie op gescheiden elementen.
- Cirkels vergroot, en niet-gekozen vingers behouden hun eigen kleur
  (gedimd) in plaats van neutraal grijs te worden.
- Touch-handlers omgezet naar gewone index-loops i.p.v. `for..of` over
  `TouchList`, voor bredere compatibiliteit.
- Getest met een headless browser en synthetische multitouch-events
  (`TouchEvent`/`Touch`) — meerdere vingers tegelijk, vroeg loslaten, bewegen,
  de limiet van 5, en automatisch resetten bij een nieuwe aanraking.

Later is de **oude kiezer volledig verwijderd** (dode code, CSS en icoon
opgeruimd) en heeft Kiezer 2 zijn plek en naam ("Kiezer") overgenomen.

## 3. PWA: icoon, manifest, "zet op beginscherm"

- Eigen app-icoon ontworpen (groene gradient + trophy-logo, later verfijnd
  met een diepere gradient, glow en schaduw) en gegenereerd in alle
  benodigde formaten (`favicon-32`, `icon-192`, `icon-512`,
  `apple-touch-icon`).
- `manifest.json` + bijbehorende `<meta>`/`<link>`-tags toegevoegd
  (`apple-mobile-web-app-capable`, thema-kleuren voor light/dark, etc.), zodat
  de site op iOS/Android als volwaardige app op het beginscherm te zetten is.

## 4. Dark mode

Volledige dark mode via `prefers-color-scheme`, automatisch volgend op de
systeeminstelling van het toestel:
- Alle kleuren omgezet naar CSS-variabelen met een licht- en donker-varant.
- Belangrijke bug onderweg gevonden: een paar elementen (dobbelsteen,
  geselecteerde chips) gebruikten de "tekstkleur"-variabele als achtergrond;
  in dark mode wordt die variabele juist bijna-wit (voor leesbare tekst),
  waardoor die elementen onzichtbaar zouden worden. Opgelost met een aparte,
  vaste "altijd donker"-variabele voor dat soort elementen.
- Getest in zowel light als dark mode over alle schermen (spellen, tools,
  spelers, setup-sheet, score-keypad).

## 5. Structuur- en UX-aanpassingen

- **Historie is geen apart tabblad meer**: samengevoegd met het
  Spellen-scherm. Een klok-knopje wisselt tussen actieve spellen en
  historie; een spel beëindigen brengt je automatisch naar de
  historie-weergave.
- **Tools-scherm**: de horizontale Timer/Dobbelen/Kiezer-subnav is vervangen
  door een klikbare titel die een popup-menu opent — dat maakt ruimte vrij
  zodat het Kiezer-vak groter kan (het is nu vrijwel schermvullend, zonder
  hint-tekst of een aparte "opnieuw"-knop, want dat gebeurt al automatisch
  bij een nieuwe aanraking).
- Knoppenposities gelijkgetrokken: "+ Nieuw" en de historie-knop
  omgewisseld; de terugknop in de historie-weergave zit in exact dezelfde
  hoek als de historie-knop daarvoor (alleen ander icoon).
- Templates en Spelers omgewisseld in de onderste tabbalk.
- Rondere hoeken op de tabbalk en de belangrijkste knoppen; marge tussen
  tabbalk en zijkant/onderkant van het scherm gelijkgetrokken.
- Dubbeltikken-om-in-te-zoomen uitgezet (`touch-action: manipulation`).

## 6. Offline-ondersteuning (service worker)

Laatste stap: een service worker (`app/sw.js`) toegevoegd zodat de PWA ook
zonder internet werkt.

- **Geen server nodig** — een service worker is een gewoon statisch
  bestand, werkt op de bestaande static hosting.
- Strategie: **network-first met cache-fallback**. Met internet wordt altijd
  de nieuwste versie opgehaald én de cache ververst; zonder internet valt de
  app terug op de laatst succesvol geladen versie. Dat voorkomt het
  klassieke PWA-probleem van "vastzitten op een oude cached versie" na een
  nieuwe deploy — een nieuwe versie is meteen zichtbaar zodra er weer
  internet is.
- Getest door alle netwerkrequests hard te laten falen (niet alleen
  "offline"-simulatie) in een headless browser: de app laadt dan nog steeds
  volledig uit de Cache Storage.
- Let op: de telefoon moet de app minstens één keer mét internet openen
  voordat de service worker en de cache zijn opgezet.

## Losse zijstapjes

- Even getest of browsers multitouch ondersteunen (ja, via de Touch Events
  API) — de directe aanleiding voor Kiezer 2.
- Een keer per ongeluk een commit gepusht die weinig zichtbaar verschil
  maakte; die is later uit de geschiedenis gehaald (`git reset --hard` +
  force-push) omdat de gebruiker terug wilde naar de versie ervoor.
- Tag `v1.0.0` gezet op die teruggedraaide versie; deze sessie eindigt met
  tag `v1.1.0` op de versie mét de service worker.

## Belangrijkste bestanden

```
app/index.html         de hele app: HTML, CSS en JS in één bestand
app/sw.js               service worker (offline-ondersteuning)
app/manifest.json       PWA-manifest
app/icons/              app-iconen in diverse formaten
infra/main.bicep        Bicep-deployment (subscription scope)
infra/modules/          static web app / custom domain / DNS-module
scripts/deploy-infra.sh Bicep valideren + deployen
scripts/deploy-app.sh   app/ uploaden naar de Static Web App
```

## Live

- **https://keepscore.xprtz.dev**
- Repo: **https://github.com/mvdevries/keep-score**
