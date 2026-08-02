# language: nl
Functionaliteit: Spellen bijhouden

  Je kunt meerdere spellen tegelijk open hebben. Het overzicht toont per spel
  de deelnemers, het doel en de tussenstand.

  Scenario: Zonder spellen zie ik een lege staat
    Gegeven ik open de app
    Dan zie ik de tekst "Geen spellen bezig"
    En zie ik 0 spellen in de lijst

  Scenario: Een lopend spel staat in het overzicht
    Gegeven een spel met de spelers Bob en Anne
    Als ik de app open
    Dan zie ik 1 spellen in de lijst
    En zie ik de tekst "2 spelers"

  Scenario: Een spel openen en weer sluiten
    Gegeven een spel met de spelers Bob en Anne
    Als ik het spel open
    Dan zie ik de spelers Bob en Anne op het scorebord
    Als ik terug ga
    Dan zie ik het spellenoverzicht

  Scenario: Een spel hernoemen
    Gegeven een spel met de spelers Bob en Anne
    Als ik het spel open
    En ik het spel hernoem naar "Kerstavond"
    Dan heet het spel "Kerstavond"

  Scenario: Alle scores op nul zetten
    Gegeven een spel met de spelers Bob en Anne
    Als ik het spel open
    En ik "Bob" 30 punten geef
    En ik alle scores op nul zet
    Dan heeft "Bob" 0 punten
    En heeft "Bob" 0 rondes gespeeld

  Scenario: Een spel weggooien
    Gegeven een spel met de spelers Bob en Anne
    Als ik het spel open
    En ik het spel weggooi
    Dan zie ik 0 spellen in de lijst
