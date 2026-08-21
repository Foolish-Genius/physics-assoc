import { pdfjs } from 'react-pdf';

// Must match the pdfjs-dist version react-pdf bundles internally — kept in
// sync by scripts/copy-pdf-worker.js (runs on every `npm install`).
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

export { pdfjs };
