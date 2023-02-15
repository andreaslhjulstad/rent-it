# Format for issues, commits, branches og merge requests

### Issues

Hver issue som er knyttet til en brukerhistorie skal være på formatet "[Overskrift] ([brukerhistorie-id], [antall forventede timer])".  
Dersom brukerhistorien ikke enda har fått tilordnet et forventet antall timer kan dette sløyfes og legges på senere.    
Hver issue skal være tilordnet en prioritets-label som forteller om den er kritisk, høy, middels eller lav prioritet.  
I tillegg skal hver issue ha en tilordnet status-label som forteller om statusen er åpen, påbegynt, på vent, trenger gjennomgang ("needs review") eller lukket.  
Hver issue skal også ha en type-label som forteller om den omhandler dokumentasjon eller testing, eller om den er en feature eller en bug.  

Dersom det trengs kan en brukerhistorie også ha en beskrivelse som gir mer utdypende informasjon om hva issuen innebærer,  
som f.eks. hvilke oppgaver som må gjøres før issuen regnes som ferdigstilt.  

### Commits

Hver commit skal ha en tittel som beskriver hva som er gjort på imperativ form, eks. "Fix UI bug", "Add documentation for user story 1" eller "Update README.md".  
Hvis det trengs kan man også velge å legge inn en mer utfyllende beskrivelse som forteller hva som har blitt gjort i commiten i nærmere detalj.  
Dersom en commit omhandler en issue skal den ha et felt i footeren hvor det står "Relates: #[nummer på issue].  
Dersom en commit fikser en bug skal den ha et felt i footeren hvor det står "Fixes: #[nummer på bug-issue].  
Hvis commiten er gjort med par-programmering skal den ha et felt for å referere til den andre personen som har deltatt i commiten,  
på formatet "Co-Authored-By: [fullt navn] <[e-post-adresse]>"  

### Branches

Dersom en branch omhandler en issue skal den ha navn på formen "[nummer på issue]-[branchnavn]".  
Navnet på branchen skal være så beskrivende som mulig, men kortfattet. Dersom branchnavnet består av flere ord, skal space byttes ut med bindestrek.  

### Merge requests

Vi bruker automatiserte merge requests fra GitLab, som opprettes ved å bruke "New Merge Request"-funksjonen.  

**NB! Ingenting av dette er endelig, og kan endres ila. utviklingsperioden dersom det blir behov.**  
