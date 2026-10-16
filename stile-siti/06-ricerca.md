# 06 — Ricerca iniziale

Base di partenza raccolta in chat il 16/10/2026. **Va approfondita in Claude Code**, sia sul piano tecnico (provando le tecniche nel codice) sia su quello estetico: direzioni visive, riferimenti, siti premiati (Awwwards, FWA, CSS Design Awards, Codrops), studi di design e portfolio di motion designer.

## 1. Tendenze di web design 2026

Sintesi da più fonti:

- **Tipografia come protagonista**: testi grandi e font con personalità usati come elemento centrale, a volte al posto delle immagini.
- **Tipografia cinetica**: parole che si compongono allo scroll o reagiscono al cursore.
- **Scroll come racconto**: parallax, zoom allo scroll, sezioni che si rivelano in sequenza.
- **Micro-interazioni**: feedback sottili su hover, click, input.
- **Glassmorphism** e **neumorfismo** (quest'ultimo con più contrasto per l'accessibilità), usati con misura.
- **Bento grid**: riquadri di dimensioni diverse, la grandezza segnala l'importanza; da progettare partendo dal mobile.
- **Layout liquidi e anti-griglia**: forme fluide, composizioni asimmetriche e sovrapposte.
- **Colori "dopamina"**: accenti saturi (neon, verdi acidi, rosa elettrico) su fondi neutri o scuri.
- **Nostalgia digitale**: anni '90/2000, pixel, cursori personalizzati.
- **3D e WebGL**: d'impatto ma pesanti. **Escluso** per questa skill.
- **Performance** come principio: ogni effetto deve giustificare il suo costo.

Filtrate col gusto di Giovanni: tipografia cinetica, scroll narrativo, micro-interazioni, vetro, bento, layout anti-griglia e accenti saturi su scuro sono pienamente compatibili. Neobrutalismo e tipografico puro no.

## 2. Perché le pagine fatte dall'AI sembrano tutte uguali

I modelli tendono a riprodurre lo schema statisticamente più frequente. Segni tipici da evitare (base per `riferimenti/anti-generico.md`):

- Inter o Roboto ovunque, nessun font con personalità.
- Gradienti viola/indaco (in parte eredità del colore `indigo-500` di default di Tailwind), fondi bianchi o grigio chiarissimo.
- Hero centrato con titolo, sottotitolo e uno o due bottoni, seguito da una fila di tre card arrotondate con icona.
- Angoli arrotondati e ombre leggere uguali su tutto, badge sopra il titolo, card con bordo laterale colorato, passi numerati 1-2-3.
- Glassmorphism applicato ovunque senza motivo.
- Stesse spaziature, stesse animazioni di fade-in su ogni progetto.

Rimedi indicati dalle fonti, coerenti con il metodo scelto:
- Definire la direzione estetica **prima** del codice, con riferimenti reali e un punto di vista preciso invece di aggettivi generici ("più premium").
- Adattare il linguaggio visivo al soggetto (un sito di lusso non deve somigliare a uno di gaming).
- Fissare le scelte (palette, font, raggi, ombre, motion) in poche variabili coerenti e rispettarle in tutta la pagina.

## 3. CSS moderno utile

### Animazioni legate allo scroll (`animation-timeline`)
- `scroll()` lega l'animazione allo scorrimento di un contenitore; `view()` all'ingresso/uscita dell'elemento nell'area visibile. `animation-range` definisce in che porzione della timeline l'animazione è attiva (es. `cover`, `contain`, `25vh 75vh`). Consigliati easing `linear` e `fill-mode: both`.
- Supporto (giugno 2026): Chrome/Edge dalla 115; Safari dalla 26 (settembre 2025), con correzioni in 26.4–26.5; Firefox ancora dietro flag nella stabile, attivo in Nightly e priorità di Interop 2026. Copertura globale ~83%, quindi **non Baseline**.
- Uso obbligatorio con miglioramento progressivo: stato finale visibile di default, animazione solo dentro `@supports (animation-timeline: view())` e `@media (prefers-reduced-motion: no-preference)`. Per effetti essenziali su tutti i browser: IntersectionObserver o GSAP ScrollTrigger.

