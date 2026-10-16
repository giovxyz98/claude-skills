# Motion

La pagina deve essere viva, con misura. Pochi movimenti ben scelti, scaglionati, con easing che frena alla fine. Tutto con `transform` e `opacity`; `prefers-reduced-motion` sempre rispettato.

## Easing e tempi di base

- Entrate: `cubic-bezier(.22, 1, .36, 1)` (esce veloce, frena morbido), 600–900 ms.
- Hover e tocco: 200–300 ms.
- Apertura/chiusura di pannelli: 300–500 ms.
- Cicli di sfondo: 15–40 s, quasi impercettibili.
- Evita `linear` e `ease` generici, tranne che per animazioni legate allo scroll.

## Catalogo

| Pattern | Tecnica | Note |
|---|---|---|
| Entrata scaglionata | classe `.rivela` di `assets/base.html` con `style="--i:N"` (ritardo `calc(var(--i) * 80ms)`), oppure GSAP `stagger` | scarto 60–100 ms, parti dai titoli; funziona anche per il primo schermo, perché l'observer scatta subito |
| Reveal allo scroll | `.rivela` (IntersectionObserver, già in `assets/base.html`) o ScrollTrigger | soglia 15–25%; stato finale visibile senza JS |
| Reveal del testo per riga o parola | SplitText + GSAP, o maschera CSS (`overflow:hidden` + `translateY`) | 700–1000 ms, scarto 40–80 ms |
| Parallax leggero | ScrollTrigger o `animation-timeline` con fallback | movimento 5–15% della sezione, mai su testo lungo |
| Contatori | `requestAnimationFrame` con easing in uscita | 1200–2000 ms, parte alla comparsa |
| Marquee | CSS `animation` su `translateX(-50%)` con contenuto duplicato | 20–40 s a ciclo, pausa all'hover su desktop |
| Hover con risposta | `transform` + ombra | su touch: `:active` |
| Cursore personalizzato | cerchio che segue con interpolazione, solo `(hover:hover) and (pointer:fine)` | solo desktop |
| Sfondi vivi | gradienti con `background-position`, blob che oscillano, grana in loop | pochi elementi, lenti |
| Smooth scroll | Lenis (con ScrollTrigger) | solo dove porta valore; non su pagine brevi |
| Transizioni di stato | View Transitions, `@starting-style` | 300–500 ms |
| Micro-interazioni | pulsazioni, onde al click, check che si disegna (`stroke-dashoffset`) | feedback, non decorazione |
| Animazione legata allo scroll | `animation-timeline: view()` dentro `@supports`, `animation-range` | l'elemento cresce, scorre o ruota mentre lo scorri; senza supporto resta nello stato finale |
| Barra di avanzamento | `animation-timeline: scroll(root)` su una linea fissa in cima | 2–4 px, colore d'accento |
| Schede che si impilano | `position: sticky` con `top` crescente per scheda | ogni scheda copre la precedente; ottimo per passi, giorni, funzioni |
| Reveal con maschera | `overflow: hidden` + `translate` del contenuto, o `clip-path: inset()` | titoli, immagini, riquadri che si aprono da una linea |
| Sezione fissa con contenuto che scorre | colonna `sticky` + colonna lunga | titolo fermo, dettagli che passano |
| Fascia orizzontale | `overflow-x: auto` + `scroll-snap-type` | su telefono si trascina col dito |
| Alone che segue il puntatore | `radial-gradient` con variabili `--x`, `--y` aggiornate da `pointermove` | solo `(hover:hover) and (pointer:fine)` |
| Inclinazione leggera | `rotate`/`translate` calcolati da `pointermove`, max 4–6° | solo desktop, su pochi riquadri |
| Numeri che girano | colonne di cifre con `translate` | alternativa ai contatori; stato finale leggibile |

## Quando serve GSAP

