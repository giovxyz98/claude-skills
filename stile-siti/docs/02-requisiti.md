# 02 — Requisiti

I requisiti sono numerati per poterli citare nei test. **Obbligatorio** = la skill non è pronta se manca.

## A. Attivazione e confini

| ID | Requisito | Priorità |
|---|---|---|
| A1 | **Attivazione solo manuale.** La skill parte esclusivamente quando Giovanni la richiama in modo esplicito (per nome, es. "usa stile-siti", o come comando). Mai in base al contenuto della richiesta: una richiesta come "scrivimi una pagina per fare X" senza richiamo **non** la attiva. È il requisito più importante. | Obbligatorio |
| A2 | La **descrizione** della skill deve dirlo in modo chiaro e prima di tutto il resto: "usare solo se Giovanni la richiama esplicitamente per nome". Deve reggere da sola, perché non è certo che ogni ambiente rispetti i campi del frontmatter. | Obbligatorio |
| A3 | Dove l'ambiente lo supporta (Claude Code), il frontmatter blocca anche tecnicamente l'attivazione automatica (`disable-model-invocation: true`). Verificare in Claude Code il nome esatto del campo e se la chat di Claude lo rispetta o lo rifiuta al caricamento. | Obbligatorio |
| A4 | **Lavoro**: la skill non è pensata per il lavoro (ServiceNow, Service Portal, widget, UI Builder, Figma di progetto, clienti come Terna, Enel, ACEA, GSE, Accenture, GI Group, portali aziendali). Se Giovanni la richiama su una richiesta con contesto lavorativo, lo segnala in una riga e chiede conferma prima di procedere. | Obbligatorio |
| A5 | Una volta richiamata, dichiara in una riga il concept scelto (es. "concept: mercato di frutta al mattino"). | Obbligatorio |
| A6 | Quando è richiamata ha **precedenza** sulle altre skill di design generiche (es. `frontend-design`) e, per tutto ciò che riguarda lo stile, sulle istruzioni interne di Claude per le pagine pubblicate come artifact; queste ultime restano valide solo per i vincoli tecnici di pubblicazione. | Obbligatorio |

## B. Metodo di progettazione

| ID | Requisito | Priorità |
|---|---|---|
| B1 | Lo stile nasce dal **soggetto** della pagina: prima si individuano tema, pubblico e atmosfera, poi si definisce un **concept visivo** preso dal mondo reale (luoghi, materiali, epoche, oggetti, movimenti artistici). Da lì derivano palette, font, texture, forme e tipo di movimento. | Obbligatorio |
| B2 | Il **gusto di Giovanni** (`05-gusto-e-archivio.md`) fa da filtro su ogni concept: profondità sì, piatto no, font con carattere, monospace come dettaglio, niente tipografico puro, niente caos di colori vivaci. | Obbligatorio |
| B3 | L'**archivio degli stili votati** è ispirazione, non un menu da cui pescare. I voti non sono una classifica. | Obbligatorio |
| B4 | Gli stili molto connotati si usano solo sui temi adatti: terminale ciano, HUD e blueprint solo su contenuti tecnici o da sviluppatore; art déco e notturno su temi eleganti o serali; fumetto e simili su temi giocosi. | Obbligatorio |
| B5 | Varietà: non riproporre per default lo stesso stile su pagine diverse. Ogni progetto ha la sua identità. | Obbligatorio |
| B6 | **Chiaro o scuro** lo decide il concept. La doppia versione (o il selettore) solo su richiesta esplicita. | Obbligatorio |
| B7 | Lista **anti-generico**: evitare i segni tipici delle pagine "fatte dall'AI" (vedi `06-ricerca.md`). | Obbligatorio |
| B8 | Struttura per **tipo di pagina** (landing, pagina personale, tool, dashboard, gestionale, raccolta): sezioni e priorità adatte a ciascuno. | Obbligatorio |
| B9 | **Lo stile può non essere in archivio.** Né l'archivio dei voti né il repertorio delle direzioni (C1) sono elenchi chiusi: per ogni soggetto si può inventare una direzione del tutto nuova, purché passi il filtro del gusto (B2). Inventare è il comportamento normale, non un'eccezione. | Obbligatorio |

## C. Libreria di riferimento

