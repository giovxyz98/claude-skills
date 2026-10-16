import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  cacheDir, contenutoScript, esegui, fallisci, percorsoPacchetto, richiedi, risolviFont, urlEsterni,
} from './lib.mjs';

const args = process.argv.slice(2);
const pagina = args.find((a) => !a.startsWith('--'));
const iOut = args.indexOf('--out');
const cartella = resolve(iOut >= 0 ? args[iOut + 1] : 'verifica-screenshot');

if (!pagina) fallisci('uso: node scripts/verifica.mjs pagina.html [--out cartella]');
if (!existsSync(pagina)) fallisci(`file non trovato: ${pagina}`);
mkdirSync(cartella, { recursive: true });

const html = readFileSync(pagina, 'utf8');
const { chromium } = richiedi('playwright');

async function avviaBrowser() {
  const tentativi = [{}, { channel: 'chrome' }, { channel: 'msedge' }];
  const radici = [process.env.PLAYWRIGHT_BROWSERS_PATH, '/opt/pw-browsers'].filter((p) => p && existsSync(p));
  for (const radice of radici) {
    for (const d of readdirSync(radice).filter((n) => n.startsWith('chromium'))) {
      for (const sub of ['chrome-linux/chrome', 'chrome-linux/headless_shell', 'chrome-headless-shell-linux64/chrome-headless-shell', 'chrome-linux64/chrome']) {
        const p = join(radice, d, sub);
        if (existsSync(p)) tentativi.push({ executablePath: p });
      }
    }
  }
  for (const opzioni of tentativi) {
    try {
      return await chromium.launch({ headless: true, ...opzioni });
    } catch {}
  }
  console.log('Browser non trovato: installo Chromium (una volta sola)...');
  const cli = join(percorsoPacchetto('playwright'), 'cli.js');
  esegui('node', [cli, 'install', 'chromium'], { stdio: 'inherit' });
  try {
    return await chromium.launch({ headless: true });
  } catch (e) {
    fallisci('impossibile avviare il browser per gli screenshot: ' + e.message);
  }
}

const esterni = urlEsterni(html);
const cacheScript = new Map();
const cacheFont = new Map();
const avvisi = [];

for (const s of esterni.script) {
  cacheScript.set(s.url, await contenutoScript(s.url));
  if (!cacheScript.get(s.url)) avvisi.push(`libreria non risolvibile in locale: ${s.url}`);
}
for (const f of esterni.fonts) {
  const r = risolviFont(f.url, (nome) => `https://fonts.gstatic.com/stile-siti-local/${nome}`);
  cacheFont.set(f.url, r);
  avvisi.push(...r.avvisi);
}
const fileFont = Object.assign({}, ...[...cacheFont.values()].map((r) => r.file));

const tutti = [
  { nome: '360', w: 360, h: 780, mobile: true, dpr: 2 },
  { nome: '390', w: 390, h: 844, mobile: true, dpr: 2 },
  { nome: '430', w: 430, h: 932, mobile: true, dpr: 2 },
  { nome: 'tablet', w: 820, h: 1180, mobile: true, dpr: 1 },
  { nome: 'desktop', w: 1440, h: 900, mobile: false, dpr: 1 },
];
const iSolo = args.indexOf('--solo');
const solo = iSolo >= 0 ? args[iSolo + 1].split(',') : null;
const dispositivi = solo ? tutti.filter((d) => solo.includes(d.nome)) : tutti;
if (!dispositivi.length) fallisci('--solo accetta: 360, 390, 430, tablet, desktop (anche più valori separati da virgola).');

