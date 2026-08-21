'use client';

import React, { useCallback, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import '@/lib/pdfjsSetup';

interface PdfViewerProps { url: string; }
const SWIPE_THRESHOLD_X = 50; const SWIPE_MAX_Y = 75;

export default function PdfViewer({ url }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.15);
  const [error, setError] = useState<string | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const onLoadSuccess = useCallback(({ numPages: n }: { numPages: number }) => { setNumPages(n); setPageNumber(1); setError(null); }, []);
  const goPrev = () => setPageNumber((p) => Math.max(1, p - 1));
  const goNext = () => setPageNumber((p) => (numPages ? Math.min(numPages, p + 1) : p));
  const zoomOut = () => setScale((s) => Math.max(0.5, +(s - 0.15).toFixed(2)));
  const zoomIn = () => setScale((s) => Math.min(2.5, +(s + 0.15).toFixed(2)));

  const handleTouchStart = (e: React.TouchEvent) => { const t = e.touches[0]; touchStart.current = { x: t.clientX, y: t.clientY }; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const deltaX = t.clientX - touchStart.current.x;
    const deltaY = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD_X || Math.abs(deltaY) > SWIPE_MAX_Y) return;
    if (deltaX < 0) goNext(); else goPrev();
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-[1000px] mx-auto flex flex-wrap items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-2 bg-bg border p-1" style={{ borderColor: 'var(--border)' }}>
          <button type="button" onClick={zoomOut} className="w-8 h-8 flex items-center justify-center text-lg text-text-dim hover:text-accent hover:bg-border/30 transition-colors">-</button>
          <span className="text-[0.7rem] font-bold tracking-[0.1em] text-text-dim w-12 text-center uppercase">{Math.round(scale * 100)}%</span>
          <button type="button" onClick={zoomIn} className="w-8 h-8 flex items-center justify-center text-lg text-text-dim hover:text-accent hover:bg-border/30 transition-colors">+</button>
        </div>
        <a href={url} download className="btn-outline text-[0.7rem] font-bold py-3 uppercase tracking-[0.15em]">Download PDF ↓</a>
      </div>
      {error ? <div className="py-20 text-center text-red-500 font-semibold">{error}</div> : (
        <>
          <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} className="max-w-full overflow-x-auto touch-pan-y border" style={{ borderColor: 'var(--border)' }}>
            <Document file={url} onLoadSuccess={onLoadSuccess} onLoadError={(err) => setError(err.message || 'Failed to load PDF.')} loading={<div className="py-24 flex justify-center text-[0.7rem] font-bold tracking-[0.15em] uppercase text-text-muted">Rendering...</div>}>
              <Page pageNumber={pageNumber} scale={scale} renderAnnotationLayer renderTextLayer className="bg-white [&>canvas]:mx-auto" />
            </Document>
          </div>
          <p className="sm:hidden text-text-muted text-[0.65rem] font-bold uppercase tracking-[0.15em] mt-6">Swipe to turn</p>
          <div className="w-full max-w-[800px] mx-auto flex items-center justify-between gap-4 mt-10">
            <button type="button" onClick={goPrev} disabled={pageNumber <= 1} className="btn-outline text-[0.7rem] font-bold py-3 uppercase tracking-[0.15em] disabled:opacity-30 disabled:cursor-not-allowed">← Prev</button>
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-text-dim text-center">Page {pageNumber}{numPages ? ` of ${numPages}` : ''}</span>
            <button type="button" onClick={goNext} disabled={!numPages || pageNumber >= numPages} className="btn-outline text-[0.7rem] font-bold py-3 uppercase tracking-[0.15em] disabled:opacity-30 disabled:cursor-not-allowed">Next →</button>
          </div>
        </>
      )}
    </div>
  );
}