```css
.card { opacity: 1; }
@keyframes fade-in { from { opacity: 0; translate: 0 2rem; } }
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .card {
      animation: fade-in linear both;
      animation-timeline: view();
      animation-range: entry 0% cover 40%;
    }
  }
}
```

### Altre funzionalità entrate di recente in Baseline
- `@starting-style` (2024): stili iniziali per animare l'ingresso di elementi, anche da `display: none`.
- `transition-behavior: allow-discrete` (2024): transizioni su proprietà discrete come `display`.
- `text-wrap` (2024): `balance` per titoli, `pretty` per paragrafi.
- View Transitions (2025): transizioni animate tra stati della pagina.
- `content-visibility` (2025): salta il rendering dei contenuti fuori schermo.
- `@scope`, `@container style()`, `:open` (2026).

Da verificare in Claude Code lo stato attuale di: `interpolate-size` (animare verso `height: auto`), `color-mix()`, `oklch()`, anchor positioning, container queries, `:has()`. Fonte consigliata: MDN e caniuse.

## 4. Librerie leggere

- **GSAP**: dal 2025, dopo l'acquisizione da parte di Webflow, è gratuito per tutti, anche per uso commerciale, **plugin inclusi** (ScrollTrigger, SplitText riscritto, ecc.). È la scelta naturale per animazioni coordinate, reveal del testo e scroll.
- **Lenis**: scroll morbido, libreria molto leggera, si integra con GSAP ScrollTrigger.
- Da valutare in Claude Code: libreria di icone leggera (es. Lucide), alternative minime per contatori o marquee, e il peso effettivo di ciascuna.
- Esclusi: Three.js e WebGL in generale.

## 5. Tailwind compilato

- Tailwind v4: pacchetto `@tailwindcss/cli`, input CSS con `@import "tailwindcss";`, comando `npx @tailwindcss/cli -i input.css -o output.css --minify`. Le classi vengono rilevate automaticamente dai file del progetto; per puntare a un file preciso si usa `@source`. Il tema si personalizza in CSS con `@theme`.
- Esiste anche l'**eseguibile standalone** che non richiede Node.
- Node serve solo per generare il CSS: la pagina finale è HTML statico pubblicabile ovunque.
- Da verificare in Claude Code: sintassi di `@source` e `@theme` sulla versione scelta, e se conviene restare su v3 (config JS) o v4 (config in CSS).

## 6. Fonti

- [DesignRush — 15 Web Design Trends for 2026](https://www.designrush.com/trends/design-trends)
- [IONOS — Web design trends 2026](https://www.ionos.com/digitalguide/websites/web-design/webdesign-trends.md)
- [Codrops — Introduzione pratica a scroll() e view()](https://tympanus.net/codrops/?p=75216)
- [BuildMVPFast — CSS scroll-driven animations cross-browser 2026](https://www.buildmvpfast.com/blog/css-scroll-driven-animations-replace-js-2026)
- [Modern CSS — New on the CSS Baseline](https://modern-css.com/whats-new/baseline/)
- [Webflow — GSAP diventa gratuito](https://webflow.com/blog/gsap-becomes-free)
- [Tailwind CLI (documentazione)](https://mintlify.wiki/tailwindlabs/tailwindcss/integration/cli)
- [Tailwind — Standalone CLI](https://tailwindcss.com/blog/standalone-cli)
- [Superdesign — Perché il design fatto dall'AI sembra generico](https://superdesign.dev/blog/why-ai-design-looks-generic)
- [DEV — Why do AI generated websites all look the same](https://dev.to/lyd_lyd_d4869af25d33ce0eb/why-do-ai-generated-websites-all-look-the-same-k2j)
