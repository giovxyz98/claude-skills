# 08 — Ricerca approfondita (Fase 1)

Sintesi della Fase 1, in bozza da approvare. Estende `06-ricerca.md`. Tutto è filtrato dal gusto di Giovanni (`05-gusto-e-archivio.md`): profondità sì, piatto no, font con carattere, monospace come dettaglio, niente tipografico puro, niente caos di colori vivaci.

## Nota sulle fonti

La ricerca web ha dato risultati scarsi sul piano estetico: Awwwards e Codrops non hanno restituito articoli di analisi, solo elenchi. Le indicazioni di questa sezione vengono quindi in parte da fonti secondarie (blog di design, Figma, Wix) e in parte dalla conoscenza di base del modello, e non sono state verificate su siti premiati. Il repertorio delle direzioni è pensato come stimolo e non come verità. Le parti tecniche (versioni, CDN, pesi, font) sono state verificate direttamente.

## 1. Decisioni tecniche verificate (16/10/2026)

| Voce | Scelta | Verifica |
|---|---|---|
| Node | 22 (nel PC di Giovanni 22.14, npm 10.9) | eseguito |
| Tailwind | **4.3.3** con `@tailwindcss/cli`; `@import "tailwindcss";`, `@theme` per i token, `@source` per puntare l'HTML | npm; sintassi da riprovare in Fase 3 |
| GSAP | **3.15.0** da cdnjs (core, ScrollTrigger, SplitText); gratuito con tutti i plugin | cdnjs risponde 200 |
| Lenis | 1.3.27 da jsDelivr | risponde 200 |
| Icone | **SVG incorporati**, solo quelli usati. Lucide completo pesa ~107 KB gzip: escluso | misurato |
| Font | `@fontsource/*` (v5.3.x) per la verifica e la versione offline; Google Fonts in produzione | tutti i font della sezione 3 esistono |
| Playwright | 1.64.1 | npm |
| Script | Node (`.mjs`), così girano su Windows, Linux e Claude Code | decisione concordata |

Pesi gzip: GSAP core 28 KB, ScrollTrigger 18 KB, SplitText ~4 KB, Lenis ~5 KB.

### Funzionalità CSS

| Funzionalità | Stato | Uso nella skill |
|---|---|---|
| `animation-timeline: view()/scroll()` | Chrome/Edge 115+, Safari 26+, **Firefox stabile no** (dietro flag a giugno 2026, ~83% di copertura globale). Una fonte diceva che Firefox 133 le avesse attive, ma Mozilla smentisce | Solo come miglioramento: `@supports`, stato finale visibile di default, `prefers-reduced-motion`. Per effetti essenziali: IntersectionObserver o ScrollTrigger |
| `interpolate-size: allow-keywords` | Solo Chromium (129+). Altrove il cambio è istantaneo, senza rompersi | Miglioramento facoltativo per aperture/accordion |
| `@starting-style`, `transition-behavior`, `text-wrap: balance/pretty`, View Transitions, `content-visibility` | Baseline (vedi `06-ricerca.md`) | Uso normale |
| anchor positioning, `:has()`, container queries, `color-mix()`, `oklch()` | **Non verificati** in questa fase | Da controllare su MDN/caniuse in Fase 2, prima di scrivere `css-moderno.md` |

## 2. Repertorio di direzioni (base per `riferimenti/direzioni.md`)

È uno stimolo, non un menu: lo stile finale può non comparire. Ogni voce ha atmosfera, temi adatti, palette, font, materia e movimento. Le direzioni già votate da Giovanni sono nell'archivio (`05`) e non si ripetono qui; qui sono quelle **nuove** o i modi di declinare i principi del gusto su temi diversi.

Criterio di filtro: ogni voce deve avere profondità, colore o materia. Quelle che rischiano il piatto sono segnalate.

### Dal mondo reale: luoghi e ambienti

| Direzione | Atmosfera | Temi adatti | Palette tipo | Font tipo | Materia e motion |
|---|---|---|---|---|---|
| Mercato mattutino | caldo, vivo, generoso | cibo, diete, ricette, stagionalità | arancio frutta, verde foglia, crema, bruno | Fraunces, Young Serif; dettagli in mono | carte a strati, ombre morbide, grana leggera; entrate scaglionate, oscillazioni lente |
| Serra / botanica | umido, verde, luce filtrata | piante, benessere, salute, giardino | verdi profondi, lime, bianco latte | Fraunces, Instrument Serif, Bricolage | vetro smerigliato, nervature, bagliori verdi; foglie in parallax lento |
| Porto di notte | blu notte, lampioni, riflessi | viaggi, itinerari, eventi serali | blu inchiostro, ambra calda, rosso segnale | Bricolage, Syne; mono per orari e coordinate | riflessi sull'acqua, pannelli vetro, glow; onde lente |
| Osservatorio / cielo | profondo, silenzioso | astronomia, eventi, diari, serate | blu-nero, viola freddo, oro tenue | Cormorant, Italiana, Tenor Sans | stelle in CSS, aloni, gradienti radiali; rotazioni lentissime |
| Cinema / teatro | sipario, luce di sala | spettacoli, prenotazioni, eventi | rosso velluto, oro, nero | Abril Fatface, Playfair, Gloock | tendaggi in gradiente, faretti (radial-gradient), cornici; aperture a sipario |
| Laboratorio / officina | tecnico ma caldo | strumenti, DIY, progetti | grigio acciaio, arancio sicurezza, ottone | Chakra Petch, Space Grotesk, mono | rivetti, piastre, ombre nette e dure; ingranaggi lenti |
| Bar / locale notturno | neon basso, vetro, fumo | musica, locali, playlist, eventi | magenta e ciano spenti, nero caldo | Unbounded, Syne | glow, grana, riflessi; pulsazioni |

