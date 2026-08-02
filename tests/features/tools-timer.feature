# language: nl
Functionaliteit: De timer

  Aftellen met een instelbare duur. De tijd wordt in deze scenario's beheerd,
  zodat vijf minuten in milliseconden voorbij zijn.

  Achtergrond:
    Gegeven ik open de app met beheerde tijd
    Als ik naar het tabblad "Tools" ga

  Scenario: De timer staat standaard op dertig seconden
    Dan toont de timer "0:30"
    En staat er "tik om te wijzigen" bij de timer

  Abstract Scenario: Een andere duur kiezen
    Als ik de timerpreset <seconden> kies
    Dan toont de timer "<weergave>"

    Voorbeelden:
      | seconden | weergave |
      | 30       | 0:30     |
      | 60       | 1:00     |
      | 120      | 2:00     |
      | 300      | 5:00     |

  Scenario: De timer loopt af
    Als ik de timerpreset 30 kies
    En ik de timer start
    Dan staat er "loopt" bij de timer
    Als er 10 seconden verstrijken
    Dan toont de timer "0:20"
    Als er 25 seconden verstrijken
    Dan toont de timer "0:00"
    En staat er "tijd om" bij de timer

  Scenario: De timer pauzeren
    Als ik de timerpreset 60 kies
    En ik de timer start
    En er 10 seconden verstrijken
    En ik de timer pauzeer
    Dan staat er "tik om te wijzigen" bij de timer
    Als er 10 seconden verstrijken
    Dan toont de timer "0:50"

  Scenario: De timer resetten
    Als ik de timerpreset 60 kies
    En ik de timer start
    En er 20 seconden verstrijken
    En ik de timer reset
    Dan toont de timer "1:00"