function controlli() {
  const problemi = [];
  const vw = window.innerWidth;
  const doc = document.documentElement;
  const sel = (el) => {
    let s = el.tagName.toLowerCase();
    if (el.id) s += '#' + el.id;
    else if (el.classList.length) s += '.' + [...el.classList].slice(0, 2).join('.');
    return s;
  };
  const visibile = (el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && Number(cs.opacity) > 0;
  };

  if (doc.scrollWidth > vw + 1) problemi.push({ tipo: 'overflow-orizzontale', dettaglio: `la pagina è larga ${doc.scrollWidth}px su ${vw}px` });

  const tagliato = (el) => {
    for (let n = el; n && n !== document.body; n = n.parentElement) {
      if (n.getAttribute('aria-hidden') === 'true') return true;
      const cs = getComputedStyle(n);
      if (n !== el && cs.overflowX !== 'visible' && n.getBoundingClientRect().right <= vw + 2) return true;
    }
    return false;
  };

  const largo = [];
  for (const el of document.body.querySelectorAll('*')) {
    if (!visibile(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.right > vw + 2 && getComputedStyle(el).position !== 'fixed' && !tagliato(el)) {
      const antenato = el.parentElement && el.parentElement.getBoundingClientRect().right > vw + 2;
      if (!antenato) largo.push(`${sel(el)} (bordo destro ${Math.round(r.right)}px)`);
    }
  }
  if (largo.length) problemi.push({ tipo: 'elementi-oltre-lo-schermo', dettaglio: largo.slice(0, 6).join('; ') });

  const testoFuori = [];
  for (const el of document.body.querySelectorAll('*')) {
    if (!visibile(el) || el.clientWidth === 0) continue;
    const cs = getComputedStyle(el);
    const haTesto = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (haTesto && el.scrollWidth > el.clientWidth + 2 && cs.overflowX === 'visible') testoFuori.push(sel(el));
  }
  if (testoFuori.length) problemi.push({ tipo: 'testo-fuori-dal-contenitore', dettaglio: testoFuori.slice(0, 6).join('; ') });

  const piccoli = [];
  for (const el of document.querySelectorAll('a[href], button, input:not([type=hidden]), select, textarea, summary, [role=button], [role=switch]')) {
    if (!visibile(el)) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'inline' && el.closest('p, li, span, h1, h2, h3')) continue;
    const r = el.getBoundingClientRect();
    if (r.width <= 2 || r.height <= 2 || el.closest('[aria-hidden="true"]')) continue;
    if (r.width < 40 || r.height < 40) piccoli.push(`${sel(el)} ${Math.round(r.width)}x${Math.round(r.height)}`);
  }
  if (piccoli.length) problemi.push({ tipo: 'aree-toccabili-piccole', dettaglio: `${piccoli.length}: ` + piccoli.slice(0, 6).join('; ') });

  const rotte = [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src.slice(0, 80));
  if (rotte.length) problemi.push({ tipo: 'immagini-rotte', dettaglio: rotte.join('; ') });

  const famiglie = new Set();
  for (const el of document.querySelectorAll('h1, h2, h3, p, a, button, code, pre, label')) {
    if (!visibile(el)) continue;
    famiglie.add(getComputedStyle(el).fontFamily.split(',')[0].trim().replace(/^["']|["']$/g, ''));
  }
  const generiche = ['serif', 'sans-serif', 'monospace', 'system-ui', 'cursive', 'fantasy', 'ui-sans-serif', 'ui-serif', 'ui-monospace'];
  const pulisci = (s) => s.replace(/^["']|["']$/g, '');
  const caricati = new Set([...document.fonts].filter((ff) => ff.status === 'loaded').map((ff) => pulisci(ff.family)));
  const nonCaricati = [...famiglie].filter((f) => f && !generiche.includes(f) && !caricati.has(f));
  if (nonCaricati.length) problemi.push({ tipo: 'font-non-caricati', dettaglio: nonCaricati.join(', ') });

  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const rgba = (colore) => {
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#000';
    ctx.fillStyle = colore;
    ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2], d[3] / 255];
  };
  const lum = ([r, g, b]) => {
    const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const sfondoEffettivo = (el) => {
    let colore = [0, 0, 0, 0];
    const strati = [];
    for (let n = el; n; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.backgroundImage !== 'none') return null;
      const c = rgba(cs.backgroundColor);
      if (c[3] > 0) strati.push(c);
      if (c[3] >= 1) break;
    }
    let base = [255, 255, 255];
    if (!strati.length || strati[strati.length - 1][3] < 1) {
      const cs = getComputedStyle(document.documentElement);
      const c = rgba(cs.backgroundColor);
      base = c[3] > 0 ? c.slice(0, 3) : [255, 255, 255];
    } else {
      base = strati.pop().slice(0, 3);
    }
    for (const s of strati.reverse()) base = base.map((v, i) => v * (1 - s[3]) + s[i] * s[3]);
    return base;
  };
  const contrastoBasso = [];
  const visti = new Set();
  for (const el of document.body.querySelectorAll('h1, h2, h3, h4, p, a, li, span, button, label, small, td, th, code, figcaption, blockquote')) {
    if (!visibile(el)) continue;
    if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
    const cs = getComputedStyle(el);
    if (cs.webkitTextFillColor === 'rgba(0, 0, 0, 0)' || cs.backgroundClip === 'text') continue;
    const fg = rgba(cs.color);
    const bg = sfondoEffettivo(el);
    if (!bg) continue;
    const mix = fg.slice(0, 3).map((v, i) => v * fg[3] + bg[i] * (1 - fg[3]));
    const [a, b] = [lum(mix), lum(bg)].sort((x, y) => y - x);
    const rapporto = (a + 0.05) / (b + 0.05);
    const px = parseFloat(cs.fontSize);
    const grande = px >= 24 || (px >= 18.66 && Number(cs.fontWeight) >= 700);
    const soglia = grande ? 3 : 4.5;
    const chiave = sel(el) + cs.color;
    if (rapporto < soglia && !visti.has(chiave)) {
      visti.add(chiave);
      contrastoBasso.push(`${sel(el)} ${rapporto.toFixed(1)}:1`);
    }
  }
  if (contrastoBasso.length) problemi.push({ tipo: 'contrasto-basso', dettaglio: `${contrastoBasso.length}: ` + contrastoBasso.slice(0, 6).join('; ') });

  const interattivi = [...document.querySelectorAll('a[href], button, input, select, textarea')].filter(visibile);
  const sovrapposti = [];
  for (let i = 0; i < interattivi.length; i++) {
    for (let j = i + 1; j < interattivi.length; j++) {
      const a = interattivi[i].getBoundingClientRect();
      const b = interattivi[j].getBoundingClientRect();
      if (interattivi[i].contains(interattivi[j]) || interattivi[j].contains(interattivi[i])) continue;
      const fisso = (e) => ['fixed', 'sticky'].includes(getComputedStyle(e).position) || e.closest('[style*="fixed"], [class*="fixed"], [class*="sticky"]');
      if (fisso(interattivi[i]) || fisso(interattivi[j])) continue;
      const w = Math.min(a.right, b.right) - Math.max(a.left, b.left);
      const h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
      if (w > 4 && h > 4 && (w * h) / Math.min(a.width * a.height, b.width * b.height) > 0.3) sovrapposti.push(`${sel(interattivi[i])} / ${sel(interattivi[j])}`);
    }
  }
  if (sovrapposti.length) problemi.push({ tipo: 'elementi-sovrapposti', dettaglio: sovrapposti.slice(0, 5).join('; ') });

  let fondo = 0;
  for (const el of document.body.querySelectorAll('*')) {
    if (!visibile(el) || getComputedStyle(el).position === 'fixed') continue;
    fondo = Math.max(fondo, el.getBoundingClientRect().bottom + window.scrollY);
  }
  if (doc.scrollHeight - fondo > 400) problemi.push({ tipo: 'vuoto-in-fondo', dettaglio: `${Math.round(doc.scrollHeight - fondo)}px senza contenuto sotto l'ultimo elemento` });

  const campi = [...document.querySelectorAll('input:not([type=checkbox]):not([type=radio]):not([type=hidden]), select, textarea')]
    .filter(visibile).filter((e) => parseFloat(getComputedStyle(e).fontSize) < 16).map(sel);
  if (campi.length) problemi.push({ tipo: 'campi-sotto-16px', dettaglio: campi.slice(0, 5).join('; ') + ' (iOS fa zoom)' });

  const h1 = document.querySelectorAll('h1').length;
  if (h1 !== 1) problemi.push({ tipo: 'h1', dettaglio: `trovati ${h1} elementi h1 (ne serve uno)` });

  return { problemi, altezza: doc.scrollHeight, animazioni: document.getAnimations().length };
}

function controlliMeta() {
  const mancanti = [];
  if (!document.title || document.title === 'Titolo della pagina') mancanti.push('title');
  if (!document.querySelector('meta[name=description]')) mancanti.push('meta description');
  if (!document.querySelector('meta[name=theme-color]')) mancanti.push('theme-color');
  if (!document.querySelector('meta[property="og:title"]')) mancanti.push('og:title');
  if (!document.querySelector('link[rel~=icon]')) mancanti.push('favicon');
  if (!document.querySelector('meta[name=viewport]')) mancanti.push('viewport');
  const testoFinto = /lorem ipsum|segnaposto|titolo della pagina|titolo che nasce dal soggetto/i.test(document.body.innerText + document.title);
  return { mancanti, testoFinto };
}

const browser = await avviaBrowser();
const risultati = [];
const consoleErrori = new Set();
const richiesteFallite = new Set();
const meta = { mancanti: [], testoFinto: false };

for (const d of dispositivi) {
  const ctx = await browser.newContext({
    viewport: { width: d.w, height: d.h },
    deviceScaleFactor: d.dpr,
    isMobile: d.mobile && d.w < 700,
    hasTouch: d.mobile,
    locale: 'it-IT',
  });
  await ctx.route(/^https?:\/\//, async (route) => {
    const url = route.request().url();
    if (cacheScript.has(url) && cacheScript.get(url)) {
      return route.fulfill({ status: 200, contentType: 'application/javascript', body: cacheScript.get(url) });
    }
    if (cacheFont.has(url)) {
      return route.fulfill({ status: 200, contentType: 'text/css', headers: { 'access-control-allow-origin': '*' }, body: cacheFont.get(url).css });
    }
    const m = url.match(/^https:\/\/fonts\.gstatic\.com\/stile-siti-local\/(.+)$/);
    if (m && fileFont[m[1]]) {
      return route.fulfill({ status: 200, contentType: 'font/woff2', headers: { 'access-control-allow-origin': '*' }, body: readFileSync(fileFont[m[1]]) });
    }
    return route.continue();
  });
  const p = await ctx.newPage();
  p.on('console', (msg) => { if (msg.type() === 'error') consoleErrori.add(msg.text().slice(0, 160)); });
  p.on('pageerror', (e) => consoleErrori.add(String(e.message).slice(0, 160)));
  p.on('requestfailed', (r) => richiesteFallite.add(r.url().slice(0, 100)));

  await p.goto(pathToFileURL(resolve(pagina)).href, { waitUntil: 'load' });
  await p.addStyleTag({ content: 'html{scroll-behavior:auto !important}' });
  await p.waitForTimeout(300);
  const conIngresso = d.nome === '390' || (solo && d === dispositivi[0]);
  if (conIngresso) await p.screenshot({ path: join(cartella, 'ingresso-t0.png') });
  await p.waitForTimeout(1600);
  const altezza = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < altezza; y += d.h * 0.6) {
    await p.evaluate((yy) => window.scrollTo(0, yy), y);
    await p.waitForTimeout(120);
  }
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(1200);
  await p.evaluate(() => document.fonts.ready);

  if (conIngresso) {
    await p.screenshot({ path: join(cartella, 'ingresso-t1800.png') });
    const a = readFileSync(join(cartella, 'ingresso-t0.png'));
    const b = readFileSync(join(cartella, 'ingresso-t1800.png'));
    risultati.push({ dispositivo: 'animazioni', problemi: a.equals(b) ? [{ tipo: 'nessuna-animazione-visibile', dettaglio: 'il primo schermo è identico a 0.3s e a 1.9s dal caricamento' }] : [] });
  }

  const esito = await p.evaluate(controlli);
  if (conIngresso) Object.assign(meta, await p.evaluate(controlliMeta));
  await p.screenshot({ path: join(cartella, `${d.nome}.png`), fullPage: true });

  if (d.nome === '390' || (solo && d === dispositivi[0] && d.mobile && d.w < 700)) {
    const passo = 1400;
    let n = 1;
    for (let y = 0; y < esito.altezza && n <= 8; y += passo, n++) {
      await p.screenshot({ path: join(cartella, `390-parte${n}.png`), clip: { x: 0, y, width: d.w, height: Math.min(passo, esito.altezza - y) }, fullPage: true });
    }
  }
  risultati.push({ dispositivo: d.nome, ...esito });
  await ctx.close();
}
await browser.close();

console.log(`VERIFICA di ${basename(pagina)}`);
console.log(`Screenshot in: ${cartella}`);
console.log('DA GUARDARE: 390-parte*.png (telefono, a pezzi) e desktop.png. Gli altri file (360, 430, tablet, 390.png intero, ingresso-*) servono solo se i controlli segnalano problemi su quella larghezza.');
for (const a of avvisi) console.log(`AVVISO: ${a}`);

let totale = 0;
for (const r of risultati) {
  const tipi = r.problemi || [];
  if (!tipi.length) {
    console.log(`[${r.dispositivo}] ok`);
    continue;
  }
  for (const pr of tipi) {
    totale++;
    console.log(`[${r.dispositivo}] ${pr.tipo}: ${pr.dettaglio}`);
  }
}
if (meta.mancanti.length) { totale++; console.log(`[meta] mancano: ${meta.mancanti.join(', ')}`); }
if (meta.testoFinto) { totale++; console.log('[contenuto] testo segnaposto ancora presente'); }
for (const e of consoleErrori) { totale++; console.log(`[console] ${e}`); }
for (const u of richiesteFallite) { totale++; console.log(`[rete] richiesta fallita: ${u}`); }
const anim = risultati.find((r) => r.animazioni !== undefined);
if (anim) console.log(`Animazioni CSS attive al caricamento (${anim.dispositivo}): ${anim.animazioni} (quelle fatte con JavaScript/GSAP non vengono contate)`);
console.log(totale ? `\nPROBLEMI: ${totale}. Guarda gli screenshot e correggi.` : '\nNessun problema automatico. Guarda comunque gli screenshot.');
writeFileSync(join(cartella, 'rapporto.json'), JSON.stringify({ risultati, meta, console: [...consoleErrori], rete: [...richiesteFallite] }, null, 2));
