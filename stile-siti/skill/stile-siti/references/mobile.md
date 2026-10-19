# Mobile first

La maggior parte delle pagine di Giovanni si usa dal telefono. Si progetta per 360–430 px, poi si allarga a tablet e desktop. Il desktop non va trascurato: su schermi larghi la pagina sfrutta lo spazio e resta curata, non è la versione mobile stirata.

## Struttura

- Scrivi prima le classi base (telefono), poi i prefissi `sm:`, `md:`, `lg:`, `xl:` che allargano.
- Nessuno scroll orizzontale. Controlla sempre `scrollWidth <= innerWidth` (lo fa la verifica).
- Titoli con `clamp()` o classi responsive (`text-[clamp(2.5rem,9vw,6rem)]`), `text-wrap: balance`, `overflow-wrap: anywhere` sulle parole lunghe.
- Immagini e SVG con `max-width: 100%`; griglie con `minmax(0, 1fr)` per evitare overflow.

## Touch

- Ogni effetto hover ha un equivalente al tocco: stato `:active` con feedback visivo (scala 0.97, colore, ombra).
- Effetti legati al cursore e hover complessi solo dove c'è un puntatore preciso:

```css
@media (hover: hover) and (pointer: fine) {
  .card:hover { transform: translateY(-4px); }
}
.card:active { transform: scale(.98); }
```

- Aree toccabili di almeno ~44 px, con spazio sufficiente tra elementi cliccabili.
- Azioni principali raggiungibili col pollice: in basso o nella metà inferiore dello schermo. Barre fisse in basso per le azioni frequenti.

## Navigazione

- Menu adatti al telefono: barra in basso, menu a tendina a tutto schermo, indice a pillole scorrevoli. Non una riga di sei link minuscoli.
- Poche voci, etichette brevi, voce attiva evidente.

## Prestazioni

- Anima `transform` e `opacity`. Limita `filter: blur()` e `backdrop-filter` a pochi elementi piccoli; sul telefono sono tra gli effetti più costosi.
- Sfondi animati sempre attivi: pochi e lenti, valuta una versione alleggerita (`@media (max-width: 767px)` o `prefers-reduced-motion`).
- Evita sovrapposizioni di molti livelli semitrasparenti grandi a tutto schermo.
- Carica solo le librerie necessarie; una pagina semplice non ha bisogno di GSAP.

## Notch, barre e tastiera

- `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">` (già in `assets/base.html`).
- Margini di sicurezza: `padding-bottom: env(safe-area-inset-bottom)` sulle barre fisse, `env(safe-area-inset-left/right)` in orizzontale.
- Altezze con `dvh`/`svh` (`min-h-[100svh]`), mai `100vh` da solo: la barra del browser su mobile lo falsa.
- Input e campi: testo di almeno **16 px**, altrimenti iOS fa zoom. Usa `inputmode` e `type` adatti, `autocomplete`. La tastiera non deve coprire il campo attivo (`scroll-margin`, barre fisse che si spostano).
- `touch-action: manipulation` sui bottoni per eliminare il ritardo del doppio tap.

## Desktop

- Contenitori più larghi e griglie a più colonne; usa lo spazio con composizioni diverse (sidebar sticky, split, griglie a 12 colonne).
- Cursore personalizzato, parallax e hover ricchi solo qui.
- Controlla le larghezze 1280, 1440 e oltre: niente righe di testo da 200 caratteri.

## Controlli prima di consegnare

La verifica fa screenshot a 360, 390, 430, tablet e desktop e segnala: overflow orizzontale, testo fuori dai contenitori, elementi sovrapposti, aree toccabili troppo piccole. Guarda gli screenshot del telefono per primi e poi il desktop, nient'altro (vedi il passo 6 di `SKILL.md`).
