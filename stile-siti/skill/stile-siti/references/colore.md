# Colore

## Dal concept alla palette

1. Prendi il colore dominante dall'oggetto o dal luogo del concept (la buccia dell'arancia, il blu dell'inchiostro), non da un'etichetta di stile.
2. Costruisci una scala con `node scripts/palette.mjs "#colore"`: restituisce le tinte da chiaro a scuro e i contrasti. Usa la scala per sfondi, bordi, testi secondari.
3. Proporzioni indicative: **60% dominante** (sfondi e superfici), **30% secondario**, **10% accento** (azioni, evidenze, bagliori).
4. Un solo accento forte per schermata. Se tutto è vivace, niente si vede (e i colori vivaci tutti insieme sono ciò che Giovanni boccia).

## Profondità con il colore

La profondità è ciò che il gusto cerca; il colore la dà quando è a più livelli:
- Fondo non uniforme: due o tre `radial-gradient` a bassa opacità sovrapposti (aloni), o un `conic-gradient` per riflessi.
- Superfici leggermente più chiare/scure del fondo con bordo sottile semitrasparente.
- Bagliori: `box-shadow` colorata con raggio ampio e bassa opacità; `text-shadow` sul testo luminoso.
- Ombre a due livelli: una vicina e nitida, una lontana e morbida.

## Chiaro o scuro

Lo decide il concept (un osservatorio è scuro, un mercato di mattina è chiaro). Il chiaro non è piatto se ha aloni pastello, vetro chiaro e riquadri colorati. Doppio tema solo su richiesta.

## Contrasto

- Testo normale: almeno 4.5:1; testo grande (≥24 px o 19 px bold): almeno 3:1.
- Il testo grigio chiaro su fondo scuro e i pastelli su bianco sono i colpevoli abituali: controlla con lo script.
- Il glow non sostituisce il contrasto.

## Variabili

Definisci i colori una volta nel blocco `@theme`, poi usali con le classi Tailwind (`bg-fondo`, `text-accento`):

```css
@theme {
  --color-fondo: #0b1020;
  --color-superficie: #121a33;
  --color-testo: #e8ecff;
  --color-accento: #5eead4;
}
```

## Da evitare

- Il viola/indaco di default di Tailwind e i gradienti viola-blu generici.
- Il magenta come colore guida (Giovanni lo apprezza meno di blu e verde).
- Pastelli sbiaditi su bianco senza materia: è il piatto.
- Più di un accento acceso nella stessa vista.
