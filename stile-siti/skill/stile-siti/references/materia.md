# Materia e dettagli

La materia è ciò che toglie il "piatto", il difetto che il gusto di Giovanni boccia più di tutti. Ogni pagina ha almeno due o tre livelli di profondità: fondo, superfici, bagliori o dettagli.

## Fondi

**Mesh gradient / aloni:** più `radial-gradient` sovrapposti con colori del concept a bassa opacità.

```css
background:
  radial-gradient(60% 50% at 15% 10%, rgb(94 234 212 / .25), transparent 60%),
  radial-gradient(50% 40% at 85% 20%, rgb(99 102 241 / .2), transparent 60%),
  var(--color-fondo);
```

**Grana:** filtro SVG `feTurbulence` come immagine di sfondo a bassa opacità (3–8%).

```css
.grana::after {
  content: ""; position: fixed; inset: 0; pointer-events: none; opacity: .06; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

**Pattern:** griglie, puntini, linee diagonali con `repeating-linear-gradient` o `background-size`; più sottili del testo, mai in competizione.

## Superfici

**Vetro:** fondo semitrasparente, `backdrop-filter: blur()`, bordo sottile chiaro e un riflesso superiore.

```css
.vetro {
  background: linear-gradient(135deg, rgb(255 255 255 / .12), rgb(255 255 255 / .04));
  border: 1px solid rgb(255 255 255 / .14);
  backdrop-filter: blur(16px) saturate(140%);
  box-shadow: 0 1px 0 rgb(255 255 255 / .2) inset, 0 20px 50px -20px rgb(0 0 0 / .5);
}
```

Sul telefono usa il blur con parsimonia (pochi pannelli, raggio 10–16 px) e prevedi un fondo pieno come alternativa.

**Ombre a più livelli:** una vicina e nitida più una lontana e morbida; ombre colorate (del colore del concept) invece del nero.

**Bagliori:** `box-shadow` colorata di raggio ampio, `filter: drop-shadow()` su forme SVG, `text-shadow` sul testo luminoso.

**Bordi:** bordo sfumato con `border-image` o con un pseudo-elemento a `conic-gradient` e maschera; bordo luminoso che ruota lentamente.

## Forme SVG semplici

Onde, blob, linee, cerchi, pattern, cornici geometriche. Poche decine di righe per forma, mai illustrazioni elaborate (consumano molti token).

```html
<svg viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
  <path d="M0,64 C240,120 480,0 720,48 C960,96 1200,16 1440,64 L1440,120 L0,120 Z" fill="currentColor"/>
</svg>
```

Per le icone: SVG incorporati, solo quelle usate, `stroke="currentColor"`, tratto coerente su tutta la pagina.

## Materiali per concept

| Materiale | Come si ottiene |
|---|---|
| Carta | fondo caldo + grana + ombre morbide; occhio al piatto |
| Metallo | gradienti conici lineari + riflessi bianchi + bordo sottile |
| Legno | `repeating-linear-gradient` con variazioni di tono + grana |
| Smalto/ceramica | colore pieno + ombra interna + riflesso `radial-gradient` in alto |
| Neon | testo/linea chiara con `text-shadow`/`box-shadow` multipli dello stesso colore |
| Acquerello | macchie `radial-gradient` sfumate, `filter: blur()`, `mix-blend-mode: multiply` |
| Nebbia | gradienti molto morbidi che derivano lentamente |

## Regole

- Pochi effetti, ben fatti: due o tre materiali per pagina, non dieci.
- Gli effetti decorativi sono `aria-hidden` e `pointer-events: none`.
- Controlla il contrasto del testo sopra gli aloni.
- Prestazioni: niente `filter: blur()` enorme su elementi animati; preferisci sfondi statici sfocati in gradiente.
