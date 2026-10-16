import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { cacheDir, esegui, fallisci, installa, percorsoPacchetto, stiliTailwindInline } from './lib.mjs';

const [, , sorgente, uscita] = process.argv;
if (!sorgente || !uscita) fallisci('uso: node scripts/build.mjs sorgente.html pagina.html');
if (!existsSync(sorgente)) fallisci(`file non trovato: ${sorgente}`);

const html = readFileSync(sorgente, 'utf8');
const blocco = stiliTailwindInline(html);
if (!blocco) fallisci('nel sorgente manca il blocco <style type="text/tailwindcss">.');

installa('tailwindcss');
installa('@tailwindcss/cli');

const lavoro = join(cacheDir(), 'lavoro-' + process.pid);
mkdirSync(lavoro, { recursive: true });

try {
  writeFileSync(join(lavoro, 'pagina.html'), html);
  writeFileSync(join(lavoro, 'input.css'), `@import "tailwindcss";\n@source "./pagina.html";\n${blocco.css}\n`);

  const pj = JSON.parse(readFileSync(join(percorsoPacchetto('@tailwindcss/cli'), 'package.json'), 'utf8'));
  const bin = typeof pj.bin === 'string' ? pj.bin : Object.values(pj.bin)[0];
  const cli = join(percorsoPacchetto('@tailwindcss/cli'), bin);

  const r = esegui('node', [cli, '-i', 'input.css', '-o', 'output.css', '--minify'], { cwd: lavoro });
  if (r.status !== 0 || !existsSync(join(lavoro, 'output.css'))) {
    fallisci('compilazione Tailwind non riuscita.\n' + (r.stderr || r.stdout || ''));
  }

  const css = readFileSync(join(lavoro, 'output.css'), 'utf8').replace(/<\/style/gi, '<\\/style');
  const finale = html.replace(blocco.re, () => `<style>${css}</style>`);
  writeFileSync(resolve(uscita), finale);
  const kb = (Buffer.byteLength(css) / 1024).toFixed(1);
  console.log(`OK: ${uscita} (CSS compilato ${kb} KB, file ${(Buffer.byteLength(finale) / 1024).toFixed(1)} KB)`);
} finally {
  rmSync(lavoro, { recursive: true, force: true });
}
