# language: nl
Functionaliteit: Gegevens bewaren op je apparaat

  Alles blijft in de opslag van de browser staan, zodat je de app kunt sluiten
  zonder je stand kwijt te raken.

  Scenario: Een stand overleeft het herladen
    Gegeven een spel met de spelers Bob en Anne
    Als ik het spel open
    En ik "Bob" 30 punten geef
    En ik de pagina herlaad
    En ik het spel open
    Dan heeft "Bob" 30 punten

  Scenario: Een nieuwe speler blijft bewaard
    Gegeven ik open de app
    Als ik naar het tabblad "Spelers" ga
    En ik de speler "Bob" toevoeg
    En ik de pagina herlaad
    En ik naar het tabblad "Spelers" ga
    Dan zie ik de speler "Bob"

  Scenario: Bij een eerste bezoek staan er voorbeeldtemplates klaar
    Gegeven ik open de app zonder opgeslagen gegevens
    Als ik naar het tabblad "Templates" ga
    Dan zie ik de template "Flip 7"
    En zie ik de template "Skip-Bo"
    En zie ik de template "Phase 10"
    En zie ik de template "Pesten"

  Scenario: Spelers uit het oude groene palet worden eenmalig herkleurd
    Gegeven er zijn spelers met kleuren uit het oude palet
    Als ik de app open
    En ik naar het tabblad "Spelers" ga
    Dan hebben de spelers de kleuren van het nieuwe palet op volgorde
    En hebben alle spelers een verschillende kleur

  Scenario: Een zelfgekozen kleur blijft na de herkleuring staan
    Gegeven er is een speler met een zelfgekozen kleur
    Als ik de app open
    En ik naar het tabblad "Spelers" ga
    Dan heeft "Eigen" nog steeds de kleur "#FF00FF"
