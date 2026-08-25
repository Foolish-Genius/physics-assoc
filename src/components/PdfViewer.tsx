'use client';

import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import '@/lib/pdfjsSetup';

interface PdfViewerProps { url: string; }

export default function PdfViewer({ url }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [scale, setScale] = useState(1.15);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const onLoadSuccess = useCallback(({ numPages: n }: { numPages: number }) => { setNumPages(n); setError(null); }, []);
  const zoomOut = () => setScale((s) => Math.max(0.5, +(s - 0.15).toFixed(2)));
  const zoomIn = () => setScale((s) => Math.min(2.5, +(s + 0.15).toFixed(2)));

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        console.warn('Fullscreen API is not supported on this browser.');
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="flex flex-col items-center w-full" ref={containerRef}>
      <div className={`w-full max-w-[1000px] mx-auto flex flex-wrap items-center justify-between gap-4 mb-4 p-4 rounded-lg ${isFullscreen ? 'bg-[var(--bg)]' : ''}`}>
        <div className="flex items-center gap-2 bg-bg border p-1" style={{ borderColor: 'var(--border)' }}>
          <button type="button" onClick={zoomOut} className="w-8 h-8 flex items-center justify-center text-lg text-text-dim hover:text-accent hover:bg-border/30 transition-colors">-</button>
          <span className="text-[0.7rem] font-bold tracking-[0.1em] text-text-dim w-12 text-center uppercase">{Math.round(scale * 100)}%</span>
          <button type="button" onClick={zoomIn} className="w-8 h-8 flex items-center justify-center text-lg text-text-dim hover:text-accent hover:bg-border/30 transition-colors">+</button>
        </div>
        <div className="flex items-center gap-4">
          <button type="button" onClick={toggleFullScreen} className="btn-outline text-[0.7rem] font-bold py-3 uppercase tracking-[0.15em] bg-[var(--bg)]">
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
          <a href={url} download className="btn-accent text-[0.7rem] font-bold py-3 uppercase tracking-[0.15em]">Download PDF ↓</a>
        </div>
      </div>
      {error ? <div className="py-20 text-center text-red-500 font-semibold">{error}</div> : (
        <div className={`w-full overflow-y-auto overflow-x-auto border bg-[var(--bg-raised)] p-4 md:p-8 ${isFullscreen ? 'h-[calc(100vh-100px)]' : 'h-[75vh]'}`} style={{ borderColor: 'var(--border)' }}>
          <Document file={url} onLoadSuccess={onLoadSuccess} onLoadError={(err) => setError(err.message || 'Failed to load PDF.')} loading={<div className="py-24 flex justify-center text-[0.7rem] font-bold tracking-[0.15em] uppercase text-text-muted">Rendering...</div>}>
            <div className="flex flex-col items-center gap-8">
              {Array.from(new Array(numPages || 0), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={scale} renderAnnotationLayer renderTextLayer className="bg-white shadow-xl [&>canvas]:mx-auto" />
              ))}
            </div>
          </Document>
        </div>
      )}
    </div>
  );
}
