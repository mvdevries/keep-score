# language: nl
Functionaliteit: Navigeren door de app

  De app heeft vier tabbladen onderin. Het spellenoverzicht staat voorop.

  Scenario: De app opent op Spellen
    Gegeven ik open de app
    Dan zie ik de tabbladen Spellen, Spelers, Templates en Tools
    En staat het tabblad "Spellen" open

  Abstract Scenario: Naar een ander tabblad
    Gegeven ik open de app
    Als ik naar het tabblad "<tabblad>" ga
    Dan staat het tabblad "<tabblad>" open

    Voorbeelden:
      | tabblad   |
      | Spelers   |
      | Templates |
      | Tools     |

  Scenario: Een geopend spel blijft open als je even weggaat
    Gegeven een spel met de spelers Bob en Anne
    Als ik het spel open
    En ik naar het tabblad "Tools" ga
    En ik naar het tabblad "Spellen" ga
    Dan zie ik de spelers Bob en Anne op het scorebord

  Scenario: Nogmaals op Spellen tikken sluit het geopende spel
    Gegeven een spel met de spelers Bob en Anne
    Als ik het spel open
    En ik naar het tabblad "Spellen" ga
    Dan zie ik het spellenoverzicht
