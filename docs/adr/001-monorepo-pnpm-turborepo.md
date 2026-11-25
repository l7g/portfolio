# NNN. Titolo della decisione

- Data: 2026-10-25
- Stato: accettata

## Contesto

Abbiamo bisogno di 3 app: site, admin, sync (.NET) e 3 pacchetti: typescript-config, ui, db. Sito e dashboard condividono lo stile, i componenti e lo schema del database.
Lavoro da solo durante gli studi, ho tempo limitato.

## Decisione

Una sola repository, tramite pnpm workspaces per i pacchetti e turborepo per lanciare i comandi.

## Alternative considerate

- Una repository per app: per condividere ui avrei dovuto pubblicarla su npm o copiarla. Una modifica diventerebbe piu PR.
- Workspace senza turbo: funzionerebbe, ma ogni buildviene rieseguita da zero, non sfrutta la cache delle build.
- PNPM tiene i pacchetti in un unico archivio su disco. Un pacchetto vede solo le dipendezne che dichiara, e con la keyword worskapce:\* collego i pacchetti interni
- ^build cotruisce prima i pacchetti e poi le app. La cache (FULL TURBO) salta il lavoro già fatto, anche in CI.

## Conseguenze

- Un singolo pnpm install, una sola CI, e una PR puo toccare sito pacchetti assieme.
- packageManager va solo nella radice.
- Su vercel, la root dir è apps/site.
- Turbo coordina solo js, app/sync usa .net
