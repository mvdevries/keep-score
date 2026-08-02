# language: nl
Functionaliteit: Punten vastleggen

  Wat je op de keypad samenstelt wordt een ronde. Rondes tellen op tot een
  totaal en zijn los terug te kijken en te wissen.

  Achtergrond:
    Gegeven een spel met de spelers Bob en Anne
    Als ik het spel open

  Scenario: Punten opslaan
    Als ik op de speler "Bob" tik
    En ik de toetsen "1 2 + 7" indruk
    En ik de punten opsla
    Dan heeft "Bob" 19 punten
    En heeft "Bob" 1 ronde gespeeld

  Scenario: Strafpunten trekken van het totaal af
    Als ik "Bob" 30 punten geef
    En ik op de speler "Bob" tik
    En ik de toetsen "- 1 2" indruk
    En ik de punten opsla
    Dan heeft "Bob" 18 punten

  Scenario: Meerdere rondes tellen op
    Als ik "Bob" 30 punten geef
    En ik "Bob" 12 punten geef
    Dan heeft "Bob" 42 punten
    En heeft "Bob" 2 rondes gespeeld

  Scenario: Spelers houden hun eigen totaal bij
    Als ik "Bob" 30 punten geef
    En ik "Anne" 45 punten geef
    Dan heeft "Bob" 30 punten
    En heeft "Anne" 45 punten

  Scenario: Een ronde terugkijken en wissen
    Als ik "Bob" 30 punten geef
    En ik "Bob" 12 punten geef
    En ik op de speler "Bob" tik
    En ik de rondes bekijk
    Dan zie ik 2 rondes
    En is het rondetotaal 42
    Als ik de eerste ronde wis
    Dan is het rondetotaal 12

  Scenario: Een speler uit het spel halen
    Als ik op de speler "Anne" tik
    En ik de rondes bekijk
    En ik de speler uit het spel haal
    Dan zie ik alleen nog "Bob" op het scorebord
