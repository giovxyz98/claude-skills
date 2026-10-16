# Componenti

I componenti prendono carattere dal concept: raggio, spessore del bordo, ombra, movimento sono variabili della pagina, non default. Ogni elemento interattivo ha hover (solo dove c'è un puntatore preciso), `:active`, `:focus-visible` e stato disabilitato curati.

## Variabili da fissare per pagina

```css
@theme {
  --radius-card: 1.25rem;
  --radius-btn: 999px;
  --ease-uscita: cubic-bezier(.22, 1, .36, 1);
}
```

Scegli il raggio dal concept (squadrato per l'officina, tondo per il mercato) e usalo ovunque. Non lasciare tutti gli angoli arrotondati allo stesso modo senza motivo.

## Bottoni

- Un solo bottone primario per vista; gli altri secondari o testuali.
- Altezza minima 44 px, padding generoso, etichetta che dice l'azione ("Prenota la serata", non "Invia").
- Hover: spostamento o luce, non solo cambio di colore. Active: scala 0.97. Focus: anello ben visibile con `outline` e `outline-offset`.

```css
.btn { min-height: 44px; transition: transform .25s var(--ease-uscita), box-shadow .25s var(--ease-uscita); touch-action: manipulation; }
.btn:active { transform: scale(.97); }
.btn:focus-visible { outline: 2px solid var(--color-accento); outline-offset: 3px; }
@media (hover: hover) and (pointer: fine) { .btn:hover { transform: translateY(-2px); } }
```

## Card

- Distinguile per contenuto e peso, non solo per colore. Una card importante è più grande o più luminosa.
- Evita il modello icona-in-cerchietto + titolo + testo ripetuto tre volte.
- Intera area cliccabile se la card è un link, con focus visibile.

## Navigazione

- Mobile: barra in basso o menu a tutto schermo; desktop: barra in alto o laterale sticky.
- Voce attiva evidente (sottolineatura animata, pillola, indicatore).
- Link "salta al contenuto" se la navigazione è lunga.
- Menu a tendina: pannello con `@starting-style` o transizione su `opacity`/`translate`; chiusura con Esc e clic fuori.

## Form

- Etichette sempre visibili (non solo placeholder), testo dei campi ≥ 16 px.
- `type`, `inputmode`, `autocomplete` corretti; errori vicino al campo, in parole semplici, non solo col colore.
- Stato di invio (spinner/testo) e di successo.
- Campi alti almeno 44 px; la tastiera non copre il campo attivo.

## Stati vuoti, errori, caricamento

- Stato vuoto: una frase che dice cosa fare e un'azione, nel tono del concept ("La cassetta è vuota: aggiungi il primo ingrediente").
- Errori: dicono cosa è successo e come rimediare.
- Caricamento: scheletri con shimmer lento o un piccolo elemento a tema; mai uno spinner generico a metà pagina.

## Elementi tipici

- **Chip/tag:** pillole con bordo sottile, selezionabili con `aria-pressed`.
- **Tab:** indicatore scorrevole sotto la voce attiva; scorrevoli in orizzontale su telefono.
- **Accordion:** `<details>` + `interpolate-size` come miglioramento; icona che ruota.
- **Toggle:** interruttore 44 px con `role="switch"`.
- **Tooltip:** solo su desktop; su touch, il contenuto va mostrato in modo diverso.
- **Contatori/numeri:** font mono o display, allineamento tabulare (`font-variant-numeric: tabular-nums`).

## Accessibilità

- `button` per azioni, `a` per navigazione; mai `div` cliccabili.
- Focus visibile ovunque; ordine di tab logico.
- `aria-label` sui pulsanti con sole icone; `aria-hidden` sulle decorazioni.
- Contrasto controllato anche negli stati hover/disabilitato.
