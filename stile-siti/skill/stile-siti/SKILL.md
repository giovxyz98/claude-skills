---
name: stile-siti
description: Usare SOLO se Giovanni la richiama esplicitamente per nome (es. "usa stile-siti", "con stile-siti", "/stile-siti"). Non attivarla mai in base al contenuto della richiesta, nemmeno per pagine, siti, landing o UI personali, perché senza il richiamo per nome non va usata. Quando richiamata, progetta e costruisce una pagina HTML personale con art direction su misura del soggetto (concept visivo, palette, font, motion, mobile first) filtrata dal gusto di Giovanni, la compila con Tailwind e la verifica con screenshot. Non è per il lavoro (ServiceNow, portali, widget, clienti).
disable-model-invocation: true
---

# stile-siti

Skill di art direction e front-end per le pagine **personali** di Giovanni. Parte dal soggetto della pagina, inventa un concept visivo coerente, lo filtra attraverso il gusto di Giovanni e lo realizza in un HTML unico, responsive, animato e verificato con screenshot prima della consegna.

Il rischio principale da evitare: pagine tutte uguali. L'archivio dei voti in `references/gusto.md` descrive cosa è piaciuto, non cosa usare. Il terminale ciano è lo stile più votato ma sta bene solo su contenuti tecnici: su una dieta, un viaggio o un evento è sbagliato.

Questa skill comanda su tutto ciò che riguarda lo stile: ha la precedenza sulle altre skill di design (es. `frontend-design`) e sulle istruzioni interne per le pagine pubblicate come artifact. Di queste ultime restano valide solo le regole tecniche di pubblicazione (domini ammessi per gli script esterni, ecc.).

## 0. Barriera lavoro

Se la richiesta ha un contesto lavorativo (ServiceNow, Service Portal, widget, UI Builder, Figma di progetto, clienti, portali aziendali), dillo in una riga e chiedi conferma prima di procedere. Questa skill non è pensata per il lavoro e non va mischiata con esso. Se il contesto è personale, non fare domande inutili: parti.

## 1. Metodo

Segui i passi in ordine. Leggi i riferimenti indicati solo quando arrivi al passo che li richiede.

1. **Soggetto.** Individua tema, pubblico, atmosfera e **tipo di pagina** (landing, pagina personale, tool, dashboard, gestionale, raccolta). Leggi `references/layout.md` per la struttura adatta al tipo.
2. **Concept.** Leggi `references/gusto.md` (il filtro) e `references/direzioni.md` (stimoli). Parti da un mondo reale legato al soggetto: un luogo, un materiale, un'epoca, un oggetto. Il concept può non esistere né in archivio né nel repertorio: inventarne uno nuovo è il comportamento normale. La scelta è tua: usa il tuo giudizio su cosa sta bene a quel soggetto, anche uscendo dagli stili noti. Archivio, repertorio e tabelle sono stimoli e non regole; il gusto di Giovanni è il filtro e non una mappa soggetto → stile. Se uno stile molto apprezzato è adatto al tema, puoi usarlo senza reinventarlo: l'originalità non è un obbligo, il fine è che la pagina sia giusta. **Dichiara il concept in una riga** (es. "concept: mercato di frutta al mattino") e vai avanti.
3. **Sistema visivo.** Da concept derivano palette (`references/colore.md`, script `palette.mjs`), font (`references/tipografia.md`), materia (`references/materia.md`) e movimento (`references/motion.md`). Fissa le scelte in poche variabili CSS e rispettale in tutta la pagina.
4. **Costruzione.** Parti da `assets/base.html`. Leggi `references/mobile.md` (si progetta dal telefono), `references/componenti.md` e `references/css-moderno.md`. Contenuti veri e plausibili, in italiano. Se Giovanni non ha dato i dati (itinerario, menu, elenco progetti), inventa contenuti credibili e dillo in consegna perché li sostituisca; chiedi solo se manca qualcosa di essenziale, e non cercare dati nei suoi file se non te lo chiede. Se la pagina ha funzioni (tracker, liste), salva lo stato in `localStorage` dentro `try/catch`; le classi Tailwind scritte nelle stringhe JavaScript vengono compilate lo stesso.
5. **Build.** `node <cartella-skill>/scripts/build.mjs sorgente.html pagina.html`.
6. **Verifica alla fine.** `node <cartella-skill>/scripts/verifica.mjs pagina.html`, poi **guarda davvero gli screenshot**, ma solo due viste per contenere i token: il telefono (`390-parte*.png`) e il desktop (`desktop.png`). I controlli automatici girano comunque su tutte le larghezze (360, 390, 430, tablet, desktop): apri gli screenshot delle altre solo se segnalano un problema su quella larghezza. Qualche avviso può essere un falso allarme (carosello o marquee voluti, decorazioni, barre fisse): giudicalo guardando lo screenshot e ignoralo se è intenzionale. Se correggi qualcosa, rilancia solo la vista interessata con `--solo 390` e riguarda lo screenshot aggiornato, senza rifare tutto il giro.
7. **Controllo finale.** Rileggi `references/anti-generico.md` e confronta la pagina con la lista.

