# language: nl
Functionaliteit: Spelers beheren

  Je vaste speelgroep staat onder het tabblad Spelers. Elke speler heeft een
  eigen kleur, zodat je ze aan tafel uit elkaar houdt.

  Scenario: Opgeslagen spelers worden ingelezen
    Gegeven de volgende spelers bestaan:
      | naam   | kleur   |
      | Bob | #3F8F52 |
      | Anne   | #C8442F |
      | Bram   | #2F6FBF |
    Als ik de app open
    En ik naar het tabblad "Spelers" ga
    Dan zie ik 3 spelers in de lijst
    En zie ik de speler "Bob"

  Scenario: Nog geen spelers
    Gegeven ik open de app
    Als ik naar het tabblad "Spelers" ga
    Dan zie ik 0 spelers in de lijst
    En zie ik de tekst "Nog niemand"

  Scenario: Een speler toevoegen
    Gegeven ik open de app
    Als ik naar het tabblad "Spelers" ga
    En ik de speler "Bob" toevoeg
    Dan zie ik 1 spelers in de lijst
    En zie ik de speler "Bob"

  Scenario: Een naam die al bestaat wordt geweigerd
    Gegeven de volgende spelers bestaan:
      | naam   | kleur   |
      | Bob | #3F8F52 |
    Als ik de app open
    En ik naar het tabblad "Spelers" ga
    En ik de speler "Bob" toevoeg
    Dan zie ik de melding "Bob staat al in de lijst"
    En zie ik 1 spelers in de lijst

  Scenario: Een speler verwijderen
    Gegeven de volgende spelers bestaan:
      | naam   | kleur   |
      | Bob | #3F8F52 |
      | Anne   | #C8442F |
    Als ik de app open
    En ik naar het tabblad "Spelers" ga
    En ik de speler "Anne" verwijder
    Dan zie ik 1 spelers in de lijst

  Scenario: Een speler die meespeelt kun je niet verwijderen
    Gegeven een spel met de spelers Bob en Anne
    Als ik de app open
    En ik naar het tabblad "Spelers" ga
    En ik de speler "Bob" verwijder
    Dan zie ik de melding "Deze speler doet nog mee in een lopend spel"
    En zie ik 2 spelers in de lijst
