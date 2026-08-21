// react-pdf bundles its own pinned pdfjs-dist. The PDF worker must be served
// as a static asset whose version matches that bundled copy exactly, so we
// copy it into /public on every install instead of pointing at a CDN.
const fs = require('fs');
const path = require('path');

const src = path.join(
  __dirname,
  '..',
  'node_modules',
  'react-pdf',
  'node_modules',
  'pdfjs-dist',
  'build',
  'pdf.worker.min.mjs'
);

const fallbackSrc = path.join(
  __dirname,
  '..',
  'node_modules',
  'pdfjs-dist',
  'build',
  'pdf.worker.min.mjs'
);

const dest = path.join(__dirname, '..', 'public', 'pdf.worker.min.mjs');

const resolvedSrc = fs.existsSync(src) ? src : fallbackSrc;

if (!fs.existsSync(resolvedSrc)) {
  console.warn('[copy-pdf-worker] Could not find pdfjs-dist worker build; skipping copy.');
  process.exit(0);
}

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.copyFileSync(resolvedSrc, dest);
console.log(`[copy-pdf-worker] Copied worker from ${resolvedSrc} to ${dest}`);
