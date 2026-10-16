# 01 — Analisi della skill attuale

## Com'è fatta oggi

La skill attuale (`materiale/skill-attuale-SKILL.md`) è un singolo file con cinque sezioni:

1. **CSS e font**: Tailwind, font con carattere, monospace come dettaglio, titoli che non spaccano su mobile.
2. **CSS dinamico e moderno**: elenco di proprietà CSS da usare (gradienti, filtri, ombre, trasformazioni, transizioni, animazioni, scroll, interfaccia).
3. **Voti per stile**: tabella di ~37 stili votati da 2 a 9, ordinata dal voto più alto.
4. **Cosa se ne ricava**: considerazioni sul gusto (vince profondità, colore, materia; perde il piatto e il tipografico puro).
5. **Orientamento contenuto → stile**: tabella con 4 sole categorie di contenuto.

## Il problema

Qualunque sia il tema della pagina, il risultato tende sempre allo stile **terminale ciano** (monospace, scanline, ciano su blu-nero). Lo stile piace molto, ma è adatto a pochissimi contenuti: su una pagina di una dieta, un viaggio o un evento non c'entra nulla.

Più in generale la skill è **rigida**: anche quando non sceglie il terminale ciano, pesca da un menu di stili predefiniti invece di progettare uno stile per il soggetto. Mancano inoltre regole esplicite su comportamento responsive, animazioni e "vita" della pagina.

## Le cause

1. **La classifica guida la scelta.** La tabella dei voti è ordinata dal più alto e il terminale ciano è in cima con 9 e la nota "il più alto finora". Senza un metodo di scelta esplicito, Claude tratta i voti come una classifica da cui pescare dall'alto.
2. **L'orientamento per contenuto è troppo povero.** Solo 4 categorie, la prima ("strumenti tecnici, dashboard") ha il terminale ciano come primo stile, e molti temi personali comuni (cibo, salute, viaggi, eventi) non sono coperti.
3. **Nessun vincolo d'uso sugli stili connotati.** Niente dice che il terminale ciano sia adatto solo a contenuti tecnici.
4. **Manca un metodo creativo.** La skill dice cosa è piaciuto, non come si costruisce uno stile nuovo per un tema nuovo. Quando il tema non è in tabella, Claude ricade sui default.
5. **Mancano le regole di qualità.** Responsive, animazioni, verifica visiva, contenuti realistici, anti-generico: o assenti o solo accennati.
6. **Nessuna verifica.** La pagina viene consegnata senza essere stata guardata, quindi errori di layout su mobile o animazioni assenti emergono solo nei giri di correzione.

## Un tentativo intermedio scartato

Durante la discussione è stata proposta una prima correzione minima (vincolo sul terminale ciano, tabella contenuto → stile allargata, sezione di regole sempre valide). È stata considerata ancora **troppo rigida**: migliora la selezione ma resta un menu di stili. Anche l'idea successiva di trasformare i voti in "ricette" dettagliate per stile è stata scartata, perché porterebbe a pagine tutte uguali e senza creatività.

## Una versione precedente

Esisteva una skill ancora più vecchia ("frontend statico", vedi `materiale/frontend-statico-estratto.md`) con una pipeline tecnica rigida: Tailwind compilato, font scaricati da npm e incorporati, verifica Playwright, catalogo di varianti da votare, e attivazione solo manuale. Era considerata macchinosa da usare. Alcune regole vengono recuperate, altre no (dettaglio in `03-decisioni.md`).

## Conclusione

Il problema non si risolve ritoccando la tabella: serve cambiare il cuore della skill, da **archivio di stili** a **metodo di progettazione** guidato dal soggetto, con il gusto di Giovanni come filtro, una libreria di riferimento ampia, regole di qualità esplicite e script che verificano il risultato. Lo stile di una pagina può anche non esistere in archivio: l'archivio non è un elenco chiuso.

L'attivazione automatica è stata abbandonata: la nuova skill parte solo su richiamo esplicito di Giovanni.
