import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { contenutoScript, fallisci, risolviFont, urlEsterni } from './lib.mjs';

const [, , sorgente, uscita] = process.argv;
if (!sorgente || !uscita) fallisci('uso: node scripts/offline.mjs pagina.html pagina-offline.html');
if (!existsSync(sorgente)) fallisci(`file non trovato: ${sorgente}`);

let html = readFileSync(sorgente, 'utf8');
const { script, fonts } = urlEsterni(html);
const avvisi = [];
let incorporati = 0;

for (const s of script) {
  const codice = await contenutoScript(s.url);
  if (!codice) {
    avvisi.push(`libreria non incorporata (non raggiungibile): ${s.url}`);
    continue;
  }
  html = html.replace(s.tag, () => `<script>${codice.replace(/<\/script/gi, '<\\/script')}</script>`);
  incorporati++;
}

for (const f of fonts) {
  const r = risolviFont(f.url, (nome, percorso) => `data:font/woff2;base64,${readFileSync(percorso).toString('base64')}`);
  avvisi.push(...r.avvisi);
  if (!r.css) continue;
  html = html.replace(f.tag, () => `<style>${r.css}</style>`);
  incorporati++;
}

html = html.replace(/<link\b[^>]*\brel=["']preconnect["'][^>]*>\s*/gi, '');

const rimasti = [...html.matchAll(/(?:src|href)=["'](https?:\/\/[^"']+)["']/gi)]
  .map((m) => m[1])
  .filter((u) => !/^https?:\/\/(www\.)?w3\.org/.test(u));
for (const u of new Set(rimasti)) avvisi.push(`riferimento esterno ancora presente: ${u}`);

writeFileSync(resolve(uscita), html);
console.log(`OK: ${uscita} (${incorporati} risorse incorporate, ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB)`);
for (const a of avvisi) console.log(`AVVISO: ${a}`);
console.log('Nota: dei font vengono incorporati solo i pesi usati e il sottoinsieme latino; altri alfabeti (es. giapponese) restano al font di riserva.');
