# language: nl
Functionaliteit: Winnen en afronden

  Zodra iemand de winscore raakt is het spel beslist. Het winstmenu vraagt om
  een keuze en laat zich niet wegklikken.

  Scenario: De winscore halen bij hoogste wint
    Gegeven een spel met de spelers Bob en Anne en winscore 50
    Als ik het spel open
    En ik "Bob" 50 punten geef
    Dan verschijnt het winstmenu
    En staat er "Bob wint" in het winstmenu

  Scenario: Onder de winscore blijven beslist niets
    Gegeven een spel met de spelers Bob en Anne en winscore 50
    Als ik het spel open
    En ik "Bob" 49 punten geef
    Dan verschijnt het winstmenu niet

  Scenario: Bij laagste wint pakt de laagste stand de winst
    Gegeven een spel waarin de laagste wint met grens 50
    Als ik het spel open
    En ik "Anne" 10 punten geef
    En ik "Bob" 50 punten geef
    Dan verschijnt het winstmenu
    En staat er "Anne wint" in het winstmenu

  Scenario: Het winstmenu laat zich niet wegklikken
    Gegeven een spel met de spelers Bob en Anne en winscore 50
    Als ik het spel open
    En ik "Bob" 50 punten geef
    Dan verschijnt het winstmenu
    Als ik naast het menu tik
    Dan is het winstmenu nog open
    Als ik op Escape druk
    Dan is het winstmenu nog open

  Scenario: De eindstand in de historie bewaren
    Gegeven een spel met de spelers Bob en Anne en winscore 50
    Als ik het spel open
    En ik "Bob" 50 punten geef
    En ik de eindstand bewaar
    Dan zie ik 1 items in de historie
    En zie ik 0 spellen in de lijst

  Scenario: Toch doorspelen zet de winscore uit
    Gegeven een spel met de spelers Bob en Anne en winscore 50
    Als ik het spel open
    En ik "Bob" 50 punten geef
    En ik kies om door te spelen
    Dan zie ik de melding "Winscore uit, jullie kunnen doorspelen"
    En heeft "Bob" 50 punten

  Scenario: Nog een potje begint opnieuw met dezelfde spelers
    Gegeven een spel met de spelers Bob en Anne en winscore 50
    Als ik het spel open
    En ik "Anne" 20 punten geef
    En ik "Bob" 50 punten geef
    En ik kies voor nog een potje
    Dan zie ik de melding "Nog een potje, iedereen weer op 0"
    En heeft "Bob" 0 punten
    En heeft "Anne" 0 punten
    En zie ik de spelers Bob en Anne op het scorebord
    En zie ik 1 items in de historie

  Scenario: Nog een potje houdt de winscore vast
    Gegeven een spel met de spelers Bob en Anne en winscore 50
    Als ik het spel open
    En ik "Bob" 50 punten geef
    En ik kies voor nog een potje
    En ik "Bob" 50 punten geef
    Dan verschijnt het winstmenu

  Scenario: Een spel handmatig beëindigen
    Gegeven een spel met de spelers Bob en Anne
    Als ik het spel open
    En ik "Bob" 30 punten geef
    En ik het spel beëindig
    En ik de eindstand bewaar
    Dan zie ik 1 items in de historie
    En zie ik 0 spellen in de lijst
