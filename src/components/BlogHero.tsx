import React from 'react';

export default function BlogHero() {
  return (
    <section className="pt-16 pb-24 border-b" style={{ background: 'transparent', borderColor: 'var(--border)' }}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="mb-6">
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-accent">Blog</span>
        </div>
        <div className="max-w-4xl">
          <h1 className="text-[4rem] md:text-[6.5rem] text-text leading-[1.05] tracking-tight font-medium" style={{ fontFamily: '"Playfair Display", serif' }}>
            Insights & <span className="text-accent italic font-light">Discoveries</span>
          </h1>
          <p className="text-lg md:text-xl text-text-dim leading-relaxed mt-8 max-w-2xl">
            Articles covering quantum mechanics, astrophysics, particle physics,
            and the fundamental forces that shape our universe.
          </p>
        </div>
      </div>
    </section>
  );
}
