# 04 — Architettura proposta della skill

Proposta di partenza: Claude Code può modificarla motivando le scelte.

## Principio

Una skill è una cartella con `SKILL.md` alla radice. Claude carica sempre la **descrizione**; il corpo di `SKILL.md` quando la skill si attiva; i file di riferimento **solo quando servono**. Quindi:

- `SKILL.md` snello: confini, metodo, regole obbligatorie, indice dei riferimenti.
- Riferimenti ricchi in file separati, letti in base alla fase del lavoro.
- Script per tutto ciò che è meccanico e ripetibile.

## Struttura

```
stile-siti/
├── SKILL.md
├── riferimenti/
│   ├── gusto.md              voti, principi ricavati, cosa piace e cosa no
│   ├── direzioni.md          repertorio di direzioni estetiche e concept, con quando usarle
│   ├── tipografia.md         abbinamenti per atmosfera, scale, gerarchia
│   ├── colore.md             palette dal concept, proporzioni, gradienti, bagliori, contrasto
│   ├── layout.md             composizioni anti-template, struttura per tipo di pagina
│   ├── mobile.md             mobile first, touch, pollice, navigazione, prestazioni, safe area
│   ├── motion.md             animazioni, tempi, easing, scroll-driven, librerie leggere
│   ├── materia.md            grana, mesh gradient, vetro, pattern, forme SVG semplici
│   ├── componenti.md         bottoni, card, nav, form, stati
│   ├── css-moderno.md        proprietà da usare, funzionalità recenti e fallback
│   └── anti-generico.md      segni del "fatto dall'AI" da evitare
├── script/
│   ├── build.*               compila Tailwind e lo incorpora (F1)
│   ├── verifica.*            screenshot multi-dispositivo e controlli (F2)
│   ├── offline.*             incorpora librerie e font (F3)
│   └── palette.*             scala colori e contrasti (F4)
└── modelli/
    └── base.html             scheletro minimo (head con titolo, favicon, theme-color e meta di anteprima, viewport con safe area, font, librerie a versione fissa, reduced-motion, observer)
```

## Contenuto di `SKILL.md`

1. **Frontmatter**: descrizione che dice prima di tutto "usare solo se Giovanni la richiama esplicitamente per nome", poi cosa fa; dove supportato, il campo che disattiva l'attivazione automatica (`02-requisiti.md`, A1–A3). Deve restare sotto il limite di lunghezza delle descrizioni.
2. **Controllo lavoro**: se il contesto della richiesta è lavorativo, segnalarlo e chiedere conferma (`02-requisiti.md`, A4).
3. **Dichiarazione**: la riga "concept: …".
4. **Metodo** in passi: soggetto e atmosfera → concept (inventato per il soggetto, anche fuori archivio) → palette, font, materia, motion → layout per tipo di pagina → costruzione → build → verifica → consegna.
5. **Regole obbligatorie** (sezione D dei requisiti), in forma breve.
6. **Indice dei riferimenti**: quale file leggere in quale passo.
7. **Uso degli script**: comandi esatti.

## Script: vincoli

- Devono funzionare nella chat di Claude (Linux, bash, Python 3, Node 22, Playwright con Chromium in `/opt/pw-browsers`, npm raggiungibile; rete esterna limitata, i CDN possono non essere raggiungibili) e in Claude Code.
- **Build**: Tailwind v4 tramite `@tailwindcss/cli` (`npx @tailwindcss/cli -i in.css -o out.css --minify`, con `@import "tailwindcss";` e la sorgente puntata al file HTML), oppure l'eseguibile standalone. Scegliere e fissare una versione. Il risultato va incorporato in un `<style>` al posto di un segnaposto.
- **Verifica**: per gli screenshot le librerie caricate da CDN e i font di Google Fonts vanno sostituiti temporaneamente con copie locali scaricate da npm (font tramite `@fontsource`), così la pagina verificata coincide con quella consegnata. L'output deve essere sintetico (elenco problemi + percorsi degli screenshot), per non consumare contesto.
- **Offline**: scarica da npm librerie e font effettivamente usati (font tramite pacchetti `@fontsource`, solo i pesi e i subset latini usati) e li incorpora in base64.
- Ogni script deve dare messaggi d'errore chiari e non richiedere interventi manuali.

## Interazione con il resto

- In chat, quando la pagina viene pubblicata come artifact, valgono anche i vincoli tecnici di pubblicazione (domini ammessi per gli script esterni: cdnjs, jsdelivr, unpkg; font da Google Fonts). Lo stile resta governato da `stile-siti`.
- `frontend-design` e simili non devono sovrapporsi quando la skill è richiamata.
