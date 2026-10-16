# 09 — Stato e prossimi passi

Documento di passaggio di consegne, aggiornato al 16/10/2026. Chi riprende il lavoro lo legge subito dopo `README.md`.

## Dove siamo

La skill è scritta, gli script funzionano, i test di attivazione sono superati. Giovanni stima di essere **a circa il 50% del lavoro**: resta da migliorare la qualità delle scelte di stile e da fare revisione, ottimizzazione della descrizione e caricamento. **Non preparare lo zip finché Giovanni non lo chiede.** Per ora **non lanciare screenshot né verifiche sulle pagine** (consumano molti token), salvo richiesta.

## Cosa c'è

`skill/stile-siti/`
- `SKILL.md`: descrizione "solo se richiamata per nome", barriera lavoro, metodo in 7 passi, regole sempre valide, script, indice dei riferimenti. Il frontmatter contiene anche `disable-model-invocation: true` (vedi sotto).
- `references/`: gusto, direzioni, tipografia, colore, layout, mobile, motion, materia, componenti, css-moderno, anti-generico.
- `assets/base.html`: scheletro con titolo, favicon, theme-color, meta di anteprima, viewport con safe area, font, blocco Tailwind (`<style type="text/tailwindcss">`), reveal con IntersectionObserver, reduced-motion.
- `scripts/`: `build.mjs`, `verifica.mjs`, `offline.mjs`, `palette.mjs`, `lib.mjs`. Scaricano da soli le dipendenze in `~/.cache/stile-siti`.
- `evals/evals.json`: le quattro richieste di prova.

`workspace/iteration-1/`: per ciascuno dei quattro casi (dieta, viaggio Madrid, landing cinema/teatri, indice GitHub) la pagina con la nuova skill (`with_skill/outputs/pagina.html`) e con la vecchia (`old_skill/outputs/pagina.html`). `revisione.html` è il confronto generato da skill-creator.

## Risultati dei test

**Attivazione.** Con la sola descrizione (come su claude.ai): 14 casi su 14 corretti. Le 8 richieste senza richiamo (dieta, Madrid, landing, indice GitHub, widget PSD, Service Portal, card Enel, widget AngularJS) non la attivano; le 6 con "usa stile-siti" la attivano; sui 2 casi di lavoro con richiamo la skill si ferma e chiede conferma. Con il campo `disable-model-invocation` (Claude Code) il modello non la chiama da solo; il richiamo avviene con `/stile-siti`.

**Qualità (4 pagine).** La nuova skill ha prodotto concept diversi per ciascun tema: maioliche da cucina (dieta), "Madrid all'ora blu", teatro all'italiana (landing), cassettiera da officina (indice GitHub). La vecchia aveva dato terminale ciano per la dieta e per l'indice, aurora bento chiara per Madrid, art déco per il teatro.

**Giudizio di Giovanni (parziale, nessun voto).** Gli stili gli piacciono tutti, ma non li vede molto adatti ai soggetti: è da lavorare. Per il teatro preferiva la versione vecchia (art déco), pur apprezzando l'effetto della tenda che si apre. Ha detto di non volere regole tipo "se cinema usa X": era solo un'informazione. Ha chiesto che l'AI usi il proprio giudizio e che la skill tenga il gusto, non i progetti.

## Prova su due pagine reali di Giovanni (16/10/2026)

