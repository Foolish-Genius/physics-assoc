'use client';

import React, { useState, useEffect } from 'react';
import { quotes } from '@/constants';

export default function Banner() {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  const quote = quotes[currentQuote];

  return (
    <section className="relative h-96 bg-gradient-to-br from-dark-secondary to-dark flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Quote Container */}
      <div className="relative z-10 text-center max-w-4xl px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-amber-50 mb-4">
          {quote.text}
        </h2>
        <p className="text-xl text-gray-400 italic mb-8">— {quote.author}</p>

        <div className="flex flex-col items-center gap-4">
          <h3 className="text-2xl">
            <span className="text-accent font-bold">PHYSICS ASSOCIATION</span>
          </h3>
          <h4 className="text-xl text-white font-semibold">BITS PILANI</h4>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevQuote}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-accent hover:bg-red-600 text-white p-2 rounded-full transition-colors"
        aria-label="Previous quote"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <button
        onClick={nextQuote}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-accent hover:bg-red-600 text-white p-2 rounded-full transition-colors"
        aria-label="Next quote"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {quotes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuote(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentQuote ? 'bg-accent w-6' : 'bg-gray-600 w-2'
            }`}
            aria-label={`Quote ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