- Serve per: sequenze coordinate (timeline), reveal del testo per parole/lettere, ScrollTrigger con pin o scrub, orchestrazione su più elementi.
- Non serve per: fade/slide di entrata, hover, marquee, sfondi che respirano. Lì CSS e IntersectionObserver bastano e pesano zero.
- Versioni fisse e solo i moduli usati (core, ScrollTrigger, SplitText):

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.0/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.0/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.0/SplitText.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.3.27/dist/lenis.min.js"></script>
```

## Esempi minimi

Entrata scaglionata in CSS puro, per animazioni personalizzate diverse da `.rivela`:

```css
.entra { opacity: 0; translate: 0 1.5rem; animation: entra .8s cubic-bezier(.22,1,.36,1) forwards; animation-delay: calc(var(--i) * 80ms); }
@keyframes entra { to { opacity: 1; translate: 0 0; } }
@media (prefers-reduced-motion: reduce) { .entra { animation: none; opacity: 1; translate: 0 0; } }
```

Animazione legata allo scroll e barra di avanzamento (CSS puro; fuori da `@supports` l'elemento resta visibile e fermo):

```css
@supports (animation-timeline: view()) {
  .cresce { animation: cresce linear both; animation-timeline: view(); animation-range: entry 0% cover 40%; }
  @keyframes cresce { from { opacity: 0; scale: .92; translate: 0 3rem; } to { opacity: 1; scale: 1; translate: 0 0; } }
  .avanza { position: fixed; inset: 0 0 auto 0; height: 3px; background: var(--accento); transform-origin: 0 50%; animation: avanza linear both; animation-timeline: scroll(root); }
  @keyframes avanza { from { scale: 0 1; } to { scale: 1 1; } }
}
@media (prefers-reduced-motion: reduce) { .cresce, .avanza { animation: none; } }
```

Schede che si impilano e reveal con maschera (la classe `.dentro` la mette l'observer di `.rivela`; senza JS tutto resta visibile):

```css
.pila > * { position: sticky; top: calc(1rem + var(--i) * 1.25rem); }
.js .maschera { overflow: hidden; }
.js .maschera > span { display: inline-block; translate: 0 110%; transition: translate .9s cubic-bezier(.22,1,.36,1); }
.js .maschera.dentro > span { translate: 0 0; }
.js .apri { clip-path: inset(0 0 100% 0); transition: clip-path 1s cubic-bezier(.22,1,.36,1); }
.js .apri.dentro { clip-path: inset(0); }
```

Alone che segue il puntatore:

```js
if (matchMedia('(hover:hover) and (pointer:fine)').matches) document.querySelectorAll('.faro').forEach(el =>
  el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); el.style.setProperty('--x', e.clientX - r.left + 'px'); el.style.setProperty('--y', e.clientY - r.top + 'px'); }));
```

con `.faro { background: radial-gradient(18rem circle at var(--x, 50%) var(--y, 0%), rgb(255 255 255 / .12), transparent 60%); }`.

Reveal del testo con GSAP:

```js
gsap.registerPlugin(ScrollTrigger, SplitText);
const testo = SplitText.create(".titolo", { type: "lines", mask: "lines" });
gsap.from(testo.lines, { yPercent: 110, duration: .9, ease: "power4.out", stagger: .08, scrollTrigger: { trigger: ".titolo", start: "top 85%" } });
```

Smooth scroll collegato a ScrollTrigger:

```js
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```

## Regole

- Mai un contenuto essenziale visibile solo dopo un'animazione che può non partire: lo stato finale è il default.
- Con `prefers-reduced-motion: reduce` disattiva movimenti grandi, parallax, loop e smooth scroll; lascia al più cambi di colore e dissolvenze.
- Sul telefono meno elementi animati insieme.
- Usa il catalogo per intero, non solo `.rivela`. `.rivela` resta uno strumento valido (le card che compaiono scendendo piacciono a Giovanni), ma va **combinato** con altri: ogni pagina deve avere almeno due o tre effetti legati allo scroll o al puntatore scelti per il concept, in sezioni diverse (schede che si impilano per i passi, titolo con maschera, barra di avanzamento, alone sui riquadri, e così via), oltre agli sfondi vivi che esprimono il tema (onde lente per il mare, lampeggio per il neon, deriva per la nebbia).
- Se due pagine fatte di seguito hanno gli stessi effetti, cambia combinazione: stessa entrata su ogni sezione è un segno di pagina generica.
