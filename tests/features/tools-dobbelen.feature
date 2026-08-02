# language: nl
Functionaliteit: Dobbelstenen

  Een tot zes stenen gooien, met een rolanimatie en het totaal eronder.

  Achtergrond:
    Gegeven ik open de app
    Als ik naar het tabblad "Tools" ga
    En ik naar de tool "Dobbelen" ga

  Scenario: Voor de eerste worp ligt er niets
    Dan zie ik de tekst "Nog niet gegooid"

  Scenario: Gooien levert stenen en een kloppend totaal
    Als ik 2 stenen kies
    En ik gooi
    Dan zie ik 2 dobbelstenen
    En liggen alle ogen tussen 1 en 6
    En klopt het totaal met de stenen

  Abstract Scenario: Het aantal stenen kiezen
    Als ik <aantal> stenen kies
    En ik gooi
    Dan zie ik <aantal> dobbelstenen

    Voorbeelden:
      | aantal |
      | 1      |
      | 3      |
      | 6      |

  Scenario: Tijdens het rollen kun je het aantal niet wijzigen
    Als ik op gooien tik zonder te wachten
    Dan zijn de aantalknoppen uitgeschakeld
    Als het rollen klaar is
    Dan zijn de aantalknoppen weer bruikbaar