### Da materiali e oggetti

| Direzione | Atmosfera | Temi adatti | Note |
|---|---|---|---|
| Carta lavata e acquerello | calmo, luminoso | diario, benessere, natura | è l'acquerello già votato 7.5: declinabile su temi diversi, con font a mano e macchie pastello sfumate |
| Vetro e gel | trasparente, gonfio, lucido | app, prodotti, finanza personale | variante dell'aurora e del vetro scuro già apprezzati |
| Metallo spazzolato / cromo | freddo, lucido | tech, sport, auto | richiama Y2K chrome (7); gradienti conici per i riflessi |
| Ceramica e smalto | tattile, colorato, pieno | cucina, casa, artigianato | bento saturo con ombre interne e riflessi |
| Pelle / legno / ottone | caldo, materico | whisky, libri, collezioni | richiama il legno già votato 7; occhio al tipografico puro |
| Neon su vetro | acceso, notturno | musica, eventi, nightlife | glow multiplo, sfondi scuri, un solo colore dominante |
| Tessuto e ricamo | morbido, tattile | moda, handmade | pattern ripetuti, ombre morbide |

### Da epoche e movimenti

| Direzione | Atmosfera | Temi adatti | Note |
|---|---|---|---|
| Art déco | già votato 9 | eleganza, serate, lusso | resta il riferimento per l'eleganza classica |
| Giappone notturno | già votato 8.5-9 | arte, lettura, diario serale | idem |
| Liberty / art nouveau | linee organiche, ornamento | fiori, ricette, eventi eleganti | cornici curve in SVG semplice, oro e verde salvia |
| Bauhaus / costruttivismo | forme primarie, diagonali | progetti, portfolio | **rischio piatto**: serve profondità con ombre e sovrapposizioni |
| Cartografia antica | carta, inchiostro, bussole | viaggi, itinerari | linee sottili, simboli, rosa dei venti SVG; attenzione a non cadere nella carta calda (voto 4): servono materia e profondità |
| Anni '50 diner / retro-americano | colori pieni, cromature | cibo, musica, eventi | forme tonde; tenere i colori contenuti |
| Pixel art / retro gaming | nostalgico, giocoso | giochi, ricordi, progetti | Press Start 2P, VT323; solo se il tema lo chiede |
| Poster di concerto / serigrafia | forte, a strati | musica, eventi | evitare il caos di colori (Memphis e collage sono bassi) |
| Futurismo anni '60 / space age | ottimista, curvo | viaggi, tecnologia | sì ai colori e ai font; **no** agli archi a pillola, come da gusto |

### Da stati d'animo e funzioni

| Direzione | Atmosfera | Temi adatti |
|---|---|---|
| Calma digitale | respiro, bagliori lenti | meditazione, sonno, diari |
| Energia sportiva | diagonali, numeri enormi | allenamenti, risultati, classifiche |
| Cruscotto personale | numeri, indicatori, vetro | finanze, abitudini, statistiche |
| Quaderno-laboratorio | appunti, post-it, evidenziatori | studio, idee |
| Festa / invito | confetti, luci, bagliori caldi | compleanni, eventi |

### Regole d'uso del repertorio

- Si parte dal soggetto. Se una voce calza, la si adatta; se nessuna calza, si inventa un concept nuovo (B9).
- I mondi reali valgono più delle etichette di stile: "un mercato di frutta al mattino" porta a scelte concrete, "moderno e pulito" no.
- Gli stili connotati restano vincolati al tema: terminale ciano, HUD e blueprint solo su contenuti tecnici (B4).

## 3. Tipografia (base per `riferimenti/tipografia.md`)

Tutti i font sono verificati su Fontsource. Regola: massimo due famiglie più un mono per i dettagli.

| Atmosfera | Titoli | Testo | Dettagli (mono) |
|---|---|---|---|
| Elegante classico / déco | Cinzel, Gloock, Italiana | Cormorant Garamond, DM Sans | JetBrains Mono |
| Notturno giapponese | Shippori Mincho, Zen Antique, Yuji Syuku | Noto Serif JP | Space Mono |
| Caldo e generoso (cibo, casa) | Fraunces, Young Serif | DM Sans, Nunito | Space Mono |
| Moderno con carattere | Bricolage Grotesque, Funnel Display, Syne | Funnel Sans, Manrope | Geist Mono |
| Tecnico / HUD | Orbitron, Chakra Petch, Rajdhani | Space Grotesk | JetBrains Mono, Major Mono Display |
| Giocoso | Fredoka, Righteous, Unbounded | Nunito | Space Mono |
| Retro / manifesto | Abril Fatface, Bebas Neue, Anton | DM Sans | Space Mono |
| A mano | Caveat, Permanent Marker, Rock Salt | DM Sans | — |
| Eleganza leggera | Instrument Serif, Playfair Display | Manrope | Geist Mono |

