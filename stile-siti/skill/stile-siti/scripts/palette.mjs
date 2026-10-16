const args = process.argv.slice(2);
const base = args.find((a) => /^#?[0-9a-f]{6}$/i.test(a));
const iSfondo = args.indexOf('--sfondo');
const sfondoArg = iSfondo >= 0 ? args[iSfondo + 1] : null;

if (!base) {
  console.error('ERRORE: uso: node scripts/palette.mjs "#colore" [--sfondo "#colore"]');
  process.exit(1);
}

const daHex = (h) => {
  const s = h.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16) / 255);
};
const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const gam = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

function rgbAOklab([r, g, b]) {
  const [R, G, B] = [lin(r), lin(g), lin(b)];
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

function oklabARgb([L, a, b]) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map(gam);
}

const inGamut = (rgb) => rgb.every((c) => c >= -0.0005 && c <= 1.0005);

function lchAHex(L, C, h) {
  const rad = (h * Math.PI) / 180;
  let c = C;
  let rgb = oklabARgb([L, c * Math.cos(rad), c * Math.sin(rad)]);
  while (!inGamut(rgb) && c > 0) {
    c -= 0.005;
    rgb = oklabARgb([L, Math.max(c, 0) * Math.cos(rad), Math.max(c, 0) * Math.sin(rad)]);
  }
  return '#' + rgb.map((v) => Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, '0')).join('');
}

const luminanza = (hex) => {
  const [r, g, b] = daHex(hex).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrasto = (a, b) => {
  const [x, y] = [luminanza(a), luminanza(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

const [L0, A0, B0] = rgbAOklab(daHex(base));
const C0 = Math.hypot(A0, B0);
const H0 = ((Math.atan2(B0, A0) * 180) / Math.PI + 360) % 360;

const livelli = [
  [50, 0.975, 0.12],
  [100, 0.94, 0.25],
  [200, 0.88, 0.45],
  [300, 0.8, 0.7],
  [400, 0.72, 0.9],
  [500, 0.63, 1],
  [600, 0.55, 0.95],
  [700, 0.45, 0.8],
  [800, 0.34, 0.6],
  [900, 0.25, 0.45],
  [950, 0.17, 0.3],
];

const vicino = livelli.reduce((a, b, i) => (Math.abs(b[1] - L0) < Math.abs(livelli[a][1] - L0) ? i : a), 0);
const baseHex = '#' + base.replace('#', '').toLowerCase();
const scala = livelli.map(([n, L, k], i) => ({
  n,
  hex: i === vicino ? baseHex : lchAHex(L, C0 * k, H0),
  base: i === vicino,
}));
const sfondo = sfondoArg ? (sfondoArg.startsWith('#') ? sfondoArg : '#' + sfondoArg) : null;

console.log(`Colore base: #${base.replace('#', '')}  (OKLCH L=${L0.toFixed(2)} C=${C0.toFixed(3)} H=${H0.toFixed(0)})`);
console.log('');
console.log('Scala:');
for (const { n, hex, base: eBase } of scala) {
  const bianco = contrasto(hex, '#ffffff').toFixed(1);
  const nero = contrasto(hex, '#000000').toFixed(1);
  const su = sfondo ? `  su sfondo ${sfondo}: ${contrasto(hex, sfondo).toFixed(1)}:1` : '';
  console.log(`  ${String(n).padStart(3)}  ${hex}   vs bianco ${bianco}:1   vs nero ${nero}:1${su}${eBase ? '   <- base' : ''}`);
}

console.log('');
console.log('CSS (@theme):');
for (const { n, hex } of scala) console.log(`  --color-marca-${n}: ${hex};`);

if (sfondo) {
  const adatti = scala.filter((s) => contrasto(s.hex, sfondo) >= 4.5);
  console.log('');
  console.log(`Passi leggibili come testo su ${sfondo} (>= 4.5:1): ${adatti.length ? adatti.map((s) => s.n).join(', ') : 'nessuno'}`);
  const grandi = scala.filter((s) => contrasto(s.hex, sfondo) >= 3 && contrasto(s.hex, sfondo) < 4.5);
  if (grandi.length) console.log(`Solo per testo grande (>= 3:1): ${grandi.map((s) => s.n).join(', ')}`);
}
