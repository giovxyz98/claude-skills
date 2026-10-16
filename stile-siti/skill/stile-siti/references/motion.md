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
- Non animare tutto allo stesso modo: stesso fade-in su ogni sezione è un segno di pagina generica. Scegli due o tre movimenti che esprimono il concept (onde lente per il mare, lampeggio per il neon, deriva per la nebbia).
