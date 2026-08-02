# language: nl
@alleen-chromium
Functionaliteit: De kiezer

  Leg tot vijf vingers op het scherm; zodra er even niemand bijkomt wijst de
  app er willekeurig een aan. Meerdere vingers tegelijk kan alleen in Chromium
  worden nagebootst, dus deze scenario's draaien niet op WebKit.

  Achtergrond:
    Gegeven ik open de app
    Als ik naar het tabblad "Tools" ga
    En ik naar de tool "Kiezer" ga

  Scenario: Zonder vingers staat er een uitnodiging
    Dan zie ik de tekst "Zet hier vingers neer"

  Scenario: De kiezer wijst een winnaar aan en loot de volgorde
    Als ik 3 vingers op het scherm leg
    Dan zie ik 3 vingercirkels
    Als de kiezer zijn keuze maakt
    Dan heeft precies 1 vinger gewonnen
    En heeft de winnaar nummer 1
    En zijn de nummers 1 tot en met 3 verdeeld

  Scenario: Met vijf vingers werkt het ook
    Als ik 5 vingers op het scherm leg
    Dan zie ik 5 vingercirkels
    Als de kiezer zijn keuze maakt
    Dan heeft precies 1 vinger gewonnen
    En zijn de nummers 1 tot en met 5 verdeeld

  Scenario: Vingers weghalen voor de keuze
    Als ik 3 vingers op het scherm leg
    En ik alle vingers weghaal
    Dan zie ik 0 vingercirkels
    En zie ik de tekst "Zet hier vingers neer"