Indicazioni:
- Le font variabili (Bricolage, Fraunces, Funnel) permettono contrasto di peso e di larghezza senza caricare più file.
- Scala dei titoli con `clamp()`, `text-wrap: balance`, interlinea stretta (0.95–1.1) sui titoli grandi e 1.5–1.7 sul testo.
- Il mono compare come dettaglio: numeri, orari, percorsi tipo `~/progetti`, etichette, didascalie.
- Evitare Inter e Roboto come scelta predefinita (segno anti-generico).

## 4. Motion (base per `riferimenti/motion.md`)

Principio: pochi movimenti ben scelti, scaglionati, con easing che frena alla fine. Tutto con `transform` e `opacity`, `prefers-reduced-motion` rispettato.

| Pattern | Tecnica | Tempi ed easing |
|---|---|---|
| Entrata scaglionata | CSS con `animation-delay` calcolato, oppure GSAP `stagger` | 600–900 ms, `cubic-bezier(.22,1,.36,1)`, scarto 60–100 ms |
| Reveal del testo per riga o parola | SplitText + GSAP, oppure maschera CSS (`clip-path`/`overflow:hidden` con `translateY`) | 700–1000 ms, scarto 40–80 ms |
| Reveal allo scroll | IntersectionObserver (base) o ScrollTrigger | soglia 15–25% |
| Parallax leggero | `translate` guidato da ScrollTrigger o `animation-timeline` con fallback | movimento 5–15% della sezione |
| Contatori | requestAnimationFrame con easing in uscita | 1200–2000 ms |
| Marquee | CSS `animation` su `translateX(-50%)`, contenuto duplicato | 20–40 s a ciclo, pausa al hover su desktop |
| Hover con risposta | `transform` + ombra | 200–300 ms; su touch lo stato `:active` |
| Cursore (solo desktop) | cerchio che segue con `lerp`, dentro `@media (hover:hover) and (pointer:fine)` | — |
| Sfondi vivi | gradienti animati con `background-position`, blob che oscillano, grana in loop | cicli di 15–40 s, molto lenti |
| Smooth scroll | Lenis (con ScrollTrigger) | solo dove porta valore; da evitare su pagine brevi |
| Transizioni di stato | View Transitions, `@starting-style` | 300–500 ms |

Regole:
- Su telefono: meno elementi animati contemporaneamente, `backdrop-filter` e `filter: blur()` con parsimonia, niente effetti permanenti pesanti.
- Se bastano CSS puro o IntersectionObserver, non caricare GSAP (D6b).
- Easing da evitare: `linear` e `ease` generici, tranne che per le animazioni legate allo scroll.

## 5. Colore, materia e layout (base per i rispettivi riferimenti)

**Colore**
- Palette costruita dal concept: un colore dominante, uno secondario, un accento. Rapporto indicativo 60/30/10.
- Preferire `oklch()` per scale uniformi (da verificare il supporto reale prima di scriverlo come regola).
- Bagliori, aloni e gradienti multipli danno profondità, come richiede il gusto.
- Contrasto minimo 4.5:1 sul testo; lo verifica lo script palette (F4).
- Evitare i viola/indaco predefiniti e il magenta come colore guida (voto più basso del blu e del verde).

**Materia**
- Grana con filtro SVG `feTurbulence` o immagine incorporata, opacità 3–8%.
- Mesh gradient a più `radial-gradient`, vetro con `backdrop-filter`, ombre a più livelli (vicina nitida + lontana morbida).
- Forme SVG semplici: onde, blob, linee, pattern. Mai illustrazioni complesse (D8).

**Layout**
- Hero asimmetrico, split, bento, sezioni sovrapposte, griglie rotte, storytelling a scroll.
- Evitare lo schema "hero centrato + tre card" (anti-generico).
- Struttura per tipo di pagina: landing, pagina personale, tool, dashboard, gestionale, raccolta.

## 6. Anti-generico (base per `riferimenti/anti-generico.md`)

Come in `06-ricerca.md`, con in più:
- Stesse animazioni di fade-in su ogni sezione e su ogni progetto.
- Icone in cerchietti colorati sopra le card.
- Bottone primario sempre a pillola con gradiente.
- Statistiche finte (10k utenti, 99,9% uptime) inserite senza motivo.
- Scritte "Scopri di più →" ovunque.

## 7. Cosa propongo di fare adesso

1. Tu leggi questa sintesi e dici cosa va aggiunto, tolto o cambiato: in particolare il repertorio della sezione 2 e gli abbinamenti della sezione 3.
2. Passiamo alla Fase 2 (scrittura della skill), caricando `skill-creator` come da regole.
3. In Fase 2 verifico anche i punti segnati "non verificati" (anchor positioning, `:has()`, container queries, `oklch()`).
