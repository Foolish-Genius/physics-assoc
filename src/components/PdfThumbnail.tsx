'use client';

import React from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import '@/lib/pdfjsSetup';

interface PdfThumbnailProps {
  url: string;
}

export default function PdfThumbnail({ url }: PdfThumbnailProps) {
  return (
    <Document 
      file={url} 
      loading={<div className="h-48 flex items-center justify-center text-text-muted text-xs uppercase tracking-widest">Loading Cover...</div>}
    >
       <Page 
         pageNumber={1} 
         width={600} 
         renderTextLayer={false} 
         renderAnnotationLayer={false} 
         className="shadow-2xl" 
       />
    </Document>
  );
}
