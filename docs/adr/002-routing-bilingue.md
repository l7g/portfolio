# 002. Routing Bilingue

- Data: 2026-11-26
- Stato: accettata

## Contesto

Il sito deve avere almeno due lingue (italiano e inglese), sia per riflettere la mia intenzione di entrare nel mercato europeo del lavoro, sia per riflettere la mia natura internaionale.
Le pagine devono essere statiche e trovabili su Google.

## Decisione

- La lingua è il primo parametro dell'url, con la cartella dinamica [lang].
- I testi sono dizionari JSON letti solo dal server
- Il proxy effettua il redirect di / sulla lingua predefinita del browser.

## Alternative considerate

- Cookies, stesso indirizzo:Google vede una lingua sola. Un link condiviso si aprirebbe nella lingua di chi lo riceve, non in quella scelta. Leggere il cookie renderebbe la pagina dinamica.
- Utilizzo di una libreria (come next-intl): Sarrebe già pronta, con molte funzioni. Costituirebbe una dipendenza in più per sole 2 lingue e pochi testi.
- Sottodomini (en.dominio.it): overkill per un portfolio

## Conseguenze

- /it e /en sono route statiche.
- Ogni indirizzo si puo condividere e indicizzare, e hreglang dice a google che sono la stessa pagina.
- Ogni link interno deve contenere la lingua.
- Ogni testo nuovo deve essere scritto nei rispettivi JSON.
- Per le rensioni senza altre lingue (oltre italiano) avranno bisogno di un ripiego.
