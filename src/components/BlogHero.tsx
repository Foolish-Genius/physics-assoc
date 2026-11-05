import { XKCD_COMICS } from '@/constants/xkcd';
import React from 'react';
import XkcdStrip from './XkcdStrip';

export default function BlogHero() {
  return (
    <section className="pt-16 pb-24 border-b" style={{ background: 'transparent', borderColor: 'var(--border)' }}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="mb-6">
          <span className="text-xl font-yanone uppercase tracking-[0.2em] text-accent">Blog</span>
        </div>
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">

        <div>
          <h1 className="text-[4rem] md:text-[6.5rem] text-text leading-[1.05] tracking-tight font-display max-w-4xl">
            Insights & <span className="text-accent font-lobster lowercase text-[5rem] md:text-[8rem] inline-block transform -rotate-2">Discoveries</span>
          </h1>
          <p className="text-lg md:text-xl text-text-dim leading-relaxed mt-8 max-w-2xl">
            Articles covering quantum mechanics, astrophysics, particle physics,
            and the fundamental forces that shape our universe.
          </p>
        </div>
        <div className="lg:max-w-md w-full shrink-0">
          <XkcdStrip comic={XKCD_COMICS.fundamentalForces} maxWidth="max-w-md" className="!py-0 !px-0" />
        </div>
        </div>
      </div>
    </section>
  );
}