La skill deve includere materiale di riferimento, caricato solo quando serve, su:

| ID | Area | Contenuto atteso |
|---|---|---|
| C1 | Direzioni estetiche | Ampio repertorio di direzioni e riferimenti visivi, ben oltre gli stili già votati, con quando usarli. È uno stimolo, non un nuovo menu: lo stile finale può non comparire nel repertorio (B9) |
| C2 | Tipografia | Abbinamenti di font per atmosfera, scala dei titoli, gerarchia, uso del monospace come dettaglio |
| C3 | Colore | Come costruire una palette dal concept, proporzioni dominante/secondario/accento, gradienti e bagliori, contrasto |
| C4 | Layout | Composizioni per evitare l'effetto template (hero asimmetrici, split, bento, storytelling a scroll, sezioni sovrapposte, griglie rotte) |
| C5 | Motion | Animazioni con tempi ed easing: entrate scaglionate, reveal del testo, parallax, scroll-driven, micro-interazioni, contatori, marquee, effetti al cursore |
| C6 | Materia e dettagli | Grana/noise, mesh gradient, pattern, vetro, ombre, forme SVG semplici |
| C7 | Componenti | Bottoni, card, navigazione, form, stati vuoti, con hover/focus/active sempre curati |
| C8 | Proprietà CSS moderne | L'elenco della skill attuale (da conservare) più le funzionalità recenti utili (vedi `06-ricerca.md`) |

## D. Costruzione della pagina

| ID | Requisito | Priorità |
|---|---|---|
| D1 | Output di default: **un unico file HTML** autonomo. Altri formati (progetto multi-file, framework) solo se richiesti, mantenendo le stesse regole di stile. | Obbligatorio |
| D2 | **Tailwind sempre compilato** e incorporato nella pagina, tramite uno script della skill che Claude lancia in automatico. Mai il CDN di Tailwind. | Obbligatorio |
| D3 | **Mobile first**: la maggior parte delle pagine personali viene usata dal telefono, quindi si progetta prima per il telefono e poi si allarga a tablet e desktop, senza trascurare il desktop. Dettagli nella sezione D2. | Obbligatorio |
| D4 | **Animata e viva**: entrate in scena, hover con risposta, transizioni morbide, elementi di sfondo in movimento lento dove lo stile lo permette. Misura: il troppo storpia. | Obbligatorio |
| D5 | Uso delle **proprietà CSS moderne** dell'elenco, quando servono e senza esagerare. | Obbligatorio |
| D6 | **Librerie JS leggere** (es. GSAP, Lenis) usate quasi sempre: escluse solo le pagine veramente minime. **Niente 3D** (Three.js, WebGL) né librerie pesanti. | Obbligatorio |
| D6b | **Criterio sul peso**, ragionato e non a numero fisso: ogni libreria deve guadagnarsi il posto (se una cosa viene bene in CSS si fa in CSS); mai due librerie che fanno la stessa cosa; si caricano solo i moduli e plugin effettivamente usati; il peso si valuta rispetto al tipo di pagina (una landing curata può permettersi più di una paginetta semplice); attenzione particolare alle prestazioni su telefono. | Obbligatorio |
| D6c | Librerie da CDN sempre con **versione fissa** nell'indirizzo, mai "ultima versione", così una pagina non si rompe con gli aggiornamenti. | Obbligatorio |
| D7 | Librerie e font **caricati da internet** per default. Versione **offline** (tutto incorporato nel file: librerie, font) solo su richiesta esplicita. | Obbligatorio |
| D8 | **Immagini**: forme decorative SVG semplici (onde, blob, pattern, linee), icone da una libreria leggera, effetti in CSS. Niente illustrazioni SVG complesse disegnate a mano (troppi token), salvo richiesta. Foto o segnaposto per foto solo quando il tema lo chiede o su richiesta. | Obbligatorio |
| D9 | **Testi veri e plausibili**, in italiano salvo richiesta diversa, mai lorem ipsum o segnaposto vuoti. | Obbligatorio |
| D10 | `prefers-reduced-motion` rispettato, focus visibile, contrasto sufficiente. | Obbligatorio |
| D11 | Animazioni performanti: preferire `transform` e `opacity`; animazioni scroll-driven con fallback progressivo. | Obbligatorio |
| D12 | **Nessun commento nel codice** se non richiesto. | Obbligatorio |
| D13 | Non usare la skill che produce React compilato e minificato (`web-artifacts-builder`) per queste pagine. | Obbligatorio |
| D14 | **Rifiniture di pubblicazione** (le pagine vengono pubblicate su Netlify): ogni pagina esce con titolo della scheda, favicon a tema (anche SVG inline o emoji), `theme-color` per la barra del browser su mobile, e meta per l'anteprima dei link su WhatsApp/Telegram (titolo, descrizione, immagine se disponibile). | Obbligatorio |

