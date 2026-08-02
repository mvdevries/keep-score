# language: nl
Functionaliteit: Rekenen met de keypad

  De keypad is een kleine rekenmachine waarmee je een hele ronde in één keer
  samenstelt. Optellen, aftrekken en vermenigvuldigen, geen delen.

  Achtergrond:
    Gegeven een spel met de spelers Bob en Anne
    Als ik het spel open
    En ik op de speler "Bob" tik

  Scenario: Een enkel getal invoeren
    Als ik de toetsen "1 2" indruk
    Dan toont het display "12"
    En staat er op de opslaanknop "Opslaan"

  Scenario: Punten bij elkaar optellen
    Als ik de toetsen "1 2 + 7" indruk
    Dan toont het display "19"
    En toont de som "12 + 7"
    En staat er op de opslaanknop "Opslaan als 19"

  Scenario: Punten aftrekken
    Als ik de toetsen "2 0 - 5" indruk
    Dan toont het display "15"

  Scenario: Vermenigvuldigen
    Als ik de toetsen "3 × 5" indruk
    Dan toont het display "15"
    En toont de som "3 × 5"

  Abstract Scenario: Vermenigvuldigen gaat voor optellen en aftrekken
    Als ik de toetsen "<toetsen>" indruk
    Dan toont het display "<uitkomst>"

    Voorbeelden:
      | toetsen       | uitkomst |
      | 2 + 3 × 4     | 14       |
      | 3 × 4 + 2     | 14       |
      | 1 0 - 2 × 3   | 4        |
      | 2 × 3 × 4     | 24       |
      | 1 0 0 - 5 × 2 | 90       |

  Scenario: Een losse min is meteen zichtbaar
    Als ik de toetsen "-" indruk
    Dan toont het display "−"
    En toont de hint "Tik nu het aantal punten dat eraf gaat"
    En is de opslaanknop uitgeschakeld

  Scenario: Een losse plus is meteen zichtbaar
    Als ik de toetsen "+" indruk
    Dan toont het display "+"
    En toont de hint "Tik nu het aantal punten dat erbij komt"
    En is de opslaanknop uitgeschakeld

  Scenario: Strafpunten invoeren
    Als ik de toetsen "- 1 5" indruk
    Dan toont het display "-15"

  Scenario: De keer-toets doet niets als eerste toets
    Als ik de toetsen "×" indruk
    Dan is het display leeg
    En is de opslaanknop uitgeschakeld

  Scenario: Een rekenteken vervangt het vorige
    Als ik de toetsen "5 + × 3" indruk
    Dan toont het display "15"

  Scenario: Uitrekenen met de isgelijk-toets
    Als ik de toetsen "2 + 3 × 4 =" indruk
    Dan toont het display "14"
    En is de som leeg

  Scenario: Backspace wist het laatste teken
    Als ik de toetsen "3 × 5 ⌫ ⌫" indruk
    Dan toont het display "3"

  Scenario: Alles wissen
    Als ik de toetsen "3 × 5 C" indruk
    Dan is het display leeg

  Scenario: Level omhoog en omlaag
    Dan staat het level op 1
    En is de knop level omlaag uitgeschakeld
    Als ik het level verhoog
    En ik het level verhoog
    Dan staat het level op 3
    Als ik het level verlaag
    Dan staat het level op 2
