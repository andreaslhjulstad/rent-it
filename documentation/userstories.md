# Brukerhistorier

### Brukerhistorie 1 (us-1)
Som en bruker ønsker jeg å registrere meg for å kunne logge inn.  
**Tilleggsinfo:**  
Skal registrere seg med epost, telefonnummer, fornavn, etternavn og et passord.  
**Testing:**  
Test å registrere en bruker og sjekk om brukeren kan logge inn  

### Brukerhistorie 2 (us-2)  
Som en utleier ønsker jeg å opprette (og fjerne) en annonse for å kunne låne ut et produkt.  
**Tilleggsinfo:**  
Inneholder en tittel, beskrivelse, bilde, tidsperiode og pris. Må være mulig å sette annonsen som utlånt for å forhindre dobbeltbooking.  
**Testing:**  
Test å opprette en annonse med gyldig info  
Test å opprette en annonse med ulike former for ugyldig info (skal feile)  
Test å fjerne en annonse man har opprettet  
Test å sette en annonse som utlånt  

### Brukerhistorie 3 (us-3)  
Som en bruker ønsker jeg se en liste over alle annonser for å kunne få en oversikt.  
**Testing:**  
Test å legge til en annonse og sjekke om den dukker opp
Test å fjern en annonse og sjekke om den fjernes
Test å markere en annonse som utlånt og sjekke om den gråes ut i oversikten

### Brukerhistorie 4 (us-4)
Som en bruker ønsker jeg en egen annonse side for verktøyet jeg ser på for å kunne få mer info om produktet, utleier og kontaktinfo.  
**Tilleggsinfo:**  
Skal vise tittel, beskrivelse, pris, kontaktinfo, utleier  
**Testing:**  
Test at annonsesiden viser riktig info

### Brukerhistorie 5 (us-5)  
Som en bruker ønsker jeg å se brukersiden til utleier for å kunne kontakte dem via e-post eller telefon.  
**Tilleggsinfo:**  
Kontaktinfo skal vises i annonsen også.  
**Testing:**  
Teste at alle felt på brukersiden har riktig innhold  

### Brukerhistorie 6 (us-6)  
Som utleier ønsker jeg å se en oversikt over annonsene mine for å kunne se hvilke som er utlånt og ikke.  
**Tilleggsinfo:**  
Kan se penger tjent på annonsen og antall utlån  
**Testing:**  
Test å legg til en ny annonse, sjekk at oversikten oppdateres  
Test å sette en annonse som utlånt, sjekk at oversikten oppdateres  
Test å fjern en annonse, sjekk at oversikten oppdateres  

### Brukerhistorie 7 (us-7)  
Som en bruker ønsker jeg å søke og filtrere på annonser for å kunne spesifisere et søk.  
**Tilleggsinfo:**  
Inkludere funksjon for å filtrere ut utlånte produkter  
**Testing:**  
Test å søke på en annonse med ulike filtre og sjekke om den/de riktige dukker opp  

### Brukerhistorie 8 (us-8)  
Som en bruker ønsker jeg kunne legge igjen en rating og vurdering på annonser og brukere for å dele min opplevelse med resten av brukerne.  
**Testing:** 
Test at man kan legge igjen en rating for et produkt man har lånt  
Test at man kan legge igjen en rating for en utleier man har leid fra  
**For disse:** Sjekk at gjennomsnittlig rating oppdateres  
Test at det ikke går an å legge til rating for produkter man ikke har lånt  
Test at det ikke går an å legge til rating for utleiere man ikke har leid fra  

### Brukerhistorie 9 (us-9)  
Som en bruker ønsker jeg å se historikk og statistikk for å holde oversikt over gode utleiere og filtrere ut svindlere.  
**Tilleggsinfo/ting som trenger avklaring:**  
Statistikk: rating, (ev. antall utlån??)  
**Testing:**  
Test å gjør en transaksjon og sjekk at den dukker opp i historikken  

### Brukerhistorie 10 (us-10)  
Som en bruker ønsker jeg å lagre en annonse jeg er interessert i/fornøyd med i en liste for å lagre de til senere.  
**Tilleggsinfo/ting som trenger avklaring:**  
Ha med tittel (kanskje beskrivelse?) for liste, må ha en oversikt over lister (kanskje på brukerprofil?)  
Må oppdatere listen dersom en annonse i listen fjernes  
**Testing:**
Test å opprette en liste med gyldige felter  
Test å opprette en liste med ugyldige felter (skal feile)  
Test å legge til en annonse i listen, sjekk at den dukker opp i UI  
Test å fjerne en annonse fra listen, sjekk at den fjernes i UI  

### Brukerhistorie 11 (us-11)   
Som administrator ønsker jeg å fjerne upassende brukere og annonser for å opprettholde plattformens integritet.  
**Testing:**  
Test å logg inn med admin-funksjon  
Test å fjern en bruker og sjekk om databasen oppdateres  
Test å fjern et innlegg sjekk om databasen oppdateres  

