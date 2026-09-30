import React from 'react';
import GalleryView from '@/components/GalleryView';
import XkcdStrip from '@/components/XkcdStrip';
import { XKCD_COMICS } from '@/constants/xkcd';

export const metadata = {
  title: 'Gallery - Physics Association | BITS Pilani',
  description: 'Photo gallery of the Physics Association at BITS Pilani.',
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Header */}
      <section className="relative overflow-hidden flex items-center pt-8 pb-12 md:pt-12 md:pb-16" style={{ background: 'transparent' }}>
        <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 w-full">
          <div className="mb-4">
            <span className="text-xl font-yanone uppercase tracking-[0.2em] text-accent">
              Photos
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl text-text leading-tight font-display">
            The{' '}
            <span className="text-accent font-lobster text-[4.5rem] md:text-[7rem] lowercase leading-[0.7] inline-block transform -rotate-2">
              Gallery
            </span>
            <span className="font-marker text-accent2 text-2xl md:text-4xl absolute mt-4 md:mt-8 ml-2 rotate-12 inline-block">
              !
            </span>
          </h1>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        className="py-12 md:py-16 border-t"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <GalleryView />
          <XkcdStrip
            comic={XKCD_COMICS.centrifugalForce}
            maxWidth="max-w-[260px]"
            className="pt-12 pb-4"
          />
        </div>
      </section>
    </main>
  );
}