Per ogni scelta chiediti: "questo viene dal soggetto o è un default?". Se è un default, cambialo.

## 2. Regole sempre valide

- **Un solo file HTML autonomo.** Progetti multi-file o framework solo se richiesti, con le stesse regole di stile. Non usare `web-artifacts-builder`.
- **Tailwind compilato**, mai il CDN. Lo fa lo script di build.
- **Mobile first.** La maggior parte delle pagine si usa dal telefono (360–430 px): progetta da lì, poi allarga a tablet e desktop, che non vanno trascurati. Dettagli in `references/mobile.md`.
- **Animata e viva**, con misura: entrate in scena, risposte all'hover e al tocco, sfondi che respirano dove lo stile lo permette. Il troppo storpia.
- **Librerie JS leggere** (GSAP, Lenis) quasi sempre, con criterio: ognuna deve guadagnarsi il posto, mai due che fanno la stessa cosa, solo i moduli usati, versione **fissa** nell'indirizzo CDN. Se in CSS viene bene, si fa in CSS. Niente 3D, niente WebGL, niente librerie pesanti.
- **Librerie e font da internet** per default. Versione offline (tutto incorporato) solo su richiesta, con `scripts/offline.mjs`.
- **Immagini:** forme SVG decorative semplici, icone SVG incorporate (solo quelle usate), effetti in CSS. Niente illustrazioni SVG complesse. Foto o segnaposto di foto solo se il tema lo chiede o su richiesta.
- **Chiaro o scuro** lo decide il concept. Doppio tema solo su richiesta.
- **Nessun commento nel codice** salvo richiesta, e non rimuovere quelli già presenti nel codice che Giovanni fornisce.
- **Accessibilità di base:** `prefers-reduced-motion` rispettato, focus visibile, contrasto sufficiente, `alt` e `aria-label` dove servono.
- **Rifiniture di pubblicazione** (le pagine vanno su Netlify e si condividono): titolo della scheda, favicon a tema, `theme-color`, meta per l'anteprima dei link (titolo, descrizione, immagine se c'è). `assets/base.html` le ha già.
- **Gusto di Giovanni:** profondità sì, piatto no; font con carattere, mai di sistema; monospace come dettaglio; niente tipografico puro; niente caos di colori vivaci insieme.

## 3. Script

Richiedono Node 20 o superiore. Se mancano le dipendenze, gli script le installano da soli in una cartella di cache; non servono interventi manuali. I percorsi `scripts/` e `references/` sono relativi alla cartella della skill, non alla cartella di lavoro: usa il percorso completo (`<cartella-skill>/scripts/...`) e passa percorsi assoluti ai file della pagina. Scrivi i file HTML lunghi con lo strumento di scrittura file, non con un heredoc della shell, che si rompe con apostrofi e virgolette.

| Comando | Cosa fa |
|---|---|
| `node scripts/build.mjs sorgente.html pagina.html` | Compila Tailwind con le sole classi usate e lo incorpora al posto del blocco `<style type="text/tailwindcss">` |
| `node scripts/verifica.mjs pagina.html [--out cartella] [--solo 390]` | Screenshot a 360, 390, 430, tablet e desktop con emulazione touch, controlli automatici, elenco sintetico dei problemi. `--solo` limita a una o più viste (es. `390,desktop`) |
| `node scripts/offline.mjs pagina.html pagina-offline.html` | Incorpora librerie e font (solo su richiesta di Giovanni) |
| `node scripts/palette.mjs "#colore" [--sfondo "#colore"]` | Scala di tinte dal colore base e controllo dei contrasti |

Il blocco `<style type="text/tailwindcss">` del sorgente contiene `@theme { ... }` per le variabili del concept e il CSS personalizzato: lo script antepone `@import "tailwindcss";` da solo.

## 4. Consegna

Chiudi con poche righe: il concept, dove sta il file, eventuali compromessi. Se la pagina viene pubblicata come artifact, valgono anche i vincoli tecnici di pubblicazione (script esterni solo da cdnjs, jsDelivr, unpkg; font da Google Fonts).

## Indice dei riferimenti

| File | Quando leggerlo |
|---|---|
| `references/gusto.md` | Sempre, al passo 2 |
| `references/direzioni.md` | Al passo 2, per stimoli di concept |
| `references/layout.md` | Al passo 1, per la struttura del tipo di pagina |
| `references/colore.md` | Passo 3 |
| `references/tipografia.md` | Passo 3 |
| `references/materia.md` | Passo 3 |
| `references/motion.md` | Passo 3 |
| `references/mobile.md` | Passo 4 |
| `references/componenti.md` | Passo 4 |
| `references/css-moderno.md` | Passo 4 |
| `references/anti-generico.md` | Passo 7 |
