#!/usr/bin/env node
// Cerca e scarica SVG già fatti da Iconify (https://iconify.design), così non si disegnano a mano.
//   node icone.mjs cerca <parola> [set]      -> elenco di nomi (es. lucide:cat)
//   node icone.mjs dai <set:nome> [...]      -> stampa l'SVG pronto da incollare (colore = currentColor)
// Set utili: lucide, tabler, ph (icone lineari); game-icons, noto, fluent-emoji-flat (figure e oggetti); streamline-*.
const API = 'https://api.iconify.design';
const [cmd, ...args] = process.argv.slice(2);

async function get(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status} su ${url}`);
  return r;
}

try {
  if (cmd === 'cerca' && args[0]) {
    const [parola, set] = args;
    const q = new URLSearchParams({ query: parola, limit: '24' });
    if (set) q.set('prefix', set);
    const { icons = [] } = await (await get(`${API}/search?${q}`)).json();
    console.log(icons.length ? icons.join('\n') : 'nessun risultato: prova un sinonimo in inglese');
  } else if (cmd === 'dai' && args.length) {
    for (const id of args) {
      const [set, nome] = id.split(':');
      if (!nome) throw new Error(`nome non valido "${id}", usa set:nome`);
      const svg = (await (await get(`${API}/${set}/${nome}.svg`)).text()).trim();
      console.log(`<!-- ${id} -->\n${svg}`);
    }
  } else {
    console.log('uso: icone.mjs cerca <parola> [set] | icone.mjs dai <set:nome> [...]');
    process.exit(1);
  }
} catch (e) {
  console.error(`icone.mjs: ${e.message}. Senza rete non inventare SVG complessi: usa un'icona semplice (max 300 caratteri) o solo CSS.`);
  process.exit(1);
}
