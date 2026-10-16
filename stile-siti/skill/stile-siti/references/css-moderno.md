# CSS moderno

Il CSS deve essere dinamico e moderno, usando le proprietà qui sotto quando servono, senza esagerare: il troppo storpia. Dove esiste l'equivalente Tailwind si può usare quello. Stato di supporto verificato a ottobre 2026.

## Proprietà di base (elenco storico di Giovanni)

- **Sfondi, gradienti, filtri:** `background-image`, `background-color`, `background-clip`, `-webkit-background-clip`, `-webkit-text-fill-color`, `backdrop-filter`, `-webkit-backdrop-filter`, `border`
- **Ombre ed effetti:** `box-shadow`, `filter`, `drop-shadow()` (dentro `filter`)
- **Trasformazioni e 3D leggero:** `perspective`, `transform`, `transform-style`, `translate`, `rotate`, `scale`
- **Transizioni e animazioni:** `transition`, `transition-property`, `transition-duration`, `transition-timing-function`, `transition-delay`, `animation` e proprietà collegate, `@keyframes`
- **Scroll:** `scroll-behavior`, `scroll-snap-type`, `scroll-snap-align`
- **Interfaccia:** `cursor`, `user-select`, `color-scheme`

## Funzionalità recenti

| Funzionalità | Supporto | Uso |
|---|---|---|
| `text-wrap: balance / pretty` | Baseline | titoli bilanciati, paragrafi senza righe orfane |
| `@starting-style`, `transition-behavior: allow-discrete` | Baseline | animare l'ingresso di elementi e `display` |
| View Transitions | Baseline | transizioni tra stati |
| `content-visibility: auto` | Baseline | saltare il rendering fuori schermo nelle pagine lunghe |
| `:has()`, container queries | Baseline | stato del genitore da figli; componenti che reagiscono al contenitore |
| `oklch()`, `color-mix()` | Baseline | scale di colore uniformi, tinte derivate |
| Anchor positioning | Baseline da gennaio 2026 (Chrome/Edge 125, Safari 26, Firefox 147) | tooltip e menu agganciati senza JS |
| `animation-timeline: scroll() / view()` | Chrome/Edge 115+, Safari 26+; **Firefox stabile no** (~83% di copertura) | solo come miglioramento (vedi sotto) |
| `interpolate-size: allow-keywords` | solo Chromium | animare verso `height: auto`; altrove il cambio è immediato |

## Animazioni legate allo scroll: solo come miglioramento

Lo stato finale è il default. L'animazione si attiva solo se il browser la supporta e l'utente non ha ridotto il movimento. Per effetti essenziali su tutti i browser: IntersectionObserver o ScrollTrigger.

```css
.card { opacity: 1; }
@keyframes entra { from { opacity: 0; translate: 0 2rem; } }
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .card { animation: entra linear both; animation-timeline: view(); animation-range: entry 0% cover 40%; }
  }
}
```

## Esempi utili

Testo con gradiente:

```css
.titolo-grad { background-image: linear-gradient(90deg, var(--color-accento), #fff); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
```

Palette derivata con `color-mix`:

```css
.superficie { background: color-mix(in oklch, var(--color-fondo) 85%, white); }
```

Container query:

```css
.scheda { container-type: inline-size; }
@container (min-width: 28rem) { .scheda .corpo { display: grid; grid-template-columns: 1fr 1fr; } }
```

Apertura a `height: auto` con miglioramento progressivo:

```css
:root { interpolate-size: allow-keywords; }
details::details-content { transition: height .4s var(--ease-uscita), content-visibility .4s allow-discrete; height: 0; overflow: clip; }
details[open]::details-content { height: auto; }
```

## Regole

- Verifica il supporto prima di usare qualcosa che non sia Baseline; se non lo è, usalo come miglioramento con fallback sensato.
- Non usare mai la sola animazione CSS non supportata per rivelare contenuto.
- `prefers-reduced-motion` sempre rispettato.
- Preferisci `translate`, `rotate`, `scale` (proprietà individuali) a `transform` composto quando animi una sola cosa: più leggibile e componibile.