Giovanni ha chiesto di provare la skill "come fosse installata" su due suoi file esistenti, lavorando su una copia (senza toccare l'originale) e senza script propri di trasformazione: modifiche dirette con gli strumenti di editing, riferimenti letti passo per passo, script della skill per palette e build.

1. **Ricerca casa Catania** (`affitto/index.html`, app con Supabase, filtri, modale). Copia: `index-restyling.html` nella radice del progetto (da eliminare a cura di Giovanni). Concept "Catania di notte, con l'Etna che brilla": nero lavico, brace arancio, oro, azzurro mare; Fraunces, DM Sans, Space Mono. Esito: **"mi piace molto"**.
2. **Bakecaincontri viewer** (`Bakecaincontri/index.html`, server Node locale). Concept "Salotto d'albergo di notte" (art déco, bordeaux e oro champagne; Cormorant, DM Sans, JetBrains Mono). La copia sta nella radice del progetto di stile come `index-restyling-2.html` (sorgente con blocco Tailwind in `scratchpad/index2-sorgente.html`). Il server di Giovanni serve solo route esplicite (`server.mjs`, righe 49-52), quindi per vederla è stato usato per un po' un proxy temporaneo sulla porta 4174 (`scratchpad/anteprima.mjs`), poi fermato; la cartella `Bakecaincontri` è stata ripristinata com'era (nessun file aggiunto, `index.html` originale intatto). Esito: **"funziona"**.

Cose imparate sull'uso della skill:
- Il caso "restyling di una pagina esistente con logica da preservare" non è coperto da `SKILL.md`: da aggiungere una sezione (tenere id, JS e commenti; cambiare classi nelle stringhe JS; non toccare i dati).
- `base.html` non serve per un restyling.
- Il file originale aveva un reindirizzamento da `file://` a `localhost:4173`: aperto con doppio clic mostrava il vecchio stile. Va detto a Giovanni quando una pagina dipende da un server.
- In Tailwind v4 le variabili di `@theme` richiamate con `var()` nel CSS vengono emesse; con `@theme static` si è certi.
- Per file con base64 enormi, non stampare i grep con output senza limite: usare `awk` per trovare le righe lunghe.
- I dati dei record (numeri di telefono, foto di persone) non servono per decidere lo stile: la struttura si ricava dal codice.
- Pagina scura contro scura: le due pagine sono entrambe scure; variare chiaro/scuro quando il contenuto lo permette.

## Problemi emersi dai test e correzioni già fatte

Fatte (testi e script, **non ancora riprovate**):
- `scroll-behavior: smooth` in `base.html` rompeva la verifica: ora lo script imposta lo scroll istantaneo.
- Falsi allarmi di `verifica.mjs` su caroselli, marquee, decorazioni `aria-hidden`, barre fisse, link `sr-only`: filtrati a monte.
- Aggiunta l'opzione `--solo` per rilanciare una sola vista; SKILL.md dice di guardare solo 390 px e desktop.
- SKILL.md: percorsi degli script, dati mancanti (inventare e dichiarare), `localStorage`, niente heredoc per file lunghi.
- `layout.md`: tipo "Indice di progetti" e griglia responsive di Tailwind (niente Bootstrap).
- `motion.md`: `.rivela` come entrata unica.
- Etichetta `~/qualcosa` ripetuta in tutte le pagine: era un segnaposto di `base.html` e un esempio nei riferimenti; corretto.
- Scelta dello stile affidata al giudizio del modello; `gusto.md` e `direzioni.md` ammorbiditi.

## Da fare per primo, in una sessione separata (Giovanni ha finito i token il 16/10/2026)

**Aggiungere a `SKILL.md` una sezione "Restyling di una pagina esistente".** Perché: è un caso d'uso frequente (Giovanni ha già portato due suoi file reali) e oggi la skill non lo copre; nelle due prove ho dovuto improvvisare il metodo. Contenuto da scrivere, ricavato dalle prove:
- Lavorare sempre su una **copia**; l'originale non si tocca. Dire dove sta la copia.
- Preservare logica, `id`, dati, chiamate al backend e i commenti già presenti; cambiare solo aspetto (CSS e classi nelle stringhe JavaScript). Aggiunte al JavaScript solo se servono allo stile (animazioni d'ingresso, apertura di pannelli) e dichiararle.
- Prima di cambiare stile capire **che cosa è la pagina** dal codice (struttura, funzioni, classi) senza leggere i dati reali; se i record contengono dati di persone (telefoni, foto), non servono: non leggerli.
- Se la pagina dipende da un server (reindirizzamenti da `file://`, chiamate `/api` relative), avvisare Giovanni che il doppio clic mostrerebbe l'originale e come vedere la copia.
- Il blocco `<style type="text/tailwindcss">` serve alla build anche se la pagina non usa classi Tailwind (il CSS compilato aggiunge il reset: verificare che non rompa elementi generati dal JS). Con `@theme static` si ha la certezza che le variabili vengano emesse.
- Aggiungere `[hidden]{display:none !important}` quando si ridefiniscono i `display` degli elementi che il codice mostra/nasconde con l'attributo `hidden`.
- Su telefono: pannelli a tendina come pannelli in basso, aree toccabili 44 px, campi 16 px.
- Variare rispetto alle pagine fatte prima (anche chiaro/scuro) quando il contenuto lo permette.
- `base.html` non serve per un restyling.
- File con base64 enormi: non stampare grep senza limite; trovare le righe lunghe con `awk` e non leggerle.

## Aperti

1. **Adattamento dello stile al soggetto.** Ipotesi da verificare: il concept dovrebbe guidare i dettagli più dell'identità intera, e gli stili già apprezzati dell'archivio dovrebbero pesare di più quando il tema è adatto. Vedere se il metodo (SKILL.md, passi 2-3) va riscritto.
2. **Nuova generazione di prova** dopo le correzioni (da fare solo quando Giovanni lo permette, per i token).
3. **Non verificato**:
   - Script nell'ambiente Linux della chat di claude.ai (rete limitata, browser in `/opt/pw-browsers`).
   - Le modifiche recenti a `verifica.mjs` (filtri, `--solo`, scroll istantaneo).
   - Il caricamento reale su claude.ai e il comportamento dell'attivazione lì (provata solo con `claude -p`).
   - Test di attivazione in Claude Code con la variante con campo: il rilevatore non riconosce il formato dei comandi `/nome`; il comportamento è però stato confermato leggendo i log.
4. **Ottimizzazione della descrizione** con gli script di skill-creator (`run_loop.py`): costosa in token, da fare alla fine e solo se Giovanni lo vuole.
5. **Pacchetto**: per claude.ai togliere `disable-model-invocation` dal frontmatter (il validatore lo rifiuta) e impacchettare con `package_skill.py`. Per Claude Code installare la cartella con il campo. Ci va `pyyaml` installato per lo script di validazione (già installato nel PC di Giovanni).
6. Dettagli da ricontrollare nella ricerca (`08`): peso di SplitText (~4 KB gzip, sembra basso) e supporto di `oklch()`/`color-mix()`, dati senza fonte ufficiale (Baseline sì, ma non riverificato su MDN).

## Come riprendere

1. Leggere `README.md`, questo file e `03-decisioni.md` (decisioni 27-37).
2. Chiedere a Giovanni da quale punto ripartire; non rilanciare verifiche o generazioni senza il suo via.
3. Per costruire o modificare la skill usare `skill-creator` (obbligatorio, regola del progetto).
