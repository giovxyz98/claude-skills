# 03 — Registro delle decisioni

Decisioni prese da Giovanni durante la discussione, con la motivazione. Servono a non riaprire questioni già chiuse.

| # | Tema | Decisione | Motivo |
|---|---|---|---|
| 1 | Approccio | Non ritoccare la skill attuale ma rifarla come skill di art direction versatile | Le correzioni minime la lasciavano rigida |
| 2 | Ricette per stile | Scartate | Pagine tutte uguali, nessuna creatività |
| 3 | Cuore della skill | Metodo: concept dal soggetto → filtro del gusto → realizzazione. Archivio come ispirazione | Versatilità su qualsiasi tema |
| 4 | Ampiezza | Libreria completa (tipografia, colore, layout, motion, materia, componenti, anti-generico, tipi di pagina, verifica) | La sola impostazione a metodo era "troppo poco" |
| 5 | Ricerca | Ricerca iniziale fatta in chat (`06-ricerca.md`); Claude Code la deve **approfondire**, non solo sul piano tecnico ma anche estetico (direzioni, riferimenti, siti premiati) | Base completa subito, approfondimento con più tempo |
| 6 | Attivazione | **Solo manuale**, su richiamo esplicito di Giovanni. Scelta definitiva (sostituisce la precedente attivazione automatica sui siti personali) | L'attivazione automatica non è deterministica: impossibile garantire che non scatti mai sul lavoro |
| 7 | Lavoro | La skill non è per il lavoro; se richiamata su un contesto lavorativo lo segnala e chiede conferma | Non mischiare mai personale e lavoro |
| 8 | Conferma | Una volta richiamata parte e dichiara il concept in una riga; chiede solo se il contesto è lavorativo | Domanda solo dove serve davvero |
| 9 | Fallback attivazione | Superato: l'attivazione manuale è già la scelta definitiva (decisione 6) | |
| 10 | Nome | Resta `stile-siti` | Riconoscibile; l'attivazione dipende dalla descrizione, non dal nome |
| 11 | Formato output | Un HTML unico di default; altro solo se richiesto, con le stesse regole di stile | |
| 12 | Tailwind | Sempre compilato tramite script automatico della skill | Più leggero, nessuna dipendenza da CDN; il fastidio della vecchia skill sparisce perché lo fa lo script |
| 13 | Librerie JS | Leggere (GSAP, Lenis…) quasi sempre, escluse le pagine veramente minime. Niente 3D né librerie pesanti | Il "vivo" fa un salto di livello senza appesantire troppo |
| 14 | Offline | Librerie e font da internet di default; tutto incorporato solo su richiesta | La maggior parte delle pagine non serve offline |
| 15 | Chiaro/scuro | Lo decide il concept; doppio tema solo su richiesta | |
| 16 | Immagini | SVG decorativi semplici + icone da libreria + effetti CSS. Niente SVG illustrativi complessi | Gli SVG elaborati consumano molti token |
| 17 | Testi | Veri e plausibili in italiano, mai lorem ipsum | Il segnaposto fa sembrare finta la pagina |
| 18 | Precedenza | Sullo stile vince `stile-siti`, sia sulle skill di design generiche sia sulle istruzioni interne per gli artifact (che restano valide solo per i vincoli tecnici) | Giovanni vuole che comandi il suo gusto |
| 19 | Script | Inclusi nella skill (build, verifica, offline, palette) | Più esecuzione per pagina, ma molti meno errori e giri di correzione |
| 20 | Voti sulle pagine create | Fuori ambito per ora | Prima finire la skill e usarla |
| 21 | Vecchie regole "frontend statico" | Recuperate: HTML unico, Tailwind compilato (ora via script), verifica con screenshot, niente commenti, accessibilità base, niente React compilato, attivazione solo manuale (vedi decisione 6). Cambiata: font incorporati solo in versione offline. Escluso: catalogo varianti | La vecchia pipeline era macchinosa |
| 22 | Mobile | Mobile first e trattato in modo approfondito (touch, pollice, navigazione, prestazioni, notch, tastiera), senza trascurare il desktop | Le pagine personali si usano soprattutto dal telefono |
| 23 | Versioni librerie | Sempre fisse negli indirizzi CDN | Evitare che una pagina si rompa con gli aggiornamenti |
| 24 | Rifiniture | Titolo, favicon, colore della barra e anteprima dei link in ogni pagina | Le pagine vengono pubblicate su Netlify e condivise |
| 25 | Peso | Criterio ragionato, non numero fisso | Ogni libreria deve giustificare il suo costo |
| 26 | Stili fuori archivio | Lo stile può non essere in archivio: si inventano direzioni nuove per ogni soggetto, filtrate dal gusto | L'archivio non è un elenco chiuso, altrimenti torna a essere un menu |
| 27 | Lingua | Skill e riferimenti in italiano; messaggi degli script in italiano | Giovanni la mantiene e la legge; il risparmio di token dell'inglese è trascurabile |
| 28 | Script | Scritti in Node (`.mjs`), non bash | Girano uguali su Windows, Linux e Claude Code |
| 29 | Struttura cartelle | `skill/stile-siti/` con `references/`, `scripts/`, `assets/` (nomi standard di skill-creator) | Coerenza con gli strumenti di skill-creator |
| 30 | Interruttore on/off su claude.ai | Non lo vuole usare | Scomodo; l'attivazione manuale si affida a descrizione e frontmatter |
| 31 | Campo `disable-model-invocation` | Tenuto per Claude Code; **tolto dallo zip per claude.ai** | Il validatore di skill-creator lo rifiuta (campi ammessi: name, description, license, allowed-tools, metadata, compatibility) |
| 32 | Bootstrap | Escluso. Colonne responsive con la griglia di Tailwind | Doppione di Tailwind, aspetto generico, perde le variabili del concept |
| 33 | Verifica visiva | Controlli automatici su tutte le larghezze, ma si guardano solo gli screenshot del telefono (390 px) e del desktop; opzione `--solo` per rilanciare una vista | Le immagini consumano molti token |
| 34 | Scelta dello stile | Affidata al giudizio del modello; archivio, repertorio e tabelle sono stimoli, non mappe soggetto → stile. Niente regole del tipo "se cinema usa X" | Richiesta esplicita di Giovanni; evita rigidità |
| 35 | Cosa contiene `gusto.md` | Il gusto, non i progetti. Si aggiorna solo con segnali generali, non con casi isolati | Dopo molti siti l'elenco diventerebbe lungo e contraddittorio |
| 36 | Dati mancanti nelle pagine | Si inventano contenuti plausibili e lo si dichiara in consegna; non si cercano dati nei file di Giovanni se non richiesto | Un agente di prova aveva cercato i repository nei remote git locali |
| 37 | Etichette `~/qualcosa` | Solo su pagine tecniche; negli altri casi l'etichetta dice qualcosa di vero sul contenuto | Compariva come ornamento fisso in tutte le pagine (copiato da `base.html`) |
| 38 | Concept: umore prima, soggetto come accento | Il concept parte da chi usa la pagina e in che momento; il mondo del soggetto dà uno o due dettagli, non l'intera identità. Identità (palette, materia, tipografia) dal gusto e dall'umore | Le pagine dell'iterazione 1 erano "troppo teatrali" (scenografie letterali del tema). L'iterazione 2 ha risolto: a Giovanni piacciono tutte |
| 39 | Movimento: tutto il catalogo, combinato | `.rivela` resta ma si combina con altri effetti (scroll-driven, schede impilate, maschere, barra di avanzamento, alone sul puntatore, ecc.); gli effetti scelti si dichiarano con il concept | Nell'iterazione 2 tutte e quattro le pagine avevano solo `.rivela` (pronto in `base.html`) e sembravano copie. Il passo 3 è ora esplicito sul movimento |
| 40 | Restyling di una pagina esistente | Sezione dedicata in `SKILL.md`: copia, logica e `id` intatti, niente `base.html`, avvisi su dipendenze da server | Caso frequente, emerso dalle prove su due pagine reali di Giovanni |
| 41 | Costo delle prove | Generare HTML con agenti costa ~80-97k token a pagina; gli SVG sono il 4-15% del sorgente e non sono la causa. Screenshot e loro controllo restano sospesi finché Giovanni non li riabilita (nella skill restano) | I token sono il vincolo principale di Giovanni |
