# language: nl
Functionaliteit: Templates voor je vaste spellen

  Een template onthoudt de winscore en of je levels bijhoudt, zodat je een
  bekend spel snel opstart.

  Scenario: Een template maken
    Gegeven ik open de app
    Als ik naar het tabblad "Templates" ga
    En ik een template "Rummikub" maak met winscore 300
    Dan zie ik de template "Rummikub"
    En zie ik de tekst "eerst bij 300 wint"

  Scenario: Een template zonder naam wordt geweigerd
    Gegeven ik open de app
    Als ik naar het tabblad "Templates" ga
    En ik een template "" maak met winscore 100
    Dan zie ik de melding "Geef de template een naam"

  Scenario: Een template wissen
    Gegeven ik open de app
    Als ik naar het tabblad "Templates" ga
    En ik een template "Rummikub" maak met winscore 300
    En ik de template "Rummikub" wis
    Dan zie ik de melding "Template gewist"
    En zie ik de template "Rummikub" niet

  Scenario: Een spel starten vanaf een template
    Gegeven de volgende spelers bestaan:
      | naam | kleur   |
      | Bob  | #3F8F52 |
      | Anne | #C8442F |
    Als ik de app open
    En ik naar het tabblad "Templates" ga
    En ik een template "Rummikub" maak met winscore 300
    En ik een nieuw spel start met de template "Rummikub" en de spelers Bob en Anne
    Dan heet het spel "Rummikub"
    En zie ik de spelers Bob en Anne op het scorebord
    En zie ik de tekst "eerst bij 300 wint"

  Scenario: Een vrij spel zonder template
    Gegeven de volgende spelers bestaan:
      | naam | kleur   |
      | Bob  | #3F8F52 |
      | Anne | #C8442F |
    Als ik de app open
    En ik een vrij spel start met de spelers Bob en Anne
    Dan zie ik de spelers Bob en Anne op het scorebord
    En zie ik de tekst "geen winscore"
