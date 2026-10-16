# Progetto: rifacimento della skill `stile-siti`

## Cos'è

`stile-siti` è una skill personale di Giovanni che guida Claude nella creazione di siti, pagine HTML e interfacce **personali**. La versione attuale è un archivio di stili votati con poche regole, e produce quasi sempre lo stesso risultato (lo stile "terminale ciano") a prescindere dal contenuto.

L'obiettivo è trasformarla in una vera skill di **art direction e front-end**, versatile su qualsiasi tema: parte dal soggetto della pagina, inventa un concept visivo coerente (anche del tutto nuovo, non necessariamente presente in archivio), lo filtra attraverso il gusto di Giovanni e lo realizza in una pagina responsive, animata e verificata con screenshot prima della consegna.

## Cosa c'è in questa cartella

Questi documenti servono a **costruire** la skill. Non vanno inseriti nella skill finale.

| File | Contenuto |
|---|---|
| `01-analisi.md` | La skill attuale, il problema, le cause |
| `02-requisiti.md` | Tutti i requisiti concordati, funzionali e tecnici |
| `03-decisioni.md` | Registro delle decisioni prese nella discussione, con motivazioni |
| `04-architettura.md` | Struttura proposta della skill (cartelle, file, script) |
| `05-gusto-e-archivio.md` | Il gusto di Giovanni: voti, principi ricavati, cosa piace e cosa no |
| `06-ricerca.md` | Ricerca iniziale su tendenze, tecniche e anti-pattern. Base da approfondire |
| `07-piano-di-lavoro.md` | Fasi, attività, test e criteri di completamento, con lo stato attuale |
| `08-ricerca-approfondita.md` | Ricerca della Fase 1: versioni verificate, repertorio di direzioni, font, motion |
| `09-stato-e-prossimi-passi.md` | **Da leggere per riprendere il lavoro**: stato, risultati dei test, problemi aperti, cosa non è stato verificato |
| `skill/stile-siti/` | La skill in costruzione (SKILL.md, references, scripts, assets, evals) |
| `workspace/iteration-1/` | Pagine di prova generate con nuova e vecchia skill, più `revisione.html` per confrontarle |
| `workspace/iteration-2/` | Le stesse quattro pagine rigenerate dopo la riscrittura dei passi 2-3 (umore prima, soggetto come accento) |
| `workspace/iteration-3/` | Indice GitHub rigenerato con nuovo colore e catalogo di movimento esteso |
| `materiale/skill-attuale-SKILL.md` | Il SKILL.md attualmente in uso |
| `materiale/frontend-statico-estratto.md` | Regole di una versione precedente, recuperate da una vecchia chat |

## Come usarla con Claude Code

1. Crea una cartella di lavoro e copiaci dentro questi documenti.
2. Apri Claude Code nella cartella e chiedi di leggere prima `README.md`, poi tutti i file nell'ordine numerato.
3. Chiedi di seguire `07-piano-di-lavoro.md` fase per fase, fermandosi a ogni fase per l'approvazione.
4. La skill finale va prodotta in una sottocartella separata (es. `skill/stile-siti/`), pronta da zippare e caricare su Claude, o da copiare nella cartella delle skill di Claude Code.

## Regole di lavoro per chi costruisce la skill

- **Skill-creator obbligatorio**: la skill `skill-creator` va caricata prima di scrivere qualsiasi file della skill e usata per tutto il ciclo: struttura, scrittura, script, test e ottimizzazione della descrizione.
- **Prima si discute, poi si procede**: a ogni fase presentare cosa si intende fare e aspettare il via di Giovanni. Le domande e le discussioni vanno chiuse prima di iniziare il lavoro.
- **Solo attivazione manuale**: la skill parte esclusivamente quando Giovanni la richiama in modo esplicito, mai in base al contenuto della richiesta. È il requisito più importante, vedi `02-requisiti.md`.
- **Mai mischiare con il lavoro**: la skill non è pensata per attività lavorative (ServiceNow, clienti, widget).
- **Nessun commento nel codice** se non richiesto esplicitamente, e non rimuovere quelli esistenti nel codice fornito da Giovanni.
- Lingua dei file della skill: italiano.
