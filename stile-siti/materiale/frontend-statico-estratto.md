# Estratto della vecchia skill "frontend statico"

Recuperato parzialmente da una chat del 16/09/2026. Il testo completo non è disponibile. Riportato come riferimento storico: **non** è la specifica da seguire. Cosa recuperare e cosa no è in `03-decisioni.md` (decisione 21).

## Attivazione

Era configurata per attivarsi **solo su richiesta esplicita** ("usa la mia skill per il frontend" e simili), mai in base al contenuto della richiesta. Nella nuova skill questa regola resta: attivazione solo manuale.

## Regole tecniche

1. Un solo file HTML autonomo. Nessun framework JS.
2. Tailwind compilato in locale e incorporato, mai da CDN, perché `cdn.tailwindcss.com` non era raggiungibile dal container e le pagine risultavano senza stile negli screenshot.
   ```
   npm i -D tailwindcss@3.4.1
   npx tailwindcss -i in.css -o out.css --minify
   # sostituire un segnaposto <!--TWSTYLE--> nell'head con <style>…</style>
   ```
3. Font da npm (`@fontsource/<font>`), solo i `latin-<peso>-normal.woff2` dei pesi usati, convertiti in base64 e incorporati con `@font-face`, perché `fonts.googleapis.com` era bloccato nel container.
4. Verifica visiva obbligatoria con Playwright (Chromium in `/opt/pw-browsers`), `device_scale_factor=2`, guardando ogni schermata: testo che esce dal contenitore, titoli troppo grandi, grandi vuoti in fondo alla pagina.
5. Nessun commento nel codice se non richiesto.
6. Accessibilità di base: focus visibile, `prefers-reduced-motion`, contrasto, responsive fino a mobile, titoli con `clamp()`.
7. Non usare `web-artifacts-builder` (React compilato e minificato, illeggibile).

## Metodo

- Comportamento predefinito: fare la pagina, non il catalogo. Scegliere lo stile in base al contenuto; i voti sono un input, non una classifica. Uno stile da 7 adatto al contenuto batte un 9 fuori contesto. Dichiarare in una riga lo stile scelto e il motivo.
- Il catalogo di varianti (10–14 estetiche diverse della stessa pagina, contenuto identico, screenshot, voti da 1 a 10, nuove direzioni al giro successivo) solo su richiesta o quando il contenuto non rientrava in nessuno stile in archivio.

## Giudizio di Giovanni

Le regole tecniche erano macchinose da gestire. Nella nuova skill i passaggi meccanici (build, font, verifica) sono affidati a script lanciati automaticamente.
