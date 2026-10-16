import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { join } from 'node:path';

export const VERSIONI = {
  tailwindcss: '4.3.3',
  '@tailwindcss/cli': '4.3.3',
  playwright: '1.64.1',
};

let cache = null;

export function cacheDir() {
  if (cache) return cache;
  for (const base of [join(homedir(), '.cache'), tmpdir()]) {
    try {
      const dir = join(base, 'stile-siti');
      mkdirSync(dir, { recursive: true });
      const pj = join(dir, 'package.json');
      if (!existsSync(pj)) writeFileSync(pj, '{"private":true}');
      cache = dir;
      return dir;
    } catch {}
  }
  throw new Error('Impossibile creare la cartella di cache per gli script.');
}

export function fallisci(messaggio) {
  console.error('ERRORE: ' + messaggio);
  process.exit(1);
}

function q(s) {
  return '"' + String(s).replace(/"/g, '\\"') + '"';
}

export function esegui(comando, args, opzioni = {}) {
  const r = spawnSync([comando, ...args.map(q)].join(' '), { shell: true, encoding: 'utf8', ...opzioni });
  return r;
}

function installato(nome, versione) {
  const pj = join(cacheDir(), 'node_modules', ...nome.split('/'), 'package.json');
  if (!existsSync(pj)) return false;
  if (!versione) return true;
  try {
    return JSON.parse(readFileSync(pj, 'utf8')).version === versione;
  } catch {
    return false;
  }
}

export function assicuraPacchetto(nome, versione) {
  if (installato(nome, versione)) return true;
  const spec = versione ? `${nome}@${versione}` : nome;
  const r = esegui('npm', ['install', '--no-audit', '--no-fund', '--silent', '--prefix', cacheDir(), spec]);
  return r.status === 0 && installato(nome, null);
}

export function installa(nome) {
  if (!assicuraPacchetto(nome, VERSIONI[nome])) {
    fallisci(`installazione di ${nome} non riuscita. Controlla la connessione a npm e riprova.`);
  }
}

export function richiedi(nome) {
  installa(nome);
  return createRequire(join(cacheDir(), 'x.js'))(nome);
}

export function percorsoPacchetto(nome) {
  return join(cacheDir(), 'node_modules', ...nome.split('/'));
}

export function stiliTailwindInline(html) {
  const re = /<style\s+type=["']text\/tailwindcss["']\s*>([\s\S]*?)<\/style>/i;
  const m = html.match(re);
  return m ? { re, css: m[1] } : null;
}

const CDN_RE = [
  { re: /^https:\/\/cdn\.jsdelivr\.net\/npm\/((?:@[^/@]+\/)?[^/@]+)@([^/]+)\/(.+?)(?:\?.*)?$/, tipo: 'npm' },
  { re: /^https:\/\/unpkg\.com\/((?:@[^/@]+\/)?[^/@]+)@([^/]+)\/(.+?)(?:\?.*)?$/, tipo: 'npm' },
  { re: /^https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/([^/]+)\/([^/]+)\/(.+?)(?:\?.*)?$/, tipo: 'cdnjs' },
];

export function ricavaPacchettoScript(url) {
  for (const { re, tipo } of CDN_RE) {
    const m = url.match(re);
    if (!m) continue;
    return { pacchetto: m[1], versione: m[2], file: m[3], tipo };
  }
  return null;
}

export async function contenutoScript(url) {
  const info = ricavaPacchettoScript(url);
  if (info && assicuraPacchetto(info.pacchetto, info.versione)) {
    const base = percorsoPacchetto(info.pacchetto);
    const candidati = info.tipo === 'cdnjs'
      ? [`dist/${info.file}`, info.file, `umd/${info.file}`, `dist/umd/${info.file}`]
      : [info.file];
    for (const c of candidati) {
      const p = join(base, c);
      if (existsSync(p)) return readFileSync(p, 'utf8');
    }
  }
  try {
    const r = await fetch(url);
    if (r.ok) return await r.text();
  } catch {}
  return null;
}

function slugFont(nome) {
  return nome.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function pesiDaSpec(valori, assi) {
  const indiceW = assi.indexOf('wght');
  const indiceItal = assi.indexOf('ital');
  const pesi = new Set();
  for (const tupla of valori.split(';')) {
    const parti = tupla.split(',');
    if (indiceItal >= 0 && parti[indiceItal] === '1') continue;
    const w = indiceW >= 0 ? parti[indiceW] : parti[0];
    if (!w) continue;
    if (w.includes('..')) {
      const [lo, hi] = w.split('..').map(Number);
      pesi.add(lo <= 400 && hi >= 400 ? 400 : lo);
      pesi.add(hi >= 700 ? (lo <= 700 ? 700 : lo) : hi);
    } else if (!Number.isNaN(Number(w))) {
      pesi.add(Number(w));
    }
  }
  return pesi.size ? [...pesi].sort((a, b) => a - b) : [400];
}

export function famigliePerUrl(url) {
  const u = new URL(url);
  return u.searchParams.getAll('family').map((f) => {
    const [nome, resto] = f.split(':');
    let pesi = [400];
    if (resto) {
      const [assi, valori] = resto.split('@');
      pesi = valori ? pesiDaSpec(valori, assi.split(',')) : [400];
    }
    return { nome: nome.replace(/\+/g, ' '), pesi };
  });
}

export function risolviFont(url, formatoUrl) {
  const css = [];
  const file = {};
  const avvisi = [];
  for (const { nome, pesi } of famigliePerUrl(url)) {
    const slug = slugFont(nome);
    if (!assicuraPacchetto(`@fontsource/${slug}`, null)) {
      avvisi.push(`font "${nome}" non trovato su Fontsource`);
      continue;
    }
    const dir = join(percorsoPacchetto(`@fontsource/${slug}`), 'files');
    const disponibili = existsSync(dir)
      ? readdirSync(dir)
          .map((f) => f.match(new RegExp(`^${slug}-latin-(\\d+)-normal\\.woff2$`)))
          .filter(Boolean)
          .map((m) => ({ peso: Number(m[1]), nome: m[0] }))
      : [];
    if (!disponibili.length) {
      avvisi.push(`font "${nome}": nessun file latin disponibile`);
      continue;
    }
    for (const peso of pesi) {
      const scelto = disponibili.reduce((a, b) => (Math.abs(b.peso - peso) < Math.abs(a.peso - peso) ? b : a));
      const percorso = join(dir, scelto.nome);
      file[scelto.nome] = percorso;
      css.push(
        `@font-face{font-family:'${nome}';font-style:normal;font-weight:${peso};font-display:swap;src:url(${formatoUrl(scelto.nome, percorso)}) format('woff2');}`
      );
    }
  }
  return { css: css.join('\n'), file, avvisi };
}

export function urlEsterni(html) {
  const script = [...html.matchAll(/<script\b[^>]*\bsrc=["'](https?:\/\/[^"']+)["'][^>]*>\s*<\/script>/gi)].map((m) => ({ tag: m[0], url: m[1] }));
  const fonts = [...html.matchAll(/<link\b[^>]*\bhref=["'](https:\/\/fonts\.googleapis\.com\/css2?\?[^"']+)["'][^>]*>/gi)].map((m) => ({ tag: m[0], url: m[1].replace(/&amp;/g, '&') }));
  return { script, fonts };
}
