Väliraportti

StormChat on keskustelusovellus. Sovelluksella viestien lähettäminen, huoneen luonti ja "stormaaminen" ovat sujuvaa ja helppoa. StormChatissa keskustelut käydään yksityisissä huoneissa, joissa käyttäjä voi lähettää viestejä, työskennellä ryhmän muiden jäsenten kanssa työskentelyalueella ja ladata huoneen tuotoksen omalle tietokoneelleen. Huoneen luonnin yhteydessä huoneelle annetaan nimi ja salasana. Lisätty huone listataan sovelluksessa, jolloin käyttäjä voi liittyä siihen antamalla oikein salasanan.

StormChatin backend on toteutettu kaikki tietokantatoiminnallisuus, paitsi käyttäjän autentikointi. ks. stormchat-arkkitehtuurikaavio. Frontendistä on toteutettu aloitusikkunaan huoneen luontilomake ja sen tarkistus, luotujen huoneiden listaus ja päänäkymä muuten paitsi keskustelualue ja työstämisalue eivät ole valmiita. Työstämisalueen sisällön voi ladata tekstitiedostona painamalla "download" nappia, mutta tämä toteutus saattaa muuttua. 

Käyttäjälle näkyvä frontend-puoli on toteutettu html:llä, css:llä, javascriptilla, jqueryllä ja bootstrapilla. Toteutuksesa on pyritty välttämään tiedostoja, jotka sisältävät montaa eri kieltä. Koodi on jaettu erilliseen tiedostoihin kielen ja asiayhteyden mukaan. Esimerkiksi päävalikon jquery-toteutus (toiminnallisuus) on tiedostossa modal.js, joka on omassa kansiossaan js (javascript). Käyttäjälle "näkymätön" backend on tehty php:llä ja sql:llä. Frameworkina on käytetty Silexiä, joka on Symphonyyn pohjautuva mikro-framework.