## D2. Mobile

| ID | Requisito | Priorità |
|---|---|---|
| H1 | Progettazione dal telefono (≈360–430px) verso l'alto: layout che si riorganizza, nessuno scroll orizzontale, titoli con `clamp()` o classi responsive. | Obbligatorio |
| H2 | **Touch**: ogni effetto hover ha un equivalente al tocco (stato `:active`, feedback visivo); effetti legati al cursore e hover complessi disattivati sui dispositivi touch (`@media (hover: hover) and (pointer: fine)`). | Obbligatorio |
| H3 | Aree toccabili comode (almeno ~44px), azioni principali raggiungibili col pollice, spazi sufficienti tra elementi cliccabili. | Obbligatorio |
| H4 | Navigazione pensata per il telefono: menu adatti, barre fisse dove servono, niente elementi minuscoli o affollati. | Obbligatorio |
| H5 | Animazioni fluide anche su telefoni meno potenti: preferire `transform` e `opacity`, limitare blur e `backdrop-filter` pesanti e gli effetti sempre attivi in background; eventualmente versioni alleggerite su mobile. | Obbligatorio |
| H6 | Rispetto di notch e barre di sistema (`env(safe-area-inset-*)`, `viewport-fit=cover`), altezze con `dvh`/`svh` invece di `vh`, tastiera che non copre i campi dei form, niente zoom indesiderato sugli input (testo ≥16px). | Obbligatorio |
| H7 | Il desktop non va trascurato: su schermi larghi la pagina deve sfruttare lo spazio e restare curata, non essere la versione mobile stirata. | Obbligatorio |

## E. Verifica

| ID | Requisito | Priorità |
|---|---|---|
| E1 | Prima di consegnare, uno **script** fa gli screenshot e Claude li guarda davvero. Il mobile è la vista principale, con più larghezze di telefono (es. 360, 390, 430px) ed emulazione touch; poi tablet e desktop. | Obbligatorio |
| E2 | Controlli automatici: scroll orizzontale su mobile, testo che esce dai contenitori, elementi sovrapposti, immagini rotte, font non caricati, contrasto, errori in console. | Obbligatorio |
| E3 | Gli screenshot si fanno sulla pagina con librerie **e font** scaricati in locale, così il risultato verificato è identico a quello che vede Giovanni (nell'ambiente di Claude la rete esterna può essere limitata). | Obbligatorio |
| E4 | La verifica completa gira **una volta alla fine**, non a ogni modifica, per contenere tempi e messaggi. | Obbligatorio |
| E5 | Verifica che le animazioni partano davvero (es. screenshot a tempi diversi o controllo degli stati). | Desiderabile |

## F. Script della skill

Gli script devono funzionare sia nella chat di Claude (ambiente Linux con bash, Python, Node e Chromium headless via Playwright, verificato) sia in Claude Code.

| ID | Script | Funzione |
|---|---|---|
| F1 | Build | Compila Tailwind con le sole classi usate e lo incorpora nell'HTML |
| F2 | Verifica | Screenshot multi-dispositivo e controlli automatici (sezione E) |
| F3 | Offline | Scarica librerie e font usati e li incorpora nel file, solo su richiesta |
| F4 | Palette | Dal colore base del concept genera la scala e controlla i contrasti |

## G. Rimandato a dopo

Idee valide che non fanno parte di questa versione:

- Votare le pagine create e aggiornare automaticamente l'archivio dei gusti.
- Catalogo di varianti da votare per esplorare nuovi gusti.

Il lavoro (ServiceNow, clienti, widget) **non** è un'idea rimandata: è escluso in modo permanente, vedi A4. Anche l'attivazione automatica non è rimandata: è esclusa in modo definitivo, vedi A1.
