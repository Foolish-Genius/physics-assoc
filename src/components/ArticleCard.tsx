'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ArticleCardProps {
  title: string;
  description: string;
  author: string;
  image: string;
  url: string;
}

export default function ArticleCard({ title, description, author, image, url }: ArticleCardProps) {
  return (
    <article className="group flex flex-col h-full bg-bg-surface border border-border">
      <Link href={url} target="_blank" rel="noopener noreferrer" className="block relative aspect-[4/3] overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </Link>
      <div className="p-8 flex flex-col flex-1">
        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-text-muted mb-4 font-semibold">By {author}</p>
        <Link href={url} target="_blank" rel="noopener noreferrer">
          <h3 className="text-2xl text-text mb-4 leading-tight font-medium group-hover:text-accent transition-colors" style={{ fontFamily: '"Playfair Display", serif' }}>
            {title}
          </h3>
        </Link>
        <p className="text-sm text-text-dim line-clamp-3 mb-8 flex-1 leading-relaxed">{description}</p>
        <Link href={url} target="_blank" rel="noopener noreferrer" className="inline-block text-[0.7rem] font-bold text-accent hover:text-accent-hover transition-colors uppercase tracking-[0.15em]">
          Read Article →
        </Link>
      </div>
    </article>
  );
}
