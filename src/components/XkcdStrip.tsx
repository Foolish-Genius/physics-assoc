import React from 'react';
import Image from 'next/image';
import { XkcdComic } from '@/constants/xkcd';

interface XkcdStripProps {
  comic: XkcdComic;
  maxWidth?: string;
  className?: string;
  captionClassName?: string;
  showCaption?: boolean;
  align?: 'center' | 'left' | 'right';
}

export default function XkcdStrip({
  comic,
  maxWidth = 'max-w-xl',
  className = '',
  captionClassName = '',
  showCaption = true,
  align = 'center',
}: XkcdStripProps) {
  const alignClass = align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center';

  return (
    <div className={`w-full flex ${alignClass} py-6 ${className}`}>
      <div className={`block relative ${maxWidth} w-full transition-opacity duration-300 opacity-75 hover:opacity-100 group`}>
        <a
          href={comic.xkcdUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={comic.alt}
          className="block outline-none"
        >
          <Image
            src={comic.src}
            alt={comic.title}
            width={comic.width}
            height={comic.height}
            className="w-full h-auto object-contain mx-auto mix-blend-multiply dark:invert dark:mix-blend-screen pointer-events-none"
          />
        </a>
        {showCaption && (
          <p className={`text-xs md:text-sm text-text-dim italic text-center font-serif mt-3 leading-relaxed opacity-85 group-hover:opacity-100 transition-opacity ${captionClassName}`}>
            &ldquo;{comic.alt}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}
