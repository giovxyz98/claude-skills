# 07 — Piano di lavoro

Ogni fase si chiude con una presentazione a Giovanni e si passa alla successiva **solo dopo il suo via**.

## Stato al 16/10/2026

| Fase | Stato |
|---|---|
| 0 Allineamento | fatta |
| 1 Ricerca approfondita | fatta (`08-ricerca-approfondita.md`) |
| 2 Scrittura della skill | fatta (`skill/stile-siti/`) |
| 3 Script | fatta, provati sul PC di Giovanni (Windows, Node 22); non provati nell'ambiente Linux di claude.ai |
| 4 Test | attivazione fatta (14/14 con la sola descrizione); qualità: 4 pagine generate con nuova e vecchia skill, giudizio di Giovanni parziale (nessun voto ancora). Verifiche visive sospese per risparmiare token |
| 5 Revisione e consegna | da fare. Giovanni ha detto che siamo a circa il 50% del lavoro: non preparare lo zip finché non lo dice lui |

Dettaglio e prossimi passi in `09-stato-e-prossimi-passi.md`.

## Fase 0 — Allineamento

- Leggere tutti i documenti.
- Riassumere a Giovanni in poche righe cosa si costruirà e segnalare eventuali dubbi o contraddizioni tra i documenti.
- Uscita: via di Giovanni.

## Fase 1 — Approfondimento della ricerca

Partendo da `06-ricerca.md`:

- **Estetica**: costruire un repertorio ampio di direzioni visive e concept (movimenti artistici, materiali, luoghi, epoche, oggetti, ambienti), studiando siti premiati e portfolio. Ogni direzione con: atmosfera, temi adatti, palette tipo, font tipo, materia, motion tipico.
- **Tipografia**: abbinamenti di font (Google Fonts) per atmosfera, verificandone disponibilità e pesi.
- **Motion**: catalogo di pattern di animazione con tempi ed easing consigliati e codice minimo (CSS puro, IntersectionObserver, GSAP, Lenis).
- **Tecnica**: verificare lo stato attuale delle funzionalità CSS segnate "da verificare"; scegliere versione di Tailwind e approccio di build.
- Filtrare tutto attraverso il gusto di Giovanni (`05-gusto-e-archivio.md`).
- Uscita: sintesi della ricerca da approvare.

## Fase 2 — Scrittura della skill

- Caricare la skill `skill-creator` e seguirne le indicazioni per tutta la costruzione (obbligatorio).
- Creare la struttura di `04-architettura.md` in `skill/stile-siti/`.
- Scrivere prima la **descrizione** e la **barriera lavoro**, poi il metodo, poi i riferimenti.
- Riferimenti scritti per essere usati: indicazioni concrete ed esempi brevi, non trattati.
- Uscita: SKILL.md e riferimenti da rivedere.

## Fase 3 — Script

- Build Tailwind, verifica, offline, palette (requisiti F1–F4).
- Testarli prima su una pagina di prova, poi nell'ambiente previsto.
- Uscita: script funzionanti con istruzioni d'uso nel SKILL.md.

## Fase 4 — Test con skill-creator

Usare la skill `skill-creator` (obbligatorio) per valutare la skill su richieste di prova.

**Attivazione — senza richiamo non deve attivarsi**
1. "Fammi una pagina per tenere traccia della mia dieta settimanale"
2. "Crea una pagina per il viaggio a Madrid con l'itinerario"
3. "Una landing per presentare la mia app di prenotazioni per cinema e teatri"
4. "Una pagina indice dei miei progetti personali su GitHub"
5. "Mi fai il widget della homepage del portale PSD?"
6. "Restyling della pagina del catalogo servizi nel Service Portal"
7. "Card per Enel come da Figma"
8. "Mi serve l'HTML di un widget AngularJS per una lista di record"

**Attivazione — con richiamo esplicito deve attivarsi**
9. Le richieste 1–4 precedute da "usa stile-siti" (o dal comando della skill).

**Con richiamo su contesto lavorativo — deve segnalarlo e chiedere conferma**
10. "Usa stile-siti per il widget della homepage del portale PSD"
11. "Usa stile-siti: pagina per il cliente con i record della tabella"

**Qualità — sulle pagine generate**
- Stile coerente col tema e diverso tra pagine diverse; terminale ciano ammesso solo sul caso 4.
- Almeno una pagina con uno stile che non è in archivio.
- Dichiarazione iniziale con il concept.
- Mobile first: perfetta a 360, 390 e 430px senza scroll orizzontale, effetti utilizzabili al tocco, aree toccabili comode; curata anche su desktop.
- Animazioni presenti e fluide; librerie leggere usate con criterio e a versione fissa; testi veri in italiano; nessun commento nel codice; nessuno dei segni anti-generico.
- Titolo, favicon, theme-color e meta di anteprima presenti.
- Script di build e verifica eseguiti, screenshot guardati.

Se un caso senza richiamo (1–8) attiva la skill: correggere descrizione e frontmatter e ripetere. Ripetere i casi 1–11 anche nella chat di Claude, non solo in Claude Code.

- Uscita: report dei test e pagine di esempio con screenshot, da far valutare a Giovanni.

## Fase 5 — Revisione e consegna

- Correzioni in base al giudizio di Giovanni.
- Rivedere la descrizione con lo `skill-creator` (obbligatorio) con un obiettivo preciso: che non si attivi mai da sola e che si attivi sempre quando richiamata per nome.
- Impacchettare `skill/stile-siti/` in uno ZIP pronto da caricare su Claude e, se serve, installare la copia per Claude Code.

## Criteri di completamento

- Tutti i requisiti obbligatori di `02-requisiti.md` soddisfatti.
- Zero attivazioni senza richiamo esplicito nei test.
- Giovanni approva almeno tre pagine di esempio su temi diversi.

## Idee future (fuori ambito)

- Votare le pagine create e aggiornare automaticamente l'archivio dei gusti.
- Catalogo di varianti da votare per esplorare nuove direzioni.
