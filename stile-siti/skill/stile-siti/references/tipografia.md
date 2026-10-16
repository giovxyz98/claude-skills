# Tipografia

Regola: massimo due famiglie più un monospace per i dettagli. Tutti i font sotto sono su Google Fonts e disponibili in `@fontsource` (usati dagli script di verifica e offline). Mai font di sistema; evitare Inter e Roboto come scelta predefinita.

## Abbinamenti per atmosfera

| Atmosfera | Titoli | Testo | Dettagli (mono) |
|---|---|---|---|
| Elegante classico / déco | Cinzel, Gloock, Italiana | Cormorant Garamond, DM Sans | JetBrains Mono |
| Notturno giapponese | Shippori Mincho, Zen Antique, Yuji Syuku | Noto Serif JP | Space Mono |
| Caldo e generoso (cibo, casa) | Fraunces, Young Serif | DM Sans, Nunito | Space Mono |
| Moderno con carattere | Bricolage Grotesque, Funnel Display, Syne | Funnel Sans, Manrope | Geist Mono |
| Tecnico / HUD | Orbitron, Chakra Petch, Rajdhani | Space Grotesk | JetBrains Mono, Major Mono Display |
| Giocoso | Fredoka, Righteous, Unbounded | Nunito | Space Mono |
| Retro / manifesto | Abril Fatface, Bebas Neue, Anton | DM Sans | Space Mono |
| A mano | Caveat, Permanent Marker, Rock Salt | DM Sans | |
| Eleganza leggera | Instrument Serif, Playfair Display | Manrope | Geist Mono |
| Industriale | Big Shoulders Display, IBM Plex Sans Condensed | IBM Plex Sans | IBM Plex Mono |

Sono punti di partenza: se il concept chiede altro, scegli un altro font con carattere.

## Come si usa

- Le font variabili (Bricolage Grotesque, Fraunces, Funnel) permettono contrasto di peso e larghezza con un solo file.
- Titoli: `clamp()` per la dimensione, `text-wrap: balance`, interlinea 0.95–1.1 se molto grandi. Testo: 16–18 px sul telefono, interlinea 1.5–1.7, righe non oltre ~70 caratteri.
- Il monospace è un dettaglio: numeri, orari, date, coordinate, etichette, didascalie. Fa da collante in quasi tutti gli stili. I percorsi (`~/progetti`) solo sulle pagine tecniche.
- Gerarchia: un solo elemento davvero grande per schermata. Il contrasto di scala (molto grande contro molto piccolo) rende più della differenza di colore.
- Carica solo i pesi usati. Su Google Fonts specifica i pesi nella URL e `display=swap`.
- Titoli lunghi su schermi stretti: verifica che non spezzino male (la verifica li controlla).

## Esempio di collegamento

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,700&family=Space+Mono:wght@400&display=swap" rel="stylesheet">
```

```css
@theme {
  --font-titolo: "Fraunces", serif;
  --font-testo: "DM Sans", sans-serif;
  --font-mono: "Space Mono", monospace;
}
```
