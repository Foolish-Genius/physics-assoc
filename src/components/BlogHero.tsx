import React from 'react';

export default function BlogHero() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-prussian to-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-prussian/50 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <span className="inline-block text-orange font-semibold text-sm tracking-widest uppercase mb-4">
          Physics Association Blog
        </span>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Explore the{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-amber-300">
            Universe
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Dive into articles covering quantum mechanics, astrophysics, particle physics,
          and the fundamental forces that shape our universe.
        </p>
      </div>
    </section>
  );
}
