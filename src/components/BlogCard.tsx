'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/lib/types';

interface BlogCardProps {
  article: Article;
}

export default function BlogCard({ article }: BlogCardProps) {
  const formattedDate = new Date(article.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <article className="group p-8 border bg-bg-surface transition-all duration-300 hover:border-accent flex flex-col md:flex-row gap-8" style={{ borderColor: 'var(--border)' }}>
      {article.cover_image && (
        <Link href={`/blog/${article.slug}`} className="flex-shrink-0 relative overflow-hidden w-full md:w-64 h-48 md:h-auto">
          <Image src={article.cover_image} alt={article.title} fill unoptimized className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </Link>
      )}
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
          <span className="text-xl uppercase tracking-[0.1em] font-yanone text-accent">{article.author}</span>
          <span className="text-xs text-text-muted">•</span>
          <span className="text-xl text-text-muted font-yanone uppercase tracking-[0.1em]">{formattedDate}</span>
        </div>
        <Link href={`/blog/${article.slug}`}>
          <h3 className="text-4xl text-text mb-4 font-display group-hover:text-accent transition-colors leading-tight">
            {article.title}
          </h3>
        </Link>
        <p className="text-base text-text-dim line-clamp-2 mb-6 leading-relaxed">{article.excerpt}</p>
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {article.tags.slice(0, 3).map((tag) => (
               <span key={tag} className="text-lg font-yanone uppercase tracking-[0.1em] px-2 py-0 bg-border/20 text-text-muted border border-border">
                 {tag}
               </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
