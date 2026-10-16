---
name: stile-siti
description: Preferenze di stile personali di Giovanni per siti web, pagine HTML e UI (CSS/Tailwind, font, voti per stile, orientamento contenuto → stile). Usare prima di creare o restilizzare qualsiasi sito, pagina o interfaccia, o quando serve scegliere uno stile grafico.
---

# Preferenze di stile

## CSS e font

- CSS con Tailwind: è quello che dà il risultato curato.
- Font con carattere, scelti per lo stile (Cinzel per l'art déco, Orbitron per l'HUD, Shippori Mincho per il notturno giapponese, DM Serif per l'acquerello, ecc.), non font di sistema.
- Monospace apprezzato anche come dettaglio (numeri, percorsi, etichette).
- Titoli grandi ma che non spaccano su schermi stretti.

## CSS dinamico e moderno

Il CSS deve essere sempre dinamico e moderno, usando le proprietà qui sotto quando servono, senza esagerare: il troppo storpia. Dove esiste l'equivalente Tailwind si può usare quello; l'elenco è indicativo.

- **Sfondi, gradienti e filtri:** `background-image`, `background-color`, `background-clip`, `-webkit-background-clip`, `-webkit-text-fill-color`, `backdrop-filter`, `-webkit-backdrop-filter`, `border`
- **Ombre ed effetti visivi:** `box-shadow`, `filter`, `drop-shadow()` (valore dentro `filter`)
- **Trasformazioni e 3D:** `perspective`, `transform`, `transform-style`, `translate`, `rotate`, `scale`
- **Transizioni e animazioni:** `transition`, `transition-property`, `transition-duration`, `transition-timing-function`, `transition-delay`, `animation`, `animation-name`, `animation-duration`, `animation-timing-function`, `animation-iteration-count`, `animation-direction`, `@keyframes`
- **Comportamento di scroll:** `scroll-behavior`, `scroll-snap-type`, `scroll-snap-align`
- **Interfaccia e sistema:** `cursor`, `user-select`, `color-scheme`

## Voti per stile

Dal più alto. Fotografia dei gusti raccolti finora.

| Stile | Voto | Note |
|---|---|---|
| Terminale ciano (mono, scanline, bordi netti, ciano su blu-nero) | 9 | il più alto finora |
| Art déco (cornice dorata, Cinzel, righe sottili) | 9 | semplice ed elegante |
| Notturno giapponese (blu notte, Shippori Mincho, luna) | 8.5-9 | |
| Vetro scuro / lime (bagliori verde-teal, pannelli sfocati) | 8.5 | |
| HUD sci-fi (verde fosforescente, Orbitron, griglia tecnica) | 8.5 | molto bella, la resa dipende dal tipo di sito |
| Vetro scuro (bagliori blu-viola, pannelli sfocati, angoli larghi) | 8 | |
| Cyber neon (verde acido e rosa, glow, angoli tagliati) | 8 | il taglio sfalsato però non convince |
| Bento pastello (riquadri colorati, angoli morbidi, niente bordi) | 8 | |
| Aurora bento (bagliori pastello + riquadri in vetro chiaro) | 8 | |
| Vetro scuro bento (la stessa palette riorganizzata a riquadri) | 8 | |
| Blueprint (griglia tecnica, ciano, squadrato) | 7.5 | |
| Aurora chiara (bianco con bagliori pastello, vetro chiaro) | 7.5 | il dark glass ribaltato funziona |
| Acquerello / organico (Caveat, DM Serif, macchie pastello sfumate) | 7.5 | elegante, classico |
| Isometrico (Space Grotesk, griglia a rombi, ombre offset colorate) | 7.5 | |
| Gradiente caldo (sfumatura satura, pannello bianco arrotondato) | 7 | |
| Soft UI / neumorfismo (grigio, ombre morbide, niente bordi) | 7 | |
| Y2K chrome (viola e ciano, gradienti metallici, bolle) | 7 | |
| Clay (viola pieno, forme gonfie 3D) | 7 | |
| Bento saturo (colori pieni su carta chiara) | 7 | |
| Materiali fisici / legno (venature, rivetti, DM Serif) | 7 | |
| Vetro scuro / magenta | 7 | il magenta piace meno del blu e del verde |
| Fumetto (Permanent Marker, sfondo giallo puntinato, card sagomate) | 6.5 | |
| Retro-futurismo anni 70 (Righteous, arance/marroni, archi a pillola) | 6.5 | font e colori piacciono, la resa (forma ad arco) meno |
| Bento scuro (riquadri colorati su fondo notte) | 6.5 | |
| Terminale ambra (stessa struttura, fosforo ambra) | 6 | struttura sì, colori no |
| Terminale viola | 6 | |
| Stampa risografica (Archivo Black, cerchi arancio/blu sovrapposti) | 6 | i colori penalizzano |
| Notturno oro (nero, serif alto, filetti oro) | 6 | |
| Collage / fanzine (Archivo Black, evidenziatore giallo, Space Mono) | 5.5 | |
| Memphis anni 80 (Righteous, pastello, forme geometriche sparse) | 5.5 | |
| Brutalist (bordi spessi, ombre dure, giallo acido) | 5 | |
| Carta calda (panna, serif, terracotta) | 4 | |
| Rivista (serif display enorme, filetti, rosso su bianco) | 4 | |
| Museo e galleria (DM Serif, minimale, filetti grigi) | non votato | percepito troppo simile ad altri stili già in archivio |
| Mono caldo (beige, tutto mono, nessun bordo né ombra) | scartato | troppo spoglio |
| Editoriale svizzero (griglia, filetti, bianco) | 2 | il più basso |

## Cosa se ne ricava

- Finora ottengono i voti più alti profondità, colore e materia. Bagliori, vetro, glow, ombre generose.
- L'eleganza classica (art déco, notturno giapponese, acquerello) regge molto bene quando è pulita e non sovraccarica: entra nella fascia alta insieme agli stili "materici".
- Il monospace funziona benissimo, sia come stile intero (terminale) sia come dettaglio dentro altri stili (numeri, percorsi tipo `~/progetti`, etichette).
- Fondo scuro forte, ma non è una regola: le versioni chiare con bagliori e riquadri colorati prendono voti alti quanto le scure. Quello che perde non è il chiaro, è il **piatto**.
- Font e palette possono piacere anche quando la resa complessiva convince meno: il retro-futurismo anni 70 ne è un esempio, penalizzato più dalla forma (archi a pillola) che dai colori.
- Le combinazioni "giocose" con più colori vivaci contemporaneamente (Memphis, collage/fanzine) restano nella fascia medio-bassa nonostante la personalità.
- Perde il tipografico puro: editoriale, rivista, serif su carta. Nessun voto sopra 4.
- Perde il minimalismo senza profondità: viene percepito come scadente o intercambiabile con altri stili (vedi museo e galleria, non votato per questo motivo).
- Il brutalist non convince nonostante la forte personalità.

## Orientamento contenuto → stile

| Contenuto | Stili da preferire |
|---|---|
| Strumenti tecnici, indici di progetti, dashboard, documentazione | terminale ciano, blueprint, vetro scuro, HUD sci-fi |
| Portfolio, landing di presentazione, pagine personali | vetro scuro, vetro scuro / lime, cyber neon, art déco, notturno giapponese |
| Raccolte eterogenee, pagine con molte voci da distinguere | bento pastello, vetro scuro bento, aurora bento |
| Pagine leggere, informative, da leggere di giorno | aurora chiara, aurora bento, gradiente caldo, acquerello/organico |

Non sono vincoli: se il contenuto suggerisce altro, si sceglie altro.
