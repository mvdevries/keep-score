# Versies en releases

Bij een nieuwe versie: annotated git tag, tag pushen, en een GitHub release met
release notes volgens het onderstaande template.

## Release notes

Nederlands. Eén openingszin, dan de bullets. Alleen deze drie kopjes:

```markdown
Eén zin die zegt wat deze release is.

### Nieuw
- **Naam van de functie** — wat je er nu mee kunt, in gewone taal

### Veranderd
- Wat er anders is, en waarom dat beter is

### Opgelost
- **Wat er mis was** — waar je last van had, gevolgd door wat er nu gebeurt

**Volledige changelog**: https://github.com/<owner>/<repo>/compare/<vorige>...<deze>
```

Regels:

- **Nooit een ander kopje.** Geen "Nagemeten", "Goed om te weten", "Bekend
  probleem" of indeling per onderdeel van de app. Denk je dat er iets bij moet
  wat nergens onder past, vraag het dan eerst en wacht op antwoord.
- **Kopjes zonder inhoud laat je weg.** Een release met alleen nieuwe dingen
  heeft alleen `### Nieuw`.
- **Bij de eerste release** valt alles onder `### Nieuw`, gegroepeerd in
  bullets per onderdeel, met onderaan de live-URL in plaats van een
  compare-link.
- **Schrijf vanuit de gebruiker, niet vanuit de commits.** Meerdere commits die
  samen één functie vormen worden één bullet. Hoe het gebouwd is doet er niet
  toe.
- **Bij een bug staat erbij wat er mis was**, niet alleen dat het opgelost is.
  Zonder dat kan niemand inschatten of hij er last van had.
- **Eén regel per bullet**, zin of twee. Geen alinea's, geen sub-bullets, geen
  losse tekst tussen de kopjes.
- **Vet aan het begin** van de bullet voor waar het over gaat, dan een
  gedachtestreepje en de uitleg. Bij korte, voor zich sprekende punten mag het
  vet weg.
- Geen interne details: geen commit-hashes, bestandsnamen of functienamen,
  tenzij de gebruiker ermee te maken krijgt (zoals `localStorage`).

## Titel

`v1.2.0 — keer-toets, eigen spelerskleuren en Nog een potje`

Het versienummer, een gedachtestreepje, en de twee of drie opvallendste
wijzigingen. Bij de eerste release de naam van het project.

## Git tag

Annotated tag met dezelfde titel als eerste regel, daarna een korte opsomming
gegroepeerd per onderdeel van de app:

```
git tag -a v1.2.0 -F -
```

## Volgorde

1. Commits pushen
2. Tag aanmaken en pushen
3. Release aanmaken met `gh release create <tag> --latest --title ... --notes ...`

De nieuwste release krijgt `--latest`. Bestaande releases pas je aan met
`gh release edit <tag> --notes ...`.

Zie ook [[code-comments]].
