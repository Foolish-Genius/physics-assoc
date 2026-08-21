'use client';

import React, { useCallback, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import '@/lib/pdfjsSetup';

interface PdfViewerProps {
  url: string;
}

// Minimum horizontal distance (px) to count a touch gesture as a page-turn
// swipe, and the max vertical drift allowed so a scroll doesn't get mistaken
// for one.
const SWIPE_THRESHOLD_X = 50;
const SWIPE_MAX_Y = 75;

export default function PdfViewer({ url }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.15);
  const [error, setError] = useState<string | null>(null);

  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const onLoadSuccess = useCallback(({ numPages: n }: { numPages: number }) => {
    setNumPages(n);
    setPageNumber(1);
    setError(null);
  }, []);

  const goPrev = () => setPageNumber((p) => Math.max(1, p - 1));
  const goNext = () => setPageNumber((p) => (numPages ? Math.min(numPages, p + 1) : p));
  const zoomOut = () => setScale((s) => Math.max(0.5, +(s - 0.15).toFixed(2)));
  const zoomIn = () => setScale((s) => Math.min(2.5, +(s + 0.15).toFixed(2)));

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const deltaX = t.clientX - touchStart.current.x;
    const deltaY = t.clientY - touchStart.current.y;
    touchStart.current = null;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD_X || Math.abs(deltaY) > SWIPE_MAX_Y) return;

    if (deltaX < 0) {
      goNext();
    } else {
      goPrev();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-4 bg-black/90 backdrop-blur-sm border border-prussian rounded-xl px-4 py-3 mb-6 shadow-lg">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={zoomOut}
            className="w-8 h-8 flex items-center justify-center text-gray-300 bg-prussian/40 hover:bg-prussian/60 rounded-lg border border-prussian/50 transition-colors"
            aria-label="Zoom out"
          >
            −
          </button>
          <span className="text-gray-400 text-sm w-12 text-center">{Math.round(scale * 100)}%</span>
          <button
            type="button"
            onClick={zoomIn}
            className="w-8 h-8 flex items-center justify-center text-gray-300 bg-prussian/40 hover:bg-prussian/60 rounded-lg border border-prussian/50 transition-colors"
            aria-label="Zoom in"
          >
            +
          </button>
        </div>

        <div className="w-px h-6 bg-prussian hidden sm:block" />

        <a
          href={url}
          download
          className="px-3 py-1.5 text-sm font-medium text-orange hover:text-orange/80 transition-colors"
        >
          Download PDF
        </a>
      </div>

      {error ? (
        <div className="py-20 text-center text-red-400 text-sm max-w-md">
          {error}
        </div>
      ) : (
        <>
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="max-w-full overflow-x-auto touch-pan-y"
          >
            <Document
              file={url}
              onLoadSuccess={onLoadSuccess}
              onLoadError={(err) => setError(err.message || 'Failed to load PDF.')}
              loading={
                <div className="py-24 flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-prussian border-t-orange rounded-full animate-spin" />
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderAnnotationLayer
                renderTextLayer
                className="shadow-2xl [&>canvas]:mx-auto [&>canvas]:rounded-lg"
              />
            </Document>
          </div>

          <p className="sm:hidden text-gray-600 text-xs mt-4">Swipe left or right to change pages</p>

          <div className="w-full max-w-3xl mx-auto flex items-center justify-center gap-3 bg-black/90 backdrop-blur-sm border border-prussian rounded-xl px-4 py-3 mt-6 shadow-lg">
            <button
              type="button"
              onClick={goPrev}
              disabled={pageNumber <= 1}
              className="px-4 py-2 text-sm font-medium text-gray-300 bg-prussian/40 hover:bg-prussian/60 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-prussian/50 transition-colors"
            >
              Prev
            </button>
            <span className="text-gray-300 text-sm min-w-[90px] text-center">
              Page {pageNumber}{numPages ? ` of ${numPages}` : ''}
            </span>
            <button
              type="button"
              onClick={goNext}
              disabled={!numPages || pageNumber >= numPages}
              className="px-4 py-2 text-sm font-medium text-gray-300 bg-prussian/40 hover:bg-prussian/60 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg border border-prussian/50 transition-colors"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
