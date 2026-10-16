# Layout e struttura per tipo di pagina

Il layout nasce dal soggetto, come lo stile. Qui trovi composizioni per evitare l'effetto template e la struttura tipica di ogni tipo di pagina. Si progetta dal telefono (vedi `mobile.md`).

## Tipi di pagina

| Tipo | Obiettivo | Struttura tipica | Priorità |
|---|---|---|---|
| Landing | far capire e far agire | titolo con promessa, prova (dettaglio concreto, non statistiche finte), 2-4 blocchi di contenuto, azione finale | un solo invito all'azione ripetuto, non cinque |
| Pagina personale / diario / viaggio | raccontare, tenere traccia | apertura forte, contenuto in sezioni con ritmo diverso, dettagli pratici (orari, mappa, liste) | il contenuto utile subito visibile |
| Tool | far fare una cosa | l'azione al centro, risultato immediatamente sotto, opzioni secondarie ripiegate | meno chrome, più spazio al controllo |
| Dashboard | far leggere numeri | 1-3 numeri chiave grandi, poi dettaglio per blocchi, filtri in alto o in una barra bassa su mobile | gerarchia dei numeri, non tutti uguali |
| Gestionale | gestire elenchi di record | elenco con ricerca e filtri, dettaglio a scorrimento o pannello, azioni primarie vicine al pollice | densità leggibile, stati chiari |
| Raccolta | mostrare molte voci | bento o griglia con voci di peso diverso, raggruppamenti, ricerca | distinguere le voci a colpo d'occhio |
| Indice di progetti | far trovare e aprire i propri progetti | intestazione breve, filtri a pillole, voci con nome, descrizione di una riga, stack in monospace, link; una o due voci in evidenza | scansione veloce; qui il terminale ciano, il blueprint, il vetro scuro o un mondo "da officina" stanno bene, ma nessuno è obbligato |

## Composizioni anti-template

- **Hero asimmetrico:** titolo molto grande allineato a sinistra, elemento visivo che sborda dal bordo o si sovrappone al titolo.
- **Split:** metà testo, metà materia (aloni, forma SVG, numero gigante). Su telefono diventa sovrapposizione verticale.
- **Bento:** riquadri di dimensioni diverse; la grandezza segnala l'importanza. Progettalo dal telefono con una colonna o due e `grid-auto-flow: dense`, poi allarga.
- **Storytelling a scroll:** sezioni che si rivelano in sequenza, un'idea per schermata, con un elemento fisso (sticky) che cambia.
- **Sezioni sovrapposte:** margini negativi, card che entrano nella sezione precedente, bordi non rettilinei (onde SVG, diagonali con `clip-path`).
- **Griglia rotta:** elementi che escono dalla colonna, titoli che attraversano immagini, numeri enormi come ancora.
- **Colonna con sidebar sticky:** su desktop, per liste lunghe con indice.
- **Numeri e mono come ancora:** `01`, orari, coordinate, date in monospace guidano l'occhio senza immagini. L'etichetta sopra il titolo deve dire qualcosa di vero sul contenuto (data, luogo, numero, categoria), non essere un ornamento fisso.

## Griglia responsive

Le colonne si fanno con la griglia di Tailwind, equivalente a quella di Bootstrap, partendo dal telefono (una colonna) e allargando con `md:` e `lg:`:

```html
<div class="grid grid-cols-12 gap-4">
  <div class="col-span-12 md:col-span-6 lg:col-span-4">…</div>
  <div class="col-span-12 md:col-span-6 lg:col-span-4">…</div>
  <div class="col-span-12 lg:col-span-4">…</div>
</div>
```

Per card che si dispongono da sole senza breakpoint fissi: `grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4`. Per i bento: `grid-flow-dense` con `col-span` e `row-span` diversi. Non importare Bootstrap: la skill usa Tailwind compilato e un secondo framework creerebbe conflitti e un aspetto generico.

## Ritmo

- Alterna densità: una sezione piena, una con aria. Tre sezioni identiche di fila sono un segno di template.
- Varia l'allineamento (sinistra, centro, destra) e la larghezza dei contenitori.
- Spazio verticale generoso tra le sezioni (`clamp(4rem, 10vw, 9rem)`), compatto dentro i gruppi.
- Su desktop sfrutta la larghezza: non limitare tutto a una colonna da 600 px.

## Struttura di partenza

```html
<body>
  <header>…</header>
  <main>
    <section aria-labelledby="t1">…</section>
    <section>…</section>
  </main>
  <footer>…</footer>
</body>
```

Un solo `<h1>`, gerarchia di titoli regolare, link "salta al contenuto" se la navigazione è lunga.

## Controlli

- Niente grandi vuoti in fondo alla pagina.
- Il contenuto più importante è nel primo schermo del telefono.
- Il footer non è un ripensamento: chiude la pagina con la stessa identità.